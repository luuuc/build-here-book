---
layout: chapter
title: "Write down what broke"
part: "Systems"
order: 706
card_type: practice
metadata:
  principle: "7.06"
  reading_time_in_minutes: 2
categories:
  - trace
  - postmortem
  - incident
  - apprentissage
translations:
  fr: /livre/chapitres/07-06-ecris-ce-qui-a-casse.html
seo:
  description: "With no record, the same incident comes back. Write one page within the week, and publish it when it can help others."
  keywords: "build here, record, postmortem, builder, incident"
---

## The starting point

An incident is sorted or an attempt has failed. The messages exist, but the reasoning and the lessons are scattered across them.

## The move

Write a short account within the week: what happened, what we understood, what we are changing.

## Why it works

With no record, the same incident comes back and the team rediscovers it. With one page, the next person knows what was tried, what worked and what was changed.

A file stalled between two teams because each was waiting for a different confirmation. The account describes what each side saw, how the blockage was understood, and which handover agreement changed. Nobody is named as the culprit. The mechanism is fixed.

An AI can rebuild the timeline from the messages and tickets in minutes. Keep your time for what it does not know: why people believed what they believed, and what is changing.

Share it with the people who need it: the team, whoever takes over, the teams next door. When the story can help others, publish it, leaving out what is not yours to share. Much of what people know about outages comes from accounts other teams published.

## Try this

Choose a recent incident or failure. Write one page:

> What happened and what is still uncertain: ...
> What we thought at the time and the checks we made: ...
> The actions, their effects, and the limits we met: ...
> What we are changing, who handles it, and how we check it: ...

Have the facts read by the people concerned. At the agreed moment, check that the action decided was carried out.

## From where you sit

- **Product**: keep the assumptions and the observations, not only the conclusion.
- **Operations**: say what made it possible to restore or preserve the service.
- **Management**: plan the time to write it, in the week that follows.
- **Customer relations**: bring the facts about the consequences for customers.

## To discuss

Which account would help a coming decision, and who has to be able to find it?
