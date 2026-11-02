# Naitels · Revisión minimalista

## Logo y tipografía del encabezado

El texto `Naitel` junto al símbolo usa D3 Euronism regular, cargada desde `assets/fonts/D3Euronism.ttf` mediante `@font-face` en `css/expressive.css`. Solo se aplica a `.brand-name`. El símbolo conserva su círculo central en ambos temas; en modo oscuro el azul pasa a `#9ac9ec` y el naranja se mantiene.

Fuente de la descarga: https://www.dafont.com/d3euronism.font (Digital Dream Design). Se conserva el archivo del autor en `assets/fonts/D3Euronism-readme.htm`. Aunque el catálogo indica “100% Free”, el readme de la descarga establece condiciones para uso comercial y redistribución. Revisar la licencia comercial antes de publicar o distribuir el sitio con esta fuente.

## Cambios

- Titular centrado en una línea en escritorio, con un máximo de 72 px y espacio alrededor. En pantallas de hasta 600 px usa dos líneas para conservar la legibilidad. Escala menor y peso moderado para los demás encabezados.
- Efecto de escritura al cargar y al cambiar de idioma. Los caracteres conservan su espacio para evitar saltos de diseño.
- Símbolo vectorial redibujado siguiendo la referencia: curvas azul y naranja y círculo central. El nombre aparece como Naitels, solo con la N mayúscula, y sin descriptor.
- Predominio de blanco y fondos azul y crema muy suaves. Tarjetas y botones más discretos, fotografías menos altas y espaciado consistente.
- Cifras más pequeñas y uniformes. 24/7 usa el mismo tamaño, color y peso en todo el texto; las etiquetas se simplificaron.
- Tres casos de éxito con imágenes, contenedores y botones alineados: Heineken, Pulses America y Cracker Barrel. Se retiraron Manufactura Inteligente, Redes de Ultra Velocidad y Alta Disponibilidad.
- Heineken, Pulses America y Cracker Barrel incluyen la información ampliada compartida por el usuario. Pulses usa una imagen tecnológica genérica (`assets/images/hero.png`) para conservar el foco en el contenido del caso.
- El catálogo adicional reúne diez servicios: salas de conferencia, telefonía, audio y video, supresión de incendios, desarrollo de software, consultoría de hardware, cableado estructurado y fibra óptica, redes, sistemas de seguridad y espacios de trabajo inteligentes.
- Las tres tarjetas de proyectos, las tres tarjetas principales de servicios y los diez servicios del catálogo son clickeables. Abren una ventana con imagen, descripción y detalles.
- El catálogo adicional funciona como un carrusel horizontal con controles de anterior y siguiente, desplazamiento táctil y navegación por teclado.
- El carrusel avanza suavemente cada 2.2 segundos, se pausa al pasar el cursor o recibir foco y respeta `prefers-reduced-motion`.
- La barra bajo el carrusel sigue el desplazamiento real de los servicios, tanto al usar las flechas como durante el avance automático.
- La navegación muestra “Servicios” y la sección inicia directamente con “Soluciones.”; el botón de portada y los enlaces del asistente apuntan a `#servicios`.
- La sección “Sobre nosotros” resume la compañía, misión, visión, historia y valores, con enlace propio en la navegación.
- Data Centers ahora explica la evaluación integral de instalaciones que precede cada desarrollo.
- Un asistente de preguntas frecuentes permite consultar servicios, Data Centers, seguridad, casos de éxito, sucursales, horarios, la empresa y contacto. Incluye preguntas sugeridas, entrada de texto y respuestas en español e inglés. Funciona localmente con respuestas predefinidas; no envía mensajes ni datos a un servidor.
- Las fichas de sucursales muestran “Conmutador” junto al 800 188 6248 ("Switchboard" en inglés). Detalles de color naranja y movimiento ligero refinan la portada, las tarjetas y el formulario sin cambiar la composición.
- Cada tarjeta del carrusel tiene una imagen temática; la imagen nueva de salas de conferencia está en `assets/images/services/conference.png`.
- El modal se cierra con Escape, clic fuera o el botón de cierre. Devuelve el foco a la tarjeta y permite ir al formulario de contacto.
- Animaciones de opacity y transform de 180–320 ms. El efecto de escritura revela un carácter cada 28 ms con una transición de 180 ms. Con prefers-reduced-motion el contenido aparece completo y sin animaciones.

