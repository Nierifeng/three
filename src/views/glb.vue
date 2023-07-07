<template>
  <div id="box"></div>
</template>

<script setup lang="ts" name="basic">
import * as THREE from "three";
import { onMounted, onUnmounted } from "vue";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";

const w = window.innerWidth;
const h = window.innerHeight;
let mixer: THREE.AnimationMixer;

const baseUrl = import.meta.env.BASE_URL;

// 创建场景
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff);

// 创建相机
const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 100000);
camera.position.set(0, 0, 5);

// 创建渲染器
const renderer = new THREE.WebGLRenderer();
renderer.setSize(w, h);
renderer.setClearColor(0xffffff, 0);
// const controls = new OrbitControls(camera, renderer.domElement);

// 加载FBX文件
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath("/jsm/libs/gltf/");
const loader = new GLTFLoader();
loader.setDRACOLoader(dracoLoader);
loader.load(`${baseUrl}glb/model1.glb`, (gltf) => {
  const model = gltf.scene;
  model.position.set(0, -1.60, 2.15);
  model.rotation.x = Math.PI / 2 / 13.65;
  scene.add(model);
  mixer = new THREE.AnimationMixer(model);
  mixer.clipAction(gltf.animations[0]).play();
});
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
});

const clock = new THREE.Clock();
let frame = 0;
function tick() {
  renderer.render(scene, camera);
  // controls.update();
  frame = requestAnimationFrame(tick);
  const delta = clock.getDelta();
  mixer?.update(delta);
}
tick();

onUnmounted(() => {
  cancelAnimationFrame(frame);
});
</script>

<style scoped>
</style>
