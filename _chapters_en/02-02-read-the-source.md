---
layout: chapter
title: "Go back to the source"
part: "The craft"
order: 202
card_type: practice
metadata:
  principle: "2.02"
  reading_time_in_minutes: 2
categories:
  - engineering
  - simplicite
  - technique
translations:
  fr: /livre/chapitres/02-02-lis-le-code-source.html
seo:
  description: "The documentation summarises, the source decides. Go back to the code, the contract or the formula, with an AI if it helps you read."
  keywords: "build here, engineering, builder, source code"
---

## The starting point

A software library behaves differently from what you expected. The documentation and the examples you found do not explain your case.

## The move

Open the source for the version you are running and find the function involved. An AI can guide you through it.

## Why it works

The documentation summarises. The source decides. A default timeout, a condition on a value, a calculation rule: the source shows what actually happens, where the documentation says what should happen.

You do not need to read the whole project. Start from one entry point and follow it to the behaviour you care about. Today, an AI can read the code with you, explain a function line by line, and tell you where to look next. Just check it is the right version: another version's code, or a different configuration, often explains the gap.

Outside software, the move is the same: go back to the document that sets the rule. The vendor's terms, the spreadsheet formula, the text of the procedure, the contract. What people tell you about the rule and the rule itself are two different things.

Every time you go back to the source, you win twice: you solve your case, and you know where to look next time.

## Try this

Take one precise behaviour that surprises you and write down what you expected. Give yourself fifteen minutes in the source, alone or with an AI.

Write down what you found and the exact place that shows it. Test it on a small example. If you cannot conclude, pass on what you looked at and the question that remains.

## From where you sit

- **Engineering**: keep the version and the case that let someone reproduce the observation.
- **Product**: ask what the technical behaviour means for use.
- **Finance**: go back to the spreadsheet formula before disputing a figure.
- **Management**: have newcomers walk the source with someone who knows it.

## To discuss

Which recent behaviour did we understand better by going back to its source, and how did we check it?
