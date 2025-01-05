import * as THREE from 'three';
import { OrbitControls } from 'jsm/controls/OrbitControls.js';
const renderer = new THREE.WebGLRenderer({ antialias: true });

const w = window.innerWidth;
const h = window.innerHeight;
renderer.setSize(w, h);
document.body.appendChild(renderer.domElement);

// Set renderer background to black
renderer.setClearColor(0x000000);

const fov = 75;
const aspect = w / h;
const near = 0.1;
const far = 10;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 2;

const scene = new THREE.Scene();

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.03;

const geo = new THREE.IcosahedronGeometry(1, 2);
// Changed material to white
const mat = new THREE.MeshStandardMaterial({ 
    color: 0xffffff,
    flatShading: true,
    // Added metalness and roughness for better contrast
    metalness: 0.1,
    roughness: 0.8
});
const mesh = new THREE.Mesh(geo, mat);
scene.add(mesh);

const wereMat = new THREE.MeshBasicMaterial({ 
    color: 0x000000,
    wireframe:true
});
const wiremesh = new THREE.Mesh(geo, wereMat);
wiremesh.scale.setScalar(1.01);
mesh.add(wiremesh);

// Create lights outside the animation loop
const hemilight = new THREE.HemisphereLight(0x0099ff, 0x000000, 1);
scene.add(hemilight);

// Add directional light for better shadows and contrast
const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
dirLight.position.set(5, 5, 5);
scene.add(dirLight);

function animate(t = 0) {
    // Add rotation to see the contrast better
    mesh.rotation.y += 0.001;
    
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();