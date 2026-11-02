// Portfolio taxonomy adapted from the user-supplied reference. Existing presentation is preserved.
const servicePages = {
    "special-systems": {
        "file": "sistemas-especiales.html",
        "title": {
            "es": "Sistemas Especiales",
            "en": "Special Systems"
        },
        "image": "case_industrial.png",
        "intro": {
            "es": "Espacios más seguros. Sistemas conectados.",
            "en": "Safer spaces. Connected systems."
        },
        "about": {
            "es": "Integramos video, analítica avanzada, control de acceso y protección contra incendios. Sistemas que ayudan a observar, controlar y proteger las áreas clave de tu instalación.",
            "en": "We integrate video, advanced analytics, access control and fire protection. Systems that help you observe, control and protect key areas of your facility."
        },
        "disciplines": [
            "sys-cctv",
            "sys-access",
            "fire-suppression"
        ],
        "groups": [
            {
                "title": {
                    "es": "Seguridad física integrada",
                    "en": "Integrated physical security"
                },
                "description": {
                    "es": "Video, accesos y protección contra incendios conectados.",
                    "en": "Connected video, access and fire protection."
                },
                "items": [
                    "sys-cctv",
                    "sys-access",
                    "fire-suppression"
                ]
            }
        ],
        "related": [
            "cybersecurity",
            "projects"
        ]
    },
    "software": {
        "file": "desarrollo-software.html",
        "title": {
            "es": "Desarrollo de software",
            "en": "Software development"
        },
        "image": "services/software-v1.jpg",
        "intro": {
            "es": "Tu forma de trabajar, convertida en soluciones.",
            "en": "Your way of working, turned into solutions."
        },
        "about": {
            "es": "Desarrollamos aplicaciones a medida, ERP e inventarios e integramos monitoreo y analítica. Partimos de los procesos del negocio para conectar información, automatizar tareas y dar visibilidad a la operación.",
            "en": "We develop custom applications, ERP and inventory tools, and integrate monitoring and analytics. Business processes guide information connections, task automation and operational visibility."
        },
        "disciplines": [
            "sw-apps",
            "sw-erp",
            "sw-monitoring"
        ],
        "groups": [
            {
                "title": {
                    "es": "Aplicaciones y operación",
                    "en": "Applications and operations"
                },
                "description": {
                    "es": "Herramientas que conectan procesos, información y decisiones.",
                    "en": "Tools connecting processes, information and decisions."
                },
                "items": [
                    "sw-apps",
                    "sw-erp",
                    "sw-monitoring"
                ]
            }
        ],
        "related": [
            "data-centers",
            "projects"
        ]
    },
    "data-centers": {
        "file": "datacenters.html",
        "title": {
            "es": "Data Centers",
            "en": "Data Centers"
        },
        "image": "datacenter.png",
        "intro": {
            "es": "Infraestructura crítica, pensada para tu operación.",
            "en": "Critical infrastructure, designed around your operation."
        },
        "about": {
            "es": "Integramos energía, climatización, protección, infraestructura física y monitoreo como un solo sistema. El diseño parte de las condiciones del sitio y las necesidades de continuidad y crecimiento, con profesionales acreditados Accredited Tier Designer (ATD).",
            "en": "We integrate power, cooling, protection, physical infrastructure and monitoring as one system. Design starts with site conditions and continuity and growth needs, supported by Accredited Tier Designer (ATD) professionals."
        },
        "disciplines": [
            "dc-power",
            "dc-cooling",
            "fire-suppression",
            "dc-physical",
            "dc-dcim",
            "dc-bms"
        ],
        "stages": {
            "es": [
                [
                    "Diagnóstico",
                    "Sitio, riesgos y necesidades de operación."
                ],
                [
                    "Ingeniería",
                    "Arquitectura, capacidad y alcance."
                ],
                [
                    "Implementación",
                    "Suministro, instalación e integración."
                ],
                [
                    "Validación",
                    "Pruebas, documentación y entrega."
                ]
            ],
            "en": [
                [
                    "Assessment",
                    "Site, risks and operational needs."
                ],
                [
                    "Engineering",
                    "Architecture, capacity and scope."
                ],
                [
                    "Implementation",
                    "Supply, installation and integration."
                ],
                [
                    "Validation",
                    "Testing, documentation and handover."
                ]
            ]
        },
        "groups": [
            {
                "title": {
                    "es": "Continuidad de la infraestructura",
                    "en": "Infrastructure continuity"
                },
                "description": {
                    "es": "Respaldo eléctrico, control térmico y protección contra incendios.",
                    "en": "Power backup, thermal control and fire protection."
                },
                "items": [
                    "dc-power",
                    "dc-cooling",
                    "fire-suppression"
                ]
            },
            {
                "title": {
                    "es": "Infraestructura física y gestión",
                    "en": "Physical infrastructure and management"
                },
                "description": {
                    "es": "Espacios técnicos, capacidad y supervisión de la instalación.",
                    "en": "Technical spaces, capacity and facility monitoring."
                },
                "items": [
                    "dc-physical",
                    "dc-dcim",
                    "dc-bms"
                ]
            }
        ],
        "related": [
            "cybersecurity",
            "hardware"
        ]
    },
    "cybersecurity": {
        "file": "ciberseguridad.html",
        "title": {
            "es": "Networking y Ciberseguridad",
            "en": "Networking and Cybersecurity"
        },
        "image": "case_network.png",
        "intro": {
            "es": "Conectividad confiable. Protección de extremo a extremo.",
            "en": "Reliable connectivity. End-to-end protection."
        },
        "about": {
            "es": "Diseñamos, diagnosticamos y protegemos redes empresariales. Relacionamos la infraestructura física, la conectividad inalámbrica, el acceso remoto y la protección de equipos y usuarios.",
            "en": "We design, diagnose and protect enterprise networks. We connect physical infrastructure, wireless connectivity, remote access and protection for devices and users."
        },
        "disciplines": [
            "net-wireless",
            "structured-cabling",
            "cyb-firewalls",
            "cyb-endpoints"
        ],
        "groups": [
            {
                "title": {
                    "es": "Networking e infraestructura física",
                    "en": "Networking and physical infrastructure"
                },
                "description": {
                    "es": "La base cableada e inalámbrica de las comunicaciones.",
                    "en": "The wired and wireless foundation of communications."
                },
                "items": [
                    "net-wireless",
                    "structured-cabling"
                ]
            },
            {
                "title": {
                    "es": "Seguridad de red y dispositivos",
                    "en": "Network and device security"
                },
                "description": {
                    "es": "Protección del perímetro, accesos y equipos de usuario.",
                    "en": "Protection for the perimeter, access and user devices."
                },
                "items": [
                    "cyb-firewalls",
                    "cyb-endpoints"
                ]
            }
        ],
        "related": [
            "data-centers",
            "special-systems"
        ]
    },
    "hardware": {
        "file": "servidores.html",
        "title": {
            "es": "Equipo Activo",
            "en": "Active IT Equipment"
        },
        "image": "services/servers-v1.jpg",
        "intro": {
            "es": "La capacidad correcta para cada carga de trabajo.",
            "en": "The right capacity for every workload."
        },
        "about": {
            "es": "Integramos servidores, almacenamiento, hiperconvergencia y equipos de usuario final. Seleccionamos capacidad y compatibilidad según las aplicaciones, la movilidad y el crecimiento de tu operación.",
            "en": "We integrate servers, storage, hyperconvergence and end-user devices. Capacity and compatibility are selected according to applications, mobility and operational growth."
        },
        "disciplines": [
            "hw-servers",
            "hw-storage",
            "hw-computing"
        ],
        "groups": [
            {
                "title": {
                    "es": "Plataformas y equipos empresariales",
                    "en": "Enterprise platforms and devices"
                },
                "description": {
                    "es": "Procesamiento, datos y herramientas para las personas.",
                    "en": "Processing, data and tools for people."
                },
                "items": [
                    "hw-servers",
                    "hw-storage",
                    "hw-computing"
                ]
            }
        ],
        "related": [
            "data-centers",
            "licensing"
        ]
    },
    "licensing": {
        "file": "licenciamiento.html",
        "title": {
            "es": "Licenciamiento de software",
            "en": "Software licensing"
        },
        "image": "services/licensing-v1.jpg",
        "intro": {
            "es": "Las herramientas adecuadas para tu equipo.",
            "en": "The right tools for your team."
        },
        "about": {
            "es": "Acompañamos la selección de licencias Microsoft, Autodesk y Minitab, así como servicios AWS y Azure. Relacionamos usuarios, aplicaciones, arquitectura y consumo para definir el alcance adecuado.",
            "en": "We help select Microsoft, Autodesk and Minitab licenses, as well as AWS and Azure services. Users, applications, architecture and consumption guide the appropriate scope."
        },
        "disciplines": [
            "lic-microsoft",
            "lic-autocad",
            "lic-minitab",
            "lic-cloud",
            "lic-adoption"
        ],
        "groups": [
            {
                "title": {
                    "es": "Licencias por especialidad",
                    "en": "Licenses by specialty"
                },
                "description": {
                    "es": "Productividad, diseño y análisis de datos.",
                    "en": "Productivity, design and data analysis."
                },
                "items": [
                    "lic-microsoft",
                    "lic-autocad",
                    "lic-minitab"
                ]
            },
            {
                "title": {
                    "es": "Cloud y adopción",
                    "en": "Cloud and adoption"
                },
                "description": {
                    "es": "Servicios en la nube y acompañamiento para su uso.",
                    "en": "Cloud services and adoption support."
                },
                "items": [
                    "lic-cloud",
                    "lic-adoption"
                ]
            }
        ],
        "related": [
            "hardware",
            "software"
        ]
    },
    "projects": {
        "file": "proyectos-tecnologia.html",
        "title": {
            "es": "Proyectos de Tecnología",
            "en": "Technology Projects"
        },
        "image": "case_datacenter.png",
        "intro": {
            "es": "De la idea a la puesta en operación.",
            "en": "From the idea to operational handover."
        },
        "about": {
            "es": "Diseñamos, gestionamos e implementamos proyectos que coordinan seguridad, software, Data Centers, redes, equipos y licenciamiento. Definimos alcance, responsabilidades y criterios de entrega para una ejecución integral.",
            "en": "We design, manage and implement projects coordinating security, software, data centers, networks, equipment and licensing. Scope, responsibilities and handover criteria guide an integrated delivery."
        },
        "groups": [
            {
                "title": {
                    "es": "Ingeniería y ejecución",
                    "en": "Engineering and delivery"
                },
                "description": {
                    "es": "Planeación, coordinación y entrega llave en mano.",
                    "en": "Planning, coordination and turnkey handover."
                },
                "items": [
                    "project-management",
                    "project-implementation"
                ]
            },
            {
                "title": {
                    "es": "Integración multidisciplinaria",
                    "en": "Multidisciplinary integration"
                },
                "description": {
                    "es": "Infraestructura, seguridad y operación dentro de un mismo proyecto.",
                    "en": "Infrastructure, security and operations within one project."
                },
                "items": [
                    "project-continuity",
                    "project-security"
                ]
            }
        ],
        "disciplines": [
            "project-management",
            "project-implementation",
            "project-continuity",
            "project-security"
        ],
        "related": [
            "software",
            "hardware"
        ]
    }
};

