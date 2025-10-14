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
        
        productosGrid.innerHTML = productosFiltrados.map(producto => `
            <div class="producto-card" data-producto-id="${producto.id}">
                <div class="producto-icon">
                    <i class="${producto.imagen}"></i>
                </div>
                ${producto.destacado ? '<span class="producto-badge">Destacado</span>' : ''}
                <h3>${producto.nombre}</h3>
                <p>${producto.descripcion}</p>
                <div class="producto-precio">
                    <span class="precio-label">Precio:</span>
                    <span class="precio-valor">$${this.formatearPrecio(producto.precio)}</span>
                    <span class="precio-nota">(sin IVA)</span>
                </div>
                <ul class="producto-features">
                    ${producto.especificaciones.slice(0, 4).map(spec => `
                        <li><i class="fas fa-check"></i> ${spec}</li>
                    `).join('')}
                </ul>
                <button class="btn-producto" data-producto-id="${producto.id}">Ver detalles</button>
            </div>
        `).join('');
        
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
        modal.innerHTML = `
            <div class="modal-overlay"></div>
            <div class="modal-content">
                <button class="modal-close">&times;</button>
                <div class="modal-header">
                    <div class="modal-icon">
                        <i class="${producto.imagen}"></i>
                    </div>
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
        
        return modal;
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
