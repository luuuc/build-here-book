---
layout: chapter
title: "Making it simple is a technical achievement"
part: "The craft"
order: 201
card_type: principe
action_scope: "Scope: yourself, or a team agreement"
metadata:
  principle: "2.01"
  reading_time_in_minutes: 2
categories:
  - engineering
  - simplicite
  - technique
traductions:
  fr: /livre/chapitres/02-01-faire-simple-est-une-performance-technique.html
seo:
  description: "Simplifying means understanding what you take away, checking the uses affected, and keeping a way back."
  keywords: "build here, engineering, builder, simple, simplicity"
---

## The reflex

A solution piles up options to cover every case imagined. Each one looks reasonable when you look at it alone.

## The builder's reflex

> "What do people actually need here, and which part adds cost without helping them?"

## Why

Simplifying means understanding what you take away. A form can lose a useless field and get easier to fill in. It can also lose the information somebody else needs to process the file.

In code, a shorter version can be more readable, but the number of lines does not settle quality. A rare case can be protecting an important operation. The absence of that case from the observations you have does not prove it will never happen.

The simple version can come from knowing the need better, or from a remit deliberately kept narrow from the start. A beginner can propose a useful simplification; a more experienced colleague can help them check the consequences they cannot see yet.

What is at stake is keeping what makes the work right while cutting what makes it harder. That holds for a screen, a procedure, a report or an architecture. A removal therefore deserves the same questions as an addition: who is affected, what changes, and how do you go back if the assumption is wrong?

## Try this

Pick a part you understand well enough to explain what it does. Write down what you would like to remove and what that part makes possible today.

Ask for feedback from someone who uses it or depends on it. If the change is authorised and reversible, try it on a limited remit, with a way to restore what was there. Otherwise, start with a mockup or a working copy.

After an agreed cycle of use, look at whether the task got easier and whether a need was lost. Keep, adapt or undo the simplification according to what you see.

## From where you sit

- **Product**: examine the uses a removal affects, with the people concerned.
- **Operations**: check the information the step passes to the next one.
- **Management**: leave time to check a removal, even when it produces little visible novelty.

## To discuss

Which recent simplification reduced the effort while keeping the service intact?

*Check it elsewhere:* Rich Hickey examines the distinction between simple and easy in *Simple Made Easy*, cited in *[Already written](/already-written/)*.
