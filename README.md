# OSWIP demo
Demo arquitectónica estática inspirada en https://proyecto.venturaskyresidences.uy/#/.

## Alcance y aceptación
Público: visitantes de una presentación inmobiliaria. Objetivo: explorar una demo visual inmediatamente, sin backend, datos personales, precios ni disponibilidad real.
Flujo: portada → proyecto → selector de tipología → galería → contacto demostrativo.
Criterios: navegación funcional, selector actualizado, galería ampliable, adaptación móvil, imágenes locales y publicación HTTPS en Pages.
Dirección: verde profundo #172d33, blanco #f9faf7, verde suave #d8e6bc; Italiana para titulares y DM Sans para controles; fotografía a pantalla completa y controles discretos.
Arquitectura: HTML/CSS/JS sin compilación. Recuperación: revertir commit y volver a desplegar desde main.
Fotografías referenciales de Unsplash, licencia https://unsplash.com/license. URLs originales: images.unsplash.com/photo-1486406146926-c627a92ad1ab, photo-1600607687920-4e2a09cf159d, photo-1600585154340-be6161a56a0c. No se copiaron recursos de Ventura.
No hay experimento comercial ni analítica. Métrica de entrega: rutas y controles esenciales funcionando.

## Local
`python3 -m http.server 8088`

## Validación
2026-10-09: comprobación de JS, archivos de imagen, navegación y publicación. El selector muestra áreas ilustrativas; el esquema no es un plano técnico ni cambia por tipología.

## Recorrido con renders — 2026-10-09
Alcance: recorrido por tres vistas conceptuales, puntos para avanzar, miniaturas, zoom y desplazamiento horizontal. No es geometría 3D navegable ni panorama esférico 360°.
Assets: assets/render-exterior.jpg, assets/render-living.jpg, assets/render-roof.jpg. Generados con imagegen integrado, convertidos a JPEG para la web.
Prompts: visualización arquitectónica fotorrealista panorámica de una torre residencial costera con balcones curvos de piedra clara y vegetación; interior con roble claro, sofá crema y vidrio curvo abierto al balcón; terraza con piscina infinita, tumbonas y vista costera. Luz dorada, sin textos ni marcas de agua.
Aceptación: acceso desde portada y menú; exterior → interior → terraza → exterior; miniaturas seleccionan ambiente; zoom limitado 100–160%; revisión visual en escritorio y móvil; publicación Pages del commit correspondiente.

## Interacción por puntos — 2026-10-09
Problema: la interacción previa parecía una galería, sin regreso espacial claro. Usuario: visitante de demo que explora con teclado, ratón o controles táctiles.
Decisión: ruta exterior ↔ interior ↔ terraza; puntos anclados a la vista, mapa de posición, W/S o ↑/↓ para avanzar/regresar, A/D o ←/→ para mirar, arrastre y botón para centrar. Transición breve de acercamiento respetando movimiento reducido. No se agrega geometría 3D ni panorama 360°; el movimiento se realiza entre renders.
Aceptación: regreso disponible salvo primer punto; avance detenido al final; posición actual visible; controles sin hover; teclado suspendido mientras menú o diálogo están abiertos; puntos y render comparten desplazamiento; sin scroll accidental durante recorrido.
Validación local: node --check app.js aprobado. Navegador escritorio: W avanzó del punto 1 al 2, clic en punto llegó al 3 y deshabilitó avance, S regresó al 2, arrastre actualizó transformación de cámara. Vista 390×844: controles visibles, retroceso volvió al punto 1 y quedó deshabilitado. Revisión heurística orientativa: antes 6/10 (regreso y orientación, severidad mayor); después 9/10, pendiente prueba con usuarios reales. Sin métricas de uso ni aceptación comercial.
Recuperación: revertir este commit para restaurar el recorrido anterior.

## Ajuste a mouse — 2026-10-09
Solicitud: movimiento con mouse, sin flechas. Se retiran el panel de flechas y los atajos WASD/flechas. Clic en puntos circulares para cambiar de ubicación; arrastre para mirar. Mapa de puntos clicable y activación estándar de botones por teclado conservada por accesibilidad. Escape cierra menú.

## Recorrido esférico real — 2026-10-09
Sustituye el desplazamiento de fotografías planas por un visor WebGL de panoramas completos. Portada conservada con marca centrada y botón Ingresar; enlace Inicio visible dentro del recorrido.
Recursos genéricos: tres renders equirectangulares 3072×1536 (360° horizontal / 180° vertical) desde cámaras de un mismo escenario 3D. Acceso ↔ sala ↔ terraza mediante puntos en coordenadas esféricas. Arrastre con mouse/táctil para giro sin límite horizontal y vista vertical; rueda/pellizco para zoom; sin panel de flechas ni atajos de movimiento.
Generación canónica: scripts/render_demo.py con Blender 5.2.1 LTS/Cycles, 12 muestras, exposición -1.5 EV y denoise. Modelo editable assets/demo-360.blend. La primera generación IA falló por conexión; un segundo resultado IA no se incorporó porque se eligió geometría 3D compartida para continuidad exacta de las tres cámaras.
Dependencia: Pannellum 2.5.7 vendorizado, licencia MIT en vendor/PANNELLUM-LICENSE. Documentación: https://pannellum.org/documentation/examples/tour/ y https://pannellum.org/documentation/reference/.
Criterios: entrada Inicio → Ingresar; giro completo sin bordes; puntos de ida/regreso; panoramas de las tres ubicaciones; regreso a Inicio; funcionamiento local y publicación GitHub Pages. No representa un inmueble real ni geometría de movimiento libre.
Recuperación: revertir el commit de integración. No hay servicios externos requeridos para visor ni panoramas; fuentes tipográficas externas conservadas de la demo.
Validación: node --check app.js aprobado; recursos de panorama 3072×1536; giro con arrastre observado en visor WebGL; salto por punto Acceso→Sala confirmado. Portada Inicio y botón Ingresar observados en navegador. Los assets generados son renders 3D genéricos de demostración, con detalle simplificado.
