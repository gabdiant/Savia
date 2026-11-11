import { Therapist, Category, Workshop, NeedFilter, TherapistApplication, TherapistSchedule, AppNotification } from '../types';

export const CATEGORIES: Category[] = [
  // Bloque 1 (1 - 4)
  {
    id: 'tarot',
    name: 'Tarot',
    iconName: 'Sun',
    colorBg: 'bg-[#ED64A6]',
    colorText: 'text-white',
    accentColor: '#ED64A6',
    description: 'Orientación intuitiva, arquetipos evolutivos y lectura energética para toma de decisiones y claridad interior.'
  },
  {
    id: 'reiki',
    name: 'Reiki',
    iconName: 'Sparkles',
    colorBg: 'bg-[#FBB6CE]',
    colorText: 'text-[#862D59]',
    accentColor: '#FBB6CE',
    description: 'Canalización de energía universal a través de las manos para equilibrar chakras y liberar bloqueos sutiles.'
  },
  {
    id: 'masaje',
    name: 'Masaje',
    iconName: 'HeartHandshake',
    colorBg: 'bg-[#F6AD55]',
    colorText: 'text-white',
    accentColor: '#F6AD55',
    description: 'Técnicas manuales relajantes y descontracturantes para liberar tensiones corporales acumuladas y restaurar vitalidad.'
  },
  {
    id: 'aromaterapia',
    name: 'Aromaterapia',
    iconName: 'Flower2',
    colorBg: 'bg-white border border-purple-100/80',
    colorText: 'text-[#9F7AEA]',
    accentColor: '#9F7AEA',
    description: 'Uso terapéutico de aceites esenciales puros botánicos para actuar sobre el sistema límbico y el sistema nervioso.'
  },

  // Bloque 2 (5 - 8: se repite el patrón 4, 4, 4)
  {
    id: 'astral',
    name: 'Carta Astral',
    iconName: 'Compass',
    colorBg: 'bg-[#ED64A6]',
    colorText: 'text-white',
    accentColor: '#ED64A6',
    description: 'Mapa cósmico del momento de tu nacimiento para autoconocimiento profundo, tránsitos planetarios y propósito.'
  },
  {
    id: 'meditacion',
    name: 'Meditación',
    iconName: 'Smile',
    colorBg: 'bg-[#FBB6CE]',
    colorText: 'text-[#862D59]',
    accentColor: '#FBB6CE',
    description: 'Prácticas de respiración consciente (Pranayama) y presencia plena para aquietar la mente y reducir el cortisol.'
  },
  {
    id: 'sonoterapia',
    name: 'Sonoterapia',
    iconName: 'Music',
    colorBg: 'bg-[#F6AD55]',
    colorText: 'text-white',
    accentColor: '#F6AD55',
    description: 'Vibraciones armónicas producidas con cuencos tibetanos y gong para sintonizar ondas cerebrales alfa y theta.'
  },
  {
    id: 'regresion',
    name: 'Regresión',
    iconName: 'History',
    colorBg: 'bg-white border border-purple-100/80',
    colorText: 'text-[#9F7AEA]',
    accentColor: '#9F7AEA',
    description: 'Exploración de memorias profundas y vidas pasadas para sanar patrones kármicos repetitivos.'
  },

  // Bloque 3 (9 - 12: se repite el patrón 4, 4, 4)
  {
    id: 'flores-bach',
    name: 'Flores de Bach',
    iconName: 'Flower2',
    colorBg: 'bg-[#ED64A6]',
    colorText: 'text-white',
    accentColor: '#ED64A6',
    description: 'Terapia floral vibracional para armonizar estados emocionales transitorios como miedo, incertidumbre o soledad.'
  },
  {
    id: 'acupuntura',
    name: 'Acupuntura MTC',
    iconName: 'Acupuncture',
    colorBg: 'bg-[#FBB6CE]',
    colorText: 'text-[#862D59]',
    accentColor: '#FBB6CE',
    description: 'Inserción de microagujas en puntos y meridianos bioenergéticos para reequilibrar órganos internos y calmar dolor.'
  },
  {
    id: 'biodescodificacion',
    name: 'Biodescodificación',
    iconName: 'HeartHandshake',
    colorBg: 'bg-[#F6AD55]',
    colorText: 'text-white',
    accentColor: '#F6AD55',
    description: 'Identificación del conflicto biológico o emoción no resuelta que originó un síntoma físico específico.'
  },
  {
    id: 'osteopatia',
    name: 'Osteopatía',
    iconName: 'Compass',
    colorBg: 'bg-white border border-purple-100/80',
    colorText: 'text-[#9F7AEA]',
    accentColor: '#9F7AEA',
    description: 'Terapia manual craneosacral y fascial para devolver movilidad y equilibrio a la estructura ósea y visceral.'
  }
];

