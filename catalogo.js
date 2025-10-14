// Gestor del catálogo de productos
class CatalogoManager {
    constructor() {
        this.productos = productos || [];
        this.categorias = categorias || {};
        this.categoriaActual = 'plataforma'; // Inicializa con plataformas
        this.productosPorPagina = 12;
        this.paginaActual = 1;
    }

    // Inicializar el catálogo
    init() {
        console.log('Iniciando renderizado del catálogo...');
        this.renderFiltros();
        console.log('Filtros renderizados');
        this.attachEventListeners();
        console.log('Event listeners adjuntados');
        this.renderProductos(); // Renderizar productos DESPUÉS de los event listeners
        console.log('Productos renderizados');
        this.renderNotaPrecios(); // Renderizar nota al final
    }

    // Renderizar filtros de categorías
    renderFiltros() {
        const catalogoSection = document.querySelector('#catalogo .container');
        const subtitle = catalogoSection.querySelector('.section-subtitle');
        
        // Verificar si ya existen los filtros
        const filtrosExistentes = catalogoSection.querySelector('.catalogo-filtros');
        if (filtrosExistentes) {
            filtrosExistentes.remove();
        }
        
        const filtrosHTML = `
            <div class="catalogo-filtros">
                ${Object.entries(this.categorias).map(([key, value]) => `
                    <button class="filtro-btn ${key === this.categoriaActual ? 'active' : ''}" data-categoria="${key}">
                        ${value}
                    </button>
                `).join('')}
            </div>
        `;
        
        subtitle.insertAdjacentHTML('afterend', filtrosHTML);
    }

    // Renderizar productos
    renderProductos() {
        const productosGrid = document.querySelector('.productos-grid');
        
        if (!productosGrid) {
            console.error('No se encontró el contenedor .productos-grid');
            return;
        }
        
        const productosFiltrados = this.filtrarProductos();
        console.log('Productos filtrados:', productosFiltrados);
        console.log('Categoría actual:', this.categoriaActual);
        
        productosGrid.innerHTML = productosFiltrados.map(producto => {
            const imagenes = producto.imagenes || [producto.imagen];
            const tieneGaleria = imagenes.length > 1;
            
            return `
            <div class="producto-card" data-producto-id="${producto.id}">
                <div class="producto-imagen-container ${tieneGaleria ? 'tiene-galeria' : ''}">
                    <div class="producto-imagen">
                        <img src="${imagenes[0]}" alt="${producto.nombre}" loading="lazy" data-imagen-index="0">
                    </div>
                    ${tieneGaleria ? `
                        <div class="card-galeria-indicadores">
                            ${imagenes.map((_, index) => `
                                <span class="card-indicador ${index === 0 ? 'active' : ''}" data-index="${index}"></span>
                            `).join('')}
                        </div>
                    ` : ''}
                </div>
                ${producto.destacado ? '<span class="producto-badge">Destacado</span>' : ''}
                <h3>${producto.nombre}</h3>
                <p>${producto.descripcion}</p>
                <div class="producto-precio">
                    <span class="precio-valor">$${this.formatearPrecio(producto.precio)} <span class="precio-nota">(sin IVA)</span></span>
                </div>
                <ul class="producto-features">
                    ${producto.especificaciones.slice(0, 4).map(spec => `
                        <li><i class="fas fa-check"></i> ${spec}</li>
                    `).join('')}
                </ul>
                <button class="btn-producto" data-producto-id="${producto.id}">Ver detalles</button>
            </div>
            `;
        }).join('');
        
        this.attachProductEventListeners();
    }

    // Filtrar productos por categoría
    filtrarProductos() {
        return this.productos.filter(p => p.categoria === this.categoriaActual);
    }

    // Formatear precio
    formatearPrecio(precio) {
        return precio.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    }

    // Renderizar nota de precios
    renderNotaPrecios() {
        const catalogoSection = document.querySelector('#catalogo .container');
        
        // Verificar si ya existe la nota
        const notaExistente = catalogoSection.querySelector('.nota-precios');
        if (notaExistente) {
            notaExistente.remove();
        }
        
        const notaHTML = `
            <div class="nota-precios">
                <i class="fas fa-info-circle"></i>
                <p>${notaPrecios}</p>
            </div>
        `;
        
        catalogoSection.insertAdjacentHTML('beforeend', notaHTML);
    }

