<template>
  <div id="materials"></div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GUI } from 'lil-gui';


const gui = new GUI({ title: '材质' });

const w = window.innerWidth - 205;
const h = window.innerHeight - 60;
const scene = new THREE.Scene();

const textureLoader = new THREE.TextureLoader();

const texture = textureLoader.load('/static/logo.png');
const matcaps1 = textureLoader.load('/static/matcaps/1.png');

const doorColorTexture = textureLoader.load('/static/textures/door/color.jpg')
const doorAlphaTexture = textureLoader.load('/static/textures/door/alpha.jpg')
const doorAmbientOcclusionTexture = textureLoader.load('/static/textures/door/ambientOcclusion.jpg')
const doorHeightTexture = textureLoader.load('/static/textures/door/height.jpg')
const doorNormalTexture = textureLoader.load('/static/textures/door/normal.jpg')
const doorMetalnessTexture = textureLoader.load('/static/textures/door/metalness.jpg')
const doorRoughnessTexture = textureLoader.load('/static/textures/door/roughness.jpg')
const matcapTexture = textureLoader.load('/static/textures/matcaps/8.png')
const gradientTexture = textureLoader.load('/static/textures/gradients/5.jpg')

// const material = new THREE.MeshBasicMaterial();
// material.color.set('red');
// material.color = new THREE.Color(0xff00ff); // 两种方式都可以设置颜色
// material.map = texture; // 设置纹理
// material.wireframe = true; // 线框图
// material.transparent = true; // 设置可以透明的
// material.opacity = 0.5; // 透明度 需要设置 transparent 为 true
// material.alphaMap = texture; // 通过纹理来设置透明度 需要设置 transparent 为 true
// material.side = THREE.DoubleSide; // 渲染的面 按照 平面 来说默认渲染的是前面后面会是黑的 可以设置 FrontSide BackSide DoubleSide  DoubleSide更耗性能

// const material = new THREE.MeshNormalMaterial(); // 一种把法向量映射到RGB颜色的材质
// material.flatShading = true; // 平坦的阴影 可以观察torusCube的样子

// const material = new THREE.MeshMatcapMaterial(); // 不对灯光做出反应的材料 可以观看球体的颜色
// material.matcap = matcaps1; // 设置纹理

// const material = new THREE.MeshDepthMaterial(); // 深度材质 基于相机远近 来计算颜色 白色越近而黑色越远

// const material = new THREE.MeshPhysicalMaterial(); // 物理材质 受灯光影响

// const material = new THREE.MeshLambertMaterial(); // 一种非光泽表面的材质，没有镜面高光。

// const material = new THREE.MeshPhongMaterial(); // 一种用于具有镜面高光的光泽表面的材质
// material.shininess = 100; // 光晕的亮度
// material.specular = new THREE.Color(0xff0000); // 高光颜色

// const material = new THREE.MeshToonMaterial(); // 一种卡通材质

const material = new THREE.MeshStandardMaterial(); // 一种用于模型渲染的标准材质
material.roughness = 0.65; // 粗糙度 取值范围0-1
material.metalness = 0.45; // 金属度 取值范围0-1
material.map = doorColorTexture; // 设置纹理
material.aoMap = doorAmbientOcclusionTexture; // 环境遮挡贴图 需要第二组UV 可观看plane图
material.aoMapIntensity = 0.5; // 环境遮挡贴图的强度 取值范围0-1
material.displacementMap = doorHeightTexture; // 凸起贴图
material.displacementScale = 0.1; // 凸起贴图的强度 取值范围0-1
material.displacementBias = 0.0; // 凸起贴图的偏移 取值范围0-1
material.metalnessMap = doorMetalnessTexture; // 金属度贴图
material.roughnessMap = doorRoughnessTexture; // 粗糙度贴图
material.normalMap = doorNormalTexture; // 法线贴图
material.normalScale = new THREE.Vector2(1, 1); // 法线贴图的缩放 取值范围0-1  或者material.normalScale.set
material.transparent = true;
material.alphaMap = doorAlphaTexture; // 通过纹理来设置透明度 需要设置 transparent 为 true 黑色为完全透明白色为完全不透明

gui.add(material, 'roughness', 0, 1).name('粗糙度');
gui.add(material, 'metalness', 0, 1).name('金属感');
gui.add(material, 'aoMapIntensity', 0, 1).name('环境遮挡强度');
gui.add(material, 'displacementScale', 0, 1).name('凸起强度');
gui.add(material, 'displacementBias', 0, 1).name('凸起偏移');



const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.7, 100, 100), material);
sphere.position.x = -4.5;

const boxCube = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1, 100, 100, 100), material);
boxCube.position.x = -2.5;

const planeCube = new THREE.Mesh(new THREE.PlaneGeometry(1, 1, 100, 100), material);
planeCube.geometry.setAttribute('uv2', new THREE.BufferAttribute(planeCube.geometry.attributes.uv.array, 2))

const torusCube = new THREE.Mesh(new THREE.TorusGeometry(0.5, 0.2, 8, 16), material);
torusCube.position.x = 2.5;

scene.add(sphere, boxCube, planeCube, torusCube);

/** 
 * 灯光
 */
const light = new THREE.AmbientLight(0xffffff, 0.5); // 环境光
scene.add(light);

const pointLight = new THREE.PointLight(0xffffff, 0.5); // 点光源
pointLight.position.set(2, 3, 4);
scene.add(pointLight);


/** 
 * 摄像机
 */
const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 100)
camera.position.set(0, 1, 3);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGL1Renderer();
renderer.setSize(w, h);
const controls = new OrbitControls(camera, renderer.domElement);

const clock = new THREE.Clock();

function animate() {
  requestAnimationFrame(animate);
  const time = clock.getElapsedTime();
  boxCube.rotation.x = time;
  boxCube.rotation.y = time;

  // planeCube.rotation.x = time;
  // planeCube.rotation.y = time;

  torusCube.rotation.x = time;
  torusCube.rotation.y = time;
  controls.update();

  renderer.render(scene, camera)
}

animate();

onMounted(() => {
  const div = document.getElementById('materials');
  div?.append(renderer.domElement)
});

</script>
<style style scoped >
</style>
