---
layout: chapter
title: "Sort them by cause, not by subject"
part: "Leverage"
order: 801
card_type: diagnostic
metadata:
  principle: "8.01"
  reading_time_in_minutes: 2
categories:
  - levier
  - impact
  - client
traductions:
  fr: /livre/chapitres/08-01-range-les-par-cause-pas-par-sujet.html
seo:
  description: "Sorting by subject tells you where requests arrive, sorting by cause tells you what to fix. One shared cause, one move."
  keywords: "build here, builder, leverage, grouping, assumption, cause"
redirect_from:
  - /book/chapters/08-01-group-the-cases-then-check-the-causes.html
---

## The symptom

You handle requests one at a time. Some reasons keep coming back, but you file them by subject: payment, account, delivery.

## The signal

File them by cause. A shared cause means one move fixes several problems.

## What's going on

Sorting by subject tells you where requests arrive. Sorting by cause tells you what to fix. "Payment", "invoice" and "refund" can all come from the same cause: a confirmation message that never arrives. One fix, three categories emptied.

Several messages are about a payment that shows up twice. The symptom is the same. The cause could be two transactions, two displays, or something else. Check a few cases before you choose. "Customer misunderstood" in a column is not a cause, it is a guess.

An AI can group a month of requests by likely cause in minutes. Use it to get started, then check each group against real cases. Keep the cases that fit nowhere to one side: they are often the most instructive.

Do not look at volume alone. A rare but serious cause comes before a frequent, harmless one.

## Check this

Take one month of requests. For each, note the symptom and the assumed cause.

Group them by cause, and check the biggest group on five real cases. If it holds, fix it.

At the next check-in, see whether the related requests went down, relative to the number of users.

## From where you sit

- **Support**: bring the context of the requests, and separate what you saw from how you read it.
- **Product**: compare frequency, severity, and what a check is worth.
- **Engineering**: look for a case that confirms or contradicts the proposed cause.
- **Management**: set an analysis effort proportionate to the decision expected.

## To discuss

Which group of cases deserves a check, and what do we actually know about its cause?
