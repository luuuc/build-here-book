// À exécuter sur le site local ouvert : agent-browser eval --stdin < bin/verifier-test-builder-browser.js
(async () => {
  const root = document.querySelector('[data-builder-test]');
  const screen = root.querySelector('[data-test-screen]');
  const assert = (ok, message) => { if (!ok) throw new Error(message); };
  const report = [];
  const originalFetch = window.fetch;
  const sent = [];
  window.fetch = (...args) => { sent.push(String(args[0])); return originalFetch(...args); };
  try {
    root.querySelector('[data-test-restart]').click();
    root.querySelector('[data-test-start]').click();
    assert(screen.querySelector('h2').textContent === "L'état d'esprit", 'first step');
    assert(document.activeElement === screen.querySelector('h2'), 'heading focus');
    for (let step = 0; step < 10; step++) {
      const groups = [...screen.querySelectorAll('.builder-test-statement')];
      assert(groups.length === 6, `six statements at step ${step + 1}`);
      assert(groups.every((group) => group.querySelectorAll('input[type=radio]').length === 8), 'six positions plus unseen and blocked');
      const next = [...screen.querySelectorAll('.builder-test-nav button')].at(-1);
      assert(next.disabled, 'completion required');
      groups.forEach((group, index) => {
        const value = step === 0 && index === 0 ? 'unseen' : '5';
        [...group.querySelectorAll('input')].find((input) => input.value === value).click();
      });
      assert(!next.disabled, 'six responses permit continuing');
      if (step === 1) {
        screen.querySelector('.builder-test-nav button').click();
        assert(screen.querySelector('input[value=unseen]').checked, 'back retains response');
        [...screen.querySelectorAll('.builder-test-nav button')].at(-1).click();
        assert(screen.querySelectorAll('input:checked').length === 6, 'forward retains responses');
      }
      [...screen.querySelectorAll('.builder-test-nav button')].at(-1).click();
    }
    report.push('ten steps, six entries, completion, back/forward');
    assert(screen.querySelectorAll('.builder-test-result-item').length === 10, 'ten result topics');
    assert(screen.textContent.includes('1 situation non rencontrée'), 'unseen is separate');
    assert(!screen.textContent.includes('%'), 'no fake precision');
    report.push('result and unseen handling');
    const intent = screen.querySelector('input[value=support]');
    intent.click();
    screen.querySelector('.builder-test-result-item button').click();
    assert(screen.querySelectorAll('.builder-test-card').length === 3, 'three cards');
    assert(screen.textContent.includes('dans tes moyens'), 'support intent guidance');
    assert(!screen.textContent.includes('sans déduction à partir des réponses'), 'honest result provenance');
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
    assert(sent.filter((url) => /evaluation/.test(url)).length === 0, 'no evaluation request');
    root.querySelector('[data-test-restart]').click();
    assert(!root.querySelector('[data-test-intro]').hidden, 'restart');
    report.push('no evaluation transmission and restart');
    return { passed: report };
  } finally { window.fetch = originalFetch; }
})()
