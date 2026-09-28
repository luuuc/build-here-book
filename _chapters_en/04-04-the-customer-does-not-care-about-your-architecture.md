---
layout: chapter
title: "The customer does not care about your architecture"
part: "Understanding"
order: 404
card_type: principe
metadata:
  principle: "4.04"
  reading_time_in_minutes: 2
categories:
  - produit
  - client
  - arbitrage
traductions:
  fr: /livre/chapitres/04-04-le-client-ne-sinteresse-pas-a-ton-architecture.html
seo:
  description: "The customer pays for what your work changes for them. Start with the before and the after, the technical detail comes later."
  keywords: "build here, builder, architecture, usefulness, maintenance, effects"
redirect_from:
  - /book/chapters/04-04-tie-the-architecture-to-what-it-makes-possible.html
---

## The reflex

The demo opens on the migration. New service, new database, the diagram with the boxes and the arrows.

Across the table, the customer waits politely for the part that concerns them.

## The builder's reflex

> "Here's what changes for you, and here's what lets us say so."

## Why

The customer does not pay for your architecture. They pay for what it changes for them: time recovered, a risk gone, a service that holds. Start with that. The technical detail comes after, for the people who need it to decide: security, integration, maintenance.

Invisible technical work counts as much as the rest. It is what holds everything else up. But a team that cannot say what it is for loses at budget time. Tie every effort to its effect.

Some projects deliver no feature at all. Key rotation. An audit trail. The retry logic behind payments. The sentence exists all the same, it describes what stops happening: "A failed payment used to disappear quietly, and the seller found out from the customer." That holds up in a budget meeting.

The same move holds outside software: a new procedure, a new accounting tool, a reorganisation. Say what changes for the person across the table.

## Try this

Pick one piece of work and write the before and the after for its recipient.

> Before: the seller waited until closing to know whether they had been paid.
> After: they see it arrive.

Have someone affected say the benefit back to you. If they cannot, your sentence is not there yet. After delivery, check the announced effect with them.

## From where you sit

- **Product**: state the expected benefit, or the uncertainty the work sets out to reduce.
- **Founder**: look at reliability preserved and risks reduced too.
- **Management**: ask for the expected effect before funding it.
- **Customer relations**: check what can be announced and what is still to be confirmed.
- **Recruiting**: ask what a piece of work was for and how its effect was checked.

## To discuss

On a current piece of work, which effect can we explain to its recipient, and which one is still to be checked?
