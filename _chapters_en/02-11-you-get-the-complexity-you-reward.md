---
layout: chapter
title: "⇄ You get the complexity you reward"
part: "The craft"
order: 211
card_type: systeme
metadata:
  principle: "2.11"
  reading_time_in_minutes: 2
categories:
  - engineering
  - simplicite
  - technique
traductions:
  fr: /book/chapters/02-11-leader-tu-recoltes-la-complexite-que-tu-recompenses.html
seo:
  description: "Give simplifications and investigations a place in the review, with the effect observed and its limits."
  keywords: "build here, engineering, builder, conditions, complexity, reward"
---

## What you are asking for

> "What did we ship this week?"

The question makes additions visible. A simplification or an investigation can find less room in the answer.

## What the system hears

> "How do I show the value of work that takes something away, or avoids a difficulty?"

## What that produces

A new feature shows itself easily. Removing an approval step that has become useless, clarifying a calculation, or dropping a dependency means explaining what gets simpler and what stays protected.

If reviews only show additions, people may give priority to work whose result they know how to tell. The frame for recognition can be widened without assuming all the past work was badly chosen.

Simplification is not a goal to count on its own. Removing code, checks or steps can move a load onto support or raise a risk. A useful reduction has to be tied to an effect: less waiting, a more reliable operation, easier maintenance, or reasoning that is better understood.

Investigative work can also end without a removal. Discovering that a step still protects an important case is useful information. The review has to let someone explain that, with the limits of what was checked.

## The decision

At the next review, ask for one example of a simplification or an avoided risk alongside the deliveries. Have people say what changed, for whom, and on what facts the claimed benefit rests.

For an investigation, plan a slot and name the work it displaces. Involve someone who will have to use or maintain the result. Pick a date to look at whether the improvement holds and whether a load was transferred elsewhere.

After a few reviews, ask the team whether this work is easier to propose and to explain. Adjust the format without creating a quota of removals.

## From where you sit

- **Engineering**: explain what a removed dependency changes for maintaining the system.
- **Operations**: check that the deleted step is not pushing a verification onto someone else.
- **Management**: also recognise the inquiry that shows why to keep what exists.

## To discuss

Which piece of work recently made a task simpler or more reliable, and how did we recognise it?
