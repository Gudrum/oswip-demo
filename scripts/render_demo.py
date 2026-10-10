import bpy, math, random, os
from mathutils import Vector
random.seed(9)
bpy.ops.object.select_all(action='SELECT');bpy.ops.object.delete(use_global=False)
def mat(name,color,rough=.5,metal=0):
 m=bpy.data.materials.new(name);m.diffuse_color=(*color,1);m.use_nodes=True;p=m.node_tree.nodes.get('Principled BSDF');p.inputs['Base Color'].default_value=(*color,1);p.inputs['Roughness'].default_value=rough;p.inputs['Metallic'].default_value=metal;return m
stone=mat('Limestone',(0.74,.7,.6));white=mat('Warm plaster',(.89,.86,.79));oak=mat('Oak',(.45,.25,.11));linen=mat('Linen',(.8,.76,.65));sage=mat('Sage',(.27,.38,.27));dark=mat('Dark bronze',(.07,.1,.09),.3,.7);green=mat('Foliage',(.1,.24,.08));water=mat('Pool',(.08,.44,.49),.12,.35);soil=mat('Soil',(.13,.09,.05));sky=mat('Distant sea',(.3,.55,.65),.3)
def box(name,loc,scale,material,bevel=0):
 bpy.ops.mesh.primitive_cube_add(size=1,location=loc);o=bpy.context.object;o.name=name;o.dimensions=scale;bpy.ops.object.transform_apply(location=False,rotation=False,scale=True);o.data.materials.append(material)
 if bevel:mod=o.modifiers.new('Soft edges','BEVEL');mod.width=bevel;mod.segments=3;o.modifiers.new('Normals','WEIGHTED_NORMAL')
 return o
def cyl(name,loc,radius,depth,material):
 bpy.ops.mesh.primitive_cylinder_add(vertices=32,radius=radius,depth=depth,location=loc);o=bpy.context.object;o.name=name;o.data.materials.append(material);return o
def plant(x,y,z=0):
 cyl('Planter',(x,y,z+.35),.48,.7,stone);cyl('Trunk',(x,y,z+1.2),.06,1.7,oak)
 for i in range(9):
  a=random.random()*math.tau;bpy.ops.mesh.primitive_uv_sphere_add(segments=12,ring_count=8,radius=.5,location=(x+math.cos(a)*.4,y+math.sin(a)*.4,z+1.5+random.random()*.8));o=bpy.context.object;o.scale=(.7,.7,.9);o.data.materials.append(green)
# Architectural shell, open doors connect three camera positions.
box('Garden ground',(0,0,-.18),(80,80,.2),sage)
box('Residence floor',(0,0,-.03),(12,10,.15),oak)
box('Ceiling',(0,0,3.4),(12.4,10.4,.25),white)
for x in [-6,6]:
 box('Side wall',(x,0,1.65),(.22,10,3.3),white)
for y in [-5,5]:
 for x in [-4.1,4.1]:box('Wall beside opening',(x,y,1.6),(3.8,.22,3.2),white)
 for x in [-2.15,2.15]:box('Door jamb',(x,y,1.6),(.09,.14,3.2),dark)
 box('Door lintel',(0,y,3.15),(4.4,.2,.3),dark)
box('Courtyard',(0,-10,-.01),(18,10,.16),stone)
box('Terrace',(0,10,-.01),(18,10,.16),stone)
# Sofa + seating.
for x in [-3.6,3.6]:
 box('Sofa seat',(x,.2,.45),(2,3,.55),linen,.15)
 box('Sofa back',(x+(-.8 if x<0 else .8),.2,.9),(.4,3,1.15),linen,.12)
 for y in [-1.15,1.5]:box('Armrest',(x,y,.75),(2,.3,.7),linen,.12)
 for y in [-.7,.2,1.1]:box('Cushion',(x+(-.5 if x<0 else .5),y,.95),(.4,.7,.7),sage,.12)
box('Rug',(0,0,.07),(5,4,.035),linen)
cyl('Coffee table',(0,0,.45),1.1,.14,stone);cyl('Table base',(0,0,.23),.6,.4,stone)