## Archivos completos y dónde colocarlos

Los cambios ya están aplicados en esta carpeta. Para trasladarlos a otra copia, conserva estas rutas y reemplaza los archivos completos. No hay fragmentos que deban pegarse dentro de otro archivo.

| Ruta desde la carpeta del sitio | Contenido |
| --- | --- |
| index.html | HTML completo, logo, tarjetas y diálogo. |
| css/style.css | CSS base, accesibilidad y componentes compartidos. |
| css/expressive.css | Composición final, logo, portada, tarjetas y modal. Se carga después del CSS base. |
| js/main.js | Tema, escritura, navegación móvil, formulario y mapa. |
| js/details.js | Contenido en español e inglés y comportamiento de los modales de proyectos y servicios. |
| js/translations.js | Textos y cambio de idioma de la página. |
| css/chatbot.css | Estilos responsive del asistente de preguntas frecuentes. |
| js/chatbot.js | Preguntas, respuestas, búsqueda por palabras clave e interacción del asistente. |
| assets/images/naitels-logo.svg | Logo independiente para fondos claros. |
| assets/images/naitels-logo-dark.svg | Logo independiente para fondos oscuros. |
| assets/images/naitels-symbol.svg | Símbolo y favicon. |
| assets/images/ | Fotografías y mapa estático. |
| assets/data/branches.json | Direcciones exactas, teléfonos, contactos y horarios de las siete sucursales. |
| scripts/build-branches.cjs | Genera la lista de sucursales y sus paneles a partir de `branches.json`. |
| assets/vendor/leaflet/ | Leaflet existente, guardado localmente junto a su licencia. |

El paquete `Naitels-casos-servicios-sucursales.zip` incluye `index.html`, `css`, `js`, `assets`, `scripts` y esta guía. Puedes extraerlo en la carpeta que contiene el `index.html` de destino. La carpeta `.review` contiene comprobaciones y capturas; no se necesita para publicar.

## Mapa

El mapa regional usa geometría local de Natural Earth y Leaflet 1.9.4. No solicita teselas externas, por lo que evita la dependencia que generaba las imágenes 403. Conserva zoom, desplazamiento y siete sucursales seleccionables. Cada punto y cada fila lleva al formulario de ventas. Las coordenadas de las ciudades se conservan sin desplazamientos artificiales al cambiar el zoom. La dirección completa en Info sigue abriendo Google Maps. Sin JavaScript se muestra un mapa SVG local con enlaces a las ciudades.

La fuente Inter se obtiene de Google Fonts y tiene alternativas del sistema. No se añadieron librerías para las animaciones ni para los modales.

## Formulario en Vercel

### Publicación reforzada

El proyecto ahora incluye `vercel.json`. Vercel debe ejecutar `node scripts/build-public.cjs && node scripts/security-check.cjs` y servir `dist/`. La salida se genera automáticamente; no debe subirse manualmente a Git. Los respaldos, revisiones, scripts de construcción y documentación quedan fuera de los archivos servidos. Las nuevas cabeceras CSP y de seguridad se activarán con el siguiente despliegue. Los detalles, resultados y límites de la revisión están en `SEGURIDAD.md`.

### Propuestas de visita o reunión

El formulario se compactó con campos de empresa y servicio en el mismo renglón, espacios más cortos y mensaje de tres filas. “Servicio de interés” es obligatorio e incluye las siete divisiones y “Necesito orientación”; se envía como `Servicio_de_interes` con la consulta o propuesta de visita.

