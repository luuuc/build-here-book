---
layout: chapter
title: "Leverage in the wrong place multiplies the mistake"
part: "Leverage"
order: 804
card_type: diagnostic
metadata:
  principle: "8.04"
  reading_time_in_minutes: 2
categories:
  - levier
  - impact
  - risque
traductions:
  fr: /book/chapters/08-04-un-levier-mal-place-multiplie-lerreur.html
seo:
  description: "Check the exceptions, the protections, the stop and the upkeep before amplifying work; no small sample guarantees quality on its own."
  keywords: "build here, leverage, automation, mistake, builder"
---

## The symptom

A task works in several cases and the team is thinking of automating it or spreading it further. The exceptions and the current controls are barely described.

## The signal

Before you widen the reach, examine what can go wrong, how it gets detected, and who will be able to stop or take the work back.

## What's going on

An automation can repeat a mistake at scale. A manual practice can let mistakes through too, sometimes for a long time. So the choice is not careful human against blind machine: you have to understand the controls in each solution and the consequences of a failure.

Some checks are implicit in the work. A person notices an unusual amount or a situation that calls for different handling. Describe those decisions with them before changing the flow. A rule, a human approval, or separate handling of the exceptions may be necessary to keep the protection.

A team wants to send file reminders automatically. They check the ordinary cases, but also closed files, changed contact details, and people who must not be contacted again. A small random sample can miss those. Which checks you need depends on how varied the situations are and on how bad a mistake would be, with no guarantee attached to the number ten.

Putting it in place also needs an owner, monitoring time, and a way to recover. If those means are not available, keeping part of it manual, or giving up, can be the better call. For someone starting out, a simulation on cases prepared with a peer lets them learn without firing a real action across a whole service.

## Check this

Before the attempt, note the expected results, the known exceptions, and the protections needed. Get the scope and the agreements confirmed by the people responsible for the service.

Start in a bounded frame where the results can be examined before they take effect. Choose varied cases, including ones that could invalidate the rule. For serious consequences, ask for the checks that fit rather than trusting a sample alone.

If the attempt is kept, plan the error signals, who receives them, how to stop, and how to handle effects already produced. Re-examine quality, checking load, and usefulness when the conditions change.

## From where you sit

- **Engineering**: prepare the controls, the stop, and the recovery before widening use.
- **Operations**: spell out the exceptions the current practice already handles.
- **Management**: allocate the means to monitor, not only to build.
- **Customer relations**: plan a route back to someone who can act.

## To discuss

Which control might we lose by automating, and how will we know it is time to stop?