box('Kitchen counter',(3,-3.8,.5),(4,1.1,1),stone,.05)
box('Kitchen cabinets',(3,-4.8,1.4),(4,.25,2.7),oak,.04)
box('Dining table',(-3,3,.82),(3,1.2,.15),oak,.08)
for x in [-4,-2]:
 for y in [2.1,3.9]:
  box('Chair',(x,y,.45),(.65,.65,.12),linen,.08);box('Chair back',(x,y+(.25 if y>3 else -.25),.8),(.65,.12,.7),linen,.07)
for x,y in [(-5,4),(5,4),(-5,-4)]:plant(x,y)
# Terrace pool and lounge.
box('Pool coping',(5,10,.12),(5.5,7.5,.28),white,.12);box('Pool water',(5,10,.28),(4.9,6.9,.035),water)
for y in [8,11]:
 box('Lounger',(-4,y,.35),(1.2,2.3,.3),linen,.12);box('Lounger base',(-4,y,.16),(1,2.1,.2),oak,.08)
for x in [-8,0,8]:
 for y in [-14,14]:plant(x,y)
for x in [-8.8,8.8]:
 box('Terrace low wall',(x,10,.35),(.15,10,.7),stone)
for y in [7,10,13]:
 for x in [-8.8,8.8]:box('Rail post',(x,y,.9),(.06,.06,1.8),dark)
box('Horizon sea',(0,80,-.3),(300,120,.1),sky)
# Entrance landscaping and neighboring architecture.
for x in [-7,7]:
 for y in [-8,-12]:plant(x,y)
for x,y,h in [(-20,0,15),(20,0,20),(-25,25,12),(24,30,14)]:
 box('Neighbor',(x,y,h/2),(8,9,h),stone,.12)
 for z in range(2,h,3):box('Neighbor balcony',(x,y-4.6,z),(8.6,.6,.15),white)
# Pendants.
for x in [-3,3]:
 cyl('Pendant cord',(x,2,2.8),.015,1,dark);cyl('Pendant shade',(x,2,2.35),.42,.2,oak)
# Lighting and spherical camera.
world=bpy.context.scene.world;world.use_nodes=True;nodes=world.node_tree.nodes;nodes.clear();out=nodes.new('ShaderNodeOutputWorld');bg=nodes.new('ShaderNodeBackground');bg.inputs['Strength'].default_value=.65;skytex=nodes.new('ShaderNodeTexSky');skytex.sky_type='MULTIPLE_SCATTERING';skytex.sun_elevation=math.radians(25);skytex.sun_rotation=math.radians(135);world.node_tree.links.new(skytex.outputs['Color'],bg.inputs['Color']);world.node_tree.links.new(bg.outputs[0],out.inputs[0])
bpy.ops.object.light_add(type='AREA',location=(0,0,3.1));bpy.context.object.data.energy=450;bpy.context.object.data.shape='DISK';bpy.context.object.data.size=6
bpy.ops.object.camera_add();camera=bpy.context.object;camera.data.type='PANO';camera.data.panorama_type='EQUIRECTANGULAR';scene=bpy.context.scene;scene.camera=camera
scene.render.engine='CYCLES';scene.cycles.samples=12;scene.cycles.use_denoising=True;scene.render.resolution_x=3072;scene.render.resolution_y=1536;scene.render.resolution_percentage=100;scene.render.image_settings.file_format='JPEG';scene.render.image_settings.quality=90
scene.view_settings.view_transform='AgX';scene.view_settings.exposure=-1.5
root=os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
for name,position,target in [('access',(0,-11,1.65),(0,0,1.65)),('living',(0,-2,1.65),(0,8,1.65)),('terrace',(0,10,1.65),(0,0,1.65))]:
 camera.location=position;camera.rotation_euler=(Vector(target)-camera.location).to_track_quat('-Z','Y').to_euler();scene.render.filepath=os.path.join(root,'assets','pano-'+name+'.jpg');bpy.ops.render.render(write_still=True)
bpy.ops.wm.save_as_mainfile(filepath=os.path.join(root,'assets','demo-360.blend'))