El calendario visual (`js/calendar.js`) abre un diálogo compacto en la capa superior del navegador, con un fondo tenue. No cambia la altura del formulario ni deja un hueco entre los campos. Se cierra al elegir fecha, con Escape, al tocar el fondo o con Cerrar. El foco de teclado usa un contorno discreto dentro del calendario. Incluye meses navegables, días pasados deshabilitados, indicador de hoy y fecha seleccionada. Respeta el tema y el idioma del sitio. Admite teclado (flechas, Inicio/Fin, Page Up/Down y Escape), cierre al salir del calendario y conserva el campo nativo como respaldo si no carga la mejora. La fecha sigue siendo una propuesta pendiente de confirmación; no representa disponibilidad reservada.

Pruebas: `node .review/calendar-check.cjs` cubre selección, años bisiestos, cambios de mes/año, teclado, ES/EN y cierre. `node .review/appointments-check.cjs` también verifica que se elija y envíe un servicio. La revisión visual en navegador permanece pendiente.

El formulario incluye el apartado desplegable “Proponer una visita o reunión”, con calendario nativo, hora, modalidad (instalaciones del cliente, sucursal o videollamada) y ciudad/lugar para reuniones presenciales. Los campos de agenda solo se habilitan y exigen cuando se abre el apartado. Se valida que la propuesta sea futura usando la hora local del dispositivo, y se envía la zona horaria para que el equipo pueda coordinar el horario. No se publican horarios disponibles ni se reserva un espacio automáticamente: la solicitud queda pendiente de confirmación por el equipo receptor del formulario.

