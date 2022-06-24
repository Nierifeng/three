<template>
  <div id="deBugUi"></div>
</template>

<script setup lang="ts">
import * as THREE from 'three';
import { GUI } from 'lil-gui';
import { onMounted } from 'vue';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import gsap from 'gsap';

let w = window.innerWidth - 205;
let h = window.innerHeight - 60;

const parameters = {
  color: 0xff0000,
  spin: () => {
    gsap.to(mesh.rotation, { direction: 1, y: mesh.rotation.y + 10 })
  }
}

const gui = new GUI({ title: '调试面板' });

const scene = new THREE.Scene();

const geometry = new THREE.BoxGeometry(2, 2, 2);
const material = new THREE.MeshBasicMaterial({ color: parameters.color });

const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

gui.add(mesh.position, 'x').min(-3).max(3).step(0.01).name('x轴');
gui.add(material, 'wireframe').name('线框');
gui.addColor(parameters, 'color').onChange(() => {
  material.color.set(parameters.color);
});
gui.add(parameters, 'spin').name('log');

const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 100)
camera.position.set(2, 3, 9);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGL1Renderer();
renderer.setSize(w, h);
renderer.render(scene, camera);
const controls = new OrbitControls(camera, renderer.domElement);

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera)
}
animate();

onMounted(() => {
  const element = document.getElementById('deBugUi');
  element?.appendChild(renderer.domElement);
})

</script>

<style scoped>
</style>
