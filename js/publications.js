(() => {
  const section = document.getElementById('publications');
  if (!section) return;

  const navigation = section.querySelector('.publications-nav');
  const buttons = Array.from(section.querySelectorAll('button[data-category]'));
  const rows = Array.from(section.querySelectorAll('.publication-row'));
  const count = section.querySelector('.publications-count');
  const empty = section.querySelector('.publications-empty');
  if (!navigation || !count || !empty || !buttons.length) return;

  const filter = (category) => {
    let visible = 0;
    rows.forEach((row) => {
      const fields = (row.dataset.fields || '').split(/\s+/);
      const matches = category === 'all' ||
        (category === 'preprints' ? row.dataset.status === 'preprint' : fields.includes(category));
      row.hidden = !matches;
      if (matches) visible += 1;
    });
    buttons.forEach((button) => {
      button.setAttribute('aria-pressed', String(button.dataset.category === category));
    });
    count.textContent = `Showing ${visible} of ${rows.length} publications.`;
    empty.hidden = visible !== 0;
  };

  buttons.forEach((button) => {
    button.addEventListener('click', () => filter(button.dataset.category));
  });
  filter('all');
  navigation.hidden = false;
})();