export const NEED_FILTERS: NeedFilter[] = [
  {
    id: 'emocional-relacional',
    label: 'Emocional y Relacional',
    categoryIds: ['flores-bach', 'biodescodificacion', 'regresion', 'tarot'],
    description: 'Sanación de vínculos afectivos, duelo, desbloqueo emocional y relaciones saludables.'
  },
  {
    id: 'fisico-muscular',
    label: 'Físico y Muscular',
    categoryIds: ['masaje', 'acupuntura', 'osteopatia'],
    description: 'Alivio de contracturas, dolores articulares y recuperación de movilidad física.'
  },
  {
    id: 'mental-estres',
    label: 'Mental y Estrés',
    categoryIds: ['meditacion', 'sonoterapia', 'aromaterapia', 'reiki'],
    description: 'Calma para el sistema nervioso, reducción de ansiedad y descanso mental profundo.'
  },
  {
    id: 'espiritual-vocacional',
    label: 'Espiritual y Vocacional',
    categoryIds: ['tarot', 'astral', 'reiki', 'regresion'],
    description: 'Claridad en tu vocación de vida, autoconocimiento cuántico y conexión con tu ser.'
  }
];

export const THERAPISTS: Therapist[] = [
  {
    id: 'lucia-luna',
    name: 'Lucía Luna',
    headline: 'Guía intuitiva & Maestra de Reiki Usui',
    avatar: '/src/assets/images/therapist_sofia_reiki_1793833272999.jpg',
    rating: 5.0,
    reviewCount: 24,
    bio: 'Guía intuitiva dedicada a la sanación energética y emocional. Especializada en la guía y empoderamiento de personas a través del Tarot Evolutivo, el Reiki y la canalización consciente. Mi propósito es ayudarte a recordar tu propia luz y transitar momentos de duda con confianza y serenidad.',
    specialties: ['TAROT MARSELLA', 'REIKI USUI', 'LECTURA DE AMOR', 'MEDITACIÓN'],
    formats: ['online', 'presencial'],
    city: 'Madrid / Centro Holístico Sol',
    address: 'Calle del Almendro 14, La Latina, Madrid',
    isFeatured: true,
    badge: 'Destacado',
    availableDays: ['Lunes', 'Miércoles', 'Jueves', 'Sábados'],
    videos: [
      {
        id: 'v1',
        title: 'Mi enfoque con el Tarot',
        duration: '0:45',
        thumbnail: '/src/assets/images/therapist_sofia_reiki_1793833272999.jpg',
        summary: 'Te explico por qué el Tarot no es predictivo sentencioso, sino una poderosa herramienta de autoconocimiento y amor propio.'
      },
      {
        id: 'v2',
        title: '¿Cómo es una sesión de Reiki?',
        duration: '0:38',
        thumbnail: '/src/assets/images/therapist_sofia_reiki_1793833272999.jpg',
        summary: 'Cómo preparamos el espacio, cómo se siente la energía a distancia y presencial, y qué esperar al terminar.'
      },
      {
        id: 'v3',
        title: 'Preparar tu energía antes',
        duration: '0:52',
        thumbnail: '/src/assets/images/therapist_sofia_reiki_1793833272999.jpg',
        summary: 'Tres consejos sencillos: hidratación, una intención clara y 5 minutos de silencio previo.'
      }
    ],
    services: [
      {
        id: 'lucia-tarot-completo',
        title: 'Tarot Completo Evolutivo',
        price: 50,
        durationMinutes: 60,
        description: 'Lectura exhaustiva de tu mapa energético actual, desafíos presentes y caminos de crecimiento personal.',
        format: 'ambos',
        popular: true
      },
      {
        id: 'lucia-reiki-sesion',
        title: 'Sesión de Reiki Energético',
        price: 70,
        durationMinutes: 60,
        description: 'Armonización de los 7 centros de energía (chakras), liberación de cargas acumuladas y sellado áurico.',
        format: 'ambos',
        popular: true
      },
      {
        id: 'lucia-lectura-amor',
        title: 'Lectura de Amor Especializada',
        price: 35,
        durationMinutes: 45,
        description: 'Enfoque específico en vínculos afectivos, patrones de apego y sanación del chakra corazón.',
        format: 'online'
      },
      {
        id: 'lucia-taller-meditacion',
        title: 'Taller de Meditación Grupal',
        price: 20,
        durationMinutes: 75,
        description: 'Espacio guiado para aprender a aquietar pensamientos intrusivos y conectar con tu respiración sagrada.',
        format: 'online'
      },
      {
        id: 'lucia-limpieza-hogar',
        title: 'Limpieza Energética de Hogar',
        price: 85,
        durationMinutes: 90,
        description: 'Ritual de sahumado, campanas tibetanas y reiki ambiental para armonizar tu hogar o negocio.',
        format: 'presencial'
      }
    ],
    socialLinks: {
      enabled: true,
      instagram: 'https://instagram.com/lucialuna_tarot',
      whatsapp: 'https://wa.me/34612345678',
      youtube: 'https://youtube.com/@lucialunaterapias',
      website: 'https://lucialuna.com'
    },
    reviews: [
      {
        id: 'r1',
        author: 'Camila Rossi',
        date: '02 Nov 2026',
        rating: 5,
        therapyTitle: 'Tarot Completo Evolutivo',
        comment: 'Lucía tiene una energía pura y llena de paz. Salí de la sesión con una claridad sobre mi trabajo que llevaba meses buscando.'
      },
      {
        id: 'r2',
        author: 'Martín Duarte',
        date: '28 Oct 2026',
        rating: 4,
        therapyTitle: 'Sesión de Reiki Energético',
        comment: 'Hicimos la sesión online y la sensación de relajación y calor en el pecho fue increíble. Se me fue la migraña por completo.'
      },
      {
        id: 'r3',
        author: 'Valeria Santos',
        date: '15 Oct 2026',
        rating: 5,
        therapyTitle: 'Lectura de Amor Especializada',
        comment: 'Súper respetuosa, dulce y directa. Me ayudó a soltar una relación que me hacía mucho daño desde el amor propio.'
      },
      {
        id: 'r4',
        author: 'Ignacio Vega',
        date: '02 Oct 2026',
        rating: 3,
        therapyTitle: 'Tarot Completo Evolutivo',
        comment: 'Buena sesión en general, me sirvió de guía aunque tuvimos un pequeño corte de conexión al inicio.'
      }
    ]
  },
  {
    id: 'asa-merria',
    name: 'Asa Merria',
    headline: 'Quiromasaje Terapéutico & Aromaterapia Clínica',
    avatar: '/src/assets/images/therapist_elena_acupuncture_1793833271404.jpg',
    rating: 4.9,
    reviewCount: 18,
    bio: 'Terapeuta corporal con más de 9 años de experiencia en masoterapia integrativa, liberación miofascial y sinergias botánicas de aromaterapia. Trabajo con un enfoque holístico entendiendo que la tensión en la espalda o el cuello refleja preocupaciones no expresadas.',
    specialties: ['MASAJE HOLÍSTICO', 'AROMATERAPIA', 'DRENAJE LINFÁTICO', 'DESCONTRACTURANTE'],
    formats: ['presencial'],
    city: 'Barcelona / Espacio Vital Gracia',
    address: 'Carrer de Torrent de l\'Olla 88, Gràcia, Barcelona',
    isFeatured: true,
    badge: 'Top Valorado',
    availableDays: ['Martes', 'Miércoles', 'Viernes', 'Sábados'],
    videos: [
      {
        id: 'va1',
        title: 'Cómo elijo tus aceites esenciales',
        duration: '0:40',
        thumbnail: '/src/assets/images/therapist_elena_acupuncture_1793833271404.jpg',
        summary: 'Personalizo la mezcla aromática según si necesitas desinflamar, relajar o levantar el ánimo.'
      },
      {
        id: 'va2',
        title: 'Dolor de cuello por estrés',
        duration: '0:35',
        thumbnail: '/src/assets/images/therapist_elena_acupuncture_1793833271404.jpg',
        summary: 'Explicación anatómica de cómo la mandíbula y el trapecio retienen la sobrecarga diaria.'
      }
    ],
    services: [
      {
        id: 'asa-masaje-descontracturante',
        title: 'Masaje Holístico Descontracturante',
        price: 65,
        durationMinutes: 60,
        description: 'Técnica profunda combinada con aceites botánicos templados para liberar nudos en espalda, hombros y lumbares.',
        format: 'presencial',
        popular: true
      },
      {
        id: 'asa-aromaterapia-relajante',
        title: 'Sesión Sensorial de Aromaterapia',
        price: 55,
        durationMinutes: 50,
        description: 'Masaje rítmico suave con lavanda silvestre, cedro y sándalo para calmar el insomnio y la fatiga mental.',
        format: 'presencial'
      },
      {
        id: 'asa-drenaje',
        title: 'Drenaje Linfático Manual',
        price: 70,
        durationMinutes: 75,
        description: 'Estimulación suave del sistema linfático para desinflamar, eliminar toxinas y mejorar la circulación.',
        format: 'presencial'
      }
    ],
    socialLinks: {
      enabled: true,
      instagram: 'https://instagram.com/asa.merria.quiromasaje',
      whatsapp: 'https://wa.me/34623456789',
      tiktok: 'https://tiktok.com/@asamerriaterapias'
    },
    reviews: [
      {
        id: 'ra1',
        author: 'Javier Pardo',
        date: '01 Nov 2026',
        rating: 5,
        therapyTitle: 'Masaje Holístico Descontracturante',
        comment: 'Increíble tacto y respeto. Llevaba semanas sin poder girar el cuello por el ordenador y salí nuevo.'
      },
      {
        id: 'ra2',
        author: 'Beatriz Molina',
        date: '20 Oct 2026',
        rating: 4,
        therapyTitle: 'Sesión Sensorial de Aromaterapia',
        comment: 'Los aromas y la música crean un ambiente sagrado. Es la mejor hora de desconexión del mes.'
      },
      {
        id: 'ra3',
        author: 'Clara Domínguez',
        date: '05 Oct 2026',
        rating: 5,
        therapyTitle: 'Drenaje Linfático Manual',
        comment: 'Excelente profesional, muy atenta y cuidadosa en cada detalle.'
      }
    ]
  },
  {
    id: 'mooro-marianta',
    name: 'Marcos Marianta',
    headline: 'Maestro de Sonoterapia & Cuencos Tibetanos',
    avatar: '/src/assets/images/therapist_marcos_sound_1793833272462.jpg',
    rating: 5.0,
    reviewCount: 32,
    bio: 'Pionero en medicina sonora y relajación neuroacústica. Empleo cuencos de 7 metales forjados a mano en Nepal, gongs sinfónicos y tubos sonoros para generar estados theta de meditación donde el cuerpo activa su autoreparación natural.',
    specialties: ['SONOTERAPIA', 'CUENCOS TIBETANOS', 'BAÑO DE GONG', 'MINDFULNESS'],
    formats: ['presencial', 'online'],
    city: 'Valencia / Templo del Sonido',
    address: 'Carrer de la Pau 12, Valencia',
    isFeatured: true,
    badge: 'Destacado',
    availableDays: ['Lunes', 'Martes', 'Jueves', 'Viernes'],
    videos: [
      {
        id: 'vm1',
        title: 'La física detrás del sonido',
        duration: '0:50',
        thumbnail: '/src/assets/images/therapist_marcos_sound_1793833272462.jpg',
        summary: 'Cómo las ondas sonoras reordenan la estructura de líquidos en nuestras células.'
      },
      {
        id: 'vm2',
        title: 'Mi primer cuenco en Katmandú',
        duration: '0:42',
        thumbnail: '/src/assets/images/therapist_marcos_sound_1793833272462.jpg',
        summary: 'La historia de mis instrumentos y cómo cada uno responde a un centro energético.'
      }
    ],
    services: [
      {
        id: 'mooro-bano-sonoro-individual',
        title: 'Baño Sonoro Individual con Cuencos',
        price: 60,
        durationMinutes: 60,
        description: 'Colocación directa de cuencos sobre el cuerpo para masaje vibracional y desbloqueo del plexo solar.',
        format: 'presencial',
        popular: true
      },
      {
        id: 'mooro-sesion-online-frecuencias',
        title: 'Viaje Sonoro Online (Sonido Binaural)',
        price: 35,
        durationMinutes: 45,
        description: 'Sesión guiada en audio de alta definición con auriculares estéreo para inducir sueño y desestresarse.',
        format: 'online',
        popular: true
      },
      {
        id: 'mooro-armonizacion-pareja',
        title: 'Armonización Sonora para Parejas',
        price: 90,
        durationMinutes: 75,
        description: 'Experiencia inmersiva para conectar con tu acompañante a través del silencio y las frecuencias armónicas.',
        format: 'presencial'
      }
    ],
    socialLinks: {
      enabled: true,
      instagram: 'https://instagram.com/marcos.sonoterapia',
      whatsapp: 'https://wa.me/34634567890',
      youtube: 'https://youtube.com/@marcoscuencostibetanos',
      website: 'https://marcosmarianta.es'
    },
    reviews: [
      {
        id: 'rm1',
        author: 'Daniela Vega',
        date: '03 Nov 2026',
        rating: 5,
        therapyTitle: 'Baño Sonoro Individual con Cuencos',
        comment: 'Sentí vibraciones en zonas donde tenía tensión que ni sabía que tenía. Una experiencia transformadora.'
      },
      {
        id: 'rm2',
        author: 'Gonzalo Ruiz',
        date: '18 Oct 2026',
        rating: 4,
        therapyTitle: 'Viaje Sonoro Online (Sonido Binaural)',
        comment: 'Muy relajante con auriculares, logré dormir profundamente después de días de insomnio.'
      },
      {
        id: 'rm3',
        author: 'Lucía B.',
        date: '04 Oct 2026',
        rating: 3,
        therapyTitle: 'Armonización Sonora para Parejas',
        comment: 'La experiencia fue bonita, aunque el sonido de la calle se escuchaba un poco en la sala.'
      }
    ]
  },
  {
    id: 'elena-romero',
    name: 'Elena Romero',
    headline: 'Acupuntora Holística & Medicina Tradicional China',
    avatar: '/src/assets/images/therapist_elena_acupuncture_1793833271404.jpg',
    rating: 4.8,
    reviewCount: 15,
    bio: 'Graduada en Medicina Tradicional China y Acupuntura bioenergética. Mi enfoque une la sabiduría milenaria de los meridianos y el pulso con hábitos de vida modernos para tratar migrañas, desequilibrios digestivos y fatiga crónica.',
    specialties: ['ACUPUNTURA MTC', 'MOXIBUSTIÓN', 'VENTOSAS', 'EQUILIBRIO FEMENINO'],
    formats: ['presencial'],
    city: 'Sevilla / Centro Tao',
    address: 'Plaza del Salvador 6, Sevilla',
    badge: 'Nuevo',
    availableDays: ['Lunes', 'Miércoles', 'Viernes'],
    videos: [
      {
        id: 've1',
        title: '¿Duelen las agujas de acupuntura?',
        duration: '0:30',
        thumbnail: '/src/assets/images/therapist_elena_acupuncture_1793833271404.jpg',
        summary: 'Resuelvo el mayor miedo: son tan finas como un cabello y se siente más bien un suave cosquilleo o calor.'
      }
    ],
    services: [
      {
        id: 'elena-primera-consulta',
        title: 'Diagnóstico MTC & Primera Sesión',
        price: 65,
        durationMinutes: 75,
        description: 'Lectura de lengua y pulsos chinos, historia clínica detallada y primera sesión de agujas y moxa.',
        format: 'presencial',
        popular: true
      },
      {
        id: 'elena-sesion-seguimiento',
        title: 'Sesión de Seguimiento Acupuntura',
        price: 45,
        durationMinutes: 50,
        description: 'Tratamiento continuado para consolidar mejorías en sueño, digestión o alivio de dolor.',
        format: 'presencial'
      }
    ],
    reviews: [
      {
        id: 're1',
        author: 'Gonzalo F.',
        date: 'Hace 1 semana',
        rating: 5,
        therapyTitle: 'Diagnóstico MTC & Primera Sesión',
        comment: 'Muy minuciosa y profesional. Ya en la primera sesión noté un alivio muy notable de mi ciática.'
      }
    ]
  },
  {
    id: 'valeria-cisneros',
    name: 'Valeria Cisneros',
    headline: 'Terapeuta Floral & Biodescodificación Biológica',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    rating: 4.9,
    reviewCount: 21,
    bio: 'Acompaño procesos de duelo, desbloqueo emocional y somatizaciones físicas a través de la sabiduría del Sistema Bach y la biodescodificación celular. Mi espacio es un refugio seguro de escucha activa, compasión y autodescubrimiento profundo.',
    specialties: ['FLORES DE BACH', 'BIODESCODIFICACIÓN', 'GESTIÓN DEL DUELO', 'TERAPIA EMOCIONAL'],
    formats: ['online', 'presencial'],
    city: 'Madrid / Espacio Flor de Vida',
    address: 'Calle Claudio Coello 32, Salamanca, Madrid',
    badge: 'Nuevo',
    availableDays: ['Lunes', 'Martes', 'Jueves'],
    videos: [
      {
        id: 'vv1',
        title: 'El mensaje de tu síntoma',
        duration: '0:48',
        thumbnail: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
        summary: 'Cómo el cuerpo somatiza emociones no expresadas y de qué manera podemos acompañarlo.'
      }
    ],
    services: [
      {
        id: 'valeria-consulta-floral',
        title: 'Consulta Floral Personalizada Bach',
        price: 50,
        durationMinutes: 60,
        description: 'Entrevista profunda de diagnóstico emocional y preparación del preparado floral a medida.',
        format: 'online',
        popular: true
      },
      {
        id: 'valeria-biodescodificacion',
        title: 'Sesión de Biodescodificación Emocional',
        price: 65,
        durationMinutes: 75,
        description: 'Identificación del conflicto biológico o patrón familiar detrás del malestar físico o emocional.',
        format: 'presencial'
      }
    ],
    socialLinks: {
      enabled: true,
      instagram: 'https://instagram.com/valeria.floresdebach',
      whatsapp: 'https://wa.me/34678901234',
      website: 'https://valeriacisneros.com'
    },
    reviews: [
      {
        id: 'rv1',
        author: 'Marta Soler',
        date: '28 Oct 2026',
        rating: 5,
        therapyTitle: 'Consulta Floral Personalizada Bach',
        comment: 'Las gotas me devolvieron la calma en un momento de crisis laboral muy dura. Valeria es luz pura.'
      }
    ]
  },
  {
    id: 'rodrigo-benitez',
    name: 'Rodrigo Benítez',
    headline: 'Especialista en Sonoterapia & Cuencos Tibetanos',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80',
    rating: 5.0,
    reviewCount: 29,
    bio: 'Terapeuta de sonido formado en Nepal y maestro de meditación mindfulness. Utilizo frecuencias armónicas y diapasones para calmar el sistema nervioso simpático, inducir ondas alfa cerebrales y restablecer la vitalidad celular.',
    specialties: ['SONOTERAPIA', 'CUENCOS TIBETANOS', 'RESPIRACIÓN CONSCIENTE', 'MEDITACIÓN SONORA'],
    formats: ['presencial', 'online'],
    city: 'Barcelona / Sala Armonía Sagrada',
    address: 'Carrer de Balmes 120, Eixample, Barcelona',
    badge: 'Destacado',
    availableDays: ['Miércoles', 'Viernes', 'Sábados'],
    videos: [
      {
        id: 'vr1',
        title: 'Frecuencias que sanan el estrés',
        duration: '0:42',
        thumbnail: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80',
        summary: 'Demostración de cuencos de 7 metales colocados sobre el plexo solar.'
      }
    ],
    services: [
      {
        id: 'rodrigo-bano-cuencos',
        title: 'Baño de Cuencos Tibetanos y Gong',
        price: 55,
        durationMinutes: 60,
        description: 'Masaje celular con instrumentos armónicos en vivo para desconectar la mente y soltar contracturas.',
        format: 'presencial',
        popular: true
      },
      {
        id: 'rodrigo-armonizacion-online',
        title: 'Viaje Neuroacústico Online 3D',
        price: 35,
        durationMinutes: 45,
        description: 'Sesión guiada por videollamada con audio binaural para un descanso profundo y alivio del insomnio.',
        format: 'online'
      }
    ],
    socialLinks: {
      enabled: true,
      instagram: 'https://instagram.com/rodrigo.sonoterapia',
      whatsapp: 'https://wa.me/34654321098'
    },
    reviews: [
      {
        id: 'rr1',
        author: 'Carlos Medina',
        date: '02 Nov 2026',
        rating: 5,
        therapyTitle: 'Baño de Cuencos Tibetanos y Gong',
        comment: 'Sales flotando. Sentí cómo la vibración me quitó la pesadez en el pecho de golpe.'
      }
    ]
  },
  {
    id: 'camila-navarro',
    name: 'Camila Navarro',
    headline: 'Astróloga Arquetípica & Carta Natal Evolutiva',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    rating: 4.9,
    reviewCount: 19,
    bio: 'Traductora del cielo al servicio de tu evolución cotidiana. Interpreto el mapa astrológico como una brújula de autoconocimiento para orientarte en momentos de encrucijada vocacional, relaciones de pareja y propósito vital.',
    specialties: ['CARTA ASTRAL', 'REVOLUCIÓN SOLAR', 'SINASTRÍA DE PAREJA', 'ASTROLOGÍA EVOLUTIVA'],
    formats: ['online'],
    city: 'Valencia / Online Internacional',
    badge: 'Top Valorado',
    availableDays: ['Lunes', 'Miércoles', 'Jueves', 'Viernes'],
    videos: [
      {
        id: 'vc1',
        title: 'Tu carta astral no es tu destino',
        duration: '0:39',
        thumbnail: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
        summary: 'Por qué los planetas marcan energías disponibles y no sentencias inamovibles.'
      }
    ],
    services: [
      {
        id: 'camila-carta-natal',
        title: 'Lectura Completa de Carta Natal',
        price: 60,
        durationMinutes: 75,
        description: 'Análisis profundo de sol, luna, ascendente, nodos kármicos y patrones inconscientes con grabación en audio HD.',
        format: 'online',
        popular: true
      },
      {
        id: 'camila-revolucion-solar',
        title: 'Revolución Solar & Tránsitos del Año',
        price: 55,
        durationMinutes: 60,
        description: 'Orientación para tu año de cumpleaños: temas principales, oportunidades y meses clave.',
        format: 'online'
      }
    ],
    socialLinks: {
      enabled: true,
      instagram: 'https://instagram.com/camila.astrologia',
      whatsapp: 'https://wa.me/34699112233',
      youtube: 'https://youtube.com/@camilanavarroastral'
    },
    reviews: [
      {
        id: 'rc1',
        author: 'Andrea Garrido',
        date: '25 Oct 2026',
        rating: 5,
        therapyTitle: 'Lectura Completa de Carta Natal',
        comment: 'Me dio una claridad que llevaba meses buscando. Explicó todo con mucha dulzura y precisión.'
      }
    ]
  }
];

