<template>
  <div id="box"></div>
</template>

<script setup lang="ts" name="helloWords">

import * as THREE from 'three';
import { onMounted } from 'vue';
import Stat from 'three/examples/jsm/libs/stats.module'

const w = window.innerHeight;
const h = window.innerHeight;
const state = Stat();

// 房间 - 3d容器
const scene = new THREE.Scene();

// 东西 - 家具、家电...
// 物体有geometry(几何体、骨架) + material(材质、皮肤) 可以想象为灯笼

const axes = new THREE.AxesHelper(2);
scene.add(axes)

const geometry = new THREE.BoxGeometry(2, 2, 1);// 三个参数代表长宽高
const material = new THREE.MeshBasicMaterial({ color: "#667788" });
const cube = new THREE.Mesh(geometry, material);
// cube.position.set(0, 1, 1);// 移动
// cube.rotation.y = -36 / 180 * Math.PI; // 旋转
// cube.scale.x = 1; // 缩放
// cube.rotation.set(45 / 180 * Math.PI, 45 / 180 * Math.PI, 45 / 180 * Math.PI)
scene.add(cube);

// 光线 - 台灯、吊灯、太阳光...
const ligth = new THREE.AmbientLight();
scene.add(ligth);

// 相机（视角位置） - 
// 75代表角度范围（广角）
const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 100)
camera.position.set(0, 1, 9);
camera.lookAt(0, 0, 0);

// Randerer（渲染器）
const renderer = new THREE.WebGLRenderer();
renderer.setSize(w, h);
onMounted(() => {
  const box = document.getElementById('box');
  box?.append(renderer.domElement);
  box?.append(state.dom);
})

// setInterval
// setInterval(() => {
//   // cube.rotation.z += 0.01;
//   // renderer.render(scene, camera);
// }, 1000 / 60)

// requestAnimationFrame
// function tick() {
//   cube.rotation.z += 0.01;
// renderer.render(scene, camera);
//   requestAnimationFrame(tick);
// }
// tick();

// 解决不同刷新率的问题

const clock = new THREE.Clock();
function tick() {
  const time = clock.getElapsedTime();
  cube.position.x = Math.sin(time * 2) * 2;
  cube.position.y = Math.cos(time * 2) * 2;
  renderer.render(scene, camera);
  state.update();
  requestAnimationFrame(tick);
}
tick();

</script>

<style scoped>
</style>