`js/appointments.js` gestiona campos y validación; `js/contact.js` envía la propuesta con el asunto “Propuesta de visita o reunión — Naitel”. Conserva los datos si falla el envío y limpia/cierra el apartado después de una respuesta aceptada. Las consultas sin cita mantienen el flujo actual. Los destinatarios siguen siendo los configurados en `index.html`; no se modificaron al añadir la agenda. Los campos con nombre se incluyen en el correo según la [documentación de FormSubmit](https://formsubmit.co/help).

Prueba: `node .review/appointments-check.cjs`. Cubre consultas sin cita, obligatoriedad condicional, fechas/horas pasadas, reuniones presenciales y remotas, zona horaria, datos enviados, ES/EN, reinicio tras éxito y conservación tras error. Las solicitudes se simulan: no se envían correos ni se valida la recepción real en el buzón. La revisión visual del calendario nativo en navegador sigue pendiente.

La página funciona como sitio estático en Vercel. Con JavaScript, js/contact.js obtiene el destinatario del atributo `action` del formulario en `index.html` y envía los campos por HTTPS al endpoint AJAX de FormSubmit. No requiere variables de entorno, PHP ni un backend en Vercel. FormSubmit es el servicio externo encargado del correo.

### Cambiar destinatarios y hacer pruebas

Para probar en tu computadora, ejecuta `node .review/preview.cjs` desde la carpeta del sitio y abre `http://127.0.0.1:4174/#contact-form`. No abras `index.html` con `file://`: FormSubmit requiere una página servida por HTTP/HTTPS (https://formsubmit.co/help). Si usas Live Server, abre la dirección HTTP que genere.

Durante el envío se muestra un aro animado en el botón y una barra de color bajo el mensaje de estado. El botón se bloquea hasta recibir respuesta; se respeta la preferencia de movimiento reducido. Los errores de conexión, espera agotada y exceso de solicitudes tienen mensajes específicos y conservan los campos. El envío usa datos de formulario, omite `_cc` si está vacío y desactiva el captcha interactivo para el flujo AJAX; se conserva el campo trampa para bots.

Todo se configura en `index.html`, buscando `id="contact-form"`:

- Destinatario principal: cambia únicamente el correo en `action="https://formsubmit.co/ventas@naitel.com"`. Para probar sin enviar a ventas, reemplázalo por tu correo de pruebas.
- Copias adicionales: en `<input type="hidden" name="_cc" value="">`, agrega correos separados por comas dentro de `value`, por ejemplo `value="pruebas@example.com,otro@example.com"`. Deja `value=""` para no enviar copias. Agregar copias mantiene el envío al destinatario principal.
- Guarda y vuelve a publicar el sitio. No necesitas modificar `js/contact.js`: ambos métodos de envío usan esta misma configuración.
- Al cambiar el destinatario principal, confirma el enlace de activación que FormSubmit envíe al nuevo buzón y realiza un segundo envío para comprobar la recepción. Al terminar las pruebas, restaura ventas y elimina las copias de prueba.

El correo receptor no se muestra junto al formulario ni en las alertas, en español o inglés. Como el sitio es estático, la configuración sigue siendo consultable en el código fuente; no es un secreto del servidor.

Se muestra una alerta modal de estilo SweetAlert con “¡Éxito!” solo después de una respuesta HTTP correcta con success=true. La página no cambia y los campos se limpian únicamente tras un envío aceptado. Las respuestas de error o de activación pendiente conservan los datos; el botón bloquea envíos duplicados y se habilita para reintentar. Hay un tiempo máximo de espera de 60 segundos, un aviso de demora a los 12 segundos, validación del navegador y campo trampa para bots. La alerta funciona en español e inglés y en ambos temas, con soporte de teclado. No se reenvía automáticamente al agotar el tiempo: la solicitud original podría haber sido procesada aunque no se reciba la respuesta.

Activación obligatoria: publicar en Vercel, realizar un primer envío desde la URL publicada y confirmar el enlace que llegue a ventas@naitel.com (revisar spam). Después, enviar otra consulta y comprobar que el correo llegue con todos los campos y que se pueda responder al correo del visitante. Las pruebas locales interceptan las solicitudes y no envían correos reales; no verifican la recepción ni activan el buzón.

El correo se dirige al equipo de ventas. No se envía respuesta automática al visitante: esa función de FormSubmit no es compatible con AJAX. Sin JavaScript se conserva el POST tradicional y la confirmación del servicio.

Documentación: https://formsubmit.co/ y https://formsubmit.co/ajax-documentation

## Volver a una versión anterior

La versión minimalista con el titular en dos líneas está en `Naitels-minimalista-actualizada.zip`, en la carpeta superior. También se conservan `Naitels-portada-y-detalles.zip`, `Naitels-respaldo-antes-logo.zip`, `Naitels-propuesta-expresiva.zip` y `Naitels-version-minimalista.zip`. Estos respaldos se mantienen separados del paquete nuevo.

## Verificación

El último ajuste del titular se revisó entre 320 y 1920 px, en español e inglés: una línea por encima de 600 px, tamaño máximo de 72 px en español y sin desbordamientos. Las capturas y medidas están en .review/title-one-line/.

Se revisaron en Edge/Chromium el centrado y la navegación de 320 a 1440 px, ambos idiomas, alineación de proyectos, el carrusel de servicios, los modales de proyectos y servicios, clic en la tarjeta completa, teclado, retorno del foco, cierre siempre visible en móvil, enlace a contacto, efecto de escritura sin saltos, entradas escalonadas al hacer scroll y movimiento reducido.

Se comprobaron 100 muestras de texto de la página y 13 del modal en cada tema: mínimo 4.5:1 para texto normal y 3:1 para texto grande. También se verificaron el mapa y los modales abriendo el HTML local con HTTP/HTTPS bloqueados. No se detectaron errores de JavaScript. Las capturas e informes de esta revisión están en .review/minimal/.

## Ajustes de ventas — 19 de octubre de 2026

Destinatario: ventas@naitel.com, sin mostrarlo junto al formulario ni en las alertas. La configuración de destinatario y copias está centralizada en `index.html`. Logo oscuro con centro transparente. Puntos y filas de ciudades enlazados al formulario; direcciones en Info conservadas. Verificación previa en Edge a 390 y 1440 px: coordenadas sin desplazamiento antes y después del zoom, navegación y foco, validación del formulario, POST interceptado localmente sin enviar correos, logo oscuro, sin desbordamiento horizontal ni errores JavaScript. Prueba: .review/ventas-check.cjs. La recepción real requiere activar FormSubmit y probar desde la página publicada.


## Portada de servicios — 2 de noviembre de 2026

### Organización basada en el portafolio corporativo facilitado

Se tomó del ZIP `NAITEL_Portafolio_Corporativo_v8_Partners_Autorizados.zip` la relación entre siete divisiones: Sistemas Especiales, Desarrollo de Software, Data Centers, Networking y Ciberseguridad, Equipo Activo, Licenciamiento y Proyectos de Tecnología. El mapa actualizado está en `.review/PORTAFOLIO-ESTRUCTURA.md`. El carrusel conserva su funcionamiento y añade la séptima división. Se mantienen las rutas existentes; Proyectos de Tecnología utiliza `proyectos-tecnologia.html`.

Las especialidades se agrupan dentro de cada división y sus modales reúnen los subtemas relacionados. Energía crítica incluye calidad de energía y sistema de tierras; Infraestructura de redes incluye fibra, cableado, canalizaciones y diseño; CCTV incluye VMS, analítica e IA; Equipo Activo distingue servidores/hiperconvergencia, almacenamiento y cómputo/movilidad; Software distingue aplicaciones, ERP/inventarios y monitoreo/DCIM. Licenciamiento conserva Microsoft, Autodesk y Minitab y añade cloud/adopción. Los enlaces de otros servicios se seleccionan por su relación técnica.

No se importó el diseño del ejemplo. Se comprobó por hash que todos los CSS y `js/main.js` permanecen intactos respecto al inicio de esta reorganización. La estructura y la información se adaptaron en español e inglés con las mismas tarjetas, imágenes, modales y animaciones. Las siete vistas se generan con `node scripts/build-service-pages.cjs`.

Las disciplinas de cada vista se agrupan por temas con encabezados propios. Data Centers separa energía/protección eléctrica, climatización/control y conectividad/plataformas; Sistemas Especiales separa videovigilancia/inteligencia y accesos/protección de instalaciones. Se añadieron accesos a cada bloque cuando hay varios temas. Las tarjetas muestran una miniatura de la misma imagen que abre su modal. Se generaron 19 imágenes específicas para las disciplinas: dentro de cada vista todos los modales tienen una imagen distinta. Los archivos optimizados y los prompts están en `assets/images/services/disciplines/SOURCE.md`.

El portafolio principal presenta siete divisiones en un único carrusel horizontal, en el orden del ejemplo: Sistemas Especiales, Desarrollo de Software, Data Centers, Networking y Ciberseguridad, Equipo Activo, Licenciamiento y Proyectos de Tecnología. Todas llevan a vistas propias con tarjetas de disciplinas y modales. El carrusel conserva tres tarjetas en escritorio, dos en tablet y una en móvil, con avance cada 4.2 segundos, flechas y pausa. Los servicios adicionales mantienen su carrusel. Se conservan las imágenes originales existentes y su optimización; las rutas y prompts están en assets/images/services/SOURCE.md.

Las siete vistas de servicio se generan con `node scripts/build-service-pages.cjs`; su contenido está en `js/service-data.js`. Se validaron los ocho HTML, las 28 ubicaciones de disciplinas, las agrupaciones, los enlaces entre servicios, los archivos locales, las imágenes, los nombres accesibles y las traducciones ES/EN. `.review/carousel-behavior-check.cjs` comprueba controles independientes, pausa, reanudación, foco, cursor, retorno al inicio y movimiento reducido sin navegador.

La portada presenta el conjunto de servicios con el título centrado “Tecnología que conecta y protege tu operación”, una sola frase y el botón “Conocer soluciones”. La introducción breve a Data Centers está en su tarjeta; la evaluación de instalaciones, la acreditación ATD y los proyectos llave en mano se explican en “Ver detalles”. Se mantiene la animación de escritura, la tipografía, las imágenes y la forma de los botones, respetando la preferencia de movimiento reducido. Contenido disponible en español e inglés. La copia anterior a la primera simplificación está en `.review/landing-before/`.

Verificado: sintaxis JavaScript, comprobación estática existente del catálogo, traducciones ES/EN, identificadores únicos, enlaces internos y archivos locales. La revisión visual en navegador quedó pendiente porque el entorno bloqueó la conexión HTTP local. Estos cambios se realizaron en los archivos locales.
