# Proposed RAID register

A portfolio extension derived from coursework concerns. Owners are proposed roles, not actual assignments. Likelihood and impact are qualitative planning judgements.

| ID | Type | Item | Likelihood / impact | Proposed owner | Control or decision | Escalation trigger |
| --- | --- | --- | --- | --- | --- | --- |
| R01 | Risk | Notification timeout during peak traffic | High / high | Backend lead | Queue, retries, receipts and load tests | Missed delivery target agreed with safety lead |
| R02 | Risk | Crowd count synchronisation error | Medium / high | Data engineer | Timestamp validation and reconciliation | Divergent counts or stale feed |
| R03 | Risk | Mobile layout hides alerts | Medium / high | Frontend lead | Mobile and keyboard acceptance checks | Critical message clipped or unreachable |
| R04 | Risk | High server resource usage | High / high | Platform lead | Capacity model and measured load tests | Capacity headroom below agreed margin |
| A01 | Assumption | Reliable event network available | Unconfirmed | Network lead | Coverage and failover evidence | Failed site coverage test |
| A02 | Assumption | Counts sufficiently accurate | Unconfirmed | Safety lead | Agree tolerance and calibration | Calibration fails or tolerance undefined |
| I01 | Issue | Completion narrative differs from source statuses | Observed | Project coordinator | Reconcile sprint reviews with dated export | Release review lacks consistent evidence |
| I02 | Issue | Binary MPP schedule not recalculated | Observed | Scheduler | Export task and resource tables | Baseline approval lacks independent evidence |
| D01 | Dependency | Approved capacities and response procedures | Required for real use | Safety lead | Authorised policy and sign-off | Policy unavailable before UAT |
| D02 | Dependency | Delivery provider and receipts | Required for real use | Integration lead | Define API contract and failure handling | Provider contract unvalidated |

Eight original issue records remain in `data/issues.csv`, with recorded priority, severity and type. These proposed mitigations do not mean the source defects have been resolved.
