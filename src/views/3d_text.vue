<template>
  <div id="3dText">

  </div>
</template>

<script setup lang="ts">

import * as THREE from 'three';
import { onMounted, onUnmounted } from 'vue';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { FontLoader } from "three/examples/jsm/loaders/fontloader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";

const w = window.innerWidth - 205;
const h = window.innerHeight - 60;
const scene = new THREE.Scene();

const fontLoader = new FontLoader();
const textureLoader = new THREE.TextureLoader()
const matcapTexture = textureLoader.load('/static/matcaps/8.png')

fontLoader.load('/static/fonts/helvetiker_regular.typeface.json', (font) => {
  const geometry = new TextGeometry('Nie Ri Feng', {
    font: font, // 字体
    size: 0.5, // 字体大小
    height: 0.2, // 字体高度
    curveSegments: 12, // 曲线段数
    bevelEnabled: true, // 是否启用凹面变形
    bevelThickness: 0.03, // 凹面厚度
    bevelSize: 0.02, // 凹面大小
    bevelOffset: 0, // 凹面偏移
    bevelSegments: 5 // 凹面段数
  });
  geometry.computeBoundingBox();
  geometry.center();

  const material = new THREE.MeshMatcapMaterial({ matcap: matcapTexture })
  const text = new THREE.Mesh(geometry, material);
  scene.add(text);
});

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
  const div = document.getElementById('3dText');
  div?.append(renderer.domElement)
})

onUnmounted(() => {
  cancelAnimationFrame(frame);
})

</script>

<style scoped>
</style>
