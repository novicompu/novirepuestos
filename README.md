# NoviRepuestos - Sitio Web

Sitio web profesional para NoviRepuestos, especialistas en repuestos y plataformas para carga pesada.

## Colores de la marca
- **Azul oscuro (principal)**: #263146
- **Amarillo (acento)**: #dbe31c
- **Gris claro**: #eeedee
- **Blanco**: #ffffff

## Cómo ver la página

1. Abre el archivo `index.html` en tu navegador web favorito
2. O haz doble clic en el archivo `index.html`

## Estructura de Archivos

### HTML
- `index.html` - Página principal con estructura base

### CSS
- `styles.css` - Estilos generales y diseño base
- `catalogo.css` - Estilos específicos para el catálogo y modal de productos

### JavaScript
- `script.js` - Funcionalidad interactiva general (navegación, tabs, formularios)
- `productos.js` - Base de datos de productos del catálogo
- `catalogo.js` - Gestor dinámico del catálogo (filtros, modal, renderizado)

## Características

✅ Diseño responsivo (móvil, tablet, escritorio)
✅ Navegación por pestañas (Misión, Visión, Valores)
✅ **Catálogo dinámico con 13+ productos**
✅ **Sistema de filtros por categoría**
✅ **Modal de detalles con especificaciones completas**
✅ **Precios actualizables desde un solo archivo**
✅ Formulario de contacto funcional
✅ Animaciones suaves
✅ Colores corporativos: Azul oscuro #263146, Amarillo #dbe31c y Gris claro #eeedee

## Catálogo de Productos

El catálogo ahora es completamente dinámico y modular:

### Categorías disponibles:
- **Plataformas**: Plataformas de 3 ejes para carga pesada
- **Ejes**: Ejes americanos y alemanes (12T, 13T, 14T)
- **Suspensión**: Ballestas y suspensión mecánica
- **Frenos**: Pulmones neumáticos
- **Aros**: Aros cromados
- **Accesorios**: King pins, patines de apoyo, bloqueos de giro

### Productos incluidos (13 productos):
1. Plataforma 3 Ejes - $17,391.30
2. Eje Americano 13T (5") - $626.08
3. Eje Americano 13T (6") - $626.08
4. Ballestas - $130.43
5. Pulmón Doble Acción T3030 - $21.74
6. Bloqueo de Giro - $15.65
7. Patín de Apoyo - $191.30
8. Eje Alemán 12T - $695.65
9. Eje Alemán 14T - $695.65
10. King Pin Atornillado 2" - $36.78
11. Arcos Cromados - $173.91
12. Suspensión Mecánica 2 Ejes - $1,086.95
13. Suspensión Mecánica 3 Ejes - $1,434.95

## Cómo actualizar el catálogo

Para agregar o modificar productos, edita el archivo `productos.js`:

```javascript
{
    id: 14,
    categoria: 'categoria',
    nombre: 'NOMBRE DEL PRODUCTO',
    descripcion: 'Descripción breve',
    precio: 999.99,
    imagen: 'fas fa-icon-name',
    especificaciones: [
        'Especificación 1',
        'Especificación 2',
        // ...
    ],
    destacado: false // true para productos destacados
}
```

## Funcionalidades del Catálogo

- **Filtrado por categorías**: Filtra productos por tipo
- **Modal de detalles**: Click en "Ver detalles" para especificaciones completas
- **Solicitar cotización**: Enlace directo al formulario de contacto
- **Precios sin IVA**: Nota aclaratoria sobre precios
- **Responsive**: Optimizado para todos los dispositivos

## Nota sobre precios

Los precios mostrados son sin IVA. El IVA se agregará según la legislación vigente.