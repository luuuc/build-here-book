---
layout: chapter
title: "Signing off a spec does not make it right"
part: "Delivery"
order: 504
card_type: diagnostic
metadata:
  principle: "5.04"
  reading_time_in_minutes: 2
categories:
  - produit
  - client
  - arbitrage
translations:
  fr: /livre/chapitres/05-04-valider-une-spec-ne-la-rend-pas-juste.html
seo:
  description: "A signed-off spec is an agreement about what people believed. When reality contradicts it, say so and update it."
  keywords: "build here, product, builder, spec, sign-off"
---

## The symptom

A document describes the expected result and the constraints. It has been signed off. A new observation contradicts one of its assumptions.

## The signal

Separate what is required, what was verified, and what is still assumed. Then take the contradiction to whoever signed it off.

## What's going on

A signed-off specification is an agreement about what people believed when they signed it. It does not make the assumptions true. Building and use test them, and some fall.

A document specifies a choice of time slot for sign-up. The team assumes it will make signing up easier. At the first trial, some people do not understand the times offered. The spec is signed off. It is also wrong on that point. The answer can be a better explanation or a different choice, but not silence.

Not everything is an assumption. Some requirements come from a commitment, a legal obligation or an operating constraint. Contrary feedback does not cancel them. Tell the two apart before you propose a change.

Do not diverge quietly. Bring the facts and the options to whoever signed off, and get the document updated. A document that does not follow reality becomes a source of mistakes for the next person.

## Check this

In a working document, add the assumption that matters most:

> We assume that ...
> We will check it by ...
> If it does not hold, we will ...

When the feedback comes, update the document, whether the assumption held or not.

## From where you sit

- **Engineering**: report a reproducible case and what it means for the scope.
- **Product**: tell an assumption about use apart from a requirement to respect.
- **Management**: say who can accept a change, and answer fast.
- **Customer relations**: bring the context of the feedback without generalising it to every customer.

## To discuss

Which assumption in a document deserves checking, and which requirement has to be understood first?
