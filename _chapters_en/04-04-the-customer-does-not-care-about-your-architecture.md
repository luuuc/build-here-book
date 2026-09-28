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
  description: "Explain what the technical work is for and what evidence you have, with the detail the reader's decision needs."
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

Time recovered, a risk reduced, or reliability preserved make technical work easier to read. Some people also need the architecture detail, to examine security, integration or maintenance. Fit the explanation to their decision.

Invisible technical work counts, and it is what makes the rest possible. It gains from being explained to the people who use it, maintain it, or fund it. A team that struggles to explain what its work is for can run into difficulty at budget time. What is often missing is an explicit link between the effort and its expected effect. That link helps you argue for the means you need, even when the result is barely visible.

Some projects mean describing reliability preserved or a risk reduced. Key rotation. An audit trail. The retry logic behind payments. No feature at the end of it. The sentence exists all the same, it simply describes something that stops happening. "A failed payment used to disappear quietly, and the seller found out from the customer." That holds up in a budget meeting. If the benefit is still uncertain, name the assumption and how to check it. An exploratory piece of work can be useful precisely to reduce that uncertainty.

## Try this

Pick one piece of work and write the before and the after for its recipient. If you are starting out, do it with someone who knows the context. Outside software, apply the move to a procedure or a tool. Separate an effect already observed from a benefit expected.
> Before: the seller waited until closing to know whether they had been paid.
> After: they see it arrive.

Ask someone affected to say the benefit and its limits back to you. Add whatever detail their questions call for. After the attempt, or at the planned review, check the announced effect with them; an interested reaction is not proof of it.

## From where you sit

- **Product**: state the expected benefit, or the uncertainty the work sets out to reduce.
- **Founder**: look at reliability preserved and risks reduced too.
- **Management**: ask for the expected effect and how it will be observed before funding it.
- **Customer relations**: check what can be announced and what is still to be confirmed.
- **Recruiting**: ask what a piece of work was for and how its effect was checked.

## To discuss

On a current piece of work, which effect can we explain to its recipient, and which one is still to be checked?
