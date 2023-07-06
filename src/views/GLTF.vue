<template>
  <div id="box"></div>
</template>

<script setup lang="ts" name="basic">
import * as THREE from "three";
import { onMounted, onUnmounted } from "vue";
import Stat from "three/examples/jsm/libs/stats.module";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";

const w = window.innerWidth - 205;
const h = window.innerHeight - 60;

const state = Stat();

// 创建场景
const scene = new THREE.Scene();

// 创建相机
const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 100000);
camera.position.set(0, 0, 5);

// 创建渲染器
const renderer = new THREE.WebGLRenderer();
renderer.setSize(w, h);
const controls = new OrbitControls(camera, renderer.domElement);

// 加载FBX文件

const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath("/jsm/libs/gltf/");
const loader = new GLTFLoader();
loader.setDRACOLoader(dracoLoader);
loader.load("/src/assets/anya_forger_spy_x_family/scene.gltf", (gltf) => {
  console.log(gltf);
  // 将FBX模型添加到场景中
  scene.add(gltf.scene);
});

// const loader = new FBXLoader();
// loader.load("/src/assets/Anya.fbx", (fbx) => {
//   console.log(fbx);
//   fbx.scale.setScalar(0.01); // 缩放模型
//   // 将FBX模型添加到场景中
//   scene.add(fbx);
// });

//
//添加环境灯
const ambientLight = new THREE.AmbientLight(0xffffff, 0.1); // 环境光
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5); // 平行光
directionalLight.position.set(1, 0.5, 0);
scene.add(directionalLight);

// 渲染循环
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();

// Randerer（渲染器）
onMounted(() => {
  const box = document.getElementById("box");
  box?.append(renderer.domElement);
  const stateDom = state.dom;
  stateDom.style.left = "205px";
  box?.append(stateDom);
});

const clock = new THREE.Clock();
let frame = 0;
function tick() {
  renderer.render(scene, camera);
  state.update();
  controls.update();
  frame = requestAnimationFrame(tick);
}
tick();

onUnmounted(() => {
  cancelAnimationFrame(frame);
});
</script>

<style scoped></style>
