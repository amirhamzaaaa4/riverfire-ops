# Requirements traceability

Source: sanitized Taiga snapshot. New demo scope is assessed separately from original statuses.

| Source ID | Source requirement | Recorded status | Portfolio coverage and gap |
| --- | --- | --- | --- |
| US-6 | Real-time crowd monitoring | Ready for test | Synthetic counts, occupancy classification and scenario updates. No real sensor feed. |
| US-9 | System integration testing | In progress | Model tests and CI. No complete integration, security or load certification. |
| US-7 | Emergency alert notifications | New | Local incident capture and history. No broadcast or delivery receipts. |
| US-23 | Emergency evacuation guidance | In progress | Excluded. No real evacuation instructions or routes. |
| US-40 | Visitor check-in analytics | New | Excluded. Attendance summary is not check-in analytics. |
| US-8 | Emergency communication dashboard | In progress | Local incident log and acknowledgement. No secure multi-user communications. |
| US-22 | Crowd heatmap visualization | New | Schematic occupancy markers. No geospatial density heatmap. |

## Acceptance evidence

Full source acceptance criteria remain in `data/coursework.json` and `data/user_stories.csv`. Refresh means a three-second synthetic timer in this demo. Tests verify threshold boundaries, deterministic snapshots, stale data, incident validation, immutable acknowledgement and CSV escaping. Browser acceptance results are recorded separately. No acceptance claim is made for actual notifications, traffic scalability, authenticated access, security certification or production approval.
