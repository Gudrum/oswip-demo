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
