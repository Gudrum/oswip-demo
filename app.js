const content=document.querySelector('#content'),scene=document.querySelector('#scene'),menu=document.querySelector('#menu'),menuButton=document.querySelector('#menuButton');
const arrow='<b aria-hidden="true">↗</b>';
const views={
inicio:()=>`<section class="intro"><p>La ciudad, desde otra perspectiva.</p><h1>OSWIP</h1><div class="sub">R E S I D E N C E S</div><a class="pill light" href="#recorrido">Iniciar recorrido ${arrow}</a><p class="caption">Arquitectura. Luz. Una forma de vivir.</p></section>`,
proyecto:()=>`<section><span class="eyebrow">El proyecto</span><h1 class="section-title">Un horizonte<br>de posibilidades.</h1><p class="lead">Una mirada contemporánea a la vida urbana. Espacios abiertos, luz natural y arquitectura que conecta el interior con todo lo que lo rodea.</p><a class="pill light" href="#residencias">Descubrir residencias ${arrow}</a> <a class="pill" href="#recorrido">Ver recorrido ${arrow}</a><p class="notice lead">Proyecto conceptual. Imágenes y características ilustrativas.</p></section>`,
residencias:()=>`<section class="split"><div><span class="eyebrow">Encuentra tu espacio</span><h1 class="section-title">Tu próxima<br>perspectiva.</h1><p class="lead">Explora distintas maneras de habitar. Selecciona una tipología para descubrir su distribución.</p><p class="notice lead">Selección demostrativa. No representa disponibilidad comercial.</p></div><div class="panel"><h2>Las residencias</h2><div class="filters" aria-label="Tipología">${[1,2,3].map(n=>`<button data-bed="${n}" class="${n===2?'active':''}" aria-pressed="${n===2}">${n} dormitorio${n>1?'s':''}</button>`).join('')}</div><div class="plan"><svg viewBox="0 0 300 160" role="img" aria-label="Esquema ilustrativo de distribución"><path d="M20 10H280V145H20Z M20 95H160V10 M160 75H280 M220 75V145 M90 95V145"/><path stroke-width="1" d="M30 20H145V60H30Z M35 105H75V135H35Z M175 20H265V60H175Z M230 90H268V130H230Z M170 95H205V130H170Z"/><text x="38" y="82" stroke="none" fill="#526763" font-size="10">Estar / comedor</text><text x="180" y="70" stroke="none" fill="#526763" font-size="9">Dormitorio</text></svg></div><div class="unit"><span id="unit-name">2 dormitorios<small>Distribución conceptual</small></span><span><strong id="area">86</strong> m²<small>Superficie ilustrativa</small></span></div><div class="unit"><span>Ambiente</span><span>Balcón abierto</span></div><a class="pill" href="#contacto">Me interesa esta residencia ${arrow}</a></div></section>`,
espacios:()=>`<section><span class="eyebrow">Los espacios</span><h1 class="section-title">El lujo de estar bien.</h1><div class="gallery-grid"><button class="photo" data-photo="interior" data-title="Interiores que respiran"><img src="assets/interior.jpg" alt="Interior luminoso con materiales naturales"><span>Interiores que respiran <b>↗</b></span></button><button class="photo" data-photo="terrace" data-title="Conexión con el exterior"><img src="assets/terrace.jpg" alt="Residencia contemporánea rodeada de vegetación"><span>Conexión con el exterior <b>↗</b></span></button></div></section>`,
contacto:()=>`<section class="split"><div><span class="eyebrow">Conversemos</span><h1 class="section-title">Imagina tu<br>próximo lugar.</h1><p class="lead">Cada gran proyecto comienza con una conversación.</p></div><div class="contact-card"><h2>Una experiencia de OSWIP</h2><p>Esta demo muestra cómo explorar un proyecto inmobiliario de forma visual e intuitiva.</p><a class="pill light" href="#residencias">Volver a las residencias ${arrow}</a><p class="notice">Demo conceptual, sin ventas ni recepción de datos personales. Las fotografías no corresponden a un proyecto comercial de OSWIP.</p><a class="notice" href="https://unsplash.com/license" target="_blank" rel="noopener">Fotografías de Unsplash · Licencia ↗</a></div></section>`};
const tourScenes=[
{image:'render-exterior.jpg',name:'La arquitectura',description:'Descubre el edificio desde su acceso principal.',next:'Entrar a la residencia',x:54,y:64},
{image:'render-living.jpg',name:'Tu espacio interior',description:'Luz natural, materiales nobles y conexión con el exterior.',next:'Explorar la terraza',x:78,y:48},
{image:'render-roof.jpg',name:'Sobre la ciudad',description:'Una terraza abierta al horizonte.',next:'Volver al exterior',x:35,y:58}
];
let tourIndex=0,tourX=0,tourY=0,tourMoving=false,tourTimer;
const tourImages=tourScenes.map(s=>{const image=new Image();image.src='assets/'+s.image;return image});
views.recorrido=()=>`<section class="tour game-tour" aria-label="Recorrido por puntos"><div class="tour-viewport" id="tour-viewport" aria-label="Arrastra para mirar alrededor"><div class="tour-world" id="tour-world"><div id="tour-points"></div></div></div><div class="tour-heading"><span class="eyebrow">Recorrido por puntos</span><h1 id="tour-name"></h1><p id="tour-status" role="status" aria-live="polite"></p></div><div class="tour-hud"><div class="route-map" aria-label="Mapa del recorrido">${tourScenes.map((s,i)=>`<button data-node="${i}" aria-label="Ir a ${s.name}"><span>${i+1}</span><small>${s.name}</small></button>`).join('')}</div><p class="tour-help">Haz clic en un punto para caminar · Arrastra con el mouse para mirar</p><small class="tour-disclaimer">Recorrido entre renders conceptuales</small></div></section>`;
function paintLook(){const world=document.querySelector('#tour-world');if(world)world.style.transform=`scale(1.18) translate(${tourX}%,${tourY}%)`}
function setTour(index){
 tourIndex=Math.max(0,Math.min(tourScenes.length-1,index));tourX=0;tourY=0;
 const current=tourScenes[tourIndex],world=document.querySelector('#tour-world');if(!world)return;
 world.style.backgroundImage=`url('assets/${current.image}')`;paintLook();
 document.querySelector('#tour-name').textContent=current.name;
 document.querySelector('#tour-status').textContent=`Punto ${tourIndex+1} de ${tourScenes.length} · ${current.description}`;
 const points=[];
 if(tourIndex>0)points.push(`<button class="walk-point back-point" data-walk="${tourIndex-1}" style="left:28%;top:65%" aria-label="Volver a ${tourScenes[tourIndex-1].name}"><span aria-hidden="true">●</span><small>Volver</small></button>`);
 if(tourIndex<tourScenes.length-1)points.push(`<button class="walk-point" data-walk="${tourIndex+1}" style="left:${current.x}%;top:${Math.min(current.y,61)}%" aria-label="Caminar a ${tourScenes[tourIndex+1].name}"><span aria-hidden="true">●</span><small>${tourScenes[tourIndex+1].name}</small></button>`);
 document.querySelector('#tour-points').innerHTML=points.join('');
 content.querySelectorAll('[data-node]').forEach(button=>{const active=Number(button.dataset.node)===tourIndex;button.classList.toggle('active',active);button.setAttribute('aria-current',active?'step':'false')});
}
function walkTo(index){
 if(tourMoving||index<0||index>=tourScenes.length||index===tourIndex)return;
 const image=tourImages[index];
 if(!image.complete||!image.naturalWidth){document.querySelector('#tour-status').textContent='Cargando el siguiente punto…';image.decode().then(()=>walkTo(index)).catch(()=>{document.querySelector('#tour-status').textContent='No se pudo cargar esta vista. Intenta de nuevo.'});return}
 tourMoving=true;const viewport=document.querySelector('#tour-viewport');viewport.classList.add('walking');
 const focusedPoint=document.activeElement?.closest('[data-walk]');
 const delay=matchMedia('(prefers-reduced-motion: reduce)').matches?0:180;
 tourTimer=setTimeout(()=>{if(location.hash!=='#recorrido'){tourMoving=false;return}setTour(index);viewport.classList.remove('walking');tourMoving=false;if(focusedPoint)content.querySelector(`[data-node="${index}"]`).focus({preventScroll:true})},delay);
}
content.addEventListener('click',e=>{
 if(!document.body.classList.contains('in-tour'))return;
 const button=e.target.closest('button');if(!button)return;
 if(button.dataset.walk!==undefined)walkTo(Number(button.dataset.walk));
 if(button.dataset.node!==undefined)walkTo(Number(button.dataset.node));
});
let dragView=null;
content.addEventListener('pointerdown',e=>{if(e.target.closest('button')||!e.target.closest('#tour-viewport')||tourMoving)return;dragView={id:e.pointerId,x:e.clientX,y:e.clientY,startX:tourX,startY:tourY};e.target.setPointerCapture(e.pointerId)});
content.addEventListener('pointermove',e=>{if(!dragView||e.pointerId!==dragView.id)return;tourX=Math.max(-7,Math.min(7,dragView.startX+(e.clientX-dragView.x)/innerWidth*22));tourY=Math.max(-6,Math.min(6,dragView.startY+(e.clientY-dragView.y)/innerHeight*18));paintLook()});
const stopDrag=()=>{dragView=null};content.addEventListener('pointerup',stopDrag);content.addEventListener('pointercancel',stopDrag);
window.addEventListener('blur',stopDrag);
function closeMenu(){menu.hidden=true;menuButton.setAttribute('aria-expanded','false')}
function render(){clearTimeout(tourTimer);tourMoving=false;dragView=null;const key=location.hash.slice(1)||'inicio';content.innerHTML=(views[key]||views.inicio)();scene.style.backgroundImage=`url('assets/${key==='contacto'?'terrace':key==='residencias'?'interior':'render-exterior'}.jpg')`;document.body.classList.toggle('in-tour',key==='recorrido');scene.style.transform='';scene.style.backgroundPosition='';if(key==='recorrido')setTour(tourIndex);closeMenu();window.scrollTo(0,0);document.title=`OSWIP · ${key==='inicio'?'Residences':key.charAt(0).toUpperCase()+key.slice(1)}`}
menuButton.onclick=()=>{menu.hidden=!menu.hidden;menuButton.setAttribute('aria-expanded',String(!menu.hidden))};menu.querySelector('.close').onclick=closeMenu;
document.querySelector('#fullscreen').onclick=async()=>{try{if(document.fullscreenElement)await document.exitFullscreen();else await document.documentElement.requestFullscreen()}catch{document.querySelector('#footnote').textContent='Pantalla completa no disponible en este navegador'}};
const gallery=document.querySelector('#gallery');gallery.querySelector('.close').onclick=()=>gallery.close();gallery.onclick=e=>{if(e.target===gallery)gallery.close()};
content.onclick=e=>{const bed=e.target.closest('[data-bed]');if(bed){content.querySelectorAll('[data-bed]').forEach(b=>{b.classList.toggle('active',b===bed);b.setAttribute('aria-pressed',String(b===bed))});document.querySelector('#unit-name').innerHTML=`${bed.dataset.bed} dormitorio${bed.dataset.bed==='1'?'':'s'}<small>Distribución conceptual</small>`;document.querySelector('#area').textContent=({1:54,2:86,3:124})[bed.dataset.bed];document.querySelector('.plan svg').setAttribute('aria-label',`Esquema ilustrativo, no plano técnico, de ${bed.dataset.bed} dormitorios`)}const photo=e.target.closest('[data-photo]');if(photo){gallery.querySelector('img').src=`assets/${photo.dataset.photo}.jpg`;gallery.querySelector('img').alt=photo.dataset.title;gallery.querySelector('p').textContent=photo.dataset.title+' · Imagen referencial';gallery.showModal()}};
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu()});window.addEventListener('hashchange',render);render();
