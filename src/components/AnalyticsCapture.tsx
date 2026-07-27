import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import {
  captureFirstTouch,
  getSessionId,
  trackTraffic,
  trackRetention,
} from "@/utils/analytics";

// Feuert die Ebenen, die sich aus reiner Anwesenheit ergeben: First-Touch,
// genau ein session_start und Retention. Bewusst kein page_view — das zählt
// useTrackPageview bereits über die Edge-Function.
//
// Rendert nichts.

const FIRST_SEEN_KEY = "gx_first_seen";
const RETENTION_FIRED_KEY = "gx_retention_fired";
const WEEK_FIRED_KEY = "gx_week_fired";
const SESSION_STARTED_KEY = "gx_session_started";
const DAY_MS = 24 * 60 * 60 * 1000;

function read(key: string): string | null {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function write(key: string, value: string): void {
  try {
    localStorage.setItem(key, value);
  } catch {
    /* Storage gesperrt — Retention dann nicht messbar */
  }
}

// ISO-Kalenderwoche "2026-W31": verhindert, dass weekly_active bei täglichen
// Nutzern siebenmal pro Woche feuert.
function isoWeek(d: Date): string {
  const date = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  const dayNum = date.getUTCDay() || 7;
  date.setUTCDate(date.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
  const week = Math.ceil(((date.getTime() - yearStart.getTime()) / DAY_MS + 1) / 7);
  return `${date.getUTCFullYear()}-W${String(week).padStart(2, "0")}`;
}

export const AnalyticsCapture = () => {
  const location = useLocation();
  const done = useRef(false);

  // First-Touch bei jedem Routenwechsel versuchen — die Funktion schreibt nur
  // beim allerersten Mal. Muss bei jeder Route laufen, weil der Einstieg auch
  // auf einer Unterseite passieren kann.
  useEffect(() => {
    captureFirstTouch();
  }, [location.pathname, location.search]);

  useEffect(() => {
    if (done.current) return;
    done.current = true;

    // Genau ein traffic-Event pro Session
    let already = false;
    try {
      already = sessionStorage.getItem(SESSION_STARTED_KEY) === getSessionId();
    } catch {
      already = false;
    }
    if (!already) {
      trackTraffic.sessionStart({ entry_path: location.pathname.slice(0, 300) });
      try {
        sessionStorage.setItem(SESSION_STARTED_KEY, getSessionId());
      } catch {
        /* ohne Storage feuert es je Reload — besser als gar nicht */
      }
    }

    const now = Date.now();
    const firstSeenRaw = read(FIRST_SEEN_KEY);

    if (!firstSeenRaw) {
      write(FIRST_SEEN_KEY, String(now));
      write(WEEK_FIRED_KEY, isoWeek(new Date(now)));
      trackRetention.weeklyActive();
      return;
    }

    const daysSinceFirst = Math.floor((now - (Number(firstSeenRaw) || now)) / DAY_MS);
    const fired = (read(RETENTION_FIRED_KEY) || "").split(",").filter(Boolean);

    // >= statt ==, sonst verliert man jeden, der an Tag 2 statt Tag 1 wiederkommt.
    if (daysSinceFirst >= 1 && !fired.includes("day1")) {
      trackRetention.returned(1);
      fired.push("day1");
    }
    if (daysSinceFirst >= 7 && !fired.includes("day7")) {
      trackRetention.returned(7);
      fired.push("day7");
    }
    if (fired.length) write(RETENTION_FIRED_KEY, fired.join(","));

    const week = isoWeek(new Date(now));
    if (read(WEEK_FIRED_KEY) !== week) {
      trackRetention.weeklyActive();
      write(WEEK_FIRED_KEY, week);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
};

export default AnalyticsCapture;
