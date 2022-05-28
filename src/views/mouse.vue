<template>
  <div id="mouse">
  </div>
</template>

<script setup lang="ts">
import * as THREE from 'three';
import { onMounted, onUnmounted } from 'vue';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
const w = window.innerHeight - 205;
const h = window.innerHeight - 60;
const scene = new THREE.Scene();

const axes = new THREE.AxesHelper(2);// 辅助坐标轴
scene.add(axes)

const boxGeometry = new THREE.BoxGeometry(2, 2, 2);
const material = new THREE.MeshNormalMaterial();
const cube = new THREE.Mesh(boxGeometry, material)
scene.add(cube);

const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 100)
camera.position.set(0, 1, 9);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGL1Renderer();
renderer.setSize(w, h);
const controls = new OrbitControls(camera, renderer.domElement);

let frame = 0;
function animate() {
  frame = requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera)
}
animate();
onMounted(() => {
  const div = document.getElementById('mouse');
  div?.append(renderer.domElement)
})

onUnmounted(() => {
  cancelAnimationFrame(frame);
})



</script>

<style scoped>
</style>
