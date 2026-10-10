import * as THREE from './vendor/three.module.js';
export function createModel(host,project,onFloor){
 const scene=new THREE.Scene();scene.background=new THREE.Color('#e5eced');scene.fog=new THREE.Fog('#e5eced',45,100);
 const camera=new THREE.PerspectiveCamera(36,1,.1,150);let renderer;
 try{renderer=new THREE.WebGLRenderer({antialias:true,alpha:false});}catch{host.innerHTML='<div class="model-fallback">Tu navegador no pudo iniciar la maqueta 3D. Puedes seleccionar los pisos con los botones y explorar el recorrido 360.</div>';return{destroy(){},select(){},reset(){},explode(){}};}
 renderer.setPixelRatio(Math.min(devicePixelRatio,2));renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.setClearColor('#e5eced');host.appendChild(renderer.domElement);
 renderer.domElement.setAttribute('aria-label','Maqueta 3D conceptual. Arrastra para girar; selecciona un piso con clic o con los botones.');renderer.domElement.setAttribute('role','img');
 scene.add(new THREE.HemisphereLight('#ffffff','#7b8882',2.6));const sun=new THREE.DirectionalLight('#fff1db',3.5);sun.position.set(15,24,12);sun.castShadow=true;sun.shadow.mapSize.set(2048,2048);sun.shadow.camera.left=-25;sun.shadow.camera.right=25;sun.shadow.camera.top=25;sun.shadow.camera.bottom=-25;scene.add(sun);
 const material=(color,extra={})=>new THREE.MeshStandardMaterial({color,roughness:.65,...extra});
 const stone=material(project.color),slab=material('#ece8df'),bronze=material('#6e746e',{metalness:.5}),glass=material('#537b87',{metalness:.5,roughness:.22}),ground=material('#d3ded9'),green=material('#718c72');
 const building=new THREE.Group();scene.add(building);const floors=[],pickables=[];
 function box(w,h,d,x,y,z,mat,parent=building){const m=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),mat);m.position.set(x,y,z);m.castShadow=true;m.receiveShadow=true;parent.add(m);return m;}
 box(25,.3,19,0,-.25,0,ground,scene);box(13,.4,10,0,0,0,slab);box(9,1.1,6.5,0,.7,0,glass);
 const widths=[8.2,9,8.5];
 for(let f=1;f<=6;f++){
  const g=new THREE.Group();g.userData.floor=f;building.add(g);floors.push(g);const y=1.15+(f-1)*1.65,w=widths[project.shape];
  const deck=box(w,.22,7,0,y,0,slab,g);deck.userData.floor=f;pickables.push(deck);
  const body=box(w-.65,1.3,5.6,0,y+.75,-.25,stone,g);body.userData.floor=f;pickables.push(body);
  for(let k=0;k<5;k++){const x=-w/2+1+k*(w-2)/4;box(.8,1, .08,x,y+.75,2.59,glass,g);box(.06,1.3,.12,x-.52,y+.75,2.6,bronze,g);box(.8,.8,.08,x,y+.75,-3.08,glass,g);}
  box(w-.2,.5,.06,0,y+.47,3.35,glass,g);box(w-.1,.05,.08,0,y+.74,3.35,bronze,g);
  for(const x of [-w/2+.12,w/2-.12]){box(.08,.5,6.4,x,y+.47,0,glass,g);for(let k=0;k<3;k++)box(.08,1,.9,x,y+.78,-2+k*1.6,glass,g);}
 }
 box(8.7,.25,7.2,0,11.1,0,slab);box(3.5,.8,3,0,11.6,-.8,stone);box(2,.35,1.5,2.5,11.35,1.4,green);
 for(let i=0;i<9;i++){const x=(i<5?-10:10),z=-7+(i%5)*3.3;box(.16,1.6,.16,x,.7,z,bronze,scene);const crown=new THREE.Mesh(new THREE.IcosahedronGeometry(.8,1),green);crown.position.set(x,1.9,z);crown.castShadow=true;scene.add(crown);}
 const outline=new THREE.Box3Helper(new THREE.Box3(new THREE.Vector3(-4.9,1,-3.7),new THREE.Vector3(4.9,2.7,3.7)),'#227690');outline.visible=false;scene.add(outline);
 let angle=.65,elevation=.36,distance=30,down=null,moved=false,expanded=false,selected=0,raf,disposed=false;
 function position(){const target=new THREE.Vector3(0,5.1,0);camera.position.set(Math.sin(angle)*Math.cos(elevation)*distance,5.1+Math.sin(elevation)*distance,Math.cos(angle)*Math.cos(elevation)*distance);camera.lookAt(target);}
 floors.forEach(g=>g.children.forEach(m=>m.material=m.material.clone()));
 function select(f){selected=f;floors.forEach(g=>{g.visible=true;g.children.forEach(m=>{m.material.transparent=!!f&&g.userData.floor>f;m.material.opacity=!!f&&g.userData.floor>f?.13:1;m.material.depthWrite=!(f&&g.userData.floor>f);});});outline.visible=!!f;if(f){const y=1.15+(f-1)*1.65+(expanded?(f-1)*.5:0);outline.box.min.y=y;outline.box.max.y=y+1.6;}}
 const resize=()=>{const {width,height}=host.getBoundingClientRect();camera.aspect=width/Math.max(height,1);camera.updateProjectionMatrix();renderer.setSize(width,height,false);};const observer=new ResizeObserver(resize);observer.observe(host);
 const el=renderer.domElement;
 const pointerdown=e=>{down={x:e.clientX,y:e.clientY,px:e.clientX,py:e.clientY};moved=false;el.setPointerCapture(e.pointerId);};
 const pointermove=e=>{if(!down)return;const dx=e.clientX-down.px,dy=e.clientY-down.py;moved ||= Math.hypot(e.clientX-down.x,e.clientY-down.y)>5;angle-=dx*.007;elevation=Math.max(.05,Math.min(.95,elevation+dy*.005));down.px=e.clientX;down.py=e.clientY;};
 const pointerup=e=>{if(down&&!moved){const r=el.getBoundingClientRect();const mouse=new THREE.Vector2((e.clientX-r.left)/r.width*2-1,-(e.clientY-r.top)/r.height*2+1);const ray=new THREE.Raycaster();ray.setFromCamera(mouse,camera);const hit=ray.intersectObjects(pickables).find(h=>h.object.userData.floor);if(hit)onFloor(hit.object.userData.floor);}down=null;};
 const wheel=e=>{e.preventDefault();distance=Math.max(18,Math.min(48,distance+e.deltaY*.025));};
 el.addEventListener('pointerdown',pointerdown);el.addEventListener('pointermove',pointermove);el.addEventListener('pointerup',pointerup);el.addEventListener('pointercancel',()=>down=null);el.addEventListener('wheel',wheel,{passive:false});
 function animate(){if(disposed)return;position();renderer.render(scene,camera);raf=requestAnimationFrame(animate);}resize();animate();
 return{select,reset(){angle=.65;elevation=.36;distance=30;select(0);},explode(){expanded=!expanded;floors.forEach((g,i)=>g.position.y=expanded?i*.5:0);select(selected);return expanded;},destroy(){disposed=true;cancelAnimationFrame(raf);observer.disconnect();scene.traverse(o=>{o.geometry?.dispose();if(o.material){const a=Array.isArray(o.material)?o.material:[o.material];a.forEach(m=>m.dispose());}});renderer.dispose();el.remove();}};
}