const serviceDisciplines = {
    "dc-power": {
        "type": "service",
        "image": "services/disciplines/dc-power-v1.jpg",
        "title": {
            "es": "Energía crítica",
            "en": "Critical power"
        },
        "summary": {
            "es": "UPS, plantas generadoras, distribución y sistema de tierras.",
            "en": "UPS, generators, distribution and grounding."
        },
        "description": {
            "es": "Integramos la alimentación y el respaldo eléctrico de los equipos críticos según la capacidad y las necesidades de continuidad del centro de datos.",
            "en": "We integrate power supply and backup for critical equipment according to data center capacity and continuity needs."
        },
        "es": [
            [
                "UPS y PDUs",
                "Respaldo y distribución de energía hacia los equipos."
            ],
            [
                "Plantas generadoras",
                "Integración del respaldo para interrupciones del suministro."
            ],
            [
                "Implementación",
                "Planeación, instalación y puesta en marcha de la solución."
            ],
            [
                "Calidad de energía",
                "Evaluación de las condiciones del suministro y necesidades de acondicionamiento."
            ],
            [
                "Sistema de tierras",
                "Diseño e integración de puesta a tierra para la infraestructura y los equipos."
            ]
        ],
        "en": [
            [
                "UPS and PDUs",
                "Backup and power distribution to equipment."
            ],
            [
                "Generators",
                "Backup integration for utility outages."
            ],
            [
                "Implementation",
                "Planning, installation and commissioning."
            ],
            [
                "Power quality",
                "Supply condition assessment and power conditioning needs."
            ],
            [
                "Grounding",
                "Grounding design and integration for infrastructure and equipment."
            ]
        ]
    },
    "dc-quality": {
        "type": "service",
        "image": "services/disciplines/dc-quality-v1.jpg",
        "title": {
            "es": "Calidad de energía",
            "en": "Power quality"
        },
        "summary": {
            "es": "Condiciones eléctricas para equipos críticos.",
            "en": "Electrical conditions for critical equipment."
        },
        "description": {
            "es": "Revisamos las condiciones del suministro eléctrico para identificar necesidades de protección y adecuación de la infraestructura.",
            "en": "We review electrical supply conditions to identify protection and infrastructure needs."
        },
        "es": [
            [
                "Evaluación",
                "Revisión de condiciones y requerimientos de las cargas."
            ],
            [
                "Protección",
                "Integración de soluciones de acondicionamiento de energía."
            ],
            [
                "Continuidad",
                "Coordinación con la distribución y el respaldo eléctrico."
            ]
        ],
        "en": [
            [
                "Assessment",
                "Review of conditions and load requirements."
            ],
            [
                "Protection",
                "Integration of power conditioning solutions."
            ],
            [
                "Continuity",
                "Coordination with distribution and backup power."
            ]
        ]
    },
    "dc-grounding": {
        "type": "service",
        "image": "services/disciplines/dc-grounding-v1.jpg",
        "title": {
            "es": "Sistema de tierras",
            "en": "Grounding systems"
        },
        "summary": {
            "es": "Protección eléctrica desde la infraestructura.",
            "en": "Electrical protection built into the infrastructure."
        },
        "description": {
            "es": "Integramos el sistema de puesta a tierra como parte del diseño eléctrico del centro de datos, considerando los equipos y las condiciones de la instalación.",
            "en": "We integrate grounding into the data center electrical design, considering equipment and facility conditions."
        },
        "es": [
            [
                "Diseño",
                "Definición del sistema según el proyecto."
            ],
            [
                "Integración",
                "Conexión de la infraestructura y los equipos al sistema de tierras."
            ],
            [
                "Revisión",
                "Verificación de las conexiones y condiciones de la instalación."
            ]
        ],
        "en": [
            [
                "Design",
                "System definition according to the project."
            ],
            [
                "Integration",
                "Connection of infrastructure and equipment to grounding."
            ],
            [
                "Review",
                "Verification of connections and facility conditions."
            ]
        ]
    },
    "dc-cooling": {
        "type": "service",
        "image": "services/disciplines/dc-cooling-v1.jpg",
        "title": {
            "es": "Climatización de precisión",
            "en": "Precision cooling"
        },
        "summary": {
            "es": "Un entorno térmico para tu equipamiento.",
            "en": "A thermal environment for your equipment."
        },
        "description": {
            "es": "Diseñamos e integramos climatización para los espacios técnicos, considerando la carga de los equipos, su distribución y el crecimiento previsto.",
            "en": "We design and integrate cooling for technical spaces, considering equipment loads, layout and expected growth."
        },
        "es": [
            [
                "Capacidad",
                "Evaluación de las necesidades de enfriamiento."
            ],
            [
                "Distribución",
                "Organización del flujo de aire en el espacio técnico."
            ],
            [
                "Integración",
                "Coordinación de climatización y equipamiento."
            ]
        ],
        "en": [
            [
                "Capacity",
                "Assessment of cooling needs."
            ],
            [
                "Distribution",
                "Airflow organization in the technical space."
            ],
            [
                "Integration",
                "Coordination of cooling and equipment."
            ]
        ]
    },
    "dc-bms": {
        "type": "service",
        "image": "services/disciplines/dc-bms-v1.jpg",
        "title": {
            "es": "BMS y automatización",
            "en": "BMS and automation"
        },
        "summary": {
            "es": "Supervisión centralizada de energía, climatización y alarmas.",
            "en": "Central monitoring of power, cooling and alarms."
        },
        "description": {
            "es": "Integramos Building Management Systems (BMS) para reunir información de los sistemas de la instalación y apoyar su gestión y operación.",
            "en": "We integrate Building Management Systems (BMS) to bring facility system information together and support management and operation."
        },
        "es": [
            [
                "Sistemas conectados",
                "Integración de variables de energía, climatización e infraestructura según el alcance."
            ],
            [
                "Monitoreo",
                "Consulta del estado de los sistemas desde una interfaz de gestión."
            ],
            [
                "Eventos",
                "Información para dar seguimiento a condiciones que requieren atención."
            ],
            [
                "Automatización e históricos",
                "Integración de tendencias, prioridades de alarma y funciones de control según protocolos y compatibilidad."
            ]
        ],
        "en": [
            [
                "Connected systems",
                "Integration of power, cooling and infrastructure variables according to scope."
            ],
            [
                "Monitoring",
                "System status available through a management interface."
            ],
            [
                "Events",
                "Information to track conditions that need attention."
            ],
            [
                "Automation and history",
                "Trends, alarm priorities and control functions according to protocols and compatibility."
            ]
        ]
    },
    "structured-cabling": {
        "type": "service",
        "image": "services/disciplines/structured-cabling-v1.jpg",
        "title": {
            "es": "Infraestructura de redes",
            "en": "Network infrastructure"
        },
        "summary": {
            "es": "Fibra óptica de planta interna y cableado estructurado.",
            "en": "Indoor fiber optics and structured cabling."
        },
        "description": {
            "es": "Diseñamos e implementamos la infraestructura física que conecta las áreas y los equipos de tu instalación.",
            "en": "We design and implement the physical infrastructure connecting areas and equipment throughout your facility."
        },
        "es": [
            [
                "Fibra óptica de planta interna",
                "Backbone y enlaces entre áreas, cuartos de telecomunicaciones y equipos."
            ],
            [
                "Cableado estructurado",
                "Conexiones de cobre, puntos de datos, patch panels y organización en racks."
            ],
            [
                "Canalizaciones y espacios",
                "Rutas, charolas, protección mecánica y administración de espacios de telecomunicaciones."
            ],
            [
                "Diseño y escalabilidad",
                "Topología, capacidad, reservas y crecimiento de la red física."
            ],
            [
                "Pruebas y documentación",
                "Identificación, registros de pruebas y planos de entrega según el proyecto."
            ]
        ],
        "en": [
            [
                "Indoor fiber optics",
                "Backbone and links between areas, telecommunications rooms and equipment."
            ],
            [
                "Structured cabling",
                "Copper links, data outlets, patch panels and rack organization."
            ],
            [
                "Pathways and spaces",
                "Routes, trays, mechanical protection and telecommunications spaces."
            ],
            [
                "Design and scalability",
                "Topology, capacity, spare resources and physical network growth."
            ],
            [
                "Testing and documentation",
                "Identification, test records and handover drawings according to the project."
            ]
        ]
    },
    "hardware": {
        "type": "service",
        "image": "services/servers-v1.jpg",
        "title": {
            "es": "Servidores, cómputo e hiperconvergencia",
            "en": "Servers, computing and hyperconvergence"
        },
        "summary": {
            "es": "Capacidad de procesamiento a tu medida.",
            "en": "Processing capacity tailored to your needs."
        },
        "description": {
            "es": "Acompañamos la selección e integración de infraestructura de cómputo según las aplicaciones y las necesidades de crecimiento de tu negocio.",
            "en": "We support the selection and integration of computing infrastructure according to your applications and growth needs."
        },
        "es": [
            [
                "Servidores",
                "Equipamiento para alojar las aplicaciones y servicios de la organización."
            ],
            [
                "Cómputo",
                "Selección de capacidad y compatibilidad con el entorno existente."
            ],
            [
                "Hiperconvergencia",
                "Integración de cómputo, almacenamiento y virtualización en una plataforma unificada."
            ]
        ],
        "en": [
            [
                "Servers",
                "Equipment to host organizational applications and services."
            ],
            [
                "Computing",
                "Capacity selection and compatibility with the existing environment."
            ],
            [
                "Hyperconvergence",
                "Computing, storage and virtualization integrated into a unified platform."
            ]
        ]
    },
    "cyb-firewalls": {
        "type": "service",
        "image": "services/disciplines/cyb-firewalls-v1.jpg",
        "title": {
            "es": "Firewalls, VPN y segmentación",
            "en": "Firewalls, VPN and segmentation"
        },
        "summary": {
            "es": "Políticas, acceso remoto y separación de redes.",
            "en": "Policies, remote access and network separation."
        },
        "description": {
            "es": "Integramos protección perimetral y controles de comunicación para redes empresariales y conexiones entre sitios.",
            "en": "We integrate perimeter protection and communication controls for enterprise networks and connections between sites."
        },
        "es": [
            [
                "Firewalls y políticas",
                "Control del tráfico de acuerdo con aplicaciones y necesidades de la operación."
            ],
            [
                "VPN y acceso remoto",
                "Conexiones seguras para usuarios y sitios según la arquitectura definida."
            ],
            [
                "Segmentación",
                "Separación de usuarios, equipos y servicios por función y nivel de acceso."
            ],
            [
                "Conectividad entre sitios",
                "Integración de enlaces, routing y SD-WAN cuando corresponda al alcance."
            ]
        ],
        "en": [
            [
                "Firewalls and policies",
                "Traffic controls aligned with applications and operational needs."
            ],
            [
                "VPN and remote access",
                "Secure user and site connections according to the defined architecture."
            ],
            [
                "Segmentation",
                "Separation of users, equipment and services by role and access level."
            ],
            [
                "Site connectivity",
                "Integration of links, routing and SD-WAN where included in scope."
            ]
        ]
    },
    "cyb-segmentation": {
        "type": "service",
        "image": "services/disciplines/cyb-segmentation-v1.jpg",
        "title": {
            "es": "Segmentación y accesos",
            "en": "Segmentation and access"
        },
        "summary": {
            "es": "Conecta cada recurso con quien lo necesita.",
            "en": "Connect resources to the people who need them."
        },
        "description": {
            "es": "Organizamos la red y sus accesos para separar usuarios, equipos y servicios de acuerdo con su función.",
            "en": "We organize networks and access to separate users, equipment and services according to their roles."
        },
        "es": [
            [
                "Segmentación",
                "Separación de áreas y servicios según el diseño de la red."
            ],
            [
                "Accesos",
                "Definición de permisos para usuarios y equipos."
            ],
            [
                "Enfoque Zero Trust",
                "Controles que consideran la identidad y las necesidades de acceso."
            ]
        ],
        "en": [
            [
                "Segmentation",
                "Separation of areas and services according to network design."
            ],
            [
                "Access",
                "Definition of permissions for users and equipment."
            ],
            [
                "Zero Trust approach",
                "Controls considering identity and access needs."
            ]
        ]
    },
    "cyb-monitoring": {
        "type": "service",
        "image": "services/disciplines/cyb-monitoring-v1.jpg",
        "title": {
            "es": "Monitoreo de seguridad",
            "en": "Security monitoring"
        },
        "summary": {
            "es": "Visibilidad para identificar eventos.",
            "en": "Visibility to identify events."
        },
        "description": {
            "es": "Integramos herramientas y revisamos eventos para apoyar la identificación de accesos inusuales y condiciones que requieren atención.",
            "en": "We integrate tools and review events to help identify unusual access and conditions requiring attention."
        },
        "es": [
            [
                "Visibilidad",
                "Información sobre eventos relevantes de la red."
            ],
            [
                "Revisión",
                "Seguimiento de registros y señales de actividad inusual."
            ],
            [
                "Protección proactiva",
                "Ajustes a los controles según los hallazgos y el alcance del servicio."
            ]
        ],
        "en": [
            [
                "Visibility",
                "Information about relevant network events."
            ],
            [
                "Review",
                "Tracking of logs and unusual activity signals."
            ],
            [
                "Proactive protection",
                "Control adjustments according to findings and service scope."
            ]
        ]
    },
    "sys-cctv": {
        "type": "service",
        "image": "services/disciplines/sys-cctv-v1.jpg",
        "title": {
            "es": "CCTV inteligente y VMS",
            "en": "Intelligent CCTV and VMS"
        },
        "summary": {
            "es": "Video profesional, analítica avanzada e inteligencia artificial.",
            "en": "Professional video, advanced analytics and artificial intelligence."
        },
        "description": {
            "es": "Diseñamos e integramos sistemas de videovigilancia para observar las áreas relevantes de la instalación y apoyar la revisión de eventos.",
            "en": "We design and integrate video surveillance to observe relevant facility areas and support event review."
        },
        "es": [
            [
                "Diseño de cobertura",
                "Definición de cámaras y puntos de observación según el sitio."
            ],
            [
                "Video profesional",
                "Integración de cámaras, almacenamiento y visualización."
            ],
            [
                "Consulta de eventos",
                "Acceso a las imágenes para apoyar el seguimiento de incidentes."
            ],
            [
                "Analítica e IA",
                "Reglas y detección de eventos según las capacidades de las cámaras y la plataforma."
            ],
            [
                "Gestión VMS",
                "Integración de video, almacenamiento, permisos y consulta de eventos en sistemas compatibles."
            ]
        ],
        "en": [
            [
                "Coverage design",
                "Definition of cameras and observation points according to the site."
            ],
            [
                "Professional video",
                "Integration of cameras, storage and viewing."
            ],
            [
                "Event review",
                "Access to images to support incident follow-up."
            ],
            [
                "Analytics and AI",
                "Rules and event detection according to camera and platform capabilities."
            ],
            [
                "VMS management",
                "Integration of video, storage, permissions and event review in compatible systems."
            ]
        ]
    },
    "sys-analytics": {
        "type": "service",
        "image": "services/disciplines/sys-analytics-v1.jpg",
        "title": {
            "es": "Analítica avanzada e IA",
            "en": "Advanced analytics and AI"
        },
        "summary": {
            "es": "Video que ayuda a reconocer eventos.",
            "en": "Video that helps recognize events."
        },
        "description": {
            "es": "Integramos analítica de video e inteligencia artificial para apoyar la detección de situaciones relevantes según el entorno y las capacidades de la solución.",
            "en": "We integrate video analytics and artificial intelligence to help detect relevant situations according to the environment and solution capabilities."
        },
        "es": [
            [
                "Casos de uso",
                "Definición de eventos y áreas que necesitan seguimiento."
            ],
            [
                "Analítica de video",
                "Configuración de reglas y funciones compatibles con los equipos."
            ],
            [
                "Información útil",
                "Eventos que apoyan la revisión y las decisiones del equipo responsable."
            ]
        ],
        "en": [
            [
                "Use cases",
                "Definition of events and areas needing attention."
            ],
            [
                "Video analytics",
                "Configuration of rules and functions supported by the equipment."
            ],
            [
                "Useful information",
                "Events supporting review and decisions by the responsible team."
            ]
        ]
    },
    "sys-access": {
        "type": "service",
        "image": "services/disciplines/sys-access-v1.jpg",
        "title": {
            "es": "Control de acceso y VMS",
            "en": "Access control and VMS"
        },
        "summary": {
            "es": "Accesos conectados con la gestión de video.",
            "en": "Access connected with video management."
        },
        "description": {
            "es": "Integramos control de acceso con plataformas de gestión de video (VMS) compatibles para relacionar los ingresos con la información visual de la instalación.",
            "en": "We integrate access control with compatible video management systems (VMS) to connect entry events with facility video."
        },
        "es": [
            [
                "Control de acceso",
                "Permisos y puntos de ingreso según las áreas definidas."
            ],
            [
                "Integración con VMS",
                "Vinculación de eventos de acceso y video en sistemas compatibles."
            ],
            [
                "Gestión",
                "Consulta y administración de accesos según el alcance del proyecto."
            ],
            [
                "Visitantes y auditoría",
                "Gestión de credenciales, autorizaciones y registros de ingreso según el proyecto."
            ]
        ],
        "en": [
            [
                "Access control",
                "Permissions and entry points according to defined areas."
            ],
            [
                "VMS integration",
                "Linking access events with video in compatible systems."
            ],
            [
                "Management",
                "Access review and administration according to project scope."
            ],
            [
                "Visitors and audit",
                "Credential, authorization and entry record management according to the project."
            ]
        ]
    },
    "fire-suppression": {
        "type": "service",
        "image": "services/disciplines/fire-suppression-v1.jpg",
        "title": {
            "es": "Supresión de incendios",
            "en": "Fire suppression"
        },
        "summary": {
            "es": "Protección para instalaciones y equipos.",
            "en": "Protection for facilities and equipment."
        },
        "description": {
            "es": "Integramos soluciones de detección y supresión de incendios como parte de los sistemas especiales de la instalación, considerando sus espacios y equipamiento.",
            "en": "We integrate fire detection and suppression as part of the facility special systems, considering its spaces and equipment."
        },
        "es": [
            [
                "Detección",
                "Identificación temprana de condiciones de riesgo."
            ],
            [
                "Supresión",
                "Selección e integración del sistema de protección según el entorno."
            ],
            [
                "Coordinación",
                "Integración con la infraestructura y los sistemas de la instalación."
            ]
        ],
        "en": [
            [
                "Detection",
                "Early identification of risk conditions."
            ],
            [
                "Suppression",
                "Selection and integration of protection according to the environment."
            ],
            [
                "Coordination",
                "Integration with facility infrastructure and systems."
            ]
        ]
    },
    "licensing": {
        "type": "service",
        "image": "services/licensing-v1.jpg",
        "title": {
            "es": "Licenciamiento de software",
            "en": "Software licensing"
        },
        "summary": {
            "es": "Microsoft, AutoCAD, Minitab y más.",
            "en": "Microsoft, AutoCAD, Minitab and more."
        },
        "description": {
            "es": "Te acompañamos en la selección de licencias según las herramientas, los usuarios y las necesidades de tu organización.",
            "en": "We help you select licenses according to the tools, users and needs of your organization."
        },
        "es": [
            [
                "Microsoft",
                "Revisión de opciones de licenciamiento para las herramientas requeridas."
            ],
            [
                "AutoCAD y Minitab",
                "Licencias para aplicaciones de diseño y análisis según el proyecto."
            ],
            [
                "Selección",
                "Orientación sobre productos y modalidades disponibles para tu operación."
            ]
        ],
        "en": [
            [
                "Microsoft",
                "Review of licensing options for the required tools."
            ],
            [
                "AutoCAD and Minitab",
                "Licenses for design and analysis applications according to the project."
            ],
            [
                "Selection",
                "Guidance on products and available licensing options."
            ]
        ]
    },
    "software": {
        "type": "service",
        "image": "services/software-v1.jpg",
        "title": {
            "es": "Desarrollo de software",
            "en": "Software development"
        },
        "summary": {
            "es": "Aplicaciones e integraciones a tu medida.",
            "en": "Tailored applications and integrations."
        },
        "description": {
            "es": "Desarrollamos herramientas digitales para los procesos de tu organización, conectándolas con los sistemas que ya utilizas.",
            "en": "We develop digital tools for your organization’s processes, connecting them with the systems you already use."
        },
        "es": [
            [
                "Aplicaciones a medida",
                "Funciones y flujos definidos a partir de las necesidades de tu equipo."
            ],
            [
                "Integración de sistemas",
                "Conexión de información y procesos entre las plataformas de la organización."
            ],
            [
                "Mejora de procesos",
                "Herramientas que ayudan a simplificar tareas y dar seguimiento a la operación."
            ]
        ],
        "en": [
            [
                "Custom applications",
                "Features and workflows shaped around your team’s needs."
            ],
            [
                "System integration",
                "Connecting information and processes across organizational platforms."
            ],
            [
                "Process improvement",
                "Tools to simplify tasks and track operations."
            ]
        ]
    },
    "hw-servers": {
        "type": "service",
        "image": "services/servers-v1.jpg",
        "title": {
            "es": "Servidores e hiperconvergencia",
            "en": "Servers and hyperconvergence"
        },
        "summary": {
            "es": "Procesamiento y virtualización para aplicaciones empresariales.",
            "en": "Processing and virtualization for enterprise applications."
        },
        "description": {
            "es": "Seleccionamos e integramos servidores de acuerdo con las cargas que necesita alojar tu organización.",
            "en": "We select and integrate servers according to the workloads your organization needs to host."
        },
        "es": [
            [
                "Dimensionamiento",
                "Revisión de procesamiento, memoria y almacenamiento requeridos."
            ],
            [
                "Compatibilidad",
                "Selección del equipamiento según aplicaciones y entorno existente."
            ],
            [
                "Integración",
                "Organización y conexión del servidor con la infraestructura del proyecto."
            ],
            [
                "Hiperconvergencia",
                "Integración de cómputo, almacenamiento y virtualización en una plataforma común, cuando el proyecto lo requiere."
            ]
        ],
        "en": [
            [
                "Sizing",
                "Review of processing, memory and storage requirements."
            ],
            [
                "Compatibility",
                "Equipment selection according to applications and the existing environment."
            ],
            [
                "Integration",
                "Organization and connection with project infrastructure."
            ],
            [
                "Hyperconvergence",
                "Computing, storage and virtualization in a common platform when required by the project."
            ]
        ]
    },
    "hw-computing": {
        "type": "service",
        "image": "services/disciplines/hw-computing-v1.jpg",
        "title": {
            "es": "Cómputo, movilidad y accesorios",
            "en": "Computing, mobility and accessories"
        },
        "summary": {
            "es": "Desktops, portátiles, workstations, tablets y periféricos.",
            "en": "Desktops, laptops, workstations, tablets and peripherals."
        },
        "description": {
            "es": "Acompañamos la selección de equipos de cómputo según las herramientas y los perfiles de trabajo de tu organización.",
            "en": "We help select computing equipment according to your organization’s tools and working roles."
        },
        "es": [
            [
                "Necesidades del usuario",
                "Revisión de aplicaciones y tareas de cada perfil."
            ],
            [
                "Selección de equipos",
                "Capacidad y compatibilidad según el uso previsto."
            ],
            [
                "Crecimiento",
                "Planeación de actualizaciones de acuerdo con la operación."
            ],
            [
                "Tablets y movilidad",
                "Equipos para supervisión, inventarios, trabajo de campo y operación híbrida."
            ],
            [
                "Accesorios y despliegue",
                "Monitores, docks, periféricos y preparación de equipos según los perfiles de uso."
            ]
        ],
        "en": [
            [
                "User needs",
                "Review of applications and tasks for each role."
            ],
            [
                "Equipment selection",
                "Capacity and compatibility according to intended use."
            ],
            [
                "Growth",
                "Upgrade planning according to operational needs."
            ],
            [
                "Tablets and mobility",
                "Devices for supervision, inventory, field work and hybrid operations."
            ],
            [
                "Accessories and deployment",
                "Monitors, docks, peripherals and device preparation according to usage profiles."
            ]
        ]
    },
    "hw-hci": {
        "type": "service",
        "image": "services/disciplines/hw-hci-v1.jpg",
        "title": {
            "es": "Hiperconvergencia",
            "en": "Hyperconvergence"
        },
        "summary": {
            "es": "Cómputo, almacenamiento y virtualización.",
            "en": "Computing, storage and virtualization."
        },
        "description": {
            "es": "Integramos plataformas que reúnen recursos de infraestructura para alojar y administrar las cargas de tu negocio.",
            "en": "We integrate platforms that bring infrastructure resources together to host and manage business workloads."
        },
        "es": [
            [
                "Plataforma unificada",
                "Integración de cómputo y almacenamiento en un entorno común."
            ],
            [
                "Virtualización",
                "Organización de los recursos para las cargas del proyecto."
            ],
            [
                "Capacidad",
                "Planeación de recursos y crecimiento según el alcance definido."
            ]
        ],
        "en": [
            [
                "Unified platform",
                "Computing and storage integrated in a common environment."
            ],
            [
                "Virtualization",
                "Resource organization for project workloads."
            ],
            [
                "Capacity",
                "Resource and growth planning according to the defined scope."
            ]
        ]
    },
    "lic-microsoft": {
        "type": "service",
        "image": "services/licensing-v1.jpg",
        "title": {
            "es": "Microsoft y productividad",
            "en": "Microsoft and productivity"
        },
        "summary": {
            "es": "Licencias para las herramientas de tu equipo.",
            "en": "Licenses for your team’s tools."
        },
        "description": {
            "es": "Revisamos las necesidades de usuarios y herramientas Microsoft para orientar la selección del licenciamiento.",
            "en": "We review user and Microsoft tool needs to guide licensing selection."
        },
        "es": [
            [
                "Usuarios y uso",
                "Identificación de personas y herramientas requeridas."
            ],
            [
                "Modalidades",
                "Revisión de opciones disponibles según los productos seleccionados."
            ],
            [
                "Selección",
                "Orientación sobre compatibilidad y alcance de las licencias."
            ],
            [
                "Microsoft 365 e identidad",
                "Revisión de aplicaciones, colaboración, identidad y servicios empresariales requeridos."
            ]
        ],
        "en": [
            [
                "Users and usage",
                "Identification of people and required tools."
            ],
            [
                "Options",
                "Review of available options for selected products."
            ],
            [
                "Selection",
                "Guidance on license compatibility and scope."
            ],
            [
                "Microsoft 365 and identity",
                "Review of required applications, collaboration, identity and enterprise services."
            ]
        ]
    },
    "lic-autocad": {
        "type": "service",
        "image": "services/disciplines/lic-autocad-v1.jpg",
        "title": {
            "es": "AutoCAD",
            "en": "AutoCAD"
        },
        "summary": {
            "es": "Herramientas para tus proyectos de diseño.",
            "en": "Tools for your design projects."
        },
        "description": {
            "es": "Te orientamos en el licenciamiento de AutoCAD según las actividades de diseño y los usuarios de tu organización.",
            "en": "We guide AutoCAD licensing according to your organization’s design activities and users."
        },
        "es": [
            [
                "Necesidades de diseño",
                "Revisión de las herramientas requeridas por el equipo."
            ],
            [
                "Licenciamiento",
                "Selección de opciones disponibles para el producto."
            ],
            [
                "Requerimientos",
                "Revisión de compatibilidad con los equipos que utilizarán la aplicación."
            ]
        ],
        "en": [
            [
                "Design needs",
                "Review of the tools required by your team."
            ],
            [
                "Licensing",
                "Selection of available product options."
            ],
            [
                "Requirements",
                "Compatibility review for the computers running the application."
            ]
        ]
    },
    "lic-minitab": {
        "type": "service",
        "image": "services/disciplines/lic-minitab-v1.jpg",
        "title": {
            "es": "Minitab",
            "en": "Minitab"
        },
        "summary": {
            "es": "Herramientas para el análisis de datos.",
            "en": "Tools for data analysis."
        },
        "description": {
            "es": "Acompañamos la selección de licencias Minitab para los usuarios que realizan análisis en tu organización.",
            "en": "We help select Minitab licenses for users performing analysis in your organization."
        },
        "es": [
            [
                "Uso previsto",
                "Identificación de las necesidades del equipo de análisis."
            ],
            [
                "Licencias",
                "Revisión de las opciones disponibles para los usuarios."
            ],
            [
                "Compatibilidad",
                "Revisión de requerimientos de la aplicación y el entorno de trabajo."
            ]
        ],
        "en": [
            [
                "Intended use",
                "Identification of analysis team needs."
            ],
            [
                "Licenses",
                "Review of available options for users."
            ],
            [
                "Compatibility",
                "Review of application and work environment requirements."
            ]
        ]
    },
    "sw-apps": {
        "type": "service",
        "image": "services/software-v1.jpg",
        "title": {
            "es": "Aplicaciones a medida",
            "en": "Custom applications"
        },
        "summary": {
            "es": "Software pensado para tus procesos.",
            "en": "Software shaped around your processes."
        },
        "description": {
            "es": "Definimos y desarrollamos funciones a partir de las tareas y necesidades de quienes utilizarán la aplicación.",
            "en": "We define and develop features around the tasks and needs of the people using the application."
        },
        "es": [
            [
                "Descubrimiento",
                "Revisión del proceso, los usuarios y los objetivos."
            ],
            [
                "Desarrollo",
                "Construcción de funciones y flujos acordados para el proyecto."
            ],
            [
                "Validación",
                "Revisión del funcionamiento con los casos de uso definidos."
            ],
            [
                "APIs e integración",
                "Conexión con las plataformas existentes mediante las interfaces disponibles."
            ]
        ],
        "en": [
            [
                "Discovery",
                "Review of processes, users and objectives."
            ],
            [
                "Development",
                "Building features and workflows agreed for the project."
            ],
            [
                "Validation",
                "Review of behavior against defined use cases."
            ],
            [
                "APIs and integration",
                "Connections with existing platforms through available interfaces."
            ]
        ]
    },
    "sw-integration": {
        "type": "service",
        "image": "services/disciplines/sw-integration-v1.jpg",
        "title": {
            "es": "Integración de sistemas",
            "en": "System integration"
        },
        "summary": {
            "es": "Información que conecta tus herramientas.",
            "en": "Information connecting your tools."
        },
        "description": {
            "es": "Conectamos plataformas para que la información acompañe los procesos de la organización, según las interfaces disponibles.",
            "en": "We connect platforms so information follows organizational processes, according to the available interfaces."
        },
        "es": [
            [
                "Sistemas existentes",
                "Revisión de las plataformas y sus posibilidades de conexión."
            ],
            [
                "Flujos de información",
                "Definición de los datos que necesitan compartir los sistemas."
            ],
            [
                "Integración",
                "Desarrollo y validación de las conexiones acordadas."
            ]
        ],
        "en": [
            [
                "Existing systems",
                "Review of platforms and connection capabilities."
            ],
            [
                "Information flows",
                "Definition of data to share between systems."
            ],
            [
                "Integration",
                "Development and validation of agreed connections."
            ]
        ]
    },
    "sw-processes": {
        "type": "service",
        "image": "services/disciplines/sw-processes-v1.jpg",
        "title": {
            "es": "Mejora de procesos",
            "en": "Process improvement"
        },
        "summary": {
            "es": "Menos tareas repetitivas, más seguimiento.",
            "en": "Fewer repetitive tasks, clearer tracking."
        },
        "description": {
            "es": "Desarrollamos herramientas que ayudan a simplificar tareas y consultar la información relevante para la operación.",
            "en": "We develop tools that help simplify tasks and access information relevant to operations."
        },
        "es": [
            [
                "Análisis del proceso",
                "Identificación de pasos repetitivos y necesidades de información."
            ],
            [
                "Herramientas digitales",
                "Funciones para organizar y dar seguimiento a las tareas."
            ],
            [
                "Visibilidad",
                "Consulta de información de acuerdo con los objetivos del proyecto."
            ]
        ],
        "en": [
            [
                "Process analysis",
                "Identification of repetitive steps and information needs."
            ],
            [
                "Digital tools",
                "Features to organize and track tasks."
            ],
            [
                "Visibility",
                "Information access according to project objectives."
            ]
        ]
    },
    "dc-dcim": {
        "type": "service",
        "image": "services/disciplines/cyb-monitoring-v1.jpg",
        "title": {
            "es": "DCIM y monitoreo",
            "en": "DCIM and monitoring"
        },
        "summary": {
            "es": "Capacidad, activos y condiciones del entorno crítico.",
            "en": "Capacity, assets and critical environment conditions."
        },
        "description": {
            "es": "Integramos monitoreo de infraestructura del Data Center para reunir información de capacidad, energía, ambiente y eventos operativos.",
            "en": "We integrate data center infrastructure monitoring to bring together capacity, power, environmental and operational event information."
        },
        "es": [
            [
                "Capacidad y activos",
                "Inventario de racks, equipos, puertos y potencia instalada."
            ],
            [
                "Monitoreo ambiental",
                "Temperatura, humedad y condiciones de riesgo mediante sensores compatibles."
            ],
            [
                "Alertas y tableros",
                "Históricos e indicadores que ayudan a priorizar eventos y planear crecimiento."
            ],
            [
                "Accesos y visitas",
                "Integración de bitácoras y trazabilidad según el alcance de la solución."
            ]
        ],
        "en": [
            [
                "Capacity and assets",
                "Inventory of racks, equipment, ports and installed power."
            ],
            [
                "Environmental monitoring",
                "Temperature, humidity and risk conditions using compatible sensors."
            ],
            [
                "Alerts and dashboards",
                "History and indicators to prioritize events and plan growth."
            ],
            [
                "Access and visits",
                "Log and traceability integration according to solution scope."
            ]
        ]
    },
    "dc-physical": {
        "type": "service",
        "image": "services/disciplines/structured-cabling-v1.jpg",
        "title": {
            "es": "Infraestructura física",
            "en": "Physical infrastructure"
        },
        "summary": {
            "es": "Gabinetes, espacios técnicos y conectividad del Data Center.",
            "en": "Cabinets, technical spaces and data center connectivity."
        },
        "description": {
            "es": "Coordinamos los elementos físicos que alojan, protegen y conectan el equipamiento del centro de datos.",
            "en": "We coordinate the physical elements that house, protect and connect data center equipment."
        },
        "es": [
            [
                "Racks y gabinetes",
                "Distribución del equipamiento, densidad y organización de cableado."
            ],
            [
                "Espacios y canalizaciones",
                "Rutas, cuartos técnicos y piso falso cuando el proyecto lo requiere."
            ],
            [
                "Fibra y cableado",
                "Conectividad física coordinada con las necesidades de energía, capacidad y crecimiento."
            ],
            [
                "Entrega documentada",
                "Identificación, planos y registros de la instalación según el alcance."
            ]
        ],
        "en": [
            [
                "Racks and cabinets",
                "Equipment layout, density and cable organization."
            ],
            [
                "Spaces and pathways",
                "Routes, technical rooms and raised floors when required."
            ],
            [
                "Fiber and cabling",
                "Physical connectivity coordinated with power, capacity and growth needs."
            ],
            [
                "Documented handover",
                "Identification, drawings and installation records according to scope."
            ]
        ]
    },
    "net-wireless": {
        "type": "service",
        "image": "case_network.png",
        "title": {
            "es": "Redes inalámbricas",
            "en": "Wireless networks"
        },
        "summary": {
            "es": "Cobertura, capacidad y diagnóstico de Wi-Fi empresarial.",
            "en": "Coverage, capacity and enterprise Wi-Fi diagnostics."
        },
        "description": {
            "es": "Diseñamos y revisamos redes inalámbricas de acuerdo con las condiciones del sitio, los usuarios y las aplicaciones.",
            "en": "We design and review wireless networks according to site conditions, users and applications."
        },
        "es": [
            [
                "Site survey",
                "Levantamiento de condiciones de cobertura e interferencias."
            ],
            [
                "Diseño y capacidad",
                "Ubicación de puntos de acceso, densidad y requerimientos de las aplicaciones."
            ],
            [
                "Roaming y diagnóstico",
                "Revisión de movilidad, desempeño y problemas de conectividad."
            ]
        ],
        "en": [
            [
                "Site survey",
                "Assessment of coverage and interference conditions."
            ],
            [
                "Design and capacity",
                "Access point placement, density and application requirements."
            ],
            [
                "Roaming and diagnostics",
                "Review of mobility, performance and connectivity issues."
            ]
        ]
    },
    "cyb-endpoints": {
        "type": "service",
        "image": "services/disciplines/hw-computing-v1.jpg",
        "title": {
            "es": "Seguridad de endpoints",
            "en": "Endpoint security"
        },
        "summary": {
            "es": "Protección de usuarios, dispositivos y postura de seguridad.",
            "en": "Protection for users, devices and security posture."
        },
        "description": {
            "es": "Integramos protección para equipos de usuario y revisamos su postura de seguridad como parte de la estrategia de la organización.",
            "en": "We integrate endpoint protection and review security posture as part of the organization’s strategy."
        },
        "es": [
            [
                "Equipos y usuarios",
                "Definición de los dispositivos y perfiles que requieren protección."
            ],
            [
                "Políticas y postura",
                "Configuración de controles según el entorno y las herramientas disponibles."
            ],
            [
                "Eventos y respuesta",
                "Visibilidad de alertas, revisión de actividad y seguimiento de amenazas según el alcance."
            ]
        ],
        "en": [
            [
                "Devices and users",
                "Definition of devices and profiles requiring protection."
            ],
            [
                "Policies and posture",
                "Control configuration according to the environment and available tools."
            ],
            [
                "Events and response",
                "Alert visibility, activity review and threat follow-up according to scope."
            ]
        ]
    },
    "hw-storage": {
        "type": "service",
        "image": "services/disciplines/hw-hci-v1.jpg",
        "title": {
            "es": "Almacenamiento empresarial",
            "en": "Enterprise storage"
        },
        "summary": {
            "es": "Capacidad, desempeño y protección de datos.",
            "en": "Capacity, performance and data protection."
        },
        "description": {
            "es": "Dimensionamos almacenamiento para aplicaciones, virtualización y respaldos, considerando rendimiento, disponibilidad y crecimiento.",
            "en": "We size storage for applications, virtualization and backups, considering performance, availability and growth."
        },
        "es": [
            [
                "SAN, NAS y software",
                "Selección de arquitectura de almacenamiento de acuerdo con las cargas de trabajo."
            ],
            [
                "Respaldo y recuperación",
                "Planeación de protección, retención y recuperación de la información."
            ],
            [
                "Escalabilidad",
                "Expansión, renovación e integración con las plataformas existentes."
            ]
        ],
        "en": [
            [
                "SAN, NAS and software",
                "Storage architecture selected according to workloads."
            ],
            [
                "Backup and recovery",
                "Planning for information protection, retention and recovery."
            ],
            [
                "Scalability",
                "Expansion, renewal and integration with existing platforms."
            ]
        ]
    },
    "sw-erp": {
        "type": "service",
        "image": "services/disciplines/sw-processes-v1.jpg",
        "title": {
            "es": "ERP, inventarios y automatización",
            "en": "ERP, inventory and automation"
        },
        "summary": {
            "es": "Procesos y datos operativos en un mismo flujo.",
            "en": "Operational processes and data in one flow."
        },
        "description": {
            "es": "Desarrollamos herramientas para organizar información comercial, administrativa y operativa, con funciones definidas para tu negocio.",
            "en": "We develop tools to organize commercial, administrative and operational information, with features defined for your business."
        },
        "es": [
            [
                "ERP y procesos",
                "Flujos de clientes, proveedores, cotizaciones, órdenes y seguimiento operativo."
            ],
            [
                "Inventarios y activos",
                "Existencias, ubicaciones, movimientos, responsables y trazabilidad."
            ],
            [
                "Automatización",
                "Indicadores, notificaciones y tareas asociadas a eventos del proceso."
            ]
        ],
        "en": [
            [
                "ERP and processes",
                "Customer, supplier, quotation, order and operational tracking workflows."
            ],
            [
                "Inventory and assets",
                "Stock, locations, movements, ownership and traceability."
            ],
            [
                "Automation",
                "Indicators, notifications and tasks linked to process events."
            ]
        ]
    },
    "sw-monitoring": {
        "type": "service",
        "image": "services/disciplines/cyb-monitoring-v1.jpg",
        "title": {
            "es": "Monitoreo, DCIM y analítica",
            "en": "Monitoring, DCIM and analytics"
        },
        "summary": {
            "es": "Tableros, alertas y visibilidad de activos críticos.",
            "en": "Dashboards, alerts and visibility into critical assets."
        },
        "description": {
            "es": "Integramos datos de aplicaciones e infraestructura para consultar el estado operativo y apoyar decisiones con información disponible.",
            "en": "We integrate application and infrastructure data to review operational status and support decisions using available information."
        },
        "es": [
            [
                "Dashboards y analítica",
                "Visualización de indicadores e históricos según los objetivos del proyecto."
            ],
            [
                "Monitoreo y alertas",
                "Consolidación de eventos y condiciones que requieren seguimiento."
            ],
            [
                "Conexión con DCIM",
                "Integración con datos de capacidad, energía y ambiente de infraestructura crítica."
            ]
        ],
        "en": [
            [
                "Dashboards and analytics",
                "Indicators and historical data according to project objectives."
            ],
            [
                "Monitoring and alerts",
                "Consolidation of events and conditions requiring follow-up."
            ],
            [
                "DCIM connections",
                "Integration with capacity, power and environmental data from critical infrastructure."
            ]
        ]
    },
    "lic-cloud": {
        "type": "service",
        "image": "services/disciplines/cyb-segmentation-v1.jpg",
        "title": {
            "es": "AWS, Azure y nube híbrida",
            "en": "AWS, Azure and hybrid cloud"
        },
        "summary": {
            "es": "Infraestructura y servicios cloud según tu operación.",
            "en": "Cloud infrastructure and services for your operation."
        },
        "description": {
            "es": "Planeamos servicios en la nube y su relación con la infraestructura existente de acuerdo con los objetivos del proyecto.",
            "en": "We plan cloud services and their relationship with existing infrastructure according to project objectives."
        },
        "es": [
            [
                "Arquitectura cloud",
                "Selección de servicios y recursos requeridos para las cargas de trabajo."
            ],
            [
                "Entornos híbridos",
                "Conectividad e integración entre plataformas locales y servicios cloud."
            ],
            [
                "Consumo y capacidad",
                "Planeación de crecimiento y revisión del uso de recursos."
            ]
        ],
        "en": [
            [
                "Cloud architecture",
                "Selection of services and resources required by workloads."
            ],
            [
                "Hybrid environments",
                "Connectivity and integration between on-premises and cloud platforms."
            ],
            [
                "Consumption and capacity",
                "Growth planning and resource usage review."
            ]
        ]
    },
    "lic-adoption": {
        "type": "service",
        "image": "services/disciplines/sw-processes-v1.jpg",
        "title": {
            "es": "Arquitectura y adopción",
            "en": "Architecture and adoption"
        },
        "summary": {
            "es": "Del requerimiento al uso de las herramientas.",
            "en": "From requirements to everyday tool use."
        },
        "description": {
            "es": "Acompañamos la evaluación y adopción de licencias y servicios en función de los usuarios, el entorno y las necesidades del negocio.",
            "en": "We support license and service evaluation and adoption according to users, environment and business needs."
        },
        "es": [
            [
                "Evaluación",
                "Revisión de herramientas actuales, usuarios y compatibilidad."
            ],
            [
                "Despliegue y migración",
                "Planeación de la incorporación de soluciones según el alcance acordado."
            ],
            [
                "Optimización de uso",
                "Seguimiento de necesidades y modalidades de uso de las licencias y servicios."
            ]
        ],
        "en": [
            [
                "Assessment",
                "Review of current tools, users and compatibility."
            ],
            [
                "Deployment and migration",
                "Planning solution adoption according to agreed scope."
            ],
            [
                "Usage optimization",
                "Review of license and service needs and usage models."
            ]
        ]
    },
    "project-management": {
        "type": "service",
        "image": "services/disciplines/dc-bms-v1.jpg",
        "title": {
            "es": "Ingeniería y gestión",
            "en": "Engineering and management"
        },
        "summary": {
            "es": "Alcance, programación y coordinación del proyecto.",
            "en": "Project scope, scheduling and coordination."
        },
        "description": {
            "es": "Convertimos necesidades del negocio en una ruta de ingeniería y ejecución con responsabilidades y entregables definidos.",
            "en": "We turn business needs into an engineering and delivery plan with defined responsibilities and deliverables."
        },
        "es": [
            [
                "Diagnóstico y alcance",
                "Levantamiento de requerimientos y definición de objetivos y límites del proyecto."
            ],
            [
                "Programación y coordinación",
                "Secuencia de actividades, recursos y relación entre disciplinas."
            ],
            [
                "Riesgos y cambios",
                "Seguimiento de condiciones, acuerdos y modificaciones del alcance."
            ]
        ],
        "en": [
            [
                "Assessment and scope",
                "Requirements gathering and definition of project objectives and boundaries."
            ],
            [
                "Scheduling and coordination",
                "Activity sequencing, resources and relationships between disciplines."
            ],
            [
                "Risks and changes",
                "Tracking conditions, agreements and scope changes."
            ]
        ]
    },
    "project-implementation": {
        "type": "service",
        "image": "services/disciplines/sw-processes-v1.jpg",
        "title": {
            "es": "Implementación llave en mano",
            "en": "Turnkey implementation"
        },
        "summary": {
            "es": "Suministro, instalación, integración y entrega.",
            "en": "Supply, installation, integration and handover."
        },
        "description": {
            "es": "Coordinamos la ejecución de la solución desde el suministro de componentes hasta su validación y transferencia operativa.",
            "en": "We coordinate delivery from component supply through validation and operational handover."
        },
        "es": [
            [
                "Suministro e instalación",
                "Coordinación de materiales, equipos y trabajos de campo."
            ],
            [
                "Integración y pruebas",
                "Configuración y validación contra los criterios acordados."
            ],
            [
                "Documentación y entrega",
                "Registros, planos y transferencia al equipo de operación según el proyecto."
            ]
        ],
        "en": [
            [
                "Supply and installation",
                "Coordination of materials, equipment and field work."
            ],
            [
                "Integration and testing",
                "Configuration and validation against agreed criteria."
            ],
            [
                "Documentation and handover",
                "Records, drawings and operational transfer according to the project."
            ]
        ]
    },
    "project-continuity": {
        "type": "service",
        "image": "services/disciplines/dc-power-v1.jpg",
        "title": {
            "es": "Infraestructura y continuidad",
            "en": "Infrastructure and continuity"
        },
        "summary": {
            "es": "Energía, cómputo, redes y aplicaciones coordinados.",
            "en": "Coordinated power, computing, networks and applications."
        },
        "description": {
            "es": "Relacionamos las disciplinas de infraestructura para que los cambios y nuevas instalaciones respondan a los objetivos de continuidad del negocio.",
            "en": "We connect infrastructure disciplines so changes and new facilities meet business continuity objectives."
        },
        "es": [
            [
                "Coordinación técnica",
                "Relación entre energía, climatización, conectividad y equipamiento."
            ],
            [
                "Integración de plataformas",
                "Compatibilidad entre infraestructura, aplicaciones y herramientas de gestión."
            ],
            [
                "Puesta en operación",
                "Planeación de actividades y validaciones para la entrega del entorno."
            ]
        ],
        "en": [
            [
                "Technical coordination",
                "Relationships between power, cooling, connectivity and equipment."
            ],
            [
                "Platform integration",
                "Compatibility between infrastructure, applications and management tools."
            ],
            [
                "Commissioning",
                "Activity and validation planning for environment handover."
            ]
        ]
    },
    "project-security": {
        "type": "service",
        "image": "services/disciplines/sys-access-v1.jpg",
        "title": {
            "es": "Seguridad y operación",
            "en": "Security and operations"
        },
        "summary": {
            "es": "Protección física y digital dentro del proyecto.",
            "en": "Physical and digital protection within the project."
        },
        "description": {
            "es": "Coordinamos soluciones de video, accesos y ciberseguridad considerando su integración con la operación de la instalación.",
            "en": "We coordinate video, access and cybersecurity solutions and their integration with facility operations."
        },
        "es": [
            [
                "Seguridad física",
                "Relación entre CCTV, control de acceso y los espacios protegidos."
            ],
            [
                "Ciberseguridad",
                "Controles de comunicación y protección de los sistemas conectados."
            ],
            [
                "Operación integrada",
                "Validación de eventos, accesos y flujos acordados para el proyecto."
            ]
        ],
        "en": [
            [
                "Physical security",
                "Relationships between CCTV, access control and protected spaces."
            ],
            [
                "Cybersecurity",
                "Communication controls and protection of connected systems."
            ],
            [
                "Integrated operation",
                "Validation of project events, access and agreed workflows."
            ]
        ]
    }
};
