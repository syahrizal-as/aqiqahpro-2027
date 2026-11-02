(() => {
  const tabs = [...document.querySelectorAll('[data-screenshot-tab]')];
  const panels = [...document.querySelectorAll('[data-screenshot-panel]')];
  const select = (index, focus = false) => {
    const current = (index + tabs.length) % tabs.length;
    tabs.forEach((tab, i) => {
      tab.setAttribute('aria-selected', String(i === current));
      tab.tabIndex = i === current ? 0 : -1;
    });
    panels.forEach(panel => { panel.hidden = panel.dataset.screenshotPanel !== tabs[current].dataset.screenshotTab; });
    if (focus) tabs[current].focus();
  };
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => select(index));
    tab.addEventListener('keydown', event => {
      const next = { ArrowRight: index + 1, ArrowLeft: index - 1, Home: 0, End: tabs.length - 1 }[event.key];
      if (next === undefined) return;
      event.preventDefault();
      select(next, true);
    });
  });
})();
