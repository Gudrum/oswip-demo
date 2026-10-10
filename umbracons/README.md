# Umbracons

Demo comercial independiente para showrooms inmobiliarios de Cuenca. Creado y revisado el 2026-10-10.

## Alcance

Catálogo de nueve proyectos identificados en https://proyectosecuador.com/top-10-proyectos-inmobiliarios-en-cuenca-ecuador-departamentos-casas/ y sus fichas enlazadas. El artículo se titula Top 10, pero el catálogo consultado identifica nueve proyectos concretos.

Flujo: catálogo → proyecto → maqueta 3D → piso → unidad ilustrativa → recorrido 360 por puntos. Fichas de preparación descargables para cada proyecto.

Las geometrías de seis pisos, distribuciones, unidades y ambientes son conceptuales compartidos, no reproducciones de los edificios nombrados. No hay precios, disponibilidad, afiliación, datos comerciales ni contactos inventados. Para una versión fiel se requieren planos/modelos y recursos autorizados por cada propietario.

## Arquitectura

Sitio estático en subdirectorio, compatible con GitHub Pages. `projects.js` mantiene nombres, sectores, fuentes y variantes visuales. `model.js` crea y libera maquetas WebGL con Three.js 0.180.0 (MIT, licencia en vendor). `app.js` resuelve rutas hash y estados de interacción. Pannellum y panoramas existentes se comparten desde el directorio padre. No se altera el sitio OSWIP original.

Arrastre para girar, rueda para acercar y clic sobre pisos; botones accesibles ofrecen selección alternativa. Panorama 360 arrastrable y puntos entre tres escenas. Los panoramas reutilizados no son nuevas capturas de estos proyectos ni garantizan detalle nativo a la resolución del archivo.

## Validación

- Sintaxis JavaScript comprobada con `node --check`.
- Navegador local: escritorio y móvil 390 × 844.
- Búsqueda sin acentos, filtros, estado vacío y restablecimiento.
- Selección de piso 3 y unidad 302, separación de pisos y reinicio.
- Recorrido por puntos Acceso → Sala → Terraza.
- Maqueta y navegación móvil sin desbordamiento horizontal en vista revisada.
- Fichas estáticas de preparación; su descarga depende de la configuración del navegador.

Sin telemetría ni resultados comerciales medidos. La fidelidad arquitectónica real queda fuera de esta demo.

## Ejecución y publicación

Desde la raíz: `python3 -m http.server 8088`; abrir `/umbracons/`.
Publicación: GitHub Pages del repositorio Gudrum/oswip-demo, ruta `/umbracons/`.
Recuperación: revertir el commit que agrega este subdirectorio; el sitio anterior permanece independiente.
