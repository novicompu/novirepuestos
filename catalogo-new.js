// catalogo-new.js - Gestor del catalogo con diseño Tailwind
var categoryLabels = {
        plataforma: 'PLATAFORMAS',
        ejes: 'EJES & TREN MOTRIZ',
        suspension: 'SUSPENSIÓN',
        frenos: 'FRENOS',
        aros: 'AROS',
        accesorios: 'ACCESORIOS'
    };

    var selectedCategories = new Set();
    var searchQuery = '';

    //  Galería por tarjeta 
    function buildGallery(p) {
        var imgs = (p.imagenes && p.imagenes.length > 1) ? p.imagenes : [p.imagen];
        var badge = p.destacado
            ? '<span class="absolute top-2 left-2 bg-gray-900 text-primary text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded z-20">Destacado</span>'
            : '';
        var arrows = imgs.length > 1
            ? '<button type="button" data-dir="-1" class="gallery-arrow absolute left-1.5 top-1/2 -translate-y-1/2 z-20 bg-black/40 hover:bg-black/70 text-white rounded-full w-7 h-7 flex items-center justify-center transition"><span class="material-symbols-outlined text-[18px]">chevron_left</span></button>'
              + '<button type="button" data-dir="1" class="gallery-arrow absolute right-1.5 top-1/2 -translate-y-1/2 z-20 bg-black/40 hover:bg-black/70 text-white rounded-full w-7 h-7 flex items-center justify-center transition"><span class="material-symbols-outlined text-[18px]">chevron_right</span></button>'
            : '';
        var mainImg = '<img class="gallery-main w-full h-full object-contain transition-opacity duration-300 rounded-sm" src="' + imgs[0] + '" alt="' + p.nombre + '" data-imgs=\'' + JSON.stringify(imgs) + '\' data-idx="0">';
        var dots = imgs.length > 1
            ? '<div class="gallery-dots absolute bottom-2 left-0 right-0 flex justify-center gap-1.5 z-20">'
              + imgs.map(function(_, i) {
                  return '<button type="button" data-dot="' + i + '" class="gallery-dot w-1.5 h-1.5 rounded-full transition-all ' + (i === 0 ? 'bg-primary w-3' : 'bg-white/60') + '"></button>';
              }).join('')
              + '</div>'
            : '';
        var thumbs = imgs.length > 1
            ? '<div class="flex gap-1.5 px-2 pb-2 overflow-x-auto" style="scrollbar-width:none">'
              + imgs.map(function(src, i) {
                  return '<button type="button" data-thumb="' + i + '" class="gallery-thumb flex-shrink-0 w-12 h-12 rounded border-2 overflow-hidden transition-all ' + (i === 0 ? 'border-primary' : 'border-transparent opacity-60') + '">'
                    + '<img src="' + src + '" class="w-full h-full object-cover" alt="miniatura ' + (i+1) + '">'
                    + '</button>';
              }).join('')
              + '</div>'
            : '';

        return '<div class="relative h-56 bg-gray-100 dark:bg-gray-800 overflow-hidden">'
            + badge + arrows
            + mainImg
            + dots
            + '</div>';
    }

    //  Card completa 
    function buildProductCard(p) {
        var waMsg = encodeURIComponent('Hola, me interesa el producto: ' + p.nombre + '. Podrían cotizarme?');
        var waLink = 'https://api.whatsapp.com/send/?phone=%2B593984062784&text=' + waMsg + '&app_absent=0';
        var price = '$' + p.precio.toLocaleString('es-EC', {minimumFractionDigits: 2, maximumFractionDigits: 2});
        var catLabel = categoryLabels[p.categoria] || p.categoria.toUpperCase();
        var specs = p.especificaciones || [];
        var gallery = buildGallery(p);

        // Especificaciones: primeras 5 directas, el resto colapsable
        var specsVisible = specs.slice(0, 4).map(function(s) {
            return '<li class="flex items-start gap-1.5"><span class="material-symbols-outlined text-[14px] text-secondary mt-0.5 flex-shrink-0">check_circle</span><span>' + s + '</span></li>';
        }).join('');
        var specsHidden = specs.length > 4
            ? '<div class="specs-extra hidden text-xs text-gray-700 dark:text-gray-300 space-y-1 mt-1">'
              + specs.slice(4).map(function(s) {
                  return '<li class="flex items-start gap-1.5"><span class="material-symbols-outlined text-[14px] text-secondary mt-0.5 flex-shrink-0">check_circle</span><span>' + s + '</span></li>';
              }).join('')
              + '</div>'
              + '<button type="button" class="specs-toggle text-xs text-secondary hover:text-primary font-semibold mt-2 flex items-center gap-0.5 transition">'
              + '<span class="specs-toggle-icon material-symbols-outlined text-[14px]">expand_more</span>'
              + '<span class="specs-toggle-label">Ver ' + (specs.length - 4) + ' especificaciones más</span></button>'
            : '';

        return '<div class="product-card flex-1 bg-white dark:bg-surface-dark border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300 group flex flex-col">'
            // Galería
            + gallery
            // Cuerpo
            + '<div class="p-4 flex-1 flex flex-col">'
            // Categoría
            + '<div class="text-[11px] font-bold text-secondary tracking-wider uppercase">' + catLabel + '</div>'
            // Nombre
            + '<h3 class="font-bold text-gray-900 dark:text-white text-lg leading-tight mb-3 group-hover:text-primary transition-colors">' + p.nombre + '</h3>'
            // Especificaciones
            + (specs.length > 0
                ? '<div class="mt-1"><ul class="text-xs text-gray-700 dark:text-gray-300 space-y-1 list-none">' + specsVisible + '</ul>' + specsHidden + '</div>'
                : '')
            // Precio + CTA
            + '<div class="mt-auto pt-3 border-t border-gray-100 dark:border-gray-700">'
            + '<div class="flex justify-between items-end mb-3">'
            + '<div><p class="text-[10px] text-gray-400 uppercase tracking-wide font-medium">Precio (sin IVA)</p>'
            + '<p class="text-xl font-black text-gray-900 dark:text-white">' + price + '</p></div>'
            + '<span class="text-xs text-green-600 bg-green-100 dark:bg-green-900/50 dark:text-green-300 px-2 py-0.5 rounded-full font-semibold">En Stock</span>'
            + '</div>'
            + '<a href="' + waLink + '" target="_blank" data-product-id="' + p.id + '" data-product-name="' + p.nombre + '" data-product-price="' + p.precio + '" data-product-cat="' + (categoryLabels[p.categoria] || p.categoria) + '" class="wa-catalog-btn w-full bg-white dark:bg-transparent border-2 border-green-500 text-green-600 hover:bg-green-600 hover:text-white font-bold py-2.5 px-3 rounded-lg flex items-center justify-center gap-2 text-sm transition-all duration-200 group-hover:bg-green-600 group-hover:text-white">'
            + '<span class="material-symbols-outlined text-[18px]">chat</span>Cotizar por WhatsApp'
            + '</a>'
            + '<a href="producto.html?id=' + p.id + '&slug=' + (p.slug || '') + '" data-product-id="' + p.id + '" data-product-name="' + p.nombre + '" data-product-price="' + p.precio + '" data-product-cat="' + (categoryLabels[p.categoria] || p.categoria) + '" class="detail-catalog-btn mt-2 w-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-primary hover:text-gray-900 font-semibold py-2 px-3 rounded-lg flex items-center justify-center gap-2 text-sm transition-all duration-200">'
            + '<span class="material-symbols-outlined text-[16px]">open_in_new</span>Ver detalle del producto'
            + '</a>'
            + '</div>'
            + '</div>'
            + '</div>';
    }

    //  Render 
    function renderProducts() {
        var grid = document.getElementById('products-grid');
        var countEl = document.getElementById('products-count');
        if (!grid) return;

        var filtered = productos.slice();
        if (selectedCategories.size > 0) {
            filtered = filtered.filter(function(p) { return selectedCategories.has(p.categoria); });
        }
        if (searchQuery.trim()) {
            var q = searchQuery.trim().toLowerCase();
            filtered = filtered.filter(function(p) {
                return p.nombre.toLowerCase().includes(q)
                    || p.descripcion.toLowerCase().includes(q)
                    || (p.especificaciones || []).some(function(s) { return s.toLowerCase().includes(q); });
            });
        }

        if (countEl) countEl.textContent = filtered.length + ' producto' + (filtered.length !== 1 ? 's' : '') + ' encontrado' + (filtered.length !== 1 ? 's' : '');

        if (filtered.length === 0) {
            grid.innerHTML = '<div class="col-span-full text-center py-16 text-gray-500">'
                + '<span class="material-symbols-outlined text-6xl mb-4 block text-gray-300">search_off</span>'
                + '<p class="font-medium">No se encontraron productos con los filtros aplicados.</p>'
                + '<button onclick="document.getElementById(\'clear-filters\').click()" class="mt-4 text-secondary hover:underline text-sm font-medium">Limpiar filtros</button>'
                + '</div>';
            return;
        }

        grid.innerHTML = filtered.map(buildProductCard).join('');
        attachCardEvents(grid);
    }

    //  Lightbox 
    var lbImgs = [], lbIdx = 0;
    (function createLightbox() {
        var lb = document.createElement('div');
        lb.id = 'lightbox-overlay';
        lb.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,.92);z-index:9999;display:none;align-items:center;justify-content:center';
        lb.innerHTML =
            '<button id="lb-close" style="position:absolute;top:16px;right:16px;width:40px;height:40px;border-radius:50%;background:rgba(255,255,255,.15);border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:.2s" onmouseover="this.style.background=\'rgba(255,255,255,.3)\'" onmouseout="this.style.background=\'rgba(255,255,255,.15)\'">'
            + '<span class="material-symbols-outlined" style="color:#fff;font-size:22px">close</span></button>'
            + '<button id="lb-prev" style="position:absolute;left:16px;top:50%;transform:translateY(-50%);width:44px;height:44px;border-radius:50%;background:rgba(255,255,255,.15);border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:.2s" onmouseover="this.style.background=\'rgba(255,255,255,.3)\'" onmouseout="this.style.background=\'rgba(255,255,255,.15)\'">'
            + '<span class="material-symbols-outlined" style="color:#fff;font-size:26px">chevron_left</span></button>'
            + '<img id="lb-img" style="max-height:90vh;max-width:90vw;object-fit:contain;border-radius:8px;box-shadow:0 8px 40px rgba(0,0,0,.6)" src="" alt="">'
            + '<button id="lb-next" style="position:absolute;right:16px;top:50%;transform:translateY(-50%);width:44px;height:44px;border-radius:50%;background:rgba(255,255,255,.15);border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:.2s" onmouseover="this.style.background=\'rgba(255,255,255,.3)\'" onmouseout="this.style.background=\'rgba(255,255,255,.15)\'">'
            + '<span class="material-symbols-outlined" style="color:#fff;font-size:26px">chevron_right</span></button>'
            + '<div id="lb-counter" style="position:absolute;bottom:16px;left:50%;transform:translateX(-50%);color:rgba(255,255,255,.7);font-size:13px;font-family:Inter,sans-serif"></div>';
        document.body.appendChild(lb);

        function updateLb() {
            document.getElementById('lb-img').src = lbImgs[lbIdx];
            var c = document.getElementById('lb-counter');
            c.textContent = lbImgs.length > 1 ? (lbIdx + 1) + ' / ' + lbImgs.length : '';
            document.getElementById('lb-prev').style.display = lbImgs.length > 1 ? 'flex' : 'none';
            document.getElementById('lb-next').style.display = lbImgs.length > 1 ? 'flex' : 'none';
        }
        window._openLightbox = function(imgs, idx) {
            lbImgs = imgs; lbIdx = idx;
            updateLb();
            lb.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        };
        function closeLb() { lb.style.display = 'none'; document.body.style.overflow = ''; }
        document.getElementById('lb-close').addEventListener('click', closeLb);
        lb.addEventListener('click', function(e) { if (e.target === lb) closeLb(); });
        document.getElementById('lb-prev').addEventListener('click', function() { lbIdx = (lbIdx - 1 + lbImgs.length) % lbImgs.length; updateLb(); });
        document.getElementById('lb-next').addEventListener('click', function() { lbIdx = (lbIdx + 1) % lbImgs.length; updateLb(); });
        document.addEventListener('keydown', function(e) {
            if (lb.style.display === 'none') return;
            if (e.key === 'Escape') closeLb();
            if (e.key === 'ArrowLeft') { lbIdx = (lbIdx - 1 + lbImgs.length) % lbImgs.length; updateLb(); }
            if (e.key === 'ArrowRight') { lbIdx = (lbIdx + 1) % lbImgs.length; updateLb(); }
        });
    })();

    //  Eventos de galería y especificaciones 
    function attachCardEvents(grid) {
        // Galería: flechas y dots
        grid.querySelectorAll('.gallery-arrow').forEach(function(btn) {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                var card = btn.closest('.product-card');
                var mainImg = card.querySelector('.gallery-main');
                var imgs = JSON.parse(mainImg.dataset.imgs);
                var idx = parseInt(mainImg.dataset.idx);
                idx = (idx + parseInt(btn.dataset.dir) + imgs.length) % imgs.length;
                setGalleryImage(card, mainImg, imgs, idx);
            });
        });

        grid.querySelectorAll('.gallery-dot').forEach(function(btn) {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                var card = btn.closest('.product-card');
                var mainImg = card.querySelector('.gallery-main');
                var imgs = JSON.parse(mainImg.dataset.imgs);
                setGalleryImage(card, mainImg, imgs, parseInt(btn.dataset.dot));
            });
        });

        grid.querySelectorAll('.gallery-thumb').forEach(function(btn) {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                var card = btn.closest('.product-card');
                var mainImg = card.querySelector('.gallery-main');
                var imgs = JSON.parse(mainImg.dataset.imgs);
                setGalleryImage(card, mainImg, imgs, parseInt(btn.dataset.thumb));
            });
        });

        // Lightbox al hacer clic en la imagen
        grid.querySelectorAll('.gallery-main').forEach(function(img) {
            img.style.cursor = 'zoom-in';
            img.addEventListener('click', function() {
                var imgs = JSON.parse(img.dataset.imgs);
                var idx = parseInt(img.dataset.idx);
                window._openLightbox(imgs, idx);
            });
        });

        // Especificaciones: toggle
        grid.querySelectorAll('.specs-toggle').forEach(function(btn) {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                var extra = btn.previousElementSibling;
                var icon = btn.querySelector('.specs-toggle-icon');
                var label = btn.querySelector('.specs-toggle-label');
                var isOpen = !extra.classList.contains('hidden');
                extra.classList.toggle('hidden', isOpen);
                icon.textContent = isOpen ? 'expand_more' : 'expand_less';
                var hidden = parseInt(btn.dataset && btn.dataset.hidden) || parseInt(label.textContent.match(/\d+/)?.[0]) || 0;
                label.textContent = isOpen ? 'Ver ' + hidden + ' especificaciones más' : 'Ocultar';
                if (!btn.dataset.hidden) btn.dataset.hidden = hidden;
            });
        });

        // GTM + Pixel: WhatsApp desde catálogo
        grid.querySelectorAll('.wa-catalog-btn').forEach(function(btn) {
            btn.addEventListener('click', function() {
                var id = btn.dataset.productId;
                var name = btn.dataset.productName;
                var price = parseFloat(btn.dataset.productPrice);
                var cat = btn.dataset.productCat;
                window.dataLayer = window.dataLayer || [];
                window.dataLayer.push({
                    event: 'generate_lead',
                    lead_source: 'whatsapp',
                    lead_type: 'catalog_inquiry',
                    product_id: 'NOVI-' + id,
                    product_name: name,
                    product_category: cat,
                    product_price: price
                });
                if (typeof fbq !== 'undefined') {
                    fbq('track', 'Lead', {
                        content_ids: ['NOVI-' + id],
                        content_name: name,
                        content_category: cat,
                        value: price,
                        currency: 'USD'
                    });
                }
            });
        });

        // GTM + Pixel: clic en "Ver detalle del producto"
        grid.querySelectorAll('.detail-catalog-btn').forEach(function(btn) {
            btn.addEventListener('click', function() {
                var id = btn.dataset.productId;
                var name = btn.dataset.productName;
                var price = parseFloat(btn.dataset.productPrice);
                var cat = btn.dataset.productCat;
                window.dataLayer = window.dataLayer || [];
                window.dataLayer.push({ ecommerce: null });
                window.dataLayer.push({
                    event: 'select_item',
                    ecommerce: {
                        currency: 'USD',
                        items: [{
                            item_id: 'NOVI-' + id,
                            item_name: name,
                            item_category: cat,
                            price: price,
                            quantity: 1
                        }]
                    },
                    product_id: 'NOVI-' + id,
                    product_name: name,
                    product_category: cat,
                    product_price: price
                });
                if (typeof fbq !== 'undefined') {
                    fbq('track', 'ViewContent', {
                        content_ids: ['NOVI-' + id],
                        content_name: name,
                        content_category: cat,
                        content_type: 'product',
                        value: price,
                        currency: 'USD'
                    });
                }
            });
        });
    }

    function setGalleryImage(card, mainImg, imgs, idx) {
        mainImg.style.opacity = '0';
        setTimeout(function() {
            mainImg.src = imgs[idx];
            mainImg.dataset.idx = idx;
            mainImg.style.opacity = '1';
        }, 150);
        // dots
        card.querySelectorAll('.gallery-dot').forEach(function(d) {
            var active = parseInt(d.dataset.dot) === idx;
            d.className = 'gallery-dot rounded-full transition-all ' + (active ? 'bg-primary w-3 h-1.5' : 'bg-white/60 w-1.5 h-1.5');
        });
        // thumbs
        card.querySelectorAll('.gallery-thumb').forEach(function(t) {
            var active = parseInt(t.dataset.thumb) === idx;
            t.className = 'gallery-thumb flex-shrink-0 w-12 h-12 rounded border-2 overflow-hidden transition-all ' + (active ? 'border-primary' : 'border-transparent opacity-60');
        });
    }

