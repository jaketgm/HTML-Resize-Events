import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const canvas = document.querySelector('canvas');
const renderer = new THREE.WebGLRenderer({ canvas: canvas });

renderer.setSize(window.innerWidth, window.innerHeight);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

const orbit = new OrbitControls(camera, renderer.domElement);

const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

camera.position.set(-10, 30, 30);
orbit.update();

const boxGeometry = new THREE.BoxGeometry(5, 5, 5);
const boxMaterial = new THREE.MeshBasicMaterial({ 
    color: 0x97a3b8,
    wireframe: true
});
const box = new THREE.Mesh(boxGeometry, boxMaterial);
scene.add(box);

box.position.set(0, 10, 0);

// Plane
const planeGeometry = new THREE.PlaneGeometry(30, 30); 
planeGeometry.rotateX(-Math.PI / 2);
const planeMaterial = new THREE.MeshBasicMaterial({
    color: 0x19292b, 
    side: THREE.DoubleSide
});
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.position.y = 0; 
scene.add(plane);

// GridHelper
const gridHelper = new THREE.GridHelper(30, 30); 
gridHelper.position.y = 0; 
scene.add(gridHelper);

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

function animate() {
    requestAnimationFrame(animate);

    // Box rotation
    box.rotation.x += 0.01;
    box.rotation.y += 0.01;

    renderer.render(scene, camera);
}

animate();