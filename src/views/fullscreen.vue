<template>
  <div id="fullscreen">
  </div>
</template>

<script setup lang="ts">
import * as THREE from 'three';
import { onMounted, onUnmounted } from 'vue';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
let w = window.innerWidth - 205;
let h = window.innerHeight - 60;
let dom: Element | null = null;
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

function windowResize() {
  // 修改窗体大小
  w = window.innerWidth - 205;
  h = window.innerHeight - 60;

  // 修改相机
  camera.aspect = w / h;
  camera.updateProjectionMatrix();

  // 修改渲染器大小
  renderer.setSize(w, h);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // 设置像素比能优化性能 像素比越高代表渲染的越精细所耗的性能就越多

}

function fullscreen() {
  if (!document.fullscreenElement) {
    dom?.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
}

onMounted(() => {
  const div = document.getElementById('fullscreen');
  dom = div;
  div?.append(renderer.domElement);

  window.addEventListener('resize', windowResize);
  window.addEventListener('dblclick', fullscreen);
})

onUnmounted(() => {
  cancelAnimationFrame(frame);
  window.removeEventListener('resize', windowResize);
  window.removeEventListener('dblclick', fullscreen);
})



</script>

<style scoped>
</style>
