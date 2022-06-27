<template>
  <div id="cart"></div>
</template>

<script setup lang="ts">
import * as THREE from 'three';
import { onMounted, onUnmounted } from 'vue';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import Stat from 'three/examples/jsm/libs/stats.module';
const w = window.innerWidth - 205;
const h = window.innerHeight - 60;

// 场景
const scene = new THREE.Scene();
const state = Stat();

const cartMainGeometry = new THREE.BoxGeometry(1, 2, 0.5);
const cartMainMaterial = new THREE.MeshNormalMaterial();
// 车身
const cartMeth = new THREE.Mesh(cartMainGeometry, cartMainMaterial);
const lidMeth = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.5, 0.5), new THREE.MeshBasicMaterial());
lidMeth.position.z = 0.5;

const cartGroup = new THREE.Group();
cartGroup.add(cartMeth);
cartGroup.add(lidMeth);

const carWheelHubMeth = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.7, 0.7), cartMainMaterial);
const carWheelMethGroup = new THREE.Group();
const n = 20;
for (let i = 0; i < n; i++) {
  let r = 0.5;
  const geometry = new THREE.BoxGeometry(0.1, 0.1, 0.2);
  const meth = new THREE.Mesh(geometry, cartMainMaterial);
  meth.position.x = r * Math.cos(Math.PI * 2 / n * i);
  meth.position.y = r * Math.sin(Math.PI * 2 / n * i);
  carWheelMethGroup.add(meth);
}
carWheelMethGroup.rotation.y = 0.5 * Math.PI;
const carWheelHubGroup1 = new THREE.Group();
carWheelHubGroup1.add(carWheelMethGroup);
carWheelHubGroup1.add(carWheelHubMeth);
carWheelHubGroup1.position.set(-0.7, 0.5, 0);

const carWheelHubGroup2 = carWheelHubGroup1.clone();
carWheelHubGroup2.position.x = 0.7;
const carWheelHubGroup3 = carWheelHubGroup1.clone();
const carWheelHubGroup4 = carWheelHubGroup2.clone();
carWheelHubGroup3.position.y = -0.5;
carWheelHubGroup4.position.y = -0.5;

cartGroup.add(carWheelHubGroup1);
cartGroup.add(carWheelHubGroup2);
cartGroup.add(carWheelHubGroup3);
cartGroup.add(carWheelHubGroup4);
scene.add(cartGroup);

// 摄像机
const camera = new THREE.PerspectiveCamera(75, (w / h), 0.1, 10);
camera.position.set(0, 1, 9);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer();
console.log(window.devicePixelRatio);
// renderer.setPixelRatio(0.5); // 这是像素比 可以优化性能
renderer.setSize(w, h);

renderer.render(scene, camera);

const controls = new OrbitControls(camera, renderer.domElement);

const clock = new THREE.Clock();
let frame = 0;
function animate() {
  const time = clock.getElapsedTime();

  cartGroup.position.y = Math.sin(time) * 4;
  carWheelHubGroup1.rotation.x = Math.sin(-time) * 4;
  carWheelHubGroup2.rotation.x = Math.sin(-time) * 4;
  carWheelHubGroup3.rotation.x = Math.sin(-time) * 4;
  carWheelHubGroup4.rotation.x = Math.sin(-time) * 4;

  controls.update();
  state.update();
  renderer.render(scene, camera)

  frame = requestAnimationFrame(animate);
}
animate();

onMounted(() => {
  const div = document.getElementById('cart');
  div?.append(renderer.domElement);
  div?.append(state.dom);
});

onUnmounted(() => {
  cancelAnimationFrame(frame);
});

</script>

<style scoped>
</style>
