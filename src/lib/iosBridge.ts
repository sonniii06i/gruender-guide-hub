/**
 * Native iOS-Bridge für die GründerX-App (@capacitor/browser, @capacitor/app,
 * @capacitor/push-notifications, Web Share API).
 * Alle Funktionen fallen im regulären Webbrowser sicher und lautlos zurück.
 */
import { isGruenderXIosApp, initIosApp } from "./iosApp";
import { hapticLight, hapticSuccess } from "./haptics";

interface CapacitorBrowserPlugin {
  open?: (opts: { url: string; presentationStyle?: "fullscreen" | "popover"; toolbarColor?: string }) => Promise<void>;
}

interface CapacitorAppPlugin {
  addListener?: (
    event: "appUrlOpen" | "appStateChange",
    cb: (data: { url?: string; isActive?: boolean }) => void,
  ) => Promise<{ remove: () => Promise<void> }>;
}

interface CapacitorPushPlugin {
  checkPermissions?: () => Promise<{ receive: "prompt" | "prompt-with-rationale" | "granted" | "denied" }>;
  requestPermissions?: () => Promise<{ receive: "prompt" | "prompt-with-rationale" | "granted" | "denied" }>;
  register?: () => Promise<void>;
  addListener?: (
    event: "registration" | "registrationError",
    cb: (data: { value?: string; error?: string }) => void,
  ) => Promise<{ remove: () => Promise<void> }>;
}

interface CapacitorWindow {
  Capacitor?: {
    Plugins?: {
      Browser?: CapacitorBrowserPlugin;
      App?: CapacitorAppPlugin;
      PushNotifications?: CapacitorPushPlugin;
    };
  };
}

function getPlugins() {
  if (typeof window === "undefined") return null;
  return (window as unknown as CapacitorWindow).Capacitor?.Plugins ?? null;
}

/**
 * Öffnet externe URLs in der iOS-App im nativen SFSafariViewController
 * statt die WebView zu verlassen oder den Nutzer auszusperren.
 */
export async function openExternalInIosApp(url: string): Promise<boolean> {
  if (!isGruenderXIosApp()) return false;
  const browser = getPlugins()?.Browser;
  if (!browser?.open) return false;
  try {
    hapticLight();
    await browser.open({
      url,
      presentationStyle: "popover",
      toolbarColor: "#122b64",
    });
    return true;
  } catch {
    return false;
  }
}

/**
 * Natives iOS Share Sheet (navigator.share) mit sauberem Zwischenablage-Fallback im Browser.
 */
export async function shareNative(opts: {
  title: string;
  text?: string;
  url: string;
}): Promise<"shared" | "copied" | "cancelled"> {
  if (typeof navigator !== "undefined" && typeof navigator.share === "function") {
    try {
      hapticLight();
      await navigator.share({ title: opts.title, text: opts.text, url: opts.url });
      return "shared";
    } catch (err) {
      if (err instanceof Error && err.name === "AbortError") return "cancelled";
    }
  }
  try {
    if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(opts.url);
      hapticSuccess();
      return "copied";
    }
  } catch {
    /* ignore */
  }
  return "cancelled";
}

const PUSH_STATUS_KEY = "gx-ios-push-status";
const PUSH_TOKEN_KEY = "gx-ios-push-token";

export type IosPushStatus = "granted" | "denied" | "prompt" | "unsupported";

export async function getIosPushStatus(): Promise<IosPushStatus> {
  if (!isGruenderXIosApp()) return "unsupported";
  const push = getPlugins()?.PushNotifications;
  if (!push?.checkPermissions) return "unsupported";
  try {
    const res = await push.checkPermissions();
    if (res.receive === "granted") {
      try {
        localStorage.setItem(PUSH_STATUS_KEY, "granted");
      } catch {
        /* ignore */
      }
      return "granted";
    }
    if (res.receive === "denied") return "denied";
    return "prompt";
  } catch {
    return "unsupported";
  }
}

export async function requestIosPushNotifications(): Promise<{ status: IosPushStatus; token?: string }> {
  if (!isGruenderXIosApp()) return { status: "unsupported" };
  const push = getPlugins()?.PushNotifications;
  if (!push?.requestPermissions || !push?.register) return { status: "unsupported" };
  try {
    const perm = await push.requestPermissions();
    if (perm.receive !== "granted") {
      try {
        localStorage.setItem(PUSH_STATUS_KEY, perm.receive === "denied" ? "denied" : "prompt");
      } catch {
        /* ignore */
      }
      return { status: perm.receive === "denied" ? "denied" : "prompt" };
    }

    let token: string | undefined;
    try {
      token = await new Promise<string | undefined>((resolve) => {
        let done = false;
        const finish = (val?: string) => {
          if (done) return;
          done = true;
          resolve(val);
        };
        const timer = window.setTimeout(() => finish(undefined), 4000);
        void push.addListener?.("registration", (data) => {
          window.clearTimeout(timer);
          if (data.value) {
            try {
              localStorage.setItem(PUSH_TOKEN_KEY, data.value.slice(0, 12));
            } catch {
              /* ignore */
            }
          }
          finish(data.value);
        });
        void push.addListener?.("registrationError", () => {
          window.clearTimeout(timer);
          finish(undefined);
        });
        void push.register?.();
      });
    } catch {
      /* APNs-Registrierung optional (z. B. Simulator) */
    }

    try {
      localStorage.setItem(PUSH_STATUS_KEY, "granted");
    } catch {
      /* ignore */
    }
    hapticSuccess();
    return { status: "granted", token };
  } catch {
    return { status: "unsupported" };
  }
}

export function getSavedIosPushTokenPreview(): string | null {
  try {
    return localStorage.getItem(PUSH_TOKEN_KEY);
  } catch {
    return null;
  }
}

/**
 * Verarbeitet Universal Links (https://gruenderx.de/...) und Custom-Scheme-Deep-Links
 * (gruenderx://...) direkt im React Router und hält die Statusleiste nach App-Resume hell.
 */
export function attachIosDeepLinks(navigate: (path: string) => void): () => void {
  if (!isGruenderXIosApp()) return () => undefined;
  const app = getPlugins()?.App;
  if (!app?.addListener) return () => undefined;

  const handles: Array<{ remove: () => Promise<void> }> = [];
  let active = true;

  const parseInternalTarget = (rawUrl: string): string | null => {
    try {
      if (rawUrl.startsWith("gruenderx://")) {
        const stripped = rawUrl.replace(/^gruenderx:\/\//i, "");
        return stripped.startsWith("/") ? stripped : `/${stripped}`;
      }
      const parsed = new URL(rawUrl);
      if (parsed.hostname === "gruenderx.de" || parsed.hostname === "www.gruenderx.de") {
        return `${parsed.pathname || "/"}${parsed.search}${parsed.hash}`;
      }
    } catch {
      return null;
    }
    return null;
  };

  void app
    .addListener("appUrlOpen", (event) => {
      if (!active || !event.url) return;
      const target = parseInternalTarget(event.url);
      if (target) {
        hapticLight();
        navigate(target);
      }
    })
    .then((h) => {
      if (active) handles.push(h);
      else void h.remove();
    });

  void app
    .addListener("appStateChange", (state) => {
      if (active && state.isActive) {
        initIosApp();
      }
    })
    .then((h) => {
      if (active) handles.push(h);
      else void h.remove();
    });

  return () => {
    active = false;
    handles.forEach((h) => void h.remove());
  };
}

export function reloadIosApp(): void {
  hapticLight();
  window.location.reload();
}
