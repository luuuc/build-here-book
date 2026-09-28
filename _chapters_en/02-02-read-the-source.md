---
layout: chapter
title: "Read the source"
part: "The craft"
order: 202
card_type: pratique
metadata:
  principle: "2.02"
  reading_time_in_minutes: 2
categories:
  - engineering
  - simplicite
  - technique
traductions:
  fr: /livre/chapitres/02-02-lis-le-code-source.html
seo:
  description: "When a dependency surprises you, its source can explain the behaviour. Check the version, the context, and one precise case."
  keywords: "build here, engineering, builder, source code"
---

## The starting point

A software library behaves differently from what you expected. The documentation and the examples you found do not explain your case yet.

## The move

Open the implementation for the version you are running and find the function involved.

## Why it works

When the code is reachable, it can show you a rule the documentation summarises: a default timeout, a condition on a value, or how a cache key gets built. That reading turns a guess into an assumption you can test.

The file has to match what is actually running. Another version, a different configuration or a remote service can explain the gap. Code alone does not always tell you the conditions it runs under.

You do not need to read the whole project. Start from one entry point and follow it to the behaviour you care about. If you are starting out, ask someone to walk that function with you. A short session can teach you where to look and which words to search for next.

Outside software, the neighbouring move is going back to the document that sets the rule: a procedure, a formula, or the terms of a service. If the source is closed or outside your access, ask the vendor for a reproducible example or an explanation. Reading code is not a condition for being a builder.

## Try this

Take one precise behaviour and write down what you expected. Spend fifteen minutes in whatever source is available, then write an assumption and the place that supports it.

Check it in a suitable environment, with a small example or with someone competent. If you cannot conclude, pass on what you looked at and the question that remains. By the end, you should be able to tell what the source shows from what you are still assuming.

## From where you sit

- **Engineering**: keep the version and the case that let someone reproduce the observation.
- **Product**: ask what the technical behaviour means for use.
- **Management**: plan for reading help for the people meeting the system for the first time.

## To discuss

Which recent behaviour did we understand better by going back to its source, and how did we check it?
