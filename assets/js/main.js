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
  var navbarToggle = document.querySelector('.navbar-toggle');
  var navbarCollapse = document.querySelector('.navbar-collapse');
  var navbarOverlay = document.querySelector('.navbar-overlay');

  function closeNav() {
    if (navbarToggle) navbarToggle.classList.remove('open');
    if (navbarCollapse) navbarCollapse.classList.remove('open');
    if (navbarOverlay) navbarOverlay.classList.remove('open');
    document.body.classList.remove('no-scroll');
  }

  function openNav() {
    if (navbarToggle) navbarToggle.classList.add('open');
    if (navbarCollapse) navbarCollapse.classList.add('open');
    if (navbarOverlay) navbarOverlay.classList.add('open');
    document.body.classList.add('no-scroll');
  }

  if (navbarToggle && navbarCollapse) {
    navbarToggle.addEventListener('click', function (e) {
      e.stopPropagation();
      if (navbarCollapse.classList.contains('open')) {
        closeNav();
      } else {
        openNav();
      }
    });
  }

  if (navbarOverlay) {
    navbarOverlay.addEventListener('click', closeNav);
  }

  if (navbarCollapse) {
    navbarCollapse.addEventListener('click', function (e) {
      if (e.target.closest('a') && !e.target.closest('.dropdown-toggle')) {
        closeNav();
      }
    });
  }

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && navbarCollapse && navbarCollapse.classList.contains('open')) {
      closeNav();
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

  /* Floating WhatsApp button */
  var waNum = '573134351723';
  var waBtn = document.createElement('a');
  waBtn.id = 'whatsappFloat';
  waBtn.href = 'https://wa.me/' + waNum;
  waBtn.target = '_blank';
  waBtn.rel = 'noopener';
  waBtn.title = 'Escríbenos por WhatsApp';
  waBtn.style.position = 'fixed';
  waBtn.style.bottom = '30px';
  waBtn.style.left = '30px';
  waBtn.style.width = '50px';
  waBtn.style.height = '50px';
  waBtn.style.lineHeight = '50px';
  waBtn.style.textAlign = 'center';
  waBtn.style.fontSize = '28px';
  waBtn.style.color = '#fff';
  waBtn.style.background = '#25D366';
  waBtn.style.borderRadius = '50%';
  waBtn.style.zIndex = '999';
  waBtn.style.cursor = 'pointer';
  waBtn.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)';
  waBtn.innerHTML = '<i class="fa fa-whatsapp"></i>';
  document.body.appendChild(waBtn);

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
      var delay = (i % 12) * 0.04;
      html += '<div class="product-card" data-category="' + item.category + '" data-id="' + i + '" style="animation-delay:' + delay + 's">';
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
      html += '    <button class="product-card-add-btn" data-id="' + i + '" aria-label="Añadir al carrito" title="Añadir al carrito"><i class="fa fa-cart-plus"></i></button>';
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

  /* Cart System */
  var CART_KEY = 'inwo_cart';

  function getCart() {
    try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; }
    catch(e) { return []; }
  }

  function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    updateCartUI();
  }

  function addToCart(id) {
    var product = catalogData[id];
    if (!product) return;
    var cart = getCart();
    var existing = cart.find(function (item) { return item.id === id; });
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ id: id, name: product.name, category: product.category, image: product.image, quantity: 1 });
    }
    saveCart(cart);
    showToast(product.name + ' añadido al carrito');
  }

  function removeFromCart(id) {
    saveCart(getCart().filter(function (item) { return item.id !== id; }));
  }

  function updateQty(id, delta) {
    var cart = getCart();
    var item = cart.find(function (i) { return i.id === id; });
    if (item) {
      item.quantity = Math.max(1, item.quantity + delta);
      if (item.quantity === 0) { removeFromCart(id); return; }
      saveCart(cart);
    }
  }

  function clearCart() { saveCart([]); }

  function getTotalItems() {
    return getCart().reduce(function (s, i) { return s + i.quantity; }, 0);
  }

  function generateWhatsAppMsg() {
    var cart = getCart();
    if (!cart.length) return '';
    var lines = ['Hola, me gustaría recibir una cotización de los siguientes productos:'];
    cart.forEach(function (item) {
      lines.push('- ' + item.name + ' (x' + item.quantity + ')');
    });
    lines.push('Quedo atento a su respuesta. Gracias.');
    return encodeURIComponent(lines.join('\n'));
  }

  function sendWhatsApp() {
    var msg = generateWhatsAppMsg();
    if (msg) window.open('https://wa.me/' + WHATSAPP_NUM + '?text=' + msg, '_blank');
  }

  function renderCart() {
    var cart = getCart();
    var container = document.querySelector('.cart-items');
    var empty = document.querySelector('.cart-empty');
    var footer = document.querySelector('.cart-footer');
    var totalEl = document.querySelector('.cart-total-count');
    if (!container) return;
    if (!cart.length) {
      container.innerHTML = '';
      if (empty) empty.classList.add('show');
      if (footer) footer.classList.remove('show');
      return;
    }
    if (empty) empty.classList.remove('show');
    if (footer) footer.classList.add('show');
    var html = '';
    cart.forEach(function (item) {
      var label = CATEGORY_LABELS[item.category] || item.category;
      html += '<div class="cart-item" data-id="' + item.id + '">';
      html += '  <img class="cart-item-image" src="' + item.image + '" alt="' + item.name + '" loading="lazy">';
      html += '  <div class="cart-item-info">';
      html += '    <div class="cart-item-name">' + item.name + '</div>';
      html += '    <div class="cart-item-category">' + label + '</div>';
      html += '    <div class="cart-item-controls">';
      html += '      <button class="cart-item-qty-btn" data-action="dec">-</button>';
      html += '      <span class="cart-item-qty">' + item.quantity + '</span>';
      html += '      <button class="cart-item-qty-btn" data-action="inc">+</button>';
      html += '    </div>';
      html += '  </div>';
      html += '  <button class="cart-item-remove" data-action="remove">&times;</button>';
      html += '</div>';
    });
    container.innerHTML = html;
    if (totalEl) totalEl.textContent = getTotalItems();
  }

  function updateCartUI() {
    var badge = document.querySelector('.cart-badge');
    if (badge) {
      badge.textContent = getTotalItems();
      badge.classList.remove('bounce');
      void badge.offsetWidth;
      badge.classList.add('bounce');
    }
    renderCart();
  }

  function showToast(msg) {
    var existing = document.querySelector('.cart-toast');
    if (existing) existing.remove();
    var toast = document.createElement('div');
    toast.className = 'cart-toast';
    toast.textContent = msg;
    document.body.appendChild(toast);
    requestAnimationFrame(function () { toast.classList.add('show'); });
    setTimeout(function () {
      toast.classList.remove('show');
      setTimeout(function () { toast.remove(); }, 300);
    }, 2000);
  }

  /* Cart event handlers */
  document.addEventListener('DOMContentLoaded', function () {
    /* Add to cart */
    document.getElementById('catalogContainer').addEventListener('click', function (e) {
      var btn = e.target.closest('.product-card-add-btn');
      if (btn && !btn.disabled) {
        var origHTML = btn.innerHTML;
        btn.disabled = true;
        btn.innerHTML = '<span class="btn-spinner"></span>';

        setTimeout(function () {
          addToCart(parseInt(btn.dataset.id, 10));
          btn.innerHTML = '<span class="btn-check">&#10003;</span>';

          setTimeout(function () {
            btn.disabled = false;
            btn.innerHTML = origHTML;
          }, 500);
        }, 400);
      }
    });

    /* Cart toggle */
    var cartToggle = document.querySelector('.cart-toggle');
    var cartPanel = document.querySelector('.cart-panel');
    var cartOverlay = document.querySelector('.cart-overlay');
    var cartClose = document.querySelector('.cart-close');

    function openCart() {
      if (cartPanel) cartPanel.classList.add('open');
      if (cartOverlay) cartOverlay.classList.add('open');
      document.body.classList.add('no-scroll');
      renderCart();
    }

    function closeCart() {
      if (cartPanel) cartPanel.classList.remove('open');
      if (cartOverlay) cartOverlay.classList.remove('open');
      document.body.classList.remove('no-scroll');
    }

    if (cartToggle) cartToggle.addEventListener('click', openCart);
    if (cartClose) cartClose.addEventListener('click', closeCart);
    if (cartOverlay) cartOverlay.addEventListener('click', closeCart);

    /* Cart item controls */
    var cartContainer = document.querySelector('.cart-items');
    if (cartContainer) {
      cartContainer.addEventListener('click', function (e) {
        var btn = e.target.closest('button');
        if (!btn) return;
        var item = btn.closest('.cart-item');
        if (!item) return;
        var id = parseInt(item.dataset.id, 10);
        if (btn.dataset.action === 'inc') { updateQty(id, 1); }
        else if (btn.dataset.action === 'dec') {
          var found = getCart().find(function (i) { return i.id === id; });
          if (found && found.quantity <= 1) removeFromCart(id);
          else updateQty(id, -1);
        }
        else if (btn.dataset.action === 'remove') { removeFromCart(id); }
      });
    }

    /* WhatsApp */
    var waBtn = document.querySelector('.cart-whatsapp-btn');
    if (waBtn) waBtn.addEventListener('click', sendWhatsApp);

    /* Clear */
    var clearBtn = document.querySelector('.cart-clear-btn');
    if (clearBtn) clearBtn.addEventListener('click', function () { clearCart(); renderCart(); });

    /* Init badge */
    updateCartUI();
  });

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
