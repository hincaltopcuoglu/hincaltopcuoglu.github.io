/* ======================================================================
   Hincal Topcuoglu — site behaviour
   ----------------------------------------------------------------------
   Progressive enhancement only: every feature degrades to working
   HTML if JavaScript is unavailable.
   ====================================================================== */
(function () {
  'use strict';

  /* ---------- Theme (dark mode) ---------------------------------- */
  var THEME_KEY = 'ht_theme';

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    var btn = document.getElementById('theme-toggle');
    if (!btn) return;
    var icon = btn.querySelector('i');
    if (icon) {
      icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }
    btn.setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');
  }

  function initTheme() {
    var stored = null;
    try { stored = localStorage.getItem(THEME_KEY); } catch (e) { /* private mode */ }
    var prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    applyTheme(stored || (prefersDark ? 'dark' : 'light'));

    var btn = document.getElementById('theme-toggle');
    if (!btn) return;
    btn.addEventListener('click', function () {
      var next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      try { localStorage.setItem(THEME_KEY, next); } catch (e) { /* ignore */ }
    });
  }

  /* ---------- Mobile navigation ----------------------------------- */
  function initNav() {
    var toggle = document.getElementById('nav-toggle');
    var nav = document.getElementById('site-nav');
    if (!toggle || !nav) return;
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  /* ---------- Scroll reveal --------------------------------------- */
  function initReveal() {
    var items = document.querySelectorAll('[data-reveal]');
    if (!items.length) return;

    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || !('IntersectionObserver' in window)) {
      items.forEach(function (el) { el.classList.add('revealed'); });
      return;
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('revealed');
        io.unobserve(entry.target);
      });
    }, { threshold: 0, rootMargin: '0px 0px -10% 0px' });

    items.forEach(function (el) { io.observe(el); });

    // Safety net: if the observer has not fired for an element that is
    // already within the viewport (e.g. tall viewport, unusual zoom),
    // reveal it directly.
    function revealInView() {
      items.forEach(function (el) {
        if (el.classList.contains('revealed')) return;
        var r = el.getBoundingClientRect();
        if (r.top < window.innerHeight * 0.95 && r.bottom > 0) {
          el.classList.add('revealed');
        }
      });
    }
    revealInView();
    window.addEventListener('scroll', revealInView, { passive: true });
    window.addEventListener('resize', revealInView);
  }

  /* ---------- Animated counters ----------------------------------- */
  function initCounters() {
    var counters = document.querySelectorAll('[data-count-to]');
    if (!counters.length) return;

    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || !('IntersectionObserver' in window)) {
      counters.forEach(function (el) { el.textContent = el.getAttribute('data-count-to'); });
      return;
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        io.unobserve(el);

        var raw = el.getAttribute('data-count-to');
        var target = parseFloat(raw);
        var decimals = (raw.split('.')[1] || '').length;
        var prefix = el.getAttribute('data-prefix') || '';
        var suffix = el.getAttribute('data-suffix') || '';
        var start = performance.now();
        var duration = 1200;

        function tick(now) {
          var p = Math.min((now - start) / duration, 1);
          var eased = 1 - Math.pow(1 - p, 3);
          el.textContent = prefix + (target * eased).toFixed(decimals) + suffix;
          if (p < 1) requestAnimationFrame(tick);
          else el.textContent = prefix + target.toFixed(decimals) + suffix;
        }
        requestAnimationFrame(tick);
      });
    }, { threshold: 0.4 });

    counters.forEach(function (el) { io.observe(el); });
  }

  /* ---------- Reading progress bar -------------------------------- */
  function initProgress() {
    var bar = document.getElementById('reading-progress');
    if (!bar) return;

    function update() {
      var doc = document.documentElement;
      var max = doc.scrollHeight - window.innerHeight;
      var pct = max > 0 ? (window.scrollY / max) * 100 : 0;
      bar.style.width = Math.min(pct, 100) + '%';
    }
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    update();
  }

  /* ---------- Copy-to-clipboard on code blocks --------------------- */
  function initCopyButtons() {
    // Both shapes are used: <pre><code>…</code></pre> in Markdown posts
    // and <pre class="r">…</pre> in the RStudio exports.
    var blocks = document.querySelectorAll('.post-body pre');
    if (!blocks.length) return;

    Array.prototype.forEach.call(blocks, function (pre) {
      var code = pre.querySelector('code') || pre;
      pre.classList.add('has-copy');

      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'copy-btn';
      btn.setAttribute('aria-label', 'Copy code to clipboard');
      btn.innerHTML = '<i class="far fa-copy" aria-hidden="true"></i>';

      btn.addEventListener('click', function () {
        var text = code.innerText;
        var done = function () {
          btn.classList.add('copied');
          btn.innerHTML = '<i class="fas fa-check" aria-hidden="true"></i>';
          setTimeout(function () {
            btn.classList.remove('copied');
            btn.innerHTML = '<i class="far fa-copy" aria-hidden="true"></i>';
          }, 1800);
        };
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(text).then(done, function () {});
        } else {
          var ta = document.createElement('textarea');
          ta.value = text;
          ta.setAttribute('readonly', '');
          ta.style.position = 'absolute';
          ta.style.left = '-9999px';
          document.body.appendChild(ta);
          ta.select();
          try { document.execCommand('copy'); done(); } catch (e) { /* ignore */ }
          document.body.removeChild(ta);
        }
      });

      pre.appendChild(btn);
    });
  }

  /* ---------- Table of contents (post pages) ----------------------- */
  function initToc() {
    var toc = document.getElementById('toc');
    if (!toc) return;

    var headings = document.querySelectorAll('.post-body h2, .post-body h3');
    if (!headings.length) { toc.parentElement.style.display = 'none'; return; }

    var links = [];
    Array.prototype.forEach.call(headings, function (h, i) {
      if (!h.id) h.id = 'section-' + i;
      var a = document.createElement('a');
      a.href = '#' + h.id;
      a.textContent = h.textContent;
      a.className = h.tagName === 'H3' ? 'toc-sub' : 'toc-item';
      toc.appendChild(a);
      links.push(a);
    });

    if (!('IntersectionObserver' in window)) return;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        links.forEach(function (l) { l.classList.remove('active'); });
        var active = toc.querySelector('a[href="#' + entry.target.id + '"]');
        if (active) active.classList.add('active');
      });
    }, { rootMargin: '-80px 0px -70% 0px' });

    headings.forEach(function (h) { io.observe(h); });
  }

  /* ---------- Blog filtering -------------------------------------- */
  function initFilters() {
    var pills = document.querySelectorAll('.filter-pills button');
    var cards = document.querySelectorAll('[data-post-card]');
    if (!pills.length || !cards.length) return;

    var empty = document.getElementById('filter-empty');
    var countEl = document.getElementById('filter-count');

    function apply(category, updateUrl) {
      var shown = 0;
      cards.forEach(function (card) {
        var cats = (card.getAttribute('data-categories') || '').split('|');
        var match = category === 'All' || cats.indexOf(category) !== -1;
        card.hidden = !match;
        if (match) shown++;
      });

      // Compare on data-filter: the button text also carries a count
      // badge, so textContent is not a reliable key.
      pills.forEach(function (p) {
        var active = (p.getAttribute('data-filter') || p.textContent.trim()) === category;
        p.classList.toggle('active', active);
        p.setAttribute('aria-selected', active ? 'true' : 'false');
      });

      if (empty) empty.hidden = shown !== 0;
      if (countEl) countEl.textContent = shown;

      if (updateUrl) {
        var url = new URL(window.location.href);
        if (category === 'All') url.searchParams.delete('topic');
        else url.searchParams.set('topic', category);
        history.replaceState(null, '', url);
      }

      if (typeof gtag === 'function') {
        gtag('event', 'blog_filter', {
          filter: category,
          page_path: window.location.pathname
        });
      }
    }

    pills.forEach(function (pill) {
      pill.addEventListener('click', function () {
        var key = pill.getAttribute('data-filter') || pill.textContent.trim();
        apply(key, true);
      });
    });

    // Title filter, combined with the topic filter.
    var textInput = document.getElementById('post-filter-input');
    if (textInput) {
      textInput.addEventListener('input', function () {
        var q = textInput.value.trim().toLowerCase();
        cards.forEach(function (card) {
          var title = (card.getAttribute('data-title') || '').toLowerCase();
          var titleMatch = !q || title.indexOf(q) !== -1;
          var cats = (card.getAttribute('data-categories') || '').split('|');
          var activePill = document.querySelector('.filter-pills button.active');
          var cat = activePill
            ? (activePill.getAttribute('data-filter') || activePill.textContent.trim())
            : 'All';
          var catMatch = cat === 'All' || cats.indexOf(cat) !== -1;
          card.hidden = !(titleMatch && catMatch);
        });
        var shown = Array.prototype.filter.call(cards, function (c) { return !c.hidden; }).length;
        var countEl = document.getElementById('filter-count');
        if (countEl) countEl.textContent = shown;
        var emptyEl = document.getElementById('filter-empty');
        if (emptyEl) emptyEl.hidden = shown !== 0;
      });
    }

    // Restore from the URL so a filtered view can be shared.
    var initial = 'All';
    try {
      var topic = new URL(window.location.href).searchParams.get('topic');
      if (topic) {
        for (var i = 0; i < pills.length; i++) {
          var key = pills[i].getAttribute('data-filter') || pills[i].textContent.trim();
          if (key === topic) { initial = topic; break; }
        }
      }
    } catch (e) { /* ignore */ }
    apply(initial, false);

    // Expose for the "clear filter" link.
    window.__htApplyFilter = apply;
  }

  /* ---------- Search ---------------------------------------------- */
  function initSearch() {
    var modal = document.getElementById('search-modal');
    var input = document.getElementById('search-input');
    var list = document.getElementById('search-results');
    var empty = document.getElementById('search-empty');
    var trigger = document.getElementById('search-trigger');
    if (!modal || !input || !list) return;

    var index = window.__htSearchIndex || [];
    var active = -1;

    function score(item, q) {
      var hay = (item.title + ' ' + item.description + ' ' + item.categories.join(' ') + ' ' + item.tags.join(' ')).toLowerCase();
      var t = item.title.toLowerCase();
      if (t === q) return 1000;
      if (t.indexOf(q) === 0) return 500;
      if (t.indexOf(q) !== -1) return 250;
      if (hay.indexOf(q) !== -1) return 100;
      // Subsequence match (fuzzy)
      var i = 0;
      for (var k = 0; k < t.length && i < q.length; k++) {
        if (t[k] === q[i]) i++;
      }
      return i === q.length ? 25 : -1;
    }

    function render(query) {
      list.innerHTML = '';
      active = -1;
      var q = query.trim().toLowerCase();
      if (!q) {
        if (empty) empty.hidden = true;
        return;
      }

      var results = index
        .map(function (item) { return { item: item, s: score(item, q) }; })
        .filter(function (r) { return r.s >= 0; })
        .sort(function (a, b) { return b.s - a.s; })
        .slice(0, 12);

      if (empty) empty.hidden = results.length !== 0;

      results.forEach(function (r, i) {
        var li = document.createElement('li');
        li.setAttribute('role', 'option');
        li.setAttribute('aria-selected', 'false');
        li.className = 'search-result';

        var a = document.createElement('a');
        a.href = r.item.url;
        a.className = 'search-result-link';
        a.innerHTML =
          '<span class="search-result-title"></span>' +
          '<span class="search-result-desc"></span>' +
          '<span class="search-result-meta"></span>';
        a.querySelector('.search-result-title').textContent = r.item.title;
        a.querySelector('.search-result-desc').textContent = r.item.description;
        a.querySelector('.search-result-meta').textContent =
          r.item.categories.join(' · ') + ' · ' + r.item.reading_time + ' min read';

        li.appendChild(a);
        list.appendChild(li);

        a.addEventListener('mouseenter', function () { setActive(i); });
      });
    }

    function setActive(i) {
      var items = list.querySelectorAll('.search-result');
      if (!items.length) return;
      if (active >= 0 && items[active]) items[active].classList.remove('active');
      active = i;
      if (items[active]) {
        items[active].classList.add('active');
        items[active].scrollIntoView({ block: 'nearest' });
      }
    }

    function open() {
      modal.hidden = false;
      modal.setAttribute('aria-hidden', 'false');
      document.body.classList.add('modal-open');
      input.focus();
      input.select();
    }

    function close() {
      modal.hidden = true;
      modal.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('modal-open');
      if (trigger) trigger.focus();
    }

    if (trigger) trigger.addEventListener('click', open);

    modal.querySelectorAll('[data-search-close]').forEach(function (el) {
      el.addEventListener('click', close);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !modal.hidden) { close(); return; }

      if (modal.hidden) {
        // "/" opens search, but not while typing in a field.
        var tag = (e.target.tagName || '').toLowerCase();
        var typing = tag === 'input' || tag === 'textarea' || e.target.isContentEditable;
        if (e.key === '/' && !typing) {
          e.preventDefault();
          open();
        }
        return;
      }

      if (e.key === 'ArrowDown') { e.preventDefault(); setActive(active + 1 < list.children.length ? active + 1 : 0); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); setActive(active - 1 >= 0 ? active - 1 : list.children.length - 1); }
      else if (e.key === 'Enter') {
        var sel = list.querySelector('.search-result.active a');
        if (sel) { e.preventDefault(); window.location.href = sel.href; }
      }
    });

    input.addEventListener('input', function () { render(input.value); });
  }

  /* ---------- Back to top ----------------------------------------- */
  function initBackToTop() {
    var btn = document.getElementById('back-to-top');
    if (!btn) return;
    function update() {
      btn.classList.toggle('visible', window.scrollY > 600);
    }
    window.addEventListener('scroll', update, { passive: true });
    btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    update();
  }

  /* ---------- Boot ------------------------------------------------ */
  function init() {
    initTheme();
    initNav();
    initReveal();
    initCounters();
    initProgress();
    initCopyButtons();
    initToc();
    initFilters();
    initSearch();
    initBackToTop();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
