import * as THREE from 'https://unpkg.com/three@0.127.0/build/three.module.js' 

import { GLTFLoader } from 'https://unpkg.com/three@0.127.0/examples/jsm/loaders/GLTFLoader.js';

const canvas = document.querySelector('.webgl')
const scene = new THREE.Scene()
var xpos
var ypos
var zpos
xpos=0
ypos=0
zpos=0
console.log(xpos,ypos,zpos)
const loader = new GLTFLoader()
loader.load('/tmp/the_holy_file.glb', function (glb) {
    console.log(glb)
    const model = glb.scene
    
    console.log(model.position)
    // // model_position = [...model.position]
    // model.geometry.boundingBox.getSize()
    
    var bbox = new THREE.Box3().setFromObject(model);
    var mxl=Math.max(bbox.max.x-bbox.min.x,bbox.max.y-bbox.min.y,bbox.max.z-bbox.min.z)
    mxl=mxl/6
    model.scale.set(1/mxl,1/mxl,1/mxl)
    bbox = new THREE.Box3().setFromObject(model);
    xpos = (bbox.max.x+bbox.min.x)/2;
    ypos = (bbox.max.y+bbox.min.y)/2;
    zpos = (bbox.max.z+bbox.min.z)/2;
    model.position.set((2*model.position.x)-xpos,(2*model.position.y)-ypos,(2*model.position.z)-zpos)
    
    
    console.log(bbox)
    console.log(model.position)
    scene.add(model)
},function(xhr){
    console.log(xhr.loaded/xhr.total*100+'% loaded')
},function(error){
    console.log(error)
})


const light = new THREE.DirectionalLight(0xffffff, 1)
light.position.set(0,5,10)
scene.add(light)
const sizes = {
    height: window.innerHeight,
    width: window.innerWidth
}
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 100)
camera.position.set(0,5,10)
scene.add(camera)
camera.lookAt(scene.position)
const renderer = new THREE.WebGL1Renderer({canvas: canvas})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio,2))
renderer.shadowMap.enabled = true
renderer.outputEncoding=true
renderer.render(scene, camera)

const fps = 50

function animate() {
    setTimeout(() => {
        requestAnimationFrame(animate);
        
      }, 1000 / fps);
      renderer.render(scene, camera)
    //   camera.position.set(0,5,10)                                   put your required camera position here... by default it is always looking the models postition, so whatever you put here, you dont have to change the angle again to turn towards model.
    //   camera.lookAt(0,0,0)                                          change where camera is looking at
    
}
animate()