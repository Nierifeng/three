<template>
  <div id="light">

  </div>
</template>

<script setup lang="ts">
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { onMounted } from 'vue';
import GUI from 'lil-gui';
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper';
const w = window.innerWidth - 205;
const h = window.innerHeight - 60;

const gui = new GUI();


const scene = new THREE.Scene()

const material = new THREE.MeshStandardMaterial()
material.roughness = 0.4

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // 环境光
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xff00ff, 0.5); // 平行光
directionalLight.position.set(1, 0.5, 0);
scene.add(directionalLight);

gui.add(directionalLight, 'intensity', 0, 1).name('平行光强度');

const hemisphereLight = new THREE.HemisphereLight(0x00ff00, 0x0000ff, 0.5); // 半球光 上下两面都发光 第一个参数为上面光的颜色 第二个参数为下面光的颜色 第三个参数为光的强度
scene.add(hemisphereLight);

gui.add(hemisphereLight, 'intensity', 0, 1).name('半球光强度');
gui.addColor(hemisphereLight, 'groundColor').name('半球光地面颜色');
gui.addColor(hemisphereLight, 'color').name('半球光天空颜色');

const pointLight = new THREE.PointLight(0xffff00, 0.5, 3); // 点光源 第三个参数为光的范围
pointLight.position.set(1, -0.5, 1);
scene.add(pointLight);
gui.add(pointLight, 'intensity', 0, 1).name('点光源强度');
gui.add(pointLight, 'distance', 0, 10).name('点光源距离');

const rectAreaLight = new THREE.RectAreaLight(0x4e00ff, 0.5, 2, 2); // 矩形光源 第三个参数为光的范围 第四个参数为光的高度
rectAreaLight.position.set(1, -0.5, 1); // 矩形光源的位置
rectAreaLight.lookAt(new THREE.Vector3()); // 矩形光源的方向
scene.add(rectAreaLight);
gui.add(rectAreaLight, 'intensity', 0, 1).name('矩形光源强度');
gui.add(rectAreaLight, 'width', 0, 10).name('矩形光源宽度');
gui.add(rectAreaLight, 'height', 0, 10).name('矩形光源高度');

const spotLight = new THREE.SpotLight(0xff0000, 0.5, 3, Math.PI * 0.1, 0.25, 1); // 聚光灯 第三个参数为最大距离 第四个参数为光线的散射角度 单位为弧度 第五个参数为半影衰减百分比 第六个为沿着光照距离的衰减量
spotLight.position.set(0.5, 0, 1); // 聚光灯的位置
spotLight.target.position.x = -0.75; // 修改聚光灯目标位置
scene.add(spotLight.target); // 聚光灯的目标位置
scene.add(spotLight);
gui.add(spotLight, 'intensity', 0, 1).name('聚光灯强度');
gui.add(spotLight, 'distance', 0, 10).name('聚光灯距离');
gui.add(spotLight, 'angle', 0, Math.PI).name('聚光灯角度');
gui.add(spotLight, 'penumbra', 0, 1).name('聚光灯的半影衰减百分比');
gui.add(spotLight, 'decay', 0, 1).name('聚光灯衰减');

// helper
const hemisphereLightHelper = new THREE.HemisphereLightHelper(hemisphereLight, 0.1); // 半球光的辅助线 第一个参数为半球光对象 第二个参数为线的长度
scene.add(hemisphereLightHelper);

const pointLightHelper = new THREE.PointLightHelper(pointLight, 0.1); // 点光源的辅助线 第一个参数为点光源对象 第二个参数为线的长度
scene.add(pointLightHelper);

const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, 0.1); // 平行光的辅助线 第一个参数为平行光对象 第二个参数为线的长度
scene.add(directionalLightHelper);

const rectAreaLightHelper = new RectAreaLightHelper(rectAreaLight); // 矩形光源的辅助线 第一个参数为矩形光源对象 第二个参数为线的颜色
scene.add(rectAreaLightHelper);

const spotLightHelper = new THREE.SpotLightHelper(spotLight); // 聚光灯的辅助线 第一个参数为聚光灯对象
scene.add(spotLightHelper);


const sphere = new THREE.Mesh(
  new THREE.SphereGeometry(0.5, 32, 32),
  material
)
sphere.position.x = - 1.5

const cube = new THREE.Mesh(
  new THREE.BoxGeometry(0.75, 0.75, 0.75),
  material
)

const torus = new THREE.Mesh(
  new THREE.TorusGeometry(0.3, 0.2, 32, 64),
  material
)
torus.position.x = 1.5

const plane = new THREE.Mesh(
  new THREE.PlaneGeometry(5, 5),
  material
)
plane.rotation.x = - Math.PI * 0.5
plane.position.y = - 0.65

scene.add(sphere, cube, torus, plane)

const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 100)
camera.position.set(0, 2, 5);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(w, h);
const controls = new OrbitControls(camera, renderer.domElement);

function tick() {
  renderer.render(scene, camera);
  controls.update();
  spotLightHelper.update();
  requestAnimationFrame(tick);
}
tick();

onMounted(() => {
  const light = document.getElementById('light');
  light?.append(renderer.domElement);
})
</script>

<style scoped>
</style>
