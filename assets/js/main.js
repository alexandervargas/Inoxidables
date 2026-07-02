(function () {
  "use strict";

  /* Preloader */
  window.addEventListener('load', function () {
    var preloader = document.getElementById('preloader');
    if (preloader) {
      preloader.style.transition = 'opacity 0.5s ease';
      preloader.style.opacity = '0';
      setTimeout(function () {
        if (preloader.parentNode) preloader.parentNode.removeChild(preloader);
      }, 500);
    }
  });

  /* Navbar collapse on mobile */
  document.addEventListener('click', function (e) {
    var toggle = e.target.closest('.navbar-toggle');
    if (toggle) {
      document.querySelector('.navbar-collapse').classList.toggle('in');
    }
  });
  document.addEventListener('click', function (e) {
    var collapse = document.querySelector('.navbar-collapse.in');
    if (collapse && e.target.closest('a') && !e.target.closest('.dropdown-toggle')) {
      collapse.classList.remove('in');
    }
  });

  /* Scrollspy */
  function updateScrollspy() {
    var scrollPos = window.scrollY;
    document.querySelectorAll('.navbar-nav li a').forEach(function (link) {
      var section = document.querySelector(link.getAttribute('href'));
      if (section) {
        var top = section.offsetTop - 200;
        var bottom = top + section.offsetHeight;
        link.parentElement.classList.toggle('active', scrollPos >= top && scrollPos < bottom);
      }
    });
  }
  window.addEventListener('scroll', updateScrollspy);

  /* Sticky header */
  var sticker = document.getElementById('sticker');
  if (sticker) {
    var stickerTop = sticker.offsetTop;
    window.addEventListener('scroll', function () {
      sticker.classList.toggle('stick', window.scrollY > stickerTop);
    });
  }

  /* Smooth scroll */
  document.addEventListener('click', function (e) {
    var anchor = e.target.closest('a.page-scroll');
    if (anchor) {
      e.preventDefault();
      var target = document.querySelector(anchor.getAttribute('href'));
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });

  /* ScrollUp button */
  var scrollUpBtn = document.createElement('a');
  scrollUpBtn.id = 'scrollUp';
  scrollUpBtn.href = '#';
  scrollUpBtn.style.display = 'none';
  scrollUpBtn.style.position = 'fixed';
  scrollUpBtn.style.bottom = '30px';
  scrollUpBtn.style.right = '30px';
  scrollUpBtn.style.width = '35px';
  scrollUpBtn.style.height = '35px';
  scrollUpBtn.style.lineHeight = '35px';
  scrollUpBtn.style.textAlign = 'center';
  scrollUpBtn.style.fontSize = '24px';
  scrollUpBtn.style.color = '#fff';
  scrollUpBtn.style.borderRadius = '5px';
  scrollUpBtn.style.zIndex = '999';
  scrollUpBtn.style.cursor = 'pointer';
  scrollUpBtn.innerHTML = '<i class="fa fa-angle-up"></i>';
  document.body.appendChild(scrollUpBtn);
  window.addEventListener('scroll', function () {
    scrollUpBtn.style.display = window.scrollY > 300 ? '' : 'none';
  });
  scrollUpBtn.addEventListener('click', function (e) {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* Word animation (cd-headline clip) */
  (function initHeadline() {
    var wrapper = document.querySelector('.cd-headline.clip .cd-words-wrapper');
    if (!wrapper) return;
    var words = wrapper.querySelectorAll('b');
    if (words.length < 2) return;
    var visible = wrapper.querySelector('.is-visible') || words[0];
    wrapper.style.width = visible.offsetWidth + 10 + 'px';
    var current = Array.prototype.indexOf.call(words, visible);
    current = current < 0 ? 0 : current;
    setInterval(function () {
      var next = (current + 1) % words.length;
      wrapper.style.transition = 'width 0.5s ease';
      wrapper.style.width = '2px';
      setTimeout(function () {
        words[current].classList.remove('is-visible');
        words[next].classList.add('is-visible');
        current = next;
        wrapper.style.transition = 'width 0.6s ease';
        wrapper.style.width = words[current].offsetWidth + 10 + 'px';
      }, 500);
    }, 3000);
  })();

  /* Catalog */
  var CATEGORY_LABELS = {
    accesorios: 'Accesorios',
    barandas: 'Barandas Metálicas',
    bombos: 'Bombos',
    desmechadoras: 'Desmechadoras',
    despulpadora: 'Despulpadoras',
    empacadora: 'Empacadoras',
    estufa: 'Estufas',
    licuadora: 'Licuadoras',
    marmita: 'Marmitas',
    mesas: 'Mesas',
    mezcladoras: 'Mezcladoras',
    ollas: 'Ollas',
    sarten: 'Sartenes',
    tanque: 'Tanques'
  };
  var WHATSAPP_NUM = '573134351723';
  var activeFilter = '*';
  var catalogData = [];
  var galleryItems = [];
  var lightboxIndex = -1;

  function renderCatalog(items) {
    var html = '';
    items.forEach(function (item, i) {
      var categoryLabel = CATEGORY_LABELS[item.category] || item.category;
      var waMsg = encodeURIComponent('Hola, me interesa el producto: ' + item.name + ' de Inoxidables William');
      var delay = (i % 12) * 0.04;
      html += '<div class="product-card" data-category="' + item.category + '" style="animation-delay:' + delay + 's">';
      html += '  <div class="product-card-image">';
      html += '    <a class="vbox-item" data-gall="catalog" href="' + item.image + '" title="' + item.name + '">';
      html += '      <img src="' + item.image + '" alt="' + item.name + ' - Inoxidables William" loading="lazy">';
      html += '    </a>';
      html += '  </div>';
      html += '  <div class="product-card-body">';
      html += '    <span class="product-card-category">' + categoryLabel + '</span>';
      html += '    <h3 class="product-card-title">' + item.name + '</h3>';
      if (item.description) {
        html += '    <p class="product-card-desc">' + item.description + '</p>';
      }
      html += '    <a class="product-card-btn" href="https://wa.me/' + WHATSAPP_NUM + '?text=' + waMsg + '" target="_blank" rel="noopener"><i class="fa fa-whatsapp"></i> Solicitar información</a>';
      html += '  </div>';
      html += '</div>';
    });
    return html;
  }

  function filterCatalog(filter) {
    activeFilter = filter;
    document.querySelectorAll('.product-card').forEach(function (card) {
      if (filter === '*' || card.dataset.category === filter) {
        card.classList.remove('hidden');
        card.style.animation = 'none';
        void card.offsetHeight;
        card.style.animation = '';
      } else {
        card.classList.add('hidden');
      }
    });
  }

  function updateFilterCount(items) {
    var total = items.length;
    var container = document.getElementById('catalogContainer');
    document.querySelectorAll('.filter-chip').forEach(function (chip) {
      var filter = chip.dataset.filter;
      var text = chip.textContent.replace(/\s*\(\d+\)$/, '');
      var count = filter === '*' ? total : container.querySelectorAll('.product-card[data-category="' + filter + '"]').length;
      chip.innerHTML = text + ' <span class="filter-count">(' + count + ')</span>';
    });
  }

  /* Lightbox */
  function setupLightbox() {
    galleryItems = [];
    document.querySelectorAll('.vbox-item[data-gall="catalog"]').forEach(function (el) {
      var src = el.getAttribute('href');
      var title = el.getAttribute('title');
      galleryItems.push({ src: src, title: title });
      el.addEventListener('click', function (e) {
        e.preventDefault();
        lightboxIndex = galleryItems.findIndex(function (item) { return item.src === src; });
        openLightbox(lightboxIndex);
      });
    });
  }

  function openLightbox(index) {
    var item = galleryItems[index];
    var lb = document.getElementById('lightbox');
    lb.querySelector('.lightbox-image').src = item.src;
    lb.querySelector('.lightbox-image').alt = item.title;
    lb.querySelector('.lightbox-title').textContent = item.title + ' (' + (index + 1) + '/' + galleryItems.length + ')';
    lb.style.display = 'flex';
    document.body.classList.add('vbox-open');
  }

  function closeLightbox() {
    document.getElementById('lightbox').style.display = 'none';
    document.body.classList.remove('vbox-open');
  }

  /* Lightbox event listeners */
  document.addEventListener('DOMContentLoaded', function () {
    var lb = document.getElementById('lightbox');
    if (!lb) return;
    lb.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
    lb.querySelector('.lightbox-prev').addEventListener('click', function () {
      if (!galleryItems.length) return;
      lightboxIndex = (lightboxIndex - 1 + galleryItems.length) % galleryItems.length;
      openLightbox(lightboxIndex);
    });
    lb.querySelector('.lightbox-next').addEventListener('click', function () {
      if (!galleryItems.length) return;
      lightboxIndex = (lightboxIndex + 1) % galleryItems.length;
      openLightbox(lightboxIndex);
    });
    lb.addEventListener('click', function (e) {
      if (e.target === lb) closeLightbox();
    });
    lb.querySelector('.lightbox-image').addEventListener('click', function () {
      this.classList.toggle('zoomed');
    });
    document.addEventListener('keydown', function (e) {
      if (lb.style.display === 'none' || !lb.style.display) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') lb.querySelector('.lightbox-prev').click();
      if (e.key === 'ArrowRight') lb.querySelector('.lightbox-next').click();
    });
  });

  /* Load catalog */
  document.addEventListener('DOMContentLoaded', function () {
    fetch('assets/data/catalog.json')
      .then(function (r) { return r.json(); })
      .then(function (data) {
        catalogData = data;
        document.getElementById('catalogContainer').innerHTML = renderCatalog(data);
        updateFilterCount(data);
        setupLightbox();
        document.querySelectorAll('.filter-chip').forEach(function (chip) {
          chip.addEventListener('click', function () {
            document.querySelectorAll('.filter-chip').forEach(function (c) { c.classList.remove('active'); });
            this.classList.add('active');
            filterCatalog(this.dataset.filter);
          });
        });
      })
      .catch(function () {
        document.getElementById('catalogContainer').innerHTML = '<p class="text-center" style="padding:60px 20px;color:#999;font-size:16px;">Error al cargar el catálogo. Intente de nuevo más tarde.</p>';
      });
  });
})();
