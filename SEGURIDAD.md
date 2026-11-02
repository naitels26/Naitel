# Revisión y refuerzo de seguridad — 2 de noviembre de 2026

Se reforzó el código local del sitio estático. Esto no es una certificación ni una garantía de seguridad al 100 %. Los cambios necesitan un nuevo despliegue para proteger la versión publicada.

## Qué se implementó

- `vercel.json` publica únicamente `dist/` y configura las cabeceras de seguridad. La visibilidad de logs y del despliegue se revisa en las opciones de Vercel; no se establece mediante la propiedad `public`, que el esquema de despliegue rechazó. Esto no cambia la visibilidad del repositorio de GitHub ni la audiencia del sitio.
- `scripts/build-public.cjs` genera las siete vistas de servicios y copia solo las páginas, CSS, JavaScript y recursos necesarios. No publica `.review`, `.git`, scripts de construcción, respaldos ZIP, archivos `.env`, documentación ni prompts. Rechaza enlaces simbólicos y limita el reemplazo recursivo al directorio generado `dist/`.
- El build ejecuta `scripts/security-check.cjs`: si detecta un incumplimiento, falla antes de publicar. Comprueba el paquete público, referencias, scripts, contenido incrustado y algunos patrones de credenciales. No es un escáner exhaustivo de secretos ni de vulnerabilidades.
- CSP permite JavaScript solo del propio sitio, sin `unsafe-inline` ni `unsafe-eval`. Bloquea controladores de eventos y estilos en atributos, objetos, marcos y bases URL insertadas. Se preservan los orígenes necesarios para Google Fonts y FormSubmit. Los estilos de columnas pasaron a clases CSS sin modificar su apariencia.
- `frame-ancestors 'none'` y `X-Frame-Options: DENY` impiden enmarcar la página. Se añaden `nosniff`, una política de referencia, restricciones de acceso a cámara/micrófono/geolocalización/pagos/USB y aislamiento del contexto de apertura.
- `.gitignore` y `.vercelignore` reducen el riesgo de incluir futuras revisiones, respaldos y secretos en commits o despliegues. No borran archivos que ya estén en el historial del repositorio.
- La vista previa escucha solo en `127.0.0.1`, sirve archivos públicos, comprueba rutas reales y rechaza métodos distintos de GET/HEAD. Aplica las cabeceras también en local, salvo la actualización forzada a HTTPS, que corresponde al despliegue.
- El contenido ingresado en el asistente y los textos del sitio se presentan con APIs de texto, sin convertirlos en HTML. Se añadieron límites de longitud a nombre, correo y mensaje. Esos límites del navegador no sustituyen la validación del proveedor.

