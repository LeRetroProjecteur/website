// TEMPORARY: test route to check how iOS Chrome / in-app browsers handle a
// served .ics file. To be removed.
export function GET() {
  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Le Retro Projecteur//FR",
    "BEGIN:VEVENT",
    "UID:ics-test@leretroprojecteur.com",
    "DTSTAMP:20261028T120000Z",
    "DTSTART:20261105T190000Z",
    "DTEND:20261105T211500Z",
    "SUMMARY:Test séance (Le Champo)",
    "LOCATION:Le Champo",
    "DESCRIPTION:https://leretroprojecteur.com",
    "END:VEVENT",
    "END:VCALENDAR",
    "",
  ].join("\r\n");
  return new Response(ics, {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": 'inline; filename="seance.ics"',
    },
  });
}
