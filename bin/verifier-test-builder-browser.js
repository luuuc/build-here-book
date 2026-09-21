// À exécuter sur le site local ouvert : agent-browser eval --stdin < bin/verifier-test-builder-browser.js
// Exerce le vrai DOM ; seule la copie est simulée pour vérifier ses trois issues.
(async () => {
  const root = document.querySelector('[data-builder-test]');
  const screen = root.querySelector('[data-test-screen]');
  const assert = (value, message) => { if (!value) throw new Error(message); };
  const visible = (e) => !e.closest('[hidden]');
  const click = (text, within = root) => {
    const b = [...within.querySelectorAll('button')].find((e) => e.textContent === text && visible(e));
    assert(b && !b.disabled, `Missing/enabled button: ${text}`); b.click();
  };
  const has = (text) => screen.textContent.includes(text);
  const restart = (intent = 'Commencer par un essai utile') => {
    if (!root.querySelector('[data-test-workspace]').hidden) click('Recommencer');
    click('Explorer les questions'); click(intent);
  };
  const qbutton = (text) => [...screen.querySelectorAll('button')].find((e) => e.textContent === text);
  const answer = {
    discover: "Je n'ai pas encore rencontré cette situation.",
    deepen: "J'ai un exemple qui m'aide et je veux approfondir cette pratique.",
    revisit: "J'ai un exemple et je voudrais revoir cette pratique.",
    blocked: "Des conditions manquent pour que je puisse essayer ou observer.",
    skip: "Je préfère passer, ou je ne sais pas encore.",
    outside: "Ce sujet ne correspond pas à ce que je cherche maintenant."
  };
  const report = [];
  const sent = [];
  const originalFetch = window.fetch;
  window.fetch = (...args) => { sent.push(String(args[0])); return originalFetch(...args); };
  try {
    restart();
    click("Explorer : L'état d'esprit");
    assert(document.activeElement === screen.querySelector('h2'), 'question focus');
    assert(qbutton('Suivante').disabled, 'next requires answer');
    click(answer.discover);
    assert(has('Question 1 sur 3'), 'no auto advance');
    click('Suivante'); click(answer.deepen); click('Précédente');
    assert(qbutton(answer.discover).getAttribute('aria-pressed') === 'true', 'back retains answer');
    click('Suivante'); assert(qbutton(answer.deepen).getAttribute('aria-pressed') === 'true', 'forward retains answer');
    click('Suivante'); click(answer.blocked);
    const time = screen.querySelector('input[value="time"]'); time.click();
    screen.querySelector('input[value="authority"]').click();
    assert(!qbutton('Voir mes pistes').disabled, 'blocked can continue');
    click('Voir mes pistes', screen);
    assert(screen.querySelectorAll('.builder-test-answers button').length === 3, 'mixed candidates');
    screen.querySelectorAll('.builder-test-answers button')[2].click();
    assert(has('Temps ou priorité') && has('Accord ou droit de décision'), 'conditions appear');
    assert(screen.querySelector('.builder-test-card strong').textContent.includes('Donne une suite aux questions'), 'conditions card first');
    report.push('mixed candidates, focus, no auto advance, back/forward, multiple conditions');

    click('Explorer une autre capacité'); click("Explorer : L'état d'esprit");
    click('Suivante'); click('Suivante'); click(answer.deepen);
    assert(screen.querySelector('.builder-test-conditions').hidden, 'conditions hidden after changing answer');
    click(answer.blocked);
    assert([...screen.querySelectorAll('input')].every((i) => !i.checked), 'stale conditions removed');
    click('Voir mes pistes', screen); screen.querySelectorAll('.builder-test-answers button')[2].click();
    assert(!has('Temps ou priorité') && has('Quelle condition faudrait-il clarifier'), 'generic blocked plan');
    report.push('condition cleanup and blocked without detail');

    click("Changer d'intention"); click('Soutenir des builders');
    assert(!has('Une piste que tu as choisie'), 'intent clears old plan');
    click('Voir mes pistes');
    assert(screen.querySelectorAll('.builder-test-answers button').length === 3, 'intent retains answers');
    screen.querySelector('.builder-test-answers button').click();
    assert(has('dans tes moyens') && has("attends l'accord"), 'supporter bounds');
    assert([...screen.querySelectorAll('a')].some((a) => a.pathname.includes('a6-un-premier')), 'discovery includes first case');
    report.push('intent change, retained answers, supporter discovery');

    const clipboard = Object.getOwnPropertyDescriptor(navigator, 'clipboard');
    let copied = '';
    Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { writeText: async (text) => { copied = text; } } });
    click('Copier ma piste'); await Promise.resolve(); await Promise.resolve();
    assert(has('Piste copiée.'), 'copy succeeds honestly');
    assert(copied.includes('Temps et travail déplacé') && copied.includes('Fin ou relais'), 'copy includes full action');
    assert(copied.includes('/chapters/a2-comment-fonctionne-le-test.html') && copied.includes('/chapters/a9-'), 'copy links');
    assert(!copied.includes('Repense à un fait qui a changé ton avis'), 'copy excludes other answers');
    Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { writeText: async () => { throw new Error('denied'); } } });
    click('Copier ma piste'); await Promise.resolve(); await Promise.resolve();
    assert(has("La copie automatique n'a pas abouti"), 'copy failure honest');
    assert(visible(screen.querySelector('textarea')) && screen.querySelector('textarea').value === copied, 'full selectable fallback');
    Object.defineProperty(navigator, 'clipboard', { configurable: true, value: undefined });
    click('Copier ma piste'); await Promise.resolve();
    assert(visible(screen.querySelector('textarea')), 'clipboard absent fallback');
    if (clipboard) Object.defineProperty(navigator, 'clipboard', clipboard); else delete navigator.clipboard;
    report.push('copy success, rejection and absent API');

    restart(); click('Voir mes pistes');
    assert(has('Tes réponses ne suffisent pas'), 'empty outcome');
    click('Choisir un sujet directement'); click('Choisir directement : La référence'); click('Approfondir un appui');
    assert(has('sans déduction') && !has('Appui que tu souhaites approfondir'), 'manual choice no fabricated strength');
    assert(has('espace de partage autorisé'), 'reference permits bounded sharing');
    report.push('empty answers and manual choice');

    for (const mode of ['skip', 'outside', 'discover', 'deepen', 'revisit', 'blocked']) {
      restart();
      const names = [...screen.querySelectorAll('.builder-test-topics h3')].map((h) => h.textContent);
      for (const name of names) {
        click(`Explorer : ${name}`);
        for (let i = 0; i < 3; i++) { click(answer[mode]); click(i === 2 ? 'Voir mes pistes' : 'Suivante', screen); }
        if (name !== names.at(-1)) click('Explorer une autre capacité');
      }
      const choices = screen.querySelectorAll('.builder-test-answers button');
      assert(choices.length === (['skip', 'outside'].includes(mode) ? 0 : 30), `all ${mode} count`);
      if (choices.length) {
        choices[29].click();
        assert(has('Une piste que tu as choisie : La référence'), 'later capability available');
        assert(has('Appui que tu souhaites approfondir') === (mode === 'deepen'), `no false strength for ${mode}`);
      } else assert(has('Tes réponses ne suffisent pas'), 'no candidates');
      report.push(`all 30 answers: ${mode}`);
    }
    restart('Développer les pratiques d\'un groupe');
    assert(root.querySelector('[data-test-direct]').hash === '#parcours-equipe', 'team direct link');
    click('Choisir directement : Le leadership'); click('Clarifier les conditions');
    assert(has('participants volontaires') && has('suspends-la'), 'team block handling');
    report.push('team direct route and authority');
    assert(sent.filter((url) => /evaluation/.test(url)).length === 0, 'no evaluation sent');
    assert(performance.getEntriesByType('resource').filter((r) => /\/evaluation/.test(r.name)).length === 0, 'no evaluation network entry');
    report.push('no evaluation transmission');
    restart(); click("Explorer : L'état d'esprit"); click(answer.discover);
    assert(has('1 situation renseignée'), 'restart cleared all previous answers');
    report.push('restart clears state');
    return { passed: report, evaluationRequests: sent.filter((url) => /evaluation/.test(url)) };
  } finally { window.fetch = originalFetch; }
})()
