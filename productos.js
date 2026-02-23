// Base de datos de productos - NoviRepuestos
const productos = [
    {
        id: 1,
        slug: 'plataforma-3-ejes',
        categoria: 'plataforma',
        nombre: 'PLATAFORMA 3 EJES',
        descripcion: 'Plataforma especializada para transporte de carga pesada con capacidad de hasta 40 toneladas.',
        precio: 18260.87,
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
            'Capacidad de carga: hasta 40.000 kg',
            'Peso propio: 7.500 kg',
            'Ejes: 3 ejes de 13 T marca FUWA',
            'Neumáticos: 13 unidades 12.00R22.5 marca Double Coin con aros 9.0-22.5',
            'Estructura principal: acero Q345 de alta resistencia, soldadura automática',
            'Alas: superior (14 mm) / inferior (20 mm)',
            'Placa central: 10 mm',
            'Altura del larguero: 500 mm',
            'Sistema eléctrico: 24 V con luces LED, arnés modular y enchufe ISO de 7 vías',
            'Accesorios incluidos: 1 caja de herramientas, portallanta para repuesto (1 neumático)',
            'Acabado: granallado + pintura horneada (1 capa primer, 2 capas acabado)',
            'Mayor durabilidad, resistencia a la corrosión y color estable',
            'Color: opcional según requerimiento',
            'Kingpin: 2″ tipo atornillado',
            'Suspensión: mecánica y reforzada',
            'Plataforma inferior: chapa de 3 mm',
            'Frenos: neumático dual, de alta seguridad',
            'Patas de apoyo (landing gear): 28 t marca JOST'
        ],
        destacado: true
    },
    {
        id: 2,
        slug: 'eje-americano-13t-5',
        categoria: 'ejes',
        nombre: 'EJE AMERICANO 13 T (5″)',
        descripcion: 'Eje tipo americano de 13 toneladas, con perfil de 127 × 127 mm (5″), robusto y confiable. Su PCD de 335 mm lo hace compatible con una amplia variedad de configuraciones de remolque.',
        precio: 626.08,
        imagen: 'assets/eje americano 13t 420x180.jpg',
        especificaciones: [
            'Longitud de vía: 1840 mm',
            'Perfil: 127 × 127 mm (5″)',
            'Rodamiento Interior: 518445',
            'Rodamiento exterior: 518445',
            'Freno: 420 × 180 mm',
            'PCD: 335',
            'Color: Negro'
        ]
    },
    {
        id: 3,
        slug: 'eje-americano-13t-6',
        categoria: 'ejes',
        nombre: 'EJE AMERICANO 13 T (6″)',
        descripcion: 'Eje tipo americano de 13 toneladas, con perfil de 150 × 150 mm (6″), diseñado para proporcionar soporte resistente y estabilidad en la suspensión, ideal para tráileres y cargas pesadas.',
        precio: 626.08,
        imagen: 'assets/eje americano 13t 420x220.jpg',
        especificaciones: [
            'Longitud de vía: 1840 mm',
            'Perfil: 150 × 150 mm (6″)',
            'Rodamiento Interior: 518445',
            'Rodamiento exterior: 518445',
            'Freno: 420 × 220 mm',
            'PCD: 335',
            'Color: Negro'
        ]
    },
    {
        id: 4,
        slug: 'ballestas',
        categoria: 'suspension',
        nombre: 'BALLESTAS',
        descripcion: 'Juego de ballestas para suspensión mecánica de tráiler; comprende 10 hojas de 90 × 12 mm, con 5 principales. Proporciona soporte resistente y estabilidad en la suspensión, ideal para cargas pesadas y tráileres de alto rendimiento.',
        precio: 130.43,
        imagen: 'assets/ballestas.jpg',
        especificaciones: [
            'Ancho: 90 mm',
            'Grosor: 12 mm',
            'Piezas: 10 / 5 principales'
        ]
    },
    {
        id: 5,
        slug: 'pulmon-doble-accion-t3030',
        categoria: 'frenos',
        nombre: 'PULMÓN DOBLE ACCIÓN T3030',
        descripcion: 'Cámara de freno neumática modelo T3030 para sistemas de frenado en remolques. Diseñada para ofrecer una respuesta rápida y eficiente, contribuyendo a la seguridad del vehículo.',
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
        slug: 'bloqueo-de-giro',
        categoria: 'accesorios',
        nombre: 'BLOQUEO DE GIRO',
        descripcion: 'Sistema de bloqueo de giro ("turn lock") para bastidores de tráiler, que impide el giro no deseado del eje o plataforma. Fabricado para brindar seguridad adicional y estabilidad estructural.',
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
        slug: 'patin-de-apoyo',
        categoria: 'accesorios',
        nombre: 'PATÍN DE APOYO',
        descripcion: 'Patín de apoyo robusto para tráileres (landing gear), diseñado para proporcionar estabilidad al remolque cuando está estacionado o desacoplado. Construcción resistente, de fácil operación y con gran capacidad de carga.',
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
        slug: 'eje-aleman-12t',
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
            'Color: Negro'
        ]
    },
    {
        id: 9,
        slug: 'eje-aleman-14t',
        categoria: 'ejes',
        nombre: 'EJE ALEMÁN 14 T',
        descripcion: 'Eje tipo alemán de 14 toneladas, preparado para cargas pesadas, equipado con robustos rodamientos y freno amplio. Ideal para aplicaciones industriales exigentes.',
        precio: 695.65,
        imagen: 'assets/eje aleman 14t.jpg',
        especificaciones: [
            'Longitud de vía: 1840 mm',
            'Rodamiento Interior: 33215',
            'Rodamiento exterior: 32219',
            'Freno: 420 × 220 mm',
            'PCD: 335',
            'Color: Negro'
        ]
    },
    {
        id: 10,
        slug: 'king-pin-atornillado-2',
        categoria: 'accesorios',
        nombre: 'KING PIN ATORNILLADO 2″',
        descripcion: 'Diseñado para garantizar conexión segura y duradera entre el remolque y la tractora. Fabricado en acero de aleación forjado, soporta cargas exigentes y asegura estabilidad en maniobras y transporte pesado.',
        precio: 34.78,
        imagen: 'assets/KING PIN.jpeg',
        especificaciones: [
            'Tipo: Atornillado (bolt-in) con placa de retención',
            'Tamaño de pernos: 8 mm, 10 mm o 12 mm (hasta 16 mm)',
            'Material: acero de aleación forjado, de alta resistencia',
            'Compatibilidad: usado en semirremolques estándar',
            'Torque: 160–190 Nm según versión',
            'Pernos: 8 de grado alto'
        ]
    },
    {
        id: 11,
        slug: 'arcos-cromados',
        categoria: 'aros',
        nombre: 'ARCOS CROMADOS',
        descripcion: 'Capaces de soportar hasta 3.350 kg por rueda. Garantizan durabilidad, resistencia y estética premium, ideales para ejes de semirremolques y plataformas de servicio.',
        precio: 173.91,
        imagen: 'assets/arcos cromados.jpeg',
        especificaciones: [
            'Diámetro de agujeros: 26 mm',
            'Carga máxima estimada: 3.350 kg (7.400 lb)',
            'Acabado: cromado pulido espejo (interior y exterior)',
            'Offset típico: 145–167 mm',
            'Material: acero de alta calidad',
            'Dimensiones: 22.5 × 8.25 × 14 mm'
        ]
    },
    {
        id: 12,
        slug: 'arcos-de-acero',
        categoria: 'aros',
        nombre: 'ARCOS DE ACERO',
        descripcion: 'Fabricados para camiones y semirremolques de carga pesada, acero de alta resistencia y acabados anticorrosivos. Garantizan durabilidad y seguridad en cada viaje. Compatibles para ejes de 5″ y 6″, soportan hasta 3.350 kg por unidad.',
        precio: 56.92,
        imagen: 'assets/arco de acero.png',
        especificaciones: [
            'Dimensiones: 22.5″ diámetro × 8.25″ ancho × 14 mm espesor',
            'Acabado: galvanizado o pintura electrostática anticorrosiva',
            'Certificaciones: ISO / DOT / TUV',
            'Centro: aprox. 220 mm',
            'Producto de origen Americano y Europeo'
        ]
    },
    {
        id: 13,
        slug: 'suspension-mecanica-2-ejes',
        categoria: 'suspension',
        nombre: 'SUSPENSIÓN DE EJES MECÁNICA (2 EJES)',
        descripcion: 'Sistema completo de suspensión mecánica con ballestas y componentes heavy-duty para semirremolques de 2 ejes.',
        precio: 913.04,
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
            'Bujes/silentblocks: alta resistencia para reducir vibración y desgaste',
            'Producto de origen Americano y Europeo'
        ]
    },
    {
        id: 14,
        slug: 'suspension-mecanica-3-ejes',
        categoria: 'suspension',
        nombre: 'SUSPENSIÓN DE EJES MECÁNICA (3 EJES)',
        descripcion: 'Sistema completo de suspensión mecánica con ballestas y componentes heavy-duty para semirremolques de 3 ejes.',
        precio: 1173.91,
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
            'Bujes/silentblocks: alta resistencia para reducir vibración y desgaste',
            'Producto de origen Americano y Europeo'
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
const notaPrecios = 'Los precios y valores de los productos listados en este catálogo de Novocarga son excluyentes de IVA. El Impuesto al Valor Agregado (IVA) será agregado al precio final de cada artículo, de acuerdo con la legislación vigente en Ecuador. Los precios son indicativos y pueden estar sujetos a cambios. Para obtener una cotización final con el IVA incluido, por favor comuníquese con nuestro equipo de ventas.';

// Exportar datos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { productos, categorias, notaPrecios };
}
