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
traductions:
  fr: /livre/chapitres/05-04-valider-une-spec-ne-la-rend-pas-juste.html
seo:
  description: "Tell requirements apart from assumptions in a specification, then have new facts examined before changing the agreed work."
  keywords: "build here, product, builder, spec, sign-off"
---

## The symptom

A document describes the expected result and the constraints. It has been signed off, but a new observation seems to contradict one of its assumptions.

## The signal

Separate what is required, what was verified, and what is still assumed. Have the contradiction examined before you change the agreed work.

## What's going on

A specification helps coordinate work and keep decisions. Reviewing it can bring new knowledge: a forgotten constraint, a use case, an extra check. Sign-off does not, however, guarantee that every assumption will survive building and use.

Not everything is a matter of preference. Some requirements correspond to a commitment, a protection, or an operating constraint. They do not disappear because one attempt produced different feedback. You have to understand their reason and identify who can authorise a change.

A document specifies a choice of time slot. The team assumes it will make signing up easier. A first attempt shows that some people do not understand the times offered. That feedback may call for a better explanation, another choice, or more observation; it is not enough to conclude that nobody wants a choice.

A discovery does not grant a right to diverge quietly. Present the facts, their reach, and the options to whoever owns the remit. For a shared document or an external commitment, have the change and its consequences for the deadline and the cost confirmed. Someone starting out can bring a precise case without having to resolve the whole contradiction alone.

## Check this

In a working document, add an assumption that matters to the decision:

> We assume that ...
> We will check it by ...
> If what we observe contradicts that, we will examine ... with ...

Choose a proportionate check and say what its limits are. A qualitative observation can be enough to reveal a difficulty; a numeric threshold needs a reason and a context.

When the feedback comes, note what was learned and have the decision updated if needed. An assumption that was confirmed is worth keeping too.

## From where you sit

- **Engineering**: report a reproducible case and what it means for the scope.
- **Product**: tell an assumption about use apart from a requirement to respect.
- **Management**: say who can accept a change and inform the parties concerned.
- **Customer relations**: bring the context of the feedback without generalising it to every customer.

## To discuss

Which assumption in a document deserves checking, and which requirement has to be understood first?
