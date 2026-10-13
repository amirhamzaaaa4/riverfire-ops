# ICT delivery case study

## Context and objective

The coursework models ICT delivery for Brisbane Riverfire 2026: visitor access, digital engagement, crowd monitoring and emergency communication. Riverfire Ops narrows the portfolio implementation to crowd operations so a reviewer can inspect an end-to-end slice.

## Evidence available

The milestone and written reports describe Microsoft Project scheduling and resources, seven major work packages and two Agile sprints. The presentation describes a hybrid approach. The Taiga snapshot contains four epics, seven stories, twenty tasks and eight issues. An individual reflection describes learning in planning, time management and risk management,.

## Delivery approach

Predictive planning handles infrastructure, compliance and deployment dependencies. Agile work organises dashboard requirements into stories, tasks and defects. This split tracks dependencies while accommodating software changes. The portfolio adds a working simulation without implying that coursework status records prove production delivery.

## Portfolio implementation decisions

| Decision | Reason | Tradeoff |
| --- | --- | --- |
| Focus on crowd operations | Makes one ICT workstream demonstrable | Ticketing and streaming remain outside the demo |
| Native browser modules | Small app without installation dependencies | No server-side application API |
| Deterministic scenarios | Reviewers reproduce surge and outage behaviour | Does not model real crowd dynamics |
| Unknown state for stale data | Missing readings cannot appear safe | Uncertainty requires operator review |
| In-memory incident log | Demonstrates workflow without collecting personal data | No durable audit record or multi-user coordination |
| Source statuses retained | Keeps evidence inspectable | Coursework inconsistencies remain visible |

## Supported outcomes

The materials support an academic ICT planning case study and a Taiga backlog. The new repository demonstrates a runnable portfolio prototype with model tests. There is no verified real-event deployment, budget saving, response-time improvement or crowd-safety outcome.

## Lessons

Acceptance criteria should distinguish dashboard visibility from actual message delivery. Stale data needs a separate state. A sprint review narrative should reconcile with the board snapshot. Release gates should require measurable evidence rather than a status label alone.
