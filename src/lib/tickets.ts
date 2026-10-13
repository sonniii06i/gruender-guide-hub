/**
 * Rueckfragen nur zu laufenden Tickets. Eine Nachricht auf ein geloestes oder
 * geschlossenes Ticket landet zwar in ticket_messages, oeffnet das Ticket aber
 * erst mit dem Trigger tg_ticket_messages_folgen (noch nicht ausgerollt) wieder
 * -- bis dahin saehe sie niemand. Dafuer gibt es "Neues Ticket".
 */
export const ticketNimmtAntwortenAn = (status: string | null | undefined): boolean =>
  status === "open" || status === "in_progress";