La configuración de cabeceras y el directorio servido siguen la [documentación de Vercel](https://vercel.com/docs/project-configuration/vercel-json). La política CSP sigue la [guía de MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CSP). Los cambios de propiedades CSS desde JavaScript utilizados por Leaflet y el carrusel son compatibles con [`style-src-attr`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Security-Policy/style-src-attr).

## Qué significa que alguien pueda editar

No se encontraron endpoints propios de administración, escritura de archivos o edición de contenido: el sitio publicado es estático y su formulario utiliza un proveedor externo. Una persona puede cambiar lo que ve en su propio navegador con las herramientas de desarrollo; eso no modifica el repositorio ni la versión que ven los demás. Bloquear clic derecho o esconder el JavaScript no protege el despliegue.

La edición permanente depende de permisos de GitHub/Vercel, credenciales y acceso a los equipos de desarrollo. Para protegerla hacen falta controles de cuenta además de estas medidas en el código.

## Pendiente en cuentas y publicación

1. Activar o revisar 2FA/passkeys en las cuentas de GitHub, Vercel y correo de recuperación. Revisar colaboradores, integraciones, tokens y accesos antiguos; conservar solo los necesarios.
2. Confirmar la rama que despliega producción. La API de GitHub reportó `main` como rama predeterminada de `naitels26/Naitel`; en la conversación también se ha trabajado con `master`. No se cambió ninguna rama ni regla de despliegue.
3. Configurar reglas para la rama de producción: evitar force-push y borrado, exigir pull requests y comprobaciones según el flujo y el tamaño real del equipo. La conexión de GitHub disponible tiene solo lectura, sin administración ni escritura; no se pudieron activar estas reglas. Ver [protección de ramas en GitHub](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches).
4. Publicar estos cambios completos. Verificar en Vercel que el build sea `node scripts/build-public.cjs && node scripts/security-check.cjs` y la salida `dist`. Después comprobar las cabeceras reales y que rutas como `/scripts/build-public.cjs` y `/.review/preview.cjs` no sean públicas.
5. Revisar los artefactos que ya estén en la historia del repositorio público. El escaneo de patrones realizado no encontró las claves privadas/tokens específicos buscados; esto no demuestra ausencia de cualquier información sensible.

## Formulario y abuso

El formulario conserva FormSubmit, el campo trampa para bots y el flujo AJAX existente. `_captcha` sigue en `false`, como estaba configurado. No se afirma protección completa contra spam, límites por IP o validación propia del lado del servidor. Los límites en HTML y el JavaScript se pueden omitir enviando solicitudes directas al proveedor.

Un siguiente refuerzo requiere un flujo con verificación humana validada del lado del servidor y límites de envío efectivos, o ajustar el flujo de FormSubmit a sus protecciones disponibles. No se incorporaron claves ficticias ni un captcha puramente visual. Las solicitudes de agenda siguen siendo propuestas pendientes de confirmación y no se almacenan en un calendario privado propio.

[FormSubmit documenta sus controles de spam y honeypots](https://formsubmit.co/help). Deben verificarse también sus condiciones de tratamiento y retención de los datos que recibe el formulario.

## Resultado de la inspección del despliegue compartido

### URL pública confirmada: `https://naitel-wp.vercel.app/`

Revisada el 2 de noviembre de 2026. Devuelve HTTP 200, el título de Naitel y el formulario. Tiene HSTS (`max-age=63072000; includeSubDomains; preload`), pero la respuesta inspeccionada no incluyó CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy ni Cross-Origin-Opener-Policy. Por tanto, no se verificaron como activos los refuerzos nuevos en esta versión.

Se confirmó acceso a documentación interna (`/LEEME-UI.md`, HTTP 200 y tipo Markdown) y a rutas de revisión. Las solicitudes HEAD a `/.review/original-code.zip` y `/.review/d3euronism.zip` devolvieron HTTP 200, tipo `application/zip` y longitudes de 13,840 y 42,866 bytes, respectivamente. No se descargaron los ZIP ni se afirma que contengan credenciales. `/.review/preview.cjs` devolvió HTTP 200 con tipo `application/node`; `/scripts/build-public.cjs` y `/vercel.json` devolvieron 404.

Acción necesaria: publicar `vercel.json`, los scripts de construcción/verificación, los archivos de exclusión y las páginas/CSS actualizados. Vercel debe ejecutar el build nuevo y servir `dist/`. Después volver a comprobar estas rutas: deben responder 404/403, y las cabeceras nuevas deben aparecer en la página real. La rama local comprobada es `master`; confirmar que el despliegue de producción corresponda a esa rama y al commit actualizado.

### URL de despliegue anterior

URL: `https://naitel-aqgonweyk-naitel.vercel.app/`.

La solicitud sin sesión redirigió a `https://vercel.com/login` y devolvió el título “Login – Vercel”; no mostró el formulario de Naitel. Por eso las cabeceras observadas en esa respuesta pertenecen al inicio de sesión de Vercel y no sirven para verificar las del sitio. No se cambió ni se eludió esa protección. Falta verificar el despliegue real con acceso autorizado después de publicar.

## Comprobaciones

```text
node scripts/build-public.cjs
node scripts/security-check.cjs
node .review/security-preview-check.cjs
node .review/appointments-check.cjs
node .review/calendar-check.cjs
node .review/carousel-behavior-check.cjs
node .review/static-cases-check.cjs
```

Las pruebas de correo usan solicitudes simuladas y no envían mensajes. Las comprobaciones HTTP de la vista previa solo hacen solicitudes al servidor local de pruebas. Falta la revisión del sitio desplegado y la comprobación visual bajo CSP en un navegador con acceso.
