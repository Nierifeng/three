<template>
  <div id="group">
  </div>
</template>

<script setup lang="ts">
import * as THREE from 'three';
import { onMounted, onUnmounted } from 'vue';

const w = window.innerWidth - 205;
const h = window.innerHeight - 60;
// 场景
const scene = new THREE.Scene();

// 辅助坐标轴
// const axes = new THREE.AxesHelper(2);
// scene.add(axes)

function initCube(boxSize: [number, number, number], color: string = '#ff0000') {
  // 一个基本的盒子模型
  const geometry = new THREE.BoxGeometry(...boxSize);

  //材质
  const material = new THREE.MeshBasicMaterial({ color });
  return new THREE.Mesh(geometry, material);
}

// 物体
const redCube = initCube([1, 1, 1]);
const blueCube = initCube([0.5, 0.5, 0.5], '#0000ff');
const greenCube = initCube([0.2, 0.2, 0.2], '#00ff00');

const group1 = new THREE.Group();
const group2 = new THREE.Group();
// 将物体塞进场景里
group1.add(redCube);
group1.add(group2);
group2.add(blueCube);
group2.add(greenCube);
scene.add(group1);

redCube.position.y = 0;
group2.position.y = 2;
greenCube.position.y = -1;


// 光线
const ligth = new THREE.AmbientLight();
scene.add(ligth);

// 摄像机
const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 100);
camera.position.set(0, 0, 9);
camera.lookAt(0, 0, 0);

// 渲染器
const renderer = new THREE.WebGLRenderer();
renderer.setSize(w, h);

// 渲染场景跟光线
renderer.render(scene, camera);


const clock = new THREE.Clock();
let frame = 0;
function animate() {

  group1.rotation.z = clock.getElapsedTime();
  group2.rotation.z = clock.getElapsedTime();

  frame = requestAnimationFrame(animate);
  renderer.render(scene, camera)
}
animate();
onMounted(() => {
  const div = document.getElementById('group');
  div?.append(renderer.domElement)
})

onUnmounted(() => {
  cancelAnimationFrame(frame);
})

</script>

<style scoped>
</style>
