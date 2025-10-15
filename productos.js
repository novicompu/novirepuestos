// Base de datos de productos - NoviRepuestos
const productos = [
    {
        id: 1,
        categoria: 'plataforma',
        nombre: 'PLATAFORMA 3 EJES',
        descripcion: 'Plataforma especializada para transporte de carga pesada con capacidad de hasta 50 toneladas.',
        precio: 17391.30,
        imagen: 'assets/plataforma 3 ejes.jpeg',
        imagenes: [
            'assets/plataforma 3 ejes.jpeg',
            'assets/plataforma 3 ejes blanco1.jpg',
            'assets/plataforma 3 ejes blanco2.jpg',
            'assets/plataforma 3 ejes blanco3.jpg',
            'assets/plataforma 3 ejes blanco4.jpg',
            'assets/plataforma 3 ejes blanco5.jpg',
            'assets/plataforma 3 ejes blanco6.jpg'
        ],
        especificaciones: [
            'Dimensiones: 12.5 m × 2.55 m × 1.55 m',
            'Capacidad de carga: hasta 50.000 kg',
            'Peso propio: 7.500 kg',
            'Ejes: 3 ejes de 13 T marca FUWA',
            'Neumáticos: 12 unidades 12.00R22.5 marca Double Coin',
            'Estructura principal: acero Q345 de alta resistencia',
            'Alas: superior (14 mm) / inferior (20 mm)',
            'Placa central: 10 mm',
            'Altura del larguero: 500 mm',
            'Sistema eléctrico: 24 V con luces LED',
            'Kingpin: 2″ tipo atornillado',
            'Suspensión: mecánica y reforzada',
            'Frenos: neumático dual, de alta seguridad',
            'Patas de apoyo (landing gear): 28 t marca JOST'
        ],
        destacado: true
    },
    {
        id: 2,
        categoria: 'ejes',
        nombre: 'EJE AMERICANO 13 T (5″)',
        descripcion: 'Eje tipo americano de 13 toneladas, con perfil de 127 × 127 mm (5″), robusto y confiable.',
        precio: 626.08,
        imagen: 'assets/eje americano 13t 420x180.jpg',
        especificaciones: [
            'Longitud de vía: 1840 mm',
            'Rodamiento Interior: 518445',
            'Rodamiento exterior: 518445',
            'Freno: 420 × 180 mm',
            'PCD: 335',
            'Color: Negro',
            'Perfil: 127 × 127 mm (5″)',
            'Compatible con configuraciones de remolque'
        ]
    },
    {
        id: 3,
        categoria: 'ejes',
        nombre: 'EJE AMERICANO 13 T (6″)',
        descripcion: 'Eje tipo americano de 13 toneladas, con perfil de 150 × 150 mm (6″), diseñado para soporte resistente.',
        precio: 626.08,
        imagen: 'assets/eje americano 13t 420x220.jpg',
        especificaciones: [
            'Longitud de vía: 1840 mm',
            'Rodamiento Interior: 518445',
            'Rodamiento exterior: 518445',
            'Freno: 420 × 220 mm',
            'PCD: 335',
            'Color: Negro',
            'Perfil: 150 × 150 mm (6″)',
            'Ideal para tráileres y cargas pesadas'
        ]
    },
    {
        id: 4,
        categoria: 'suspension',
        nombre: 'BALLESTAS',
        descripcion: 'Juego de ballestas para suspensión mecánica de tráiler, proporciona soporte resistente y estabilidad.',
        precio: 130.43,
        imagen: 'assets/ballestas.jpg',
        especificaciones: [
            'Ancho: 90 mm',
            'Grosor: 12 mm',
            'Piezas: 10 / 5 principales',
            'Material de alta resistencia',
            'Ideal para cargas pesadas',
            'Compatible con tráileres de alto rendimiento'
        ]
    },
    {
        id: 5,
        categoria: 'frenos',
        nombre: 'PULMÓN DOBLE ACCIÓN T3030',
        descripcion: 'Cámara de freno neumática modelo T3030 para sistemas de frenado en remolques.',
        precio: 21.74,
        imagen: 'assets/pulmon doble accion.jpg',
        especificaciones: [
            'Modelo: T3030',
            'Doble acción',
            'Respuesta rápida y eficiente',
            'Sistema neumático',
            'Contribuye a la seguridad del vehículo',
            'Compatible con remolques estándar'
        ]
    },
    {
        id: 6,
        categoria: 'accesorios',
        nombre: 'BLOQUEO DE GIRO',
        descripcion: 'Sistema de bloqueo de giro para bastidores de tráiler, impide el giro no deseado del eje.',
        precio: 15.65,
        imagen: 'assets/bloqueo de giro.jpg',
        especificaciones: [
            'Sistema "turn lock"',
            'Para bastidores de tráiler',
            'Seguridad adicional',
            'Estabilidad estructural',
            'Fabricación de precisión',
            'Fácil instalación'
        ]
    },
    {
        id: 7,
        categoria: 'accesorios',
        nombre: 'PATÍN DE APOYO',
        descripcion: 'Patín de apoyo robusto para tráileres (landing gear), proporciona estabilidad al remolque.',
        precio: 191.30,
        imagen: 'assets/patin de apoyo.jpg',
        especificaciones: [
            'Tipo: Landing gear',
            'Construcción resistente',
            'Fácil operación',
            'Gran capacidad de carga',
            'Material de alta calidad',
            'Diseño robusto'
        ]
    },
    {
        id: 8,
        categoria: 'ejes',
        nombre: 'EJE ALEMÁN 12 T',
        descripcion: 'Eje tipo alemán de 12 toneladas, ideal para quienes buscan precisión europea en el sistema de suspensión.',
        precio: 695.65,
        imagen: 'assets/eje aleman 12t.jpg',
        especificaciones: [
            'Longitud de vía: 1840 mm',
            'Rodamiento Interior: 33213',
            'Rodamiento exterior: 33118',
            'Freno: 420 × 180 mm',
            'PCD: 335',
            'Color: Negro',
            'Precisión europea',
            'Alta durabilidad'
        ]
    },
    {
        id: 9,
        categoria: 'ejes',
        nombre: 'EJE ALEMÁN 14 T',
        descripcion: 'Eje tipo alemán de 14 toneladas, preparado para cargas pesadas con robustos rodamientos.',
        precio: 695.65,
        imagen: 'assets/eje aleman 14t.jpg',
        especificaciones: [
            'Longitud de vía: 1840 mm',
            'Rodamiento Interior: 33215',
            'Rodamiento exterior: 32219',
            'Freno: 420 × 220 mm',
            'PCD: 335',
            'Color: Negro',
            'Ideal para aplicaciones industriales',
            'Equipado con freno amplio'
        ]
    },
    {
        id: 10,
        categoria: 'accesorios',
        nombre: 'KING PIN ATORNILLADO 2″',
        descripcion: 'Diseñado para garantizar conexión segura y duradera entre el remolque y la tractora.',
        precio: 36.78,
        imagen: 'assets/bloqueo de giro.jpg',
        especificaciones: [
            'Tipo: Atornillado (bolt-in)',
            'Tamaño: 2″',
            'Tamaño de pernos: 8-16 mm',
            'Material: acero de aleación forjado',
            'Compatibilidad: semirremolques estándar',
            'Torque: 160–190 Nm',
            'Pernos: 8 de grado alto',
            'Alta resistencia'
        ]
    },
    {
        id: 11,
        categoria: 'aros',
        nombre: 'ARCOS CROMADOS',
        descripcion: 'Aros cromados capaces de soportar hasta 3.350 kg por rueda con acabado espejo.',
        precio: 173.91,
        imagen: 'assets/arcos cromados.jpeg',
        especificaciones: [
            'Diámetro de agujeros: 26 mm',
            'Carga máxima: 3.350 kg (7.400 lb)',
            'Patrón de pernos: 10 × 285,75 mm (10 × 11,25″)',
            'Acabado: cromado pulido espejo',
            'Offset típico: 145–167 mm',
            'Material: acero de alta calidad',
            'Durabilidad garantizada',
            'Estética premium'
        ]
    },
    {
        id: 12,
        categoria: 'suspension',
        nombre: 'SUSPENSIÓN DE EJES MECÁNICA (2 EJES)',
        descripcion: 'Sistema completo de suspensión mecánica con ballestas y componentes heavy-duty para semirremolques de 2 ejes.',
        precio: 1050.00,
        imagen: 'assets/suspension de ejes mecanica.jpeg',
        especificaciones: [
            'Configuración: 2 ejes',
            'Compatibilidad: muñones de 5″ y 6″',
            'Paquete de ballestas: 10 hojas por lado',
            'Hojas principales: 5 hojas de 90 mm × 12 mm',
            'Estructura: placas y soportes de 8 mm heavy-duty',
            'Equalizer central: distribuye carga, alta estabilidad',
            'Acabado: pintura anticorrosiva horneada, durabilidad',
            'Aplicación: semirremolques y plataformas de servicio',
            'Pernos en U y herrajes: grado automotriz, alta resistencia',
            'Bujes/silentblocks: alta resistencia para reducir vibración y desgaste'
        ]
    },
    {
        id: 13,
        categoria: 'suspension',
        nombre: 'SUSPENSIÓN DE EJES MECÁNICA (3 EJES)',
        descripcion: 'Sistema completo de suspensión mecánica con ballestas y componentes heavy-duty para semirremolques de 3 ejes.',
        precio: 1350.00,
        imagen: 'assets/suspension de ejes mecanica.jpeg',
        especificaciones: [
            'Configuración: 3 ejes',
            'Compatibilidad: muñones de 5″ y 6″',
            'Paquete de ballestas: 10 hojas por lado',
            'Hojas principales: 5 hojas de 90 mm × 12 mm',
            'Estructura: placas y soportes de 8 mm heavy-duty',
            'Equalizer central: distribuye carga, alta estabilidad',
            'Acabado: pintura anticorrosiva horneada, durabilidad',
            'Aplicación: semirremolques y plataformas de servicio',
            'Pernos en U y herrajes: grado automotriz, alta resistencia',
            'Bujes/silentblocks: alta resistencia para reducir vibración y desgaste'
        ]
    }
];

// Categorías disponibles
const categorias = {
    plataforma: 'Plataformas',
    ejes: 'Ejes',
    suspension: 'Suspensión',
    frenos: 'Frenos',
    aros: 'Aros',
    accesorios: 'Accesorios'
};

// Nota sobre precios
const notaPrecios = 'Los precios y valores de los productos listados en este catálogo son excluyentes de IVA. El Impuesto al Valor Agregado (IVA) será agregado al precio final de cada artículo, de acuerdo con la legislación vigente. Los precios son indicativos y pueden estar sujetos a cambios. Para obtener una cotización final con el IVA incluido, por favor comuníquese con nuestro equipo de ventas.';

// Exportar datos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { productos, categorias, notaPrecios };
}
