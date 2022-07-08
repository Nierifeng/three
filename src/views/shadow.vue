<template>
  <div id="shadow">

  </div>
</template>

<script setup lang="ts">
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { onMounted } from 'vue';
import GUI from 'lil-gui';
import { ShaderMaterial } from 'three';
const w = window.innerWidth - 205;
const h = window.innerHeight - 60;

const gui = new GUI();

// Scene
const scene = new THREE.Scene();

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const bakedShadow = textureLoader.load('/static/textures/bakedShadow.jpg')
const simpleShadow = textureLoader.load('/static/textures/simpleShadow.jpg')

/** light
 */
// Ambient light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
scene.add(ambientLight);

gui.add(ambientLight, 'intensity', 0, 1).name('环境光强度');


// Directional light
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.3);
directionalLight.position.set(2, 2, - 1);
directionalLight.castShadow = true; // 允许发射阴影
directionalLight.shadow.mapSize.width = 1024; // 阴影图片的宽度
directionalLight.shadow.mapSize.height = 1024; // 阴影图片的高度
directionalLight.shadow.camera.near = 1; // 阴影图片的近距离范围
directionalLight.shadow.camera.far = 6; // 阴影图片的远距离范围
directionalLight.shadow.camera.left = - 1; // 阴影图片的左边范围
directionalLight.shadow.camera.right = 1; // 阴影图片的右边范围
directionalLight.shadow.camera.top = 1; // 阴影图片的上边范围
directionalLight.shadow.camera.bottom = - 1; // 阴影图片的下边范围
directionalLight.shadow.radius = 10; // 将此值设置为大于1的值将模糊阴影的边缘

const directionalCameraHelp = new THREE.CameraHelper(directionalLight.shadow.camera); // 帮助摄像机设置阴影范围
directionalCameraHelp.visible = false; // 隐藏帮助摄像机
scene.add(directionalCameraHelp);

gui.add(directionalLight, 'intensity', 0, 1).name('方向光强度');
gui.add(directionalLight.position, 'x', -5, 5, 0.001).name('方向光x');
gui.add(directionalLight.position, 'y', -5, 5, 0.001).name('方向光y');
gui.add(directionalLight.position, 'z', -5, 5, 0.001).name('方向光z');
gui.add(directionalLight.shadow, 'radius', 0, 10, 0.001).name('阴影半径');
scene.add(directionalLight);

// Spot light
const spotLight = new THREE.SpotLight(0xffffff, 0.3);
spotLight.castShadow = true; // 允许发射阴影
spotLight.shadow.mapSize.width = 1024; // 阴影图片的宽度
spotLight.shadow.mapSize.height = 1024; // 阴影图片的高度
spotLight.shadow.camera.near = 1; // 阴影图片的近距离范围
spotLight.shadow.camera.far = 6; // 阴影图片的远距离范围
spotLight.shadow.camera.fov = 30; // 阴影图片的视角范围
spotLight.position.set(0, 2, 2); // 设置光源位置
scene.add(spotLight, spotLight.target); // 将光源添加到场景中

gui.add(spotLight, 'intensity', 0, 1).name('聚光灯强度');
gui.add(spotLight.position, 'x', -5, 5, 0.001).name('聚光灯x');
gui.add(spotLight.position, 'y', -5, 5, 0.001).name('聚光灯y');
gui.add(spotLight.position, 'z', -5, 5, 0.001).name('聚光灯z');
gui.add(spotLight.shadow, 'radius', 0, 10, 0.001).name('阴影半径');

const spotCameraHelp = new THREE.CameraHelper(spotLight.shadow.camera); // 帮助摄像机设置阴影范围
spotCameraHelp.visible = false; // 隐藏帮助摄像机
scene.add(spotCameraHelp);

// Point light
const pointLight = new THREE.PointLight(0xffffff, 0.3);

pointLight.castShadow = true;
pointLight.shadow.mapSize.width = 1024;
pointLight.shadow.mapSize.height = 1024;
pointLight.shadow.camera.near = 0.1;
pointLight.shadow.camera.far = 5;
pointLight.position.set(- 1, 2, 0);
scene.add(pointLight);

const pointLightCameraHelper = new THREE.CameraHelper(pointLight.shadow.camera);
pointLightCameraHelper.visible = false
scene.add(pointLightCameraHelper)

/**
 * material
 */

const material = new THREE.MeshStandardMaterial();
material.roughness = 0.7;
gui.add(material, 'metalness', 0, 1, 0.01).name('金属度');
gui.add(material, 'roughness', 0, 1, 0.01).name('粗糙度');

/**
 * object
 */

const sphere = new THREE.Mesh(
  new THREE.SphereGeometry(0.5, 32, 32),
  material
);

sphere.castShadow = true; // 允许发射阴影

const plane = new THREE.Mesh(
  new THREE.PlaneGeometry(5, 5),
  material
  // new THREE.MeshBasicMaterial({ map: bakedShadow }), // 烘烤阴影
);
plane.rotation.x = - Math.PI * 0.5;
plane.position.y = - 0.5;
plane.receiveShadow = true; // 允许接收阴影

const sphereShadow = new THREE.Mesh( // 用于显示阴影的球体
  new THREE.PlaneGeometry(1.5, 1.5),
  new THREE.MeshBasicMaterial({
    color: 0x000000,
    transparent: true,
    alphaMap: simpleShadow
  })
)
sphereShadow.rotation.x = - Math.PI * 0.5
sphereShadow.position.y = plane.position.y + 0.01

scene.add(sphere, plane, sphereShadow);
/**
 * camera
 */
const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 10);
camera.position.set(1, 1, 4);
camera.lookAt(scene.position);
scene.add(camera);


/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer();
renderer.setSize(w, h);
// renderer.shadowMap.enabled = true; // 开启阴影 
// renderer.shadowMap.type = THREE.PCFSoftShadowMap; // 阴影类型 https://threejs.org/docs/index.html?q=render#api/zh/constants/Renderer

const controls = new OrbitControls(camera, renderer.domElement);

const clock = new THREE.Clock()

function tick() {

  const elapsedTime = clock.getElapsedTime()

  // 移动球
  sphere.position.x = Math.cos(elapsedTime) * 1.5
  sphere.position.z = Math.sin(elapsedTime) * 1.5
  sphere.position.y = Math.abs(Math.sin(elapsedTime * 3))

  // 移动阴影
  sphereShadow.position.x = sphere.position.x
  sphereShadow.position.z = sphere.position.z
  sphereShadow.material.opacity = (1 - Math.abs(sphere.position.y)) * 0.3

  renderer.render(scene, camera);
  controls.update();
  requestAnimationFrame(tick);
}
tick();

onMounted(() => {
  document.getElementById('shadow')?.appendChild(renderer.domElement);
  controls.update();
});


</script>

<style scoped>
</style>