export const WORKSHOPS: Workshop[] = [
  {
    id: 'w1',
    title: 'Aprende Tarot Evolutivo: Arcanos Mayores',
    therapistName: 'Lucía Luna',
    therapistAvatar: '/src/assets/images/therapist_sofia_reiki_1793833272999.jpg',
    date: '2026-10-25',
    dateBadge: '25 Oct',
    time: '18:00 - 20:30 CEST',
    price: 35,
    image: '/src/assets/images/therapist_sofia_reiki_1793833272999.jpg',
    format: 'online',
    category: 'tarot',
    spotsLeft: 4,
    description: 'Taller intensivo en directo para conectar con tu intuición y aprender a leer los 22 Arcanos sin memorizar textos de memoria.'
  },
  {
    id: 'w2',
    title: 'Iniciación al Reiki Usui Nivel 1',
    therapistName: 'Lucía Luna',
    therapistAvatar: '/src/assets/images/therapist_sofia_reiki_1793833272999.jpg',
    date: '2026-11-02',
    dateBadge: '2 Nov',
    time: '10:00 - 15:00 CEST',
    price: 80,
    image: '/src/assets/images/hero_holistic_therapy_1793833271237.jpg',
    format: 'presencial',
    city: 'Madrid',
    category: 'reiki',
    spotsLeft: 3,
    description: 'Sintonización presencial para abrir tus canales de sanación y aprender a hacerte autotratamiento diario a ti y a tus seres queridos.'
  },
  {
    id: 'w3',
    title: 'Masaje Holístico y Puntos de Tensión',
    therapistName: 'Asa Merria',
    therapistAvatar: '/src/assets/images/therapist_elena_acupuncture_1793833271404.jpg',
    date: '2026-11-10',
    dateBadge: '10 Nov',
    time: '11:00 - 13:30 CEST',
    price: 45,
    image: '/src/assets/images/therapist_elena_acupuncture_1793833271404.jpg',
    format: 'presencial',
    city: 'Barcelona',
    category: 'masaje',
    spotsLeft: 6,
    description: 'Aprende técnicas sencillas de masaje de hombros, cuello y rostro para aliviar la carga corporal de tu día a día.'
  },
  {
    id: 'w4',
    title: 'Círculo de Luna Llena & Baño Sonoro',
    therapistName: 'Marcos Marianta',
    therapistAvatar: '/src/assets/images/therapist_marcos_sound_1793833272462.jpg',
    date: '2026-11-18',
    dateBadge: '18 Nov',
    time: '19:30 - 21:00 CEST',
    price: 25,
    image: '/src/assets/images/therapy_singing_bowls_1793833272966.jpg',
    format: 'ambos',
    city: 'Valencia y Streaming HD',
    category: 'sonoterapia',
    spotsLeft: 8,
    description: 'Meditación colectiva bajo la frecuencia de cuencos de cuarzo y gong para soltar lo que ya no sirve y sembrar intenciones.'
  }
];

