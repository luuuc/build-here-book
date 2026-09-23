---
layout: chapter
title: "Write down what broke"
part: "Systems"
order: 706
card_type: pratique
metadata:
  principle: "7.06"
  reading_time_in_minutes: 2
categories:
  - trace
  - postmortem
  - incident
  - apprentissage
traductions:
  fr: /book/chapters/07-06-ecris-ce-qui-a-casse.html
seo:
  description: "Keep the facts, the assumptions and the next step of an incident in a suitable record, without requiring a public write-up or unpaid evening work."
  keywords: "build here, record, postmortem, builder, incident"
---

## The starting point

An incident is under control, or an attempt has failed. The messages exist, but the reasoning, the useful facts and the open questions are hard to find again.

## The move

Prepare a short account, reachable by the people who need it, once the emergency is handled and the time is planned.

## Why it works

A record can hold the timeline, the assumptions examined, the actions and their effects. A retrospective, a report, or a postmortem can all do that job. The name of the document matters less than whether it helps a future decision, and no single method has a monopoly on keeping what was learned.

A file stalled between two teams because each was waiting for a different confirmation. The account describes what was visible from each side, how the blockage was understood, and which handover agreement was changed. It separates established facts from causes still possible. You do not have to find a personal error in order to learn.

The readers may be whoever takes over, the team, or you later. A maintained internal document is a valid way of passing something on. A public write-up can widen the reach when it is useful and authorised, but removing a name or changing a number is not enough to make a sequence shareable. Check the content with the people responsible; keep a restricted version if you need to.

Writing takes time, sometimes after a draining episode. Agree a reasonable effort, and avoid the injunction to publish the same evening. Someone starting out can help reconstruct a case with a peer. If you are growing a team, protect the ability to report and examine a difficulty: see [⇄ If being wrong costs status, nobody will be wrong out loud](/book/en/chapters/01-10-if-being-wrong-costs-status-nobody-will-be-wrong-out-loud.html).

## Try this

Choose an event whose record would help something real that follows. Write:

> What happened and what is still uncertain: ...
> What we thought at the time and the checks we made: ...
> The actions, their effects, and the limits we met: ...
> The next step decided, its owner, and how it gets checked: ...

Have the facts read by the people concerned, and choose a place that matches the sharing rights. At the agreed moment, check whether the action decided was carried out and useful. A note published or filed does not on its own close the loop.

## From where you sit

- **Product**: keep the assumptions and the observations, not only the conclusion.
- **Operations**: say what made it possible to restore or preserve the service.
- **Management**: plan the review time and a level of sharing that suits the content.
- **Customer relations**: bring the shareable facts about the consequences for people.

## To discuss

Which account would help a coming decision, and who has to be able to find it?