window.NRCatalog = { buildProductCard: buildProductCard, attachCardEvents: attachCardEvents };

//  Catálogo: filtros y render (solo en página de catálogo)
document.addEventListener('DOMContentLoaded', function() {
    if (typeof productos === 'undefined' || !document.getElementById('products-grid')) return;
    document.querySelectorAll('[data-cat]').forEach(function(checkbox) {
        checkbox.addEventListener('change', function() {
            if (this.checked) { selectedCategories.add(this.dataset.cat); }
            else { selectedCategories.delete(this.dataset.cat); }
            renderProducts();
        });
    });

    var searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            searchQuery = this.value;
            var mobile = document.getElementById('search-input-mobile');
            if (mobile && mobile !== this) mobile.value = this.value;
            renderProducts();
        });
    }

    var searchMobile = document.getElementById('search-input-mobile');
    if (searchMobile) {
        searchMobile.addEventListener('input', function() {
            searchQuery = this.value;
            var desktop = document.getElementById('search-input');
            if (desktop && desktop !== this) desktop.value = this.value;
            renderProducts();
        });
    }

    var clearBtn = document.getElementById('clear-filters');
    if (clearBtn) {
        clearBtn.addEventListener('click', function() {
            selectedCategories.clear();
            searchQuery = '';
            document.querySelectorAll('[data-cat]').forEach(function(cb) { cb.checked = false; });
            var si = document.getElementById('search-input');
            var sm = document.getElementById('search-input-mobile');
            if (si) si.value = '';
            if (sm) sm.value = '';
            renderProducts();
        });
    }

    // Leer parámetro ?cat= de la URL y pre-aplicar filtro
    var urlCat = new URLSearchParams(window.location.search).get('cat');
    if (urlCat) {
        var catValues = urlCat.split(',').map(function(c){ return c.trim().toLowerCase(); });
        catValues.forEach(function(cat) {
            selectedCategories.add(cat);
            var cb = document.querySelector('[data-cat="' + cat + '"]');
            if (cb) { cb.checked = true; }
        });
    }

    // Render inicial
    renderProducts();
});
