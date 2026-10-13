# Verification

Run `npm test`. Six model tests check threshold boundaries, stale readings, invalid data, deterministic scenarios, incident validation, immutable acknowledgement and CSV escaping. CI runs on pushes and pull requests.

## Browser acceptance checklist

- Four zone markers display and can be selected.
- Surge makes South Bank critical.
- Outage makes Kangaroo Point unknown and excludes its count.
- Pause freezes the tick until resumed.
- Incident entry, acknowledgement and CSV export work.
- HTML in messages appears as text.
- Reset returns the initial scenario, selection, tick and log.
- Delivery board includes all seven source stories.
- Mobile workflows remain usable without document overflow.

Performed browser checks are recorded in `verification-results.json`. These checks do not validate real sensors, broadcasts, load scalability, safety or compliance.
