import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
camera.position.set(-10, 30, 30);

const orbit = new OrbitControls(camera, renderer.domElement);
orbit.update();

const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

const boxGeometryHigh = new THREE.BoxGeometry(5, 5, 5);
const boxGeometryMedium = new THREE.BoxGeometry(5, 5, 5, 4, 4, 4);
const boxGeometryLow = new THREE.BoxGeometry(5, 5, 5, 2, 2, 2);

const boxMaterial = new THREE.MeshBasicMaterial({
    color: 0x97a3b8,
    wireframe: true
});

const box = new THREE.Mesh(boxGeometryHigh, boxMaterial);
box.position.set(0, 10, 0);
scene.add(box);

const planeGeometry = new THREE.PlaneGeometry(30, 30);
planeGeometry.rotateX(-Math.PI / 2);
const planeMaterial = new THREE.MeshBasicMaterial({
    color: 0x19292b,
    side: THREE.DoubleSide
});
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.position.y = 0;
scene.add(plane);

const gridHelper = new THREE.GridHelper(30, 30);
gridHelper.position.y = 0;
scene.add(gridHelper);

window.addEventListener('resize', onWindowResize, false);

function adjustLOD()
{
    const width = renderer.domElement.width;
    const thresholdMedium = 800;
    const thresholdLow = 500;

    if (width < thresholdLow && box.geometry !== boxGeometryLow)
    {
        box.geometry.dispose();
        box.geometry = boxGeometryLow;
    }
    else if (width < thresholdMedium && box.geometry !== boxGeometryMedium)
    {
        box.geometry.dispose();
        box.geometry = boxGeometryMedium;
    }
    else if (width >= thresholdMedium && box.geometry !== boxGeometryHigh)
    {
        box.geometry.dispose();
        box.geometry = boxGeometryHigh;
    }
}

function onWindowResize()
{
    const width = window.innerWidth;
    const height = window.innerHeight;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);

    adjustLOD();
}

function animate()
{
    requestAnimationFrame(animate);

    box.rotation.x += 0.01;
    box.rotation.y += 0.01;

    renderer.render(scene, camera);
}

animate();