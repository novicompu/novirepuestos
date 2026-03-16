// Base de datos de productos - NoviRepuestos
const productos = [
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
    },
    {
        id: 15,
        slug: 'llanta-helloway-h556',
        categoria: 'llantas',
        nombre: 'LLANTA HELLOWAY H556',
        descripcion: 'Llanta de maquinaria para servicio fuera de carretera, con alta tracción y vida útil extendida.',
        precio: 305,
        imagen: 'assets/H556.png',
        especificaciones: [
            'Marca: Helloway',
            'Modelo: H556',
            'Lonas: 18',
            'Tamaño: 295/80R22.5',
            'Índice de carga: 152/149',
            'Índice de velocidad: F',
            'Profundidad de labrado: 22.0 mm',
            'Ancho de sección: 298 mm',
            'Diámetro total: 1055 mm',
            'Presión: 900 kPa',
            'Alta tracción para uso fuera de carretera',
            'Durabilidad y vida útil extendida'
        ]
    },
    {
        id: 16,
        slug: 'llanta-helloway-h557',
        categoria: 'llantas',
        nombre: 'LLANTA HELLOWAY H557',
        descripcion: 'Llanta orientada a mayor kilometraje y mejor eficiencia de combustible.',
        precio: 300,
        imagen: 'assets/H557.png',
        especificaciones: [
            'Marca: Helloway',
            'Modelo: H557',
            'Lonas: 18',
            'Tamaño: 295/80R22.5',
            'Índice de carga: 152/149',
            'Índice de velocidad: M',
            'Profundidad de labrado: 18.0 mm',
            'Ancho de sección: 298 mm',
            'Diámetro total: 1055 mm',
            'Presión: 900 kPa',
            'Mayor kilometraje',
            'Menor consumo de combustible'
        ]
    },
    {
        id: 17,
        slug: 'llanta-helloway-h528',
        categoria: 'llantas',
        nombre: 'LLANTA HELLOWAY H528',
        descripcion: 'Llanta con tracción superior y desempeño para mayor kilometraje.',
        precio: 300,
        imagen: 'assets/H528.png',
        especificaciones: [
            'Marca: Helloway',
            'Modelo: H528',
            'Lonas: 18',
            'Tamaño: 295/80R22.5',
            'Índice de carga: 152/149',
            'Índice de velocidad: M',
            'Profundidad de labrado: 18.0 mm',
            'Ancho de sección: 298 mm',
            'Diámetro total: 1055 mm',
            'Presión: 900 kPa',
            'Tracción superior',
            'Mayor kilometraje'
        ]
    },
    {
        id: 18,
        slug: 'llanta-helloway-h578',
        categoria: 'llantas',
        nombre: 'LLANTA HELLOWAY H578',
        descripcion: 'Llanta con resistencia al desgaste irregular, mayor kilometraje y mejor manejo.',
        precio: 300,
        imagen: 'assets/H578.png',
        especificaciones: [
            'Marca: Helloway',
            'Modelo: H578',
            'Lonas: 20',
            'Tamaño: 395/80R22.5',
            'Índice de carga: 157/154',
            'Índice de velocidad: L',
            'Profundidad de labrado: 15 mm',
            'Ancho de sección: 312 mm',
            'Diámetro total: 1076 mm',
            'Presión: 850 kPa',
            'Resiste el desgaste irregular',
            'Mayor kilometraje',
            'Mejor manejo'
        ]
    },
    {
        id: 19,
        slug: 'llanta-helloway-h517-plus',
        categoria: 'llantas',
        nombre: 'LLANTA HELLOWAY H517+',
        descripcion: 'Llanta Helloway H517+ para operación de maquinaria y trabajo pesado.',
        precio: 300,
        imagen: 'assets/H517plus_.png',
        especificaciones: [
            'Marca: Helloway',
            'Modelo: H517+',
            'Aplicación: maquinaria y carga pesada',
            'Consulte disponibilidad y ficha técnica completa'
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
    llantas: 'Llantas',
    accesorios: 'Accesorios'
};

// Nota sobre precios
const notaPrecios = 'Los precios y valores de los productos listados en este catálogo de Novocarga son excluyentes de IVA. El Impuesto al Valor Agregado (IVA) será agregado al precio final de cada artículo, de acuerdo con la legislación vigente en Ecuador. Los precios son indicativos y pueden estar sujetos a cambios. Para obtener una cotización final con el IVA incluido, por favor comuníquese con nuestro equipo de ventas.';

// Exportar datos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { productos, categorias, notaPrecios };
}
