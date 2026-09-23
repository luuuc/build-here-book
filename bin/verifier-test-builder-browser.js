// À exécuter sur le site local ouvert : agent-browser eval --stdin < bin/verifier-test-builder-browser.js
(async () => {
  const root = document.querySelector('[data-builder-test]');
  const screen = root.querySelector('[data-test-screen]');
  const assert = (ok, message) => { if (!ok) throw new Error(message); };
  const report = [];
  const originalFetch = window.fetch;
  const sent = [];
  window.fetch = (...args) => { sent.push(String(args[0])); return originalFetch(...args); };
  const next = () => [...screen.querySelectorAll('.builder-test-nav button')].at(-1);
  try {
    localStorage.removeItem('build-here:test-builder:reponses');
    root.querySelector('[data-test-restart]').click();
    root.querySelector('[data-test-start]').click();
    assert(screen.querySelector('h2').textContent === 'Avant de commencer', 'estimate first');
    assert(screen.querySelectorAll('input[name=estimation]').length === 12, 'ten steps, none, and unknown');
    screen.querySelectorAll('input[name=estimation]')[8].click();
    next().click();
    assert(screen.querySelector('h2').textContent === "L'état d'esprit", 'first step');
    assert(document.activeElement === screen.querySelector('h2'), 'heading focus');
    for (let step = 0; step < 10; step++) {
      const groups = [...screen.querySelectorAll('.echelle')];
      assert(groups.length === 5, `five questions at step ${step + 1}`);
      assert(groups.every((group) => group.querySelectorAll('.echelle-choix input').length === 4), 'four options');
      assert(groups.filter((group) => group.querySelector('.echelle-apart')).length === 4, 'off-scale answers except on the situation');
      assert(next().disabled, 'completion required');
      groups.forEach((group, index) => {
        // Tout au plus haut, sauf l'etape 4 laissee a zero, et une reponse hors calcul.
        const value = step === 0 && index === 0 ? 'unseen' : step === 3 ? '0' : '3';
        [...group.querySelectorAll('input')].find((input) => input.value === value).click();
      });
      assert(!next().disabled, 'five responses permit continuing');
      if (step === 1) {
        screen.querySelector('.builder-test-nav button').click();
        assert(screen.querySelector('input[value=unseen]').checked, 'back retains response');
        next().click();
        assert(screen.querySelectorAll('input:checked').length === 5, 'forward retains responses');
      }
      next().click();
    }
    report.push('ten steps, five questions, completion, back/forward');
    assert(screen.querySelector('h2').textContent === 'Ton niveau de builder', 'level screen');
    assert(screen.querySelector('.niveau-numero').textContent === 'Niveau 5 sur 5', 'top band with one gap');
    assert(screen.querySelectorAll('.niveau-echelle li').length === 10, 'ten rungs');
    assert(screen.querySelector('.niveau-echelle-marque').textContent === 'Tu es ici', 'position marked');
    assert(screen.querySelector('.niveau-ecart').textContent.includes("l'étape 8"), 'estimate compared');
    assert(screen.textContent.includes('Ce qui te retient à l\'étape 4, La compréhension'), 'blocker is the gap');
    assert(screen.querySelectorAll('.niveau-preuves').length === 1, 'strengths');
    assert(screen.querySelectorAll('.niveau-gestes-reponse').length === 5, 'blockers with answers');
    assert(screen.querySelectorAll('.niveau-gestes li').length === 5, 'five moves');
    assert(screen.querySelector('.niveau-geste-plan').textContent.length > 20, 'one next move');
    assert(screen.querySelectorAll('.niveau-carte .carte').length === 10, 'ten step cards folded');
    report.push('position, estimate, strengths, blockers, next move');
    const garder = screen.querySelector('.niveau-garder input');
    assert(!garder.checked, 'keeping is opt-in');
    assert(localStorage.getItem('build-here:test-builder:reponses') === null, 'nothing kept by default');
    garder.click();
    assert(JSON.parse(localStorage.getItem('build-here:test-builder:reponses')).responses['mindset-2'] === '3', 'answers kept on request');
    garder.click();
    assert(localStorage.getItem('build-here:test-builder:reponses') === null, 'unticking erases');
    report.push('opt-in keeping and erasing');
    const clipboard0 = Object.getOwnPropertyDescriptor(navigator, 'clipboard');
    let moved = '';
    Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { writeText: async (text) => { moved = text; } } });
    [...screen.querySelectorAll('button')].find((b) => b.textContent === 'Copier mon geste').click();
    await Promise.resolve(); await Promise.resolve();
    assert(moved.includes('Ton prochain geste') && moved.includes('Repasse le test'), 'move copied');
    if (clipboard0) Object.defineProperty(navigator, 'clipboard', clipboard0); else delete navigator.clipboard;
    screen.querySelector('.niveau-carte').open = true;
    screen.querySelector('input[value=support]').click();
    screen.querySelector('.niveau-carte .carte-actions button').click();
    assert(screen.querySelectorAll('.carte-livre').length === 3, 'three cards');
    assert(screen.textContent.includes('dans tes moyens'), 'support intent guidance');
    report.push('chosen plan and audience guidance');
    const clipboard = Object.getOwnPropertyDescriptor(navigator, 'clipboard');
    let copied = '';
    Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { writeText: async (text) => { copied = text; } } });
    [...screen.querySelectorAll('button')].find((b) => b.textContent === 'Copier ma piste').click();
    await Promise.resolve(); await Promise.resolve();
    assert(screen.textContent.includes('Piste copiée.'), 'copy success');
    assert(copied.includes('Temps et travail déplacé') && copied.includes('/methode-du-test/'), 'complete copy');
    Object.defineProperty(navigator, 'clipboard', { configurable: true, value: undefined });
    [...screen.querySelectorAll('button')].find((b) => b.textContent === 'Copier ma piste').click();
    await Promise.resolve();
    assert(!screen.querySelector('textarea').closest('[hidden]'), 'copy fallback');
    if (clipboard) Object.defineProperty(navigator, 'clipboard', clipboard); else delete navigator.clipboard;
    report.push('copy and fallback');
    [...screen.querySelectorAll('button')].find((b) => b.textContent === 'Revenir à mon niveau').click();
    assert(screen.querySelector('.niveau'), 'back to level');
    assert(sent.length === 0, 'no request sent');
    root.querySelector('[data-test-restart]').click();
    assert(!root.querySelector('[data-test-intro]').hidden, 'restart');
    report.push('no transmission and restart');
    return { passed: report };
  } finally { window.fetch = originalFetch; }
})()
