<template>
  <div id="textures"></div>
</template>

<script setup lang="ts">
import * as THREE from 'three';
import { onMounted } from 'vue';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const w = window.innerWidth - 205;
const h = window.innerHeight - 60;

// const image = new Image();
// const texture = new THREE.Texture(image);
// image.onload = () => {
//   texture.needsUpdate = true;
// }
// image.src = '/static/logo.png';

const loadingManager = new THREE.LoadingManager(); // 管理器
// loadingManager.onStart = () => {
//   console.log('onStart');
// };

// loadingManager.onLoad = () => {
//   console.log('onLoad');
// }

// loadingManager.onError = () => {
//   console.log('onError');
// }

// loadingManager.onProgress = () => { 
//   console.log('onProgress');
// }

const textureLoader = new THREE.TextureLoader(loadingManager); // Loader
const texture = textureLoader.load('/static/logo.png');

// texture.repeat.x = 2; // 重复
// texture.repeat.y = 2;
// texture.wrapS = THREE.RepeatWrapping;
// texture.wrapT = THREE.MirroredRepeatWrapping;
// texture.offset.x = 0.5; // 移动
// texture.offset.y = 0.1;

texture.rotation = Math.PI / 4; // 围绕中心点旋转角度 中心点默认为（0，0） 
texture.center.x = 0.5; // 修改中心点
texture.center.y = 0.5;
texture.minFilter = THREE.LinearMipMapNearestFilter; // 缩小
texture.magFilter = THREE.NearestFilter; // 放大

const scene = new THREE.Scene();
const geometry = new THREE.BoxGeometry(2, 2, 2);
const material = new THREE.MeshBasicMaterial({ map: texture });
console.log(geometry.attributes);


const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh)

const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 100)
camera.position.set(0, 0, 9);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGL1Renderer();
renderer.setSize(w, h);
renderer.render(scene, camera);
const controls = new OrbitControls(camera, renderer.domElement);

;

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera)
}
animate();

onMounted(() => {
  const element = document.getElementById('textures');
  element?.appendChild(renderer.domElement);;
})
</script>

<style scoped>
</style>