export const INITIAL_APPLICATIONS: TherapistApplication[] = [
  {
    id: 'app_1',
    name: 'Valeria Cisneros',
    email: 'valeria.cisneros.terapias@gmail.com',
    phone: '+34 678 901 234',
    city: 'Madrid',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
    headline: 'Maestra de Flores de Bach & Biodescodificación Emocional',
    specialties: ['Flores de Bach', 'Biodescodificación', 'Gestión del Duelo'],
    formats: ['ambos'],
    experienceYears: 7,
    certifications: [
      'Diploma Practitioner Sistema Bach de Inglaterra (BFRP)',
      'Certificación Internacional en Descodificación Biológica de Enfermedades (Ángeles Wolder Institute)'
    ],
    bio: 'Acompaño a personas en procesos de cambio profundo, somatizaciones recurrentes y duelos a través de la medicina floral y la comprensión biológica del síntoma.',
    status: 'pendiente',
    appliedDate: '2026-11-04'
  },
  {
    id: 'app_2',
    name: 'Rodrigo Benítez',
    email: 'rodrigo.sonoterapia@gmail.com',
    phone: '+34 654 321 098',
    city: 'Barcelona',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80',
    headline: 'Especialista en Sonoterapia con Cuencos Tibetanos y Diapasones',
    specialties: ['Sonoterapia', 'Alineación de Chakras', 'Meditación'],
    formats: ['presencial'],
    experienceYears: 5,
    certifications: [
      'Terapeuta Certificado en Sonido Sagrado por la Sound Healing Academy (Reino Unido)',
      'Maestría en Meditación Mindfulness y Respiración Diafragmática'
    ],
    bio: 'Utilizo frecuencias armónicas y cuencos forjados en Nepal para inducir ondas alfa y theta cerebrales, disolviendo nudos emocionales y fatiga crónica.',
    status: 'pendiente',
    appliedDate: '2026-11-05'
  },
  {
    id: 'app_3',
    name: 'Carolina Morán',
    email: 'carolina.reiki.madrid@gmail.com',
    phone: '+34 611 223 344',
    city: 'Sevilla',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80',
    headline: 'Maestra Reiki Usui Ryoho & Sanación Pránica',
    specialties: ['Reiki', 'Aromaterapia', 'Sanación Energética'],
    formats: ['online'],
    experienceYears: 9,
    certifications: [
      'Gendai Reiki Ho Shihan (Federación Española de Reiki)',
      'Certificado en Aromaterapia Clínica Científica (Escuela Francesa)'
    ],
    bio: 'Dedicada desde 2017 a la armonización del biocampo energético. Sesiones a distancia con devolución grabada y seguimiento personalizado de 15 días.',
    status: 'aprobado',
    appliedDate: '2026-10-28',
    reviewNotes: 'Documentación verificada por Gabriel. Aprobada para consultas online.'
  },
  {
    id: 'app_4',
    name: 'Ignacio Salgado',
    email: 'ignacio.quiropractico@gmail.com',
    phone: '+34 699 887 766',
    city: 'Valencia',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
    headline: 'Osteopatía Estructural & Masaje Deportivo',
    specialties: ['Osteopatía', 'Masaje'],
    formats: ['presencial'],
    experienceYears: 3,
    certifications: [
      'Técnico Superior en Quiromasaje y Terapias Manuales'
    ],
    bio: 'Enfocado en descompresión vertebral y relajación neuromuscular profunda para oficinistas y atletas.',
    status: 'rechazado',
    appliedDate: '2026-10-15',
    reviewNotes: 'Falta homologación del título de osteopatía craneosacral requerida para Yoli.'
  }
];

