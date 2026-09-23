/* The English content of the test: questions, steps, bands and the words of
   the line of work. The rules live in test-builder-model.js and are written
   once; this file is the twin of test-builder-contenu.js and carries exactly
   the same keys.

   Five questions per step, with no fixed time window:
   - habits tied to a moment ("when you're given a task, you usually…"), with
     four moves that all sound reasonable;
   - checkable scales ("do you know what it costs…", "if you left for two
     weeks…");
   - five "when did you last" in the whole test, for rare acts;
   - one "the last time": what you did, not what you think;
   - one situation: what is better to do.
   Options are worth 0 to 3, in the order written here. The interface shuffles
   the display order of habits, "last time" and situation options.

   Writing: short sentences, everyday words, one idea per question. Someone
   who has never read the book must understand.

   Nothing here goes anywhere: the test never leaves the page. */
(function (scope) {
  "use strict";
  const q = (capabilityId, n, kind, text, options) => ({
    id: `${capabilityId}-${n}`, capabilityId, kind, text,
    options: options && options.map((label, value) => ({ id: String(value), label, value }))
  });
  // "When did you last": from most recent to oldest.
  const recence = [["This week", 3], ["This month", 2], ["This year", 1], ["Longer ago, or never", 0]]
    .map(([label, value]) => ({ id: String(value), label, value }));
  const horsEchelle = [
    { id: "unseen", label: "The situation didn't come up" },
    { id: "blocked", label: "My setting didn't allow it" }
  ];
  const questions = [
    q("mindset", 1, "habitude", "You have to follow a rule without knowing why it exists. Usually, you:", ["Apply it: it isn't your business.", "Complain about it when it gets in the way.", "Look into why, when you have time.", "Ask why it exists."]),
    q("mindset", 2, "habitude", "The last time a fact contradicted your idea, what did you do?", ["I defended my idea: one fact isn't enough.", "I waited to know more.", "I revised my idea, without saying so.", "I said I was wrong, and changed my mind."]),
    q("mindset", 3, "habitude", "Someone asks you a question and you don't know the answer. Usually, you:", ["Answer anyway, so as not to lose face.", "Give a careful, vague answer.", "Say you don't know.", "Say you don't know, and come back with the answer."]),
    q("mindset", 4, "derniere-fois", "The last time you saw something around you that wasn't working, what did you do?", [
      "Nothing, it wasn't my job to deal with it.",
      "I talked about it around me, nothing more.",
      "I told the person who could act on it.",
      "I took a first step to make it better."
    ]),
    q("mindset", 5, "situation", "In a meeting or a class, everyone uses a word you don't understand. What is better to do?", [
      "Say nothing, so you don't slow the group down.",
      "Look the word up later, on your own.",
      "Quietly ask the person next to you.",
      "Ask right away what the word means."
    ]),

    q("craft", 1, "echelle", "When you prepare an important piece of work, you usually show it:", ["Once it's finished, if someone asks.", "Once it's finished, before handing it in.", "Halfway, to someone you trust.", "Early, as soon as there is something to criticise."]),
    q("craft", 2, "habitude", "The last thing you learned in your craft, you learned it:", ["Because it was imposed on you.", "By chance, while working.", "In a training someone offered you.", "Because you went looking for it."]),
    q("craft", 3, "habitude", "Your work is acceptable, and nobody asks for more. Usually, you:", ["Hand it in as is: acceptable is enough.", "Hand it in, noting what could be better.", "Rework the details that show.", "Rework what matters, even if it doesn't show."]),
    q("craft", 4, "derniere-fois", "The last time someone criticised your work, what did you do?", [
      "I defended my work, the criticism was unfair.",
      "I listened and changed nothing.",
      "I fixed that piece of work as asked.",
      "I understood the mistake and changed how I work."
    ]),
    q("craft", 5, "situation", "You have done the same task for two years, and you do it well. What is better to do?", [
      "Carry on as you are, since it works.",
      "Wait for someone to offer you training.",
      "Switch tasks so you don't get bored.",
      "Look at how the best people do it, and compare."
    ]),

    q("autonomy", 1, "habitude", "When you're given a task, before starting, you usually:", ["Start: the request is clear.", "Reread the request so you miss nothing.", "Ask for the deadline and the expected format.", "Ask what it is meant to achieve."]),
    q("autonomy", 2, "habitude", "When you ask for help, you usually bring:", ["Your question, nothing more.", "What you've already tried.", "What you tried, and where you're stuck.", "The problem, your attempts, and what you suggest."]),
    q("autonomy", 3, "habitude", "A small decision falls to you, and the person who usually decides isn't there. You:", ["Wait for them to come back.", "Write to them, and wait for the answer.", "Decide, without necessarily saying so.", "Decide, then tell them what you chose."]),
    q("autonomy", 4, "derniere-fois", "The last time you were given an instruction that made no sense, what did you do?", [
      "I followed it and said nothing.",
      "I followed it, then grumbled about it.",
      "I pointed out the problem and waited for an answer.",
      "I explained the problem and suggested something else."
    ]),
    q("autonomy", 5, "situation", "You have been waiting a week for an answer you need to move on. What is better to do?", [
      "Wait: it isn't your job to chase it.",
      "Send the same message again.",
      "Work on something else in the meantime.",
      "Suggest a solution and a date to decide by."
    ]),

    q("understanding", 1, "recence", "When did you last talk directly with someone who uses what you make?"),
    q("understanding", 2, "echelle", "Do you know what the thing you work on costs or earns?", ["No, and it isn't my business.", "No, but I could ask.", "Roughly.", "Yes, and I know where the figure comes from."]),
    q("understanding", 3, "habitude", "Another team or trade seems slow or complicated to you. Usually, you:", ["Live with it: everyone has their job.", "Complain about it to your team.", "Ask what slows them down.", "Spend time with them, to see their work."]),
    q("understanding", 4, "derniere-fois", "The last time someone asked you for something precise, what did you do?", [
      "I did it exactly as asked.",
      "I did it and added my own ideas.",
      "I asked what it was meant to be for.",
      "I looked for the real problem, then chose what to do."
    ]),
    q("understanding", 5, "situation", "Someone who uses your work keeps complaining about the same problem. What is better to do?", [
      "Answer politely, it isn't your role.",
      "Pass the complaint on to whoever handles it.",
      "Note the complaints to bring up later.",
      "Talk to them to understand what they are trying to do."
    ]),

    q("delivery", 1, "echelle", "When you make something for others, they first see it:", ["When everything is finished.", "Almost finished, for a last review.", "Halfway through.", "At the first version that roughly works."]),
    q("delivery", 2, "recence", "When did you last finish something that someone really used?"),
    q("delivery", 3, "habitude", "Your project won't fit in the planned time. Usually, you:", ["Ship everything, even if the end is rushed.", "Work late to finish everything.", "Ask for more time, explaining why.", "Cut what can wait, to ship the essentials."]),
    q("delivery", 4, "derniere-fois", "The last time you started something new, how long before someone could try it?", [
      "Nobody has tried it yet.",
      "Several months.",
      "A few weeks.",
      "A few days."
    ]),
    q("delivery", 5, "situation", "Your project is almost ready, and the planned date is here. What is better to do?", [
      "Push the date back until everything is perfect.",
      "Ship everything on the date, even what isn't ready.",
      "Ship and let others find what is missing.",
      "Ship what is ready and useful, then the rest."
    ]),

    q("ownership", 1, "recence", "When did you last check, afterwards, whether finished work had really helped?"),
    q("ownership", 2, "habitude", "You see that work you promised will be late. Usually, you:", ["Speed up, hoping to make it.", "Say so if someone asks where you are.", "Warn people on the due date.", "Warn as soon as you know, with a new date."]),
    q("ownership", 3, "echelle", "What is the longest piece of work you carry through to the end without anyone checking where you are?", [
      "A few hours or a day.",
      "One or two weeks.",
      "One to three months.",
      "More than three months."
    ]),
    q("ownership", 4, "derniere-fois", "The last time work you were responsible for went wrong, what did you do?", [
      "I waited to see if anyone noticed.",
      "I explained that the cause lay elsewhere.",
      "I said so and fixed what I could.",
      "I said so, fixed it, then checked the fix held."
    ]),
    q("ownership", 5, "situation", "You finished a piece of work. You get a thank-you, then no news. What is better to do?", [
      "Nothing: it's done on your side.",
      "Wait for them to come back if there is a problem.",
      "Write straight away to ask if it's fine.",
      "Come back a month later to see what it changed."
    ]),

    q("systems", 1, "echelle", "If you left for two weeks without warning, what would happen?", ["Almost everything would wait for my return.", "Several things would wait.", "One or two decisions would wait.", "Nothing: everyone would know what to do."]),
    q("systems", 2, "habitude", "A regular meeting no longer serves much purpose. Usually, you:", ["Go: it's scheduled.", "Go, and do something else during it.", "Suggest making it shorter.", "Suggest cancelling it, or replacing it with something written."]),
    q("systems", 3, "habitude", "You are the only person who knows how to do a task. Usually, you:", ["Keep it: it's safer.", "Do it when asked.", "Write down how to do it.", "Teach it to someone, who does it in front of you."]),
    q("systems", 4, "derniere-fois", "The last time the same problem came back a second time, what did you do?", [
      "I fixed it the same way as the first time.",
      "I fixed it and warned the others.",
      "I wrote down how to fix it next time.",
      "I found its cause and removed it."
    ]),
    q("systems", 5, "situation", "Every Monday, you spend an hour rebuilding the same spreadsheet by hand. What is better to do?", [
      "Carry on: everyone is used to it.",
      "Note that it should be automated one day.",
      "Automate it on your own computer, for you.",
      "Check it is still used, before automating it."
    ]),

    q("leverage", 1, "recence", "When did someone last use something you made, without needing you?"),
    q("leverage", 2, "habitude", "Your week is full, and a new request arrives. Usually, you:", ["Say yes, and work more.", "Say yes, and warn it will take time.", "Ask what matters most.", "Suggest what you'll stop to make room for it."]),
    q("leverage", 3, "habitude", "Before creating a tool, a document or a method, you usually:", ["Dive in: you know what you need.", "Look for a template online.", "Ask around whether it exists.", "Look for what already exists here and could be reused."]),
    q("leverage", 4, "derniere-fois", "The last time you got a lot of requests that looked alike, what did you do?", [
      "I handled them one by one.",
      "I asked for help to keep up.",
      "I prepared a standard answer to go faster.",
      "I looked for their shared cause and dealt with it."
    ]),
    q("leverage", 5, "situation", "A new paid tool would save you two hours a week. What is better to do?", [
      "Buy it now: two hours is a lot.",
      "Change nothing: one more tool complicates everything.",
      "Let your manager decide for you.",
      "Compare the time saved with what it costs to keep up."
    ]),

    q("leadership", 1, "habitude", "Someone less experienced wants to try something you know is risky, but not serious. Usually, you:", ["Stop them, to spare them the mistake.", "Do it for them.", "Let them try, watching closely.", "Let them try, then talk it over together."]),
    q("leadership", 2, "habitude", "When you hand work to someone, you usually give:", ["The steps to follow, in order.", "The steps, and the expected result.", "The expected result, and your advice.", "The problem to solve, and why it matters."]),
    q("leadership", 3, "habitude", "When you review someone's work, you usually:", ["Fix it yourself: it's quicker.", "Point out the mistakes.", "Point out the mistakes, and suggest a fix.", "Explain what you checked, and why."]),
    q("leadership", 4, "derniere-fois", "The last time someone asked for help with a problem you knew how to fix, what did you do?", [
      "I fixed it myself, it was quicker.",
      "I gave them the answer to apply.",
      "I showed them how, step by step.",
      "I asked questions to help them find it."
    ]),
    q("leadership", 5, "situation", "Someone you work with suggests a solution that is worse than yours, but works. What is better to do?", [
      "Push your solution, since it is better.",
      "Let them go ahead and say nothing.",
      "Let them go ahead, then show them yours.",
      "Ask for their reasons, then let them decide."
    ]),

    q("reference", 1, "recence", "When did someone last tell you they had taken up one of your ways of working?"),
    q("reference", 2, "echelle", "When someone joins your team or group, they learn how you work:", ["By asking you questions as they go.", "By watching you work.", "By reading what you wrote, then asking you.", "From what you wrote, without needing you."]),
    q("reference", 3, "habitude", "An attempt you led didn't work. Usually, you:", ["Move on, without talking about it.", "Talk about it if someone asks.", "Tell your team about it.", "Write down what you learned, so others avoid it."]),
    q("reference", 4, "derniere-fois", "The last time someone asked you a question you knew the answer to well, what did you do?", [
      "I sent them to someone else.",
      "I answered quickly, out loud or in private.",
      "I answered in detail, with examples.",
      "I answered where others can read it again."
    ]),
    q("reference", 5, "situation", "You found a way of working that saves time. What is better to do?", [
      "Keep it to yourself: it's your edge.",
      "Talk about it if someone asks.",
      "Present it once in a meeting.",
      "Write it down with its limits, and share it."
    ])
  ];
  // Each question carries a move: a short phrase that serves as a strength,
  // a blocker and a box to tick in the result.
  const gestes = {
    "mindset-1": "Ask why a rule exists",
    "mindset-2": "Change your mind in the face of a fact, and say so",
    "mindset-3": "Say \"I don't know\", then come back with the answer",
    "mindset-4": "Take a first step when something isn't working",
    "mindset-5": "Ask right away about what you don't understand",
    "craft-1": "Show your work early, so it gets criticised",
    "craft-2": "Go looking yourself for what you want to learn",
    "craft-3": "Rework what matters, even when acceptable is enough",
    "craft-4": "Change how you work after criticism",
    "craft-5": "Look at how the best do it, and compare",
    "autonomy-1": "Ask what a task is for before starting it",
    "autonomy-2": "Ask for help with the problem and a proposal",
    "autonomy-3": "Decide at your level, then tell others",
    "autonomy-4": "Suggest something else when an instruction makes no sense",
    "autonomy-5": "Suggest a solution and a date to decide by",
    "understanding-1": "Talk with someone who uses what you make",
    "understanding-2": "Know what your work costs or earns",
    "understanding-3": "Spend time with another trade or team",
    "understanding-4": "Look for the real problem behind a request",
    "understanding-5": "Talk to the person complaining, to understand them",
    "delivery-1": "Show an unfinished version to someone who will use it",
    "delivery-2": "Finish something someone really uses",
    "delivery-3": "Cut what can wait to ship on time",
    "delivery-4": "Get something new tried within a few days",
    "delivery-5": "Ship what is ready and useful, then the rest",
    "ownership-1": "Check afterwards whether your work helped",
    "ownership-2": "Warn of a delay as soon as you know",
    "ownership-3": "Carry months of work without anyone checking on you",
    "ownership-4": "Fix a mistake, then check the fix holds",
    "ownership-5": "Come back a month later to see what your work changed",
    "systems-1": "Leave work that carries on without you",
    "systems-2": "Remove a meeting or step that no longer helps",
    "systems-3": "Pass on what nobody else knows how to do",
    "systems-4": "Remove the cause of a problem that keeps coming back",
    "systems-5": "Check a task is still used before automating it",
    "leverage-1": "Make things that serve without you",
    "leverage-2": "Choose what you stop when your week is full",
    "leverage-3": "Reuse what exists instead of starting from scratch",
    "leverage-4": "Look for the shared cause of similar requests",
    "leverage-5": "Compare the time saved with what a tool costs",
    "leadership-1": "Let someone try, then talk it over together",
    "leadership-2": "Hand over a problem rather than a list of tasks",
    "leadership-3": "Explain your reasoning when you review work",
    "leadership-4": "Ask questions to help someone find the answer",
    "leadership-5": "Hear the other person's reasons, then leave them the decision",
    "reference-1": "See others take up how you work",
    "reference-2": "Write down how you work so others learn without you",
    "reference-3": "Write down what a failure taught you, for others",
    "reference-4": "Answer where others can read it again",
    "reference-5": "Write down a good way of working, with its limits"
  };
  questions.forEach((question) => { question.geste = gestes[question.id]; });
  const capabilities = [
  {
    "id": "mindset",
    "name": "The mindset",
    "seed": "Pin down a useful question, and who can answer it or authorise what follows.",
    "cards": [
      {
        "title": "Ask the naive question straight away",
        "url": "/en/chapters/01-02-ask-the-naive-question-straight-away.html",
        "type": "pratique"
      },
      {
        "title": "Ownership starts where the job description stops",
        "url": "/en/chapters/01-03-ownership-starts-where-the-job-description-stops.html",
        "type": "principe"
      },
      {
        "title": "⇄ Nobody asks twice",
        "url": "/en/chapters/01-09-nobody-asks-twice.html",
        "type": "systeme"
      }
    ]
  },
  {
    "id": "craft",
    "name": "The craft",
    "seed": "Choose one detail of the craft to work on, and a source or a review you can reach.",
    "cards": [
      {
        "title": "Twelve years of experience, or the same year twelve times",
        "url": "/en/chapters/02-03-twelve-years-of-experience-or-the-same-year-twelve-times.html",
        "type": "diagnostic"
      },
      {
        "title": "Your craft has a literature",
        "url": "/en/chapters/02-04-your-craft-has-a-literature.html",
        "type": "principe"
      },
      {
        "title": "⇄ Learning on your own time is a filter you did not mean to set",
        "url": "/en/chapters/02-12-learning-on-your-own-time-is-a-filter-you-did-not-mean-to-set.html",
        "type": "systeme"
      }
    ]
  },
  {
    "id": "autonomy",
    "name": "Autonomy",
    "seed": "Write down the problem you are aiming at and the decision or information that is missing.",
    "cards": [
      {
        "title": "Do not bring the task. Bring the problem",
        "url": "/en/chapters/03-01-do-not-bring-the-task-bring-the-problem.html",
        "type": "pratique"
      },
      {
        "title": "Being stuck is a decision",
        "url": "/en/chapters/03-04-being-stuck-is-a-decision.html",
        "type": "diagnostic"
      },
      {
        "title": "⇄ You cannot ask for candor and keep the last word",
        "url": "/en/chapters/03-08-you-cannot-ask-for-candor-and-keep-the-last-word.html",
        "type": "systeme"
      }
    ]
  },
  {
    "id": "understanding",
    "name": "Understanding",
    "seed": "Reconstruct a real situation of use from feedback you can reach, then note one unknown.",
    "cards": [
      {
        "title": "Talk to the person who has the problem",
        "url": "/en/chapters/04-01-talk-to-the-person-who-has-the-problem.html",
        "type": "pratique"
      },
      {
        "title": "A feature request is not the problem",
        "url": "/en/chapters/04-02-a-feature-request-is-not-the-problem.html",
        "type": "diagnostic"
      },
      {
        "title": "⇄ Customer access is a budget, not a value",
        "url": "/en/chapters/04-13-customer-access-is-a-budget-not-a-value.html",
        "type": "systeme"
      }
    ]
  },
  {
    "id": "delivery",
    "name": "Delivery",
    "seed": "Define a bounded attempt, what it could teach, and the protections to keep.",
    "cards": [
      {
        "title": "Shipping creates information",
        "url": "/en/chapters/05-01-shipping-creates-information.html",
        "type": "principe"
      },
      {
        "title": "Fast does not mean rushed",
        "url": "/en/chapters/05-02-fast-does-not-mean-rushed.html",
        "type": "pratique"
      },
      {
        "title": "⇄ Your delivery rhythm is a decision you made",
        "url": "/en/chapters/05-05-your-delivery-rhythm-is-a-decision-you-made.html",
        "type": "systeme"
      }
    ]
  },
  {
    "id": "ownership",
    "name": "Ownership",
    "seed": "Agree feedback on a result, who gathers it, and when your commitment ends.",
    "cards": [
      {
        "title": "Done on your side does not mean solved",
        "url": "/en/chapters/06-01-done-on-your-side-does-not-mean-solved.html",
        "type": "diagnostic"
      },
      {
        "title": "Come back a month later",
        "url": "/en/chapters/06-02-come-back-a-month-later.html",
        "type": "pratique"
      },
      {
        "title": "⇄ You ask for outcomes and you review activity",
        "url": "/en/chapters/06-07-you-ask-for-outcomes-and-you-review-activity.html",
        "type": "systeme"
      }
    ]
  },
  {
    "id": "systems",
    "name": "Systems",
    "seed": "Compare two occurrences and what a step is for, without assuming a control has to be added.",
    "cards": [
      {
        "title": "The second time is information",
        "url": "/en/chapters/07-01-the-second-time-is-information.html",
        "type": "diagnostic"
      },
      {
        "title": "Delete the step before you document it",
        "url": "/en/chapters/07-02-delete-the-step-before-you-document-it.html",
        "type": "pratique"
      },
      {
        "title": "Hand over a problem, not a task",
        "url": "/en/chapters/09-03-hand-over-a-problem-not-a-task.html",
        "type": "pratique"
      }
    ]
  },
  {
    "id": "leverage",
    "name": "Leverage",
    "seed": "Compare a possible reuse with the current practice, costs and checks included.",
    "cards": [
      {
        "title": "Sort them by cause, not by subject",
        "url": "/en/chapters/08-01-sort-them-by-cause-not-by-subject.html",
        "type": "diagnostic"
      },
      {
        "title": "The cheapest leverage is already paid for",
        "url": "/en/chapters/08-03-the-cheapest-leverage-is-already-paid-for.html",
        "type": "principe"
      },
      {
        "title": "⇄ You pay for hours, you get hours",
        "url": "/en/chapters/08-05-you-pay-for-hours-you-get-hours.html",
        "type": "systeme"
      }
    ]
  },
  {
    "id": "leadership",
    "name": "Leadership",
    "seed": "Ask one person what backing they want, and agree a bounded contribution.",
    "cards": [
      {
        "title": "A review that only says yes teaches nothing",
        "url": "/en/chapters/09-04-a-review-that-only-says-yes-teaches-nothing.html",
        "type": "principe"
      },
      {
        "title": "Hand over a problem, not a task",
        "url": "/en/chapters/09-03-hand-over-a-problem-not-a-task.html",
        "type": "pratique"
      },
      {
        "title": "⇄ You are the missing reference, and you left nothing behind",
        "url": "/en/chapters/09-08-you-are-the-missing-reference-and-you-left-nothing-behind.html",
        "type": "systeme"
      }
    ]
  },
  {
    "id": "reference",
    "name": "Being the reference",
    "seed": "Adapt an answer for a willing recipient, in a sharing space you are allowed to use.",
    "cards": [
      {
        "title": "An opinion is not an artifact",
        "url": "/en/chapters/10-03-an-opinion-is-not-an-artifact.html",
        "type": "diagnostic"
      },
      {
        "title": "Answer the question in public",
        "url": "/en/chapters/10-05-answer-the-question-in-public.html",
        "type": "pratique"
      },
      {
        "title": "⇄ The absence of a rule is a ban",
        "url": "/en/chapters/10-10-the-absence-of-a-rule-is-a-ban.html",
        "type": "systeme"
      }
    ]
  }
];
  // Each step carries its phrase and a "next time…" plan: the move the result
  // offers when it is the next step.
  const etapes = {
    mindset: { phrase: "I make things better",
      plan: "Next time something bothers you, take a first small step to improve it within the day, then tell whoever can act on it." },
    craft: { phrase: "I'm excellent at something",
      plan: "Next time you finish a piece of work, show it to someone more experienced before handing it in, and ask them for one thing to improve." },
    autonomy: { phrase: "Give me the problem, not the procedure",
      plan: "Next time you are given a task, ask what it is for before you start. If you get stuck, come back with a proposal, not a question." },
    understanding: { phrase: "I understand the whole business",
      plan: "Next time someone asks you for something, find the person who needs it and ask them what they are trying to do." },
    delivery: { phrase: "I put things into the real world",
      plan: "Next time you start something, show a first version to someone who will use it before the end of the week." },
    ownership: { phrase: "I answer for the result",
      plan: "Next time you finish a piece of work, note a date a month away to come back and see what it changed." },
    systems: { phrase: "I make next time easier",
      plan: "Next time a problem comes back a second time, look for what causes it before fixing it again." },
    leverage: { phrase: "I multiply my impact",
      plan: "Next time you get three requests that look alike, look for their shared cause before answering the third." },
    leadership: { phrase: "I make builders around me",
      plan: "Next time someone asks for help with a problem you know how to fix, ask two questions before giving your answer." },
    reference: { phrase: "People learn from how I work",
      plan: "Next time someone asks you a question you know the answer to well, write it where others can find it." }
  };
  capabilities.forEach((capability) => Object.assign(capability, etapes[capability.id]));
  // Five bands of two steps. Each text says what you do and what you don't do
  // yet: it must be false for someone two bands away.
  const paliers = [
    { numero: 1, min: 0, max: 2, nom: "You are laying the foundations",
      texte: "You notice what's wrong and you work on your craft. You still often wait to be told what to do, and why." },
    { numero: 2, min: 3, max: 4, nom: "You move on your own",
      texte: "You start from the problem, not the instruction, and you understand who you work for. What you make still rarely reaches real people, quickly and whole." },
    { numero: 3, min: 5, max: 6, nom: "You ship and answer for the result",
      texte: "You put things into the real world and check what they changed. You still fix problems one at a time, without making next time easier." },
    { numero: 4, min: 7, max: 8, nom: "You make next time easier",
      texte: "You remove causes, and what you make serves others without you. You still do little to help the people around you grow." },
    { numero: 5, min: 9, max: 10, nom: "You grow other builders",
      texte: "You let others decide, you explain your reasoning, and others take up how you work. Check that it all holds when you are not there." }
  ];
  const beginner = { title: "A useful first attempt", url: "/en/first-try/" };
  const templates = { title: "Templates for acting and reviewing", url: "/en/templates/" };
  const method = { title: "How the test works", url: "/en/test-method/" };
  const intentions = [
    { id: "start", label: "Start with a useful attempt", anchor: "start", resource: beginner,
      guidance: "A personal, community or learning example is enough. You can start by preparing a proposal, without having shipped a project already." },
    { id: "deepen", label: "Go deeper into my practice", anchor: "improve",
      resource: { title: "Improving without starting over", url: "/en/improving-without-starting-over/" },
      guidance: "Keep what already works. Choose a limit, a more demanding case, or feedback that could enrich your practice." },
    { id: "team", label: "Grow a group's practices", anchor: "team",
      resource: { title: "Running this in your team", url: "/en/workshop/" },
      guidance: "Invite willing participants to examine a shared situation. Confirm the time, the open decisions, and who can authorise the attempt. Anyone can pass; individual answers stay theirs." },
    { id: "support", label: "Back other builders", anchor: "support",
      resource: { title: "Six weeks to learn together", url: "/en/learning-as-a-team/" },
      guidance: "Ask what backing would help, offer a precise contribution inside your means, and wait for the agreement of the people concerned. Backing does not mean taking over their work." }
  ];
  const modeLabels = { revisit: "Revisit a practice", deepen: "Go deeper into a strength", discover: "Prepare a first attempt", blocked: "Clarify the conditions" };
  const memoryNotice = "Your answers are sent nowhere. They disappear when you leave the page, unless you choose to keep them on this device. Copy your line of work to keep it.";

  // The test's interface labels.
  const ui = {
    etape: (n, total, nb) => `Step ${n} of ${total} · ${nb} questions`,
    progression: "Test progress",
    consigne: "Answer for what you really do: at work, in class, in a community group or a project of your own. \"Your craft\" is what you do most. If a situation didn't come up, say so with the answers at the bottom.",
    precedent: "Back",
    continuer: "Continue",
    voirNiveau: "See my level",
    reponses: (n, total) => `${n} answer${n > 1 ? "s" : ""} of ${total}`,
    resultatTitre: "Your builder level",
    estimation: {
      titre: "Before you start",
      question: "In your view, which steps are solid in your practice today?",
      aide: "Tick every solid step, on instinct. At the end, the test will compare it with what you did.",
      aucune: "None yet",
      nsp: "I don't know",
      commencer: "Start the test"
    },
    ici: "You are here",
    prochaineMarque: "Next step",
    position: (n, nom) => n ? `Your practice is solid up to step ${n}, ${nom}.` : "No step is solid in your answers yet.",
    prochaine: (n, nom) => `Next step: ${n}, ${nom}.`,
    sommet: "You are at the top of the ladder.",
    niveau: (numero, total) => `Level ${numero} of ${total}`,
    ecart: {
      trop: (noms) => `You thought these were solid: ${noms}. Your answers don't show it yet.`,
      pasAssez: (noms) => `Solid in your answers, though you didn't tick them: ${noms}. You do more than you think.`,
      juste: "Your answers show the steps you ticked. You see yourself clearly."
    },
    trou: (nom) => `Lower down, one step still needs work: ${nom}.`,
    bloquees: (noms) => `Your setting limited these steps: ${noms}. They don't lower your level.`,
    sansNiveau: "Your setting limited too many steps to place a level. That is not a judgement about you, it is information about your context.",
    forcesTitre: "What you already do",
    reponse: (label) => `Your answer: "${label}"`,
    freinsTitre: (n, nom) => `What holds you back at step ${n}, ${nom}`,
    freinsVides: "The situation hasn't come up yet.",
    sommetTexte: "All your steps are solid. The risk at this level: becoming the person nothing moves without. Check that what you pass on holds without you.",
    dejaLa: (n, total) => `${n} of ${total} already there.`,
    fait: "done",
    pasEncore: "not yet",
    gesteTitre: "Your next move",
    carteLiee: "The card from the book that goes with it",
    copierGeste: "Copy my move",
    pisteComplete: "See the full line of work →",
    retourTitre: "Come back in three months",
    retourTexte: (date) => `Take the test again around ${date}. Until then, watch these moves:`,
    retourEcran: (date) => `Take the test again around ${date}. Until then, work on the moves not yet ticked.`,
    retourSansGestes: (date) => `Take the test again around ${date} to see what moved.`,
    depuisTitre: "Since your last time",
    depuis: (date, avant, apres) => {
      const etape = (n) => n ? `up to step ${n}` : "on no step";
      if (apres > avant) return `On ${date}, your practice was solid ${etape(avant)}. It is now solid ${etape(apres)}.`;
      if (apres < avant) return `On ${date}, your practice was solid ${etape(avant)}. Today's answers place it ${etape(apres)}.`;
      return `On ${date}, your practice was already solid ${etape(avant)}. No change of step for now.`;
    },
    gagnes: "Moves that have become habits since:",
    garder: "Keep my answers on this device, to see what moved next time. Nothing is sent.",
    prudence: "This level describes what you did in recent months, not your talent. Its cut-offs are provisional.",
    carteTitre: "See your ten steps and choose another line of work",
    statuts: { solid: "Solid", partial: "Under way", open: "To work on", unseen: "Not met", blocked: "Limited by your setting" },
    directions: {
      solid: "You do this often. You can go deeper or pass it on.",
      partial: "You do this sometimes. One more concrete case can make it solid.",
      open: "You don't do this much yet. One first adjustment is enough to start.",
      unseen: "These situations haven't come up yet. Start with an example or a first attempt.",
      blocked: "Your setting limited these situations. You can start by clarifying the conditions."
    },
    pistesTitre: "Choose a line of work",
    intentionLegende: "To fit what comes next, what do you want to do?",
    explorer: "Explore this line →",
    clarifier: "Clarify the conditions →",
    revoir: "Review the answers",
    planLede: "A proposal to adapt to your situation. It doesn't change your level.",
    troisCartes: "Three cards to go further",
    lire: "Read →",
    autrePiste: "Back to my level",
    copier: "Copy my line",
    copierLabel: "Text of your line, to copy",
    copiee: "Line copied.",
    copieEchouee: "Automatic copy did not work. Select and copy the text below."
  };

  const textes = {
    titre: (nom) => `A line of work you chose: ${nom}`,
    raison: (nom, mode) => `You chose the step "${nom}": ${mode}. Here is a proposal to adapt to your situation.`,
    actions: {
      revisit: "Start from a recent example. Choose a single adjustment to propose or to try inside your remit.",
      deepen: "Start from what already helps you. With a willing person, examine a limit, or another case where this practice might need adapting.",
      discover: "Read a constructed example first. Then prepare this practice on a personal or fictional situation. If a real attempt is possible, bound it with the people concerned.",
      blocked: "Start with the missing condition before trying to change the practice. Read the card about conditions, then prepare a precise request if you can carry it."
    },
    observations: {
      revisit: "Which fact would show whether this adjustment helps? Agree on feedback, and stop or cut back the attempt if its conditions stop holding.",
      deepen: "Note what stays useful and what changes in this other case. An observation that goes against you is learning, not a loss of level.",
      discover: "Separate what the exercise helped you put into words from what was observed in a real situation. You can stop after the reading or the preparation.",
      blocked: "Watch whether a concrete agreement or backing arrives. Without it, hold the proposal, cut it back by agreement, or pause it. A refusal does not measure what you are capable of."
    },
    champs: {
      sujet: "Subject to adapt to your example",
      geste: "Next move",
      parcours: "On your path",
      conditions: "Conditions and agreement",
      temps: "Time and work displaced",
      observation: "Observation and feedback",
      fin: "Ending or handover"
    },
    conditionsBloque: "Which condition would have to be clarified before carrying on: time, access, an agreement, backing? You can name it for yourself, without typing it here.",
    conditionsGenerales: "Get clear on what is yours and what needs an agreement before you try. A proposal is not yet an authorisation.",
    tempsTexte: "Choose a realistic duration, what it displaces, and a suitable date to come back. If it will not fit the time available, cut the attempt back or defer it.",
    finTexte: "Get clear on who decides to carry on and who accepts what follows. You do not have to provide indefinite follow-up.",
    lectures: "Reading: one card can be enough",
    disclaimer: "This line of work is a suggestion for reading and practice. Your level comes from your answers and stays provisional."
  };
  const contenu = { questions, capabilities, recence, horsEchelle, paliers, intentions, modeLabels,
    memoryNotice, beginner, templates, method, textes, ui };
  if (typeof module !== "undefined" && module.exports) module.exports = contenu;
  else scope.BuilderTestContenu = contenu;
})(globalThis);
