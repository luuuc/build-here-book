/* The English content of the reading path: questions, capabilities, options and
   the words of the line of work. The rules live in test-builder-model.js and
   are written once; this file is the twin of test-builder-contenu.js and
   carries exactly the same keys.

   Nothing here goes anywhere: the test never leaves the page. */
(function (scope) {
  "use strict";
  const questions = [
    { id: "mindset-1", capabilityId: "mindset", text: "Think of a small difficulty you noticed. Were you able to get clear on what you could try and what needed an agreement?" },
    { id: "mindset-2", capabilityId: "mindset", text: "Think of an explanation or an instruction you did not understand. How were you able to get the clarification you needed, then or later?" },
    { id: "mindset-3", capabilityId: "mindset", text: "Think of a fact that changed your mind. Which decision or way of working were you able to re-examine?" },
    { id: "craft-1", capabilityId: "craft", text: "Think of something you wanted to get better at. Which precise practice did you choose to work on?" },
    { id: "craft-2", capabilityId: "craft", text: "Think of a method you learned. Were you able to examine a source, an example, or the explanation of someone who knows it?" },
    { id: "craft-3", capabilityId: "craft", text: "Think of a piece of work whose quality you wanted to improve. Which feedback helped you see what held and what was still to work on?" },
    { id: "autonomy-1", capabilityId: "autonomy", text: "Think of a request, even on a personal project. Were you able to pin down the problem it was supposed to answer?" },
    { id: "autonomy-2", capabilityId: "autonomy", text: "Think of a time you were waiting on information, help, or a decision. How did you make visible what was missing to carry on?" },
    { id: "autonomy-3", capabilityId: "autonomy", text: "Think of something you found that changed the planned work. Were you able to discuss it, or revisit your commitment, before carrying on?" },
    { id: "understanding-1", capabilityId: "understanding", text: "Think of a person you wanted to help. What were you able to learn about their real situation, directly or through feedback you could reach?" },
    { id: "understanding-2", capabilityId: "understanding", text: "Think of an improvement that could move work onto somebody else. How did you examine that effect with the people concerned?" },
    { id: "understanding-3", capabilityId: "understanding", text: "Think of something useful you were preparing. Were you able to check how the people concerned would reach it and use it?" },
    { id: "delivery-1", capabilityId: "delivery", text: "Think of an idea that was still uncertain. Were you able to choose an attempt small enough to learn something without needlessly exposing other people?" },
    { id: "delivery-2", capabilityId: "delivery", text: "Think of a piece of work you wanted to make available. How did you separate what could wait from the protections you had to keep?" },
    { id: "delivery-3", capabilityId: "delivery", text: "Think of feedback you received during preparation. What were you able to do with it: carry on, change, cut back, or stop?" },
    { id: "ownership-1", capabilityId: "ownership", text: "Think of help you gave, or work finished on your side. Were you able to go back and see what it made possible, or agree who would?" },
    { id: "ownership-2", capabilityId: "ownership", text: "Think of a result that differed from what you hoped for. What were you able to learn from the facts, including what stayed unknown?" },
    { id: "ownership-3", capabilityId: "ownership", text: "Think of a handover, however modest. How did the people concerned confirm who was picking up what, and with what means?" },
    { id: "systems-1", capabilityId: "systems", text: "Think of a difficulty that came back several times. Were you able to compare the cases before deciding whether anything had to change?" },
    { id: "systems-2", capabilityId: "systems", text: "Think of a way of working that looked complicated. Were you able to understand what a step was for before proposing to change it?" },
    { id: "systems-3", capabilityId: "systems", text: "Think of an activity that depended on knowledge few people had. Were you able to prepare or try a handover with someone willing to take it?" },
    { id: "leverage-1", capabilityId: "leverage", text: "Think of several requests that looked alike. Were you able to check whether they had a common cause, or only the same appearance?" },
    { id: "leverage-2", capabilityId: "leverage", text: "Think of a tool, a template or a resource you could reuse. How did you check it was worth it in your case, with its costs and its limits?" },
    { id: "leverage-3", capabilityId: "leverage", text: "Think of a task you wanted to speed up or repeat more widely. Were you able to examine the possible errors and the checks to keep?" },
    { id: "leadership-1", capabilityId: "leadership", text: "Think of someone you wanted to help act. Were you able to ask them what backing or condition they were missing?" },
    { id: "leadership-2", capabilityId: "leadership", text: "Think of a review, or help you gave someone. Were you able to explain your reasoning while leaving them room to decide?" },
    { id: "leadership-3", capabilityId: "leadership", text: "Think of a shared piece of learning or responsibility. How did you agree the time, the limits, and the help available?" },
    { id: "reference-1", capabilityId: "reference", text: "Think of an answer that could serve again. Were you able to choose, with its recipients, a form and a place to find it?" },
    { id: "reference-2", capabilityId: "reference", text: "Think of an experience you wanted to pass on. How did you make the context, the reasoning and the limits understandable?" },
    { id: "reference-3", capabilityId: "reference", text: "Think of a resource or an explanation you shared, even privately. Which feedback let you see how somebody else could use it?" }
  ];
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
        "url": "/en/chapters/10-02-an-opinion-is-not-an-artifact.html",
        "type": "diagnostic"
      },
      {
        "title": "Answer the question in public",
        "url": "/en/chapters/10-04-answer-the-question-in-public.html",
        "type": "pratique"
      },
      {
        "title": "⇄ The absence of a rule is a ban",
        "url": "/en/chapters/10-09-the-absence-of-a-rule-is-a-ban.html",
        "type": "systeme"
      }
    ]
  }
];
  const answerOptions = [
    { id: "revisit", label: "I have an example and I'd like to revisit this practice." },
    { id: "deepen", label: "I have an example that helps me and I want to go deeper into this practice." },
    { id: "discover", label: "I haven't met this situation yet." },
    { id: "blocked", label: "Conditions are missing for me to try or to observe." },
    { id: "outside", label: "This subject isn't what I'm looking for right now." },
    { id: "skip", label: "I'd rather pass, or I don't know yet." }
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
  const conditions = [
    { id: "time", label: "Time or priority", guidance: "What time would have to be set aside, and what work displaced? Who can grant it?" },
    { id: "access", label: "Access to people or information", guidance: "What feedback or limited access would be enough? Who can authorise it, or offer another source?" },
    { id: "authority", label: "Agreement or the right to decide", guidance: "Which decision is waiting on an agreement, and from whom? A proposal is not yet an authorisation." },
    { id: "help", label: "Backing or a skill available", guidance: "What precise backing to ask for, from someone who is available and willing?" },
    { id: "other", label: "Another condition, or I'd rather not say", guidance: "Which condition would have to be clarified before carrying on?" }
  ];
  const modeLabels = { revisit: "Revisit a practice", deepen: "Go deeper into a strength", discover: "Prepare a first attempt", blocked: "Clarify the conditions" };
  const memoryNotice = "Your answers stay in this page's memory and are not sent to the evaluation service. They disappear when you leave or reload the page. Copy your line of work to keep it.";
  // Six observations per capability. They are about possible acts, not an identity.
  const statements = {
    mindset: [
      "When I notice a problem, I look for a first move within my reach.",
      "I ask a question even when it looks obvious to me.",
      "I separate what I can try from what needs an agreement.",
      "A fact that goes against my idea leads me to revisit it.",
      "I can say what I do not know yet.",
      "I go back to a difficulty instead of waiting for it to disappear."
    ],
    craft: [
      "I choose one precise aspect of my practice to improve.",
      "I look for examples or sources beyond my habits.",
      "I ask for feedback on work that is not yet finished.",
      "I try to explain why a method works in my context.",
      "I take the time to redo a detail that matters for the quality.",
      "I can name something I learned recently in my practice."
    ],
    autonomy: [
      "Before acting, I look for the problem behind the request.",
      "When a decision is missing, I make that blockage visible.",
      "I propose a possible next step, with its limits.",
      "I check who can decide before committing on behalf of other people.",
      "I flag early what changes the planned work.",
      "I can move on a small part without claiming to solve everything."
    ],
    understanding: [
      "I try to understand the situation of the person I want to help.",
      "I check my assumptions against a source I can reach.",
      "I look at who will carry the work my idea creates.",
      "I ask how a solution will actually be used.",
      "I separate the request as stated from the need it might express.",
      "I change my idea when real use tells another story."
    ],
    delivery: [
      "I look for an attempt small enough to learn without needlessly exposing other people.",
      "I define what has to be protected before making work available.",
      "I show a usable version in order to get concrete feedback.",
      "I separate what can wait from what really blocks the attempt.",
      "I know how to cut back or stop an attempt when the facts call for it.",
      "I come back to the feedback received after a first delivery."
    ],
    ownership: [
      "After helping, I try to find out what it made possible.",
      "I acknowledge results that differ from what I hoped for.",
      "I agree a date or a signal for revisiting an attempt.",
      "I get clear with other people about who picks up what follows.",
      "I pass on the means needed to whoever accepts a handover.",
      "I know how to close my part without promising endless follow-up."
    ],
    systems: [
      "When a difficulty comes back, I compare the cases before generalising.",
      "I look for why a step exists before removing it.",
      "I spot the knowledge that rests on one person.",
      "I check that a new rule solves a real problem.",
      "I look at the effects of an improvement on the people around.",
      "I prepare a handover when somebody agrees to take it."
    ],
    leverage: [
      "I check whether similar requests really have the same cause.",
      "I look for what can be reused before adding a tool.",
      "I weigh the time saved against the cost of setting it up and maintaining it.",
      "I keep checks in place when I speed up or automate a task.",
      "I share a reusable solution with the people concerned.",
      "I can decide that an automation is not worth it."
    ],
    leadership: [
      "I ask what backing would help somebody else act.",
      "I leave room for the decision of the person I am helping.",
      "I explain what my review checked and what is still uncertain.",
      "I make the time and the means of shared learning explicit.",
      "I ask people's agreement before handing them what comes next.",
      "I can help without taking over someone else's work."
    ],
    reference: [
      "I keep a useful answer where its recipients will find it.",
      "I explain the context and the limits of an experience I share.",
      "I check that somebody else can use what I pass on.",
      "I choose a form of sharing compatible with the agreements in place.",
      "I also pass on the attempts that did not produce the result expected.",
      "I know that sharing internally can be enough."
    ]
  };
  const scale = ["Strongly disagree", "Mostly disagree", "Slightly disagree", "Slightly agree", "Mostly agree", "Strongly agree"];
  // The words of the line of work. They live here, not in the rules.

  // The test's interface labels. They used to be hard-coded French inside
  // test-builder.js, which made this English build speak French.
  const ui = {
    etape: (n, total, nb) => `Step ${n} of ${total} · ${nb} statements`,
    progression: "Test progress",
    consigne: "Think about what you do today, in your studies, your activity, a community group or a personal project. Pick a position on the scale; if you have not met the situation, say so separately.",
    nonRencontree: "I have not met this situation yet",
    conditionsManquantes: "The conditions were missing for me to try",
    precedent: "Back",
    continuer: "Continue",
    voirPistes: "See my lines of work",
    reponses: (n, total) => `${n} answer${n > 1 ? "s" : ""} of ${total}`,
    resultatTitre: "How do you build today?",
    resultatLede: "Your answers open lines of reading. They do not decide whether you are a builder and they do not measure your capabilities. Pick the subject that would help you now.",
    intentionLegende: "To fit what comes next, what do you want to do?",
    directions: {
      deepen: "You recognise these moves in your practice: explore their limits or another context.",
      revisit: "You recognise these moves less: pick a first adjustment if the subject interests you.",
      explore: "Your answers vary with the situation: pick one concrete case to examine.",
      discover: "You have few lived situations here: start with an example or a first attempt."
    },
    nonRencontrees: (n) => `${n} situation${n > 1 ? "s" : ""} not met, with no judgement.`,
    conditionsOntManque: (n) => `${n} situation${n > 1 ? "s" : ""} where the conditions were missing.`,
    explorer: "Explore this line →",
    clarifier: "Clarify the conditions →",
    revoir: "Review the answers",
    planRaison: (nom) => `You chose ${nom} after going through the statements. Here is a proposal to adapt to your situation.`,
    planLede: "You chose this line from your answers. The test makes no diagnosis.",
    troisCartes: "Three cards to go further",
    lire: "Read →",
    autrePiste: "Choose another line",
    copier: "Copy my line",
    copierLabel: "Text of your line, to copy",
    copiee: "Line copied.",
    copieEchouee: "Automatic copy did not work. Select and copy the text below."
  };

  const textes = {
    titre: (nom) => `A line of work you chose: ${nom}`,
    raison: (question, choix) => `You kept "${question}" and "${choix}". Here is a proposal to adapt to your situation.`,
    raisonDirecte: (mode) => `You chose this subject directly, with nothing inferred from your answers: ${mode}.`,
    appui: (question) => `The strength you want to go deeper into: ${question}`,
    actions: {
      revisit: "Take your example again. Choose a single adjustment to propose or to try inside your remit.",
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
    conditionsBloque: "Which condition would have to be clarified before carrying on? You can name it for yourself, without typing it here.",
    conditionsGenerales: "Get clear on what is yours and what needs an agreement before you try. A proposal is not yet an authorisation.",
    tempsTexte: "Choose a realistic duration, what it displaces, and a suitable date to come back. If it will not fit the time available, cut the attempt back or defer it.",
    finTexte: "Get clear on who decides to carry on and who accepts what follows. You do not have to provide indefinite follow-up.",
    lectures: "Reading: one card can be enough",
    disclaimer: "This line of work is a suggestion for reading and practice, not a level or an assessment of what you can do."
  };
  const contenu = { questions, capabilities, answerOptions, intentions, conditions, modeLabels,
    memoryNotice, statements, scale, beginner, templates, method, textes, ui };
  if (typeof module !== "undefined" && module.exports) module.exports = contenu;
  else scope.BuilderTestContenu = contenu;
})(globalThis);