export const DEFAULT_HOURS_POOL = [
  '06:00', '06:30', '07:00', '07:30', '08:00', '08:30', '09:00', '09:30', '10:00', '10:30',
  '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30',
  '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30',
  '21:00', '21:30', '22:00'
];

export const createDefaultTherapistSchedule = (therapistId: string): TherapistSchedule => ({
  therapistId,
  scheduleMode: 'uniform',
  slotDurationMinutes: 60,
  uniformSlots: ['10:00', '11:30', '13:00', '16:00', '17:30', '19:00'],
  dailySchedules: {
    1: { enabled: true, slots: ['10:00', '11:30', '13:00', '16:00', '17:30', '19:00'] }, // Lun
    2: { enabled: true, slots: ['10:00', '11:30', '13:00', '16:00', '17:30', '19:00'] }, // Mar
    3: { enabled: true, slots: ['10:00', '11:30', '13:00', '16:00', '17:30', '19:00'] }, // Mié
    4: { enabled: true, slots: ['10:00', '11:30', '13:00', '16:00', '17:30', '19:00'] }, // Jue
    5: { enabled: true, slots: ['10:00', '11:30', '13:00', '16:00', '17:30'] },          // Vie
    6: { enabled: false, slots: ['11:00', '12:30'] },                                    // Sáb
    0: { enabled: false, slots: [] }                                                     // Dom
  },
  blockedDates: ['2026-11-20']
});

export const INITIAL_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'notif_1',
    type: 'recordatorio',
    title: 'Próxima cita en 24 horas',
    message: 'Tienes sesión de Tarot Evolutivo con Asa Merria mañana a las 11:00.',
    date: 'Hace 2 horas',
    read: false,
    linkTab: 'citas'
  },
  {
    id: 'notif_2',
    type: 'cita_confirmada',
    title: 'Cita Confirmada',
    message: 'Tu reserva de Reiki Usui con Lucía Luna fue confirmada para el 12 de Noviembre.',
    date: 'Ayer',
    read: false,
    linkTab: 'citas'
  },
  {
    id: 'notif_3',
    type: 'taller',
    title: 'Nuevo Taller Destacado',
    message: 'Marcos Marianta ha abierto cupos para el Círculo de Sonoterapia en Madrid.',
    date: 'Hace 2 días',
    read: true
  }
];