    // Adjuntar event listeners
    attachEventListeners() {
        // Filtros de categoría
        document.querySelectorAll('.filtro-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const categoria = e.target.dataset.categoria;
                this.cambiarCategoria(categoria);
            });
        });
    }

    // Adjuntar event listeners a productos
    attachProductEventListeners() {
        document.querySelectorAll('.btn-producto').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const productoId = parseInt(e.target.dataset.productoId);
                this.mostrarDetalleProducto(productoId);
            });
        });
        
        // Event listeners para las imágenes principales
        document.querySelectorAll('.producto-imagen img').forEach(img => {
            img.style.cursor = 'pointer';
            img.addEventListener('click', (e) => {
                e.stopPropagation();
                this.mostrarImagenCompleta(e.target.src, e.target.alt);
            });
        });
        
        // Carrusel en las tarjetas de productos
        document.querySelectorAll('.producto-card').forEach(card => {
            const productoId = parseInt(card.dataset.productoId);
            const producto = this.productos.find(p => p.id === productoId);
            const imagenes = producto?.imagenes || [producto?.imagen];
            
            if (imagenes.length > 1) {
                const img = card.querySelector('.producto-imagen img');
                const indicadores = card.querySelectorAll('.card-indicador');
                
                indicadores.forEach((indicador, index) => {
                    indicador.addEventListener('click', (e) => {
                        e.stopPropagation();
                        img.src = imagenes[index];
                        img.setAttribute('data-imagen-index', index);
                        
                        // Actualizar indicadores
                        indicadores.forEach((ind, i) => {
                            ind.classList.toggle('active', i === index);
                        });
                    });
                });
            }
        });
    }
    
    // Mostrar imagen completa en lightbox
    mostrarImagenCompleta(src, alt) {
        const lightbox = document.createElement('div');
        lightbox.className = 'imagen-lightbox';
        lightbox.innerHTML = `
            <div class="lightbox-overlay"></div>
            <div class="lightbox-contenido">
                <button class="lightbox-close">&times;</button>
                <img src="${src}" alt="${alt}" loading="eager">
                <p class="lightbox-caption">${alt}</p>
            </div>
        `;
        
        document.body.appendChild(lightbox);
        
        // Prevenir scroll del body
        document.body.style.overflow = 'hidden';
        
        // Animar entrada
        setTimeout(() => {
            lightbox.classList.add('active');
        }, 10);
        
        // Event listeners para cerrar
        const cerrarLightbox = () => {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
            setTimeout(() => {
                if (document.body.contains(lightbox)) {
                    document.body.removeChild(lightbox);
                }
            }, 300);
        };
        
        lightbox.querySelector('.lightbox-close').addEventListener('click', cerrarLightbox);
        lightbox.querySelector('.lightbox-overlay').addEventListener('click', cerrarLightbox);
        
        // Cerrar con tecla ESC
        const handleEsc = (e) => {
            if (e.key === 'Escape') {
                cerrarLightbox();
                document.removeEventListener('keydown', handleEsc);
            }
        };
        document.addEventListener('keydown', handleEsc);
    }

    // Cambiar categoría
    cambiarCategoria(categoria) {
        this.categoriaActual = categoria;
        
        // Actualizar botones activos
        document.querySelectorAll('.filtro-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.categoria === categoria) {
                btn.classList.add('active');
            }
        });
        
        // Re-renderizar productos
        this.renderProductos();
        
        // Scroll suave a la grid
        const productosGrid = document.querySelector('.productos-grid');
        productosGrid.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    // Mostrar detalle del producto
    mostrarDetalleProducto(productoId) {
        const producto = this.productos.find(p => p.id === productoId);
        
        if (!producto) return;
        
        const modal = this.crearModalDetalle(producto);
        document.body.appendChild(modal);
        
        // Animar entrada
        setTimeout(() => {
            modal.classList.add('active');
        }, 10);
        
        // Event listener para cerrar
        modal.querySelector('.modal-close').addEventListener('click', () => {
            this.cerrarModal(modal);
        });
        
        modal.querySelector('.modal-overlay').addEventListener('click', () => {
            this.cerrarModal(modal);
        });
        
        // Botón de contacto
        modal.querySelector('.btn-contactar').addEventListener('click', () => {
            this.cerrarModal(modal);
            setTimeout(() => {
                document.querySelector('#contacto').scrollIntoView({ behavior: 'smooth' });
            }, 300);
        });
    }

    // Crear modal de detalle
    crearModalDetalle(producto) {
        const modal = document.createElement('div');
        modal.className = 'producto-modal';
        
        // Crear galería de imágenes si hay múltiples
        const imagenes = producto.imagenes || [producto.imagen];
        const galeriaHTML = imagenes.length > 1 ? `
            <div class="modal-galeria">
                <div class="modal-imagen imagen-clickeable" title="Click para ver imagen completa">
                    <img src="${imagenes[0]}" alt="${producto.nombre}" data-imagen-index="0">
                    <div class="imagen-zoom-hint"><i class="fas fa-search-plus"></i></div>
                </div>
                <div class="galeria-indicadores">
                    ${imagenes.map((_, index) => `
                        <span class="indicador ${index === 0 ? 'active' : ''}" data-index="${index}"></span>
                    `).join('')}
                </div>
            </div>
        ` : `
            <div class="modal-imagen imagen-clickeable" title="Click para ver imagen completa">
                <img src="${producto.imagen}" alt="${producto.nombre}">
                <div class="imagen-zoom-hint"><i class="fas fa-search-plus"></i></div>
            </div>
        `;
        
        modal.innerHTML = `
            <div class="modal-overlay"></div>
            <div class="modal-content">
                <button class="modal-close">&times;</button>
                <div class="modal-header">
                    ${galeriaHTML}
                    <div>
                        <h2>${producto.nombre}</h2>
                        <div class="modal-precio">
                            <span class="precio-valor">$${this.formatearPrecio(producto.precio)}</span>
                            <span class="precio-nota">(sin IVA)</span>
                        </div>
                    </div>
                </div>
                <div class="modal-body">
                    <p class="modal-descripcion">${producto.descripcion}</p>
                    <h3>Especificaciones Técnicas</h3>
                    <ul class="modal-especificaciones">
                        ${producto.especificaciones.map(spec => `
                            <li><i class="fas fa-check-circle"></i> ${spec}</li>
                        `).join('')}
                    </ul>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-primary btn-contactar">
                        <i class="fas fa-envelope"></i>
                        Solicitar cotización
                    </button>
                    <button class="btn btn-secondary modal-close-btn">Cerrar</button>
                </div>
            </div>
        `;
        
        // Event listener para botón cerrar del footer
        modal.querySelector('.modal-close-btn').addEventListener('click', () => {
            this.cerrarModal(modal);
        });
        
        // Event listener para ampliar imagen al hacer clic
        const imagenActual = modal.querySelector('.modal-imagen img');
        modal.querySelector('.modal-imagen').addEventListener('click', () => {
            this.mostrarImagenCompleta(imagenActual.src, producto.nombre);
        });
        
        // Funcionalidad de carrusel si hay múltiples imágenes
        const imagenesProducto = producto.imagenes || [producto.imagen];
        if (imagenesProducto.length > 1) {
            const img = modal.querySelector('.modal-imagen img');
            const indicadores = modal.querySelectorAll('.indicador');
            
            // Indicadores clickeables
            indicadores.forEach((indicador, index) => {
                indicador.addEventListener('click', (e) => {
                    e.stopPropagation();
                    img.src = imagenesProducto[index];
                    img.setAttribute('data-imagen-index', index);
                    
                    // Actualizar indicadores
                    indicadores.forEach((ind, i) => {
                        ind.classList.toggle('active', i === index);
                    });
                });
            });
        }
        
        return modal;
    }

    // Mostrar imagen completa en lightbox
    mostrarImagenCompleta(imagenUrl, nombreProducto) {
        const lightbox = document.createElement('div');
        lightbox.className = 'imagen-lightbox';
        lightbox.innerHTML = `
            <div class="lightbox-overlay"></div>
            <div class="lightbox-content">
                <button class="lightbox-close">&times;</button>
                <img src="${imagenUrl}" alt="${nombreProducto}">
                <p class="lightbox-caption">${nombreProducto}</p>
            </div>
        `;
        
        document.body.appendChild(lightbox);
        
        // Animar entrada
        setTimeout(() => {
            lightbox.classList.add('active');
        }, 10);
        
        // Cerrar al hacer clic en el overlay, botón o presionar ESC
        const cerrarLightbox = () => {
            lightbox.classList.remove('active');
            setTimeout(() => {
                if (document.body.contains(lightbox)) {
                    document.body.removeChild(lightbox);
                }
            }, 300);
        };
        
        lightbox.querySelector('.lightbox-close').addEventListener('click', cerrarLightbox);
        lightbox.querySelector('.lightbox-overlay').addEventListener('click', cerrarLightbox);
        
        document.addEventListener('keydown', function escHandler(e) {
            if (e.key === 'Escape') {
                cerrarLightbox();
                document.removeEventListener('keydown', escHandler);
            }
        });
    }

    // Cerrar modal
    cerrarModal(modal) {
        modal.classList.remove('active');
        setTimeout(() => {
            if (document.body.contains(modal)) {
                document.body.removeChild(modal);
            }
        }, 300);
    }
}

// Inicializar catálogo cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM cargado, inicializando catálogo...');
    console.log('Productos disponibles:', typeof productos !== 'undefined');
    console.log('Categorías disponibles:', typeof categorias !== 'undefined');
    
    // Esperar a que productos.js esté cargado
    if (typeof productos !== 'undefined' && typeof categorias !== 'undefined') {
        console.log('Creando instancia de CatalogoManager...');
        const catalogo = new CatalogoManager();
        catalogo.init();
        console.log('Catálogo inicializado');
    } else {
        console.error('Error: productos.js no se ha cargado correctamente');
    }
});
