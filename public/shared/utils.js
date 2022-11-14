/*
 * Copyright 2017 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
// import React, {useContext, useState} from "react"
// import axios from "axios";
// import {ServerConfigContext} from "../../../../src/context/serverConfigProvider";

window.gltfLoader = new THREE.GLTFLoader();
/**
 * The Reticle class creates an object that repeatedly calls
 * `xrSession.requestHitTest()` to render a ring along a found
 * horizontal surface.
 */
class Reticle extends THREE.Object3D {
  constructor() {
    super();

    this.loader = new THREE.GLTFLoader();
    this.loader.load("https://immersive-web.github.io/webxr-samples/media/gltf/reticle/reticle.gltf", (gltf) => {
      this.add(gltf.scene);
    })

    this.visible = false;
  }
}

class Bellygom extends THREE.Object3D {
  constructor() {
    super();

    this.loader = new THREE.GLTFLoader();
    // this.loader.load("https://immersive-web.github.io/webxr-samples/media/gltf/sunflower/sunflower.gltf", (gltf) => {
    this.loader.load("https://kokodo.shop/test/shared/scene.gltf", (gltf) => {
    // this.loader.load("./scene.gltf", (gltf) => {
      this.add(gltf.scene);
    })

    this.visible = true;
  }
}

//여기서 레온이 파일을 설정해줘야한다, 개멍청하네 진짜 URL 경로로만 쳐 받는게 말이되나
// window.gltfLoader.load("https://immersive-web.github.io/webxr-samples/media/gltf/sunflower/sunflower.gltf", function(gltf) {
window.gltfLoader.load("https://kokodo.shop/test/shared/scene.gltf", function(gltf) {
// window.gltfLoader.load('./scene.gltf', function(gltf) {
  const flower = gltf.scene.children.find(c => c.name === 'sunflower')
  // flower.castShadow = true;
  window.sunflower = gltf.scene;
});


window.DemoUtils = {
  /**
   * Creates a THREE.Scene containing lights that case shadows,
   * and a mesh that will receive shadows.
   *
   * @return {THREE.Scene}
   */
  createLitScene() {
    const scene = new THREE.Scene();
    // The materials will render as a black mesh
    // without lights in our scenes. Let's add an ambient light
    // so our material can be visible, as well as a directional light
    // for the shadow.
    const light = new THREE.AmbientLight(0xffffff, 1);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.3);
    directionalLight.position.set(10, 15, 10);

    // We want this light to cast shadow.
    directionalLight.castShadow = true;

    // Make a large plane to receive our shadows
    const planeGeometry = new THREE.PlaneGeometry(2000, 2000);
    // Rotate our plane to be parallel to the floor
    planeGeometry.rotateX(-Math.PI / 2);

    // Create a mesh with a shadow material, resulting in a mesh
    // that only renders shadows once we flip the `receiveShadow` property.
    const shadowMesh = new THREE.Mesh(planeGeometry, new THREE.ShadowMaterial({
      color: 0x111111,
      opacity: 0.2,
    }));

    // Give it a name so we can reference it later, and set `receiveShadow`
    // to true so that it can render our model's shadow.
    shadowMesh.name = 'shadowMesh';
    shadowMesh.receiveShadow = true;
    shadowMesh.position.y = 10000;

    // Add lights and shadow material to scene.
    scene.add(shadowMesh);
    scene.add(light);
    scene.add(directionalLight);

    const materials = [
      new THREE.MeshBasicMaterial({ color: 0xff0000 }),
      new THREE.MeshBasicMaterial({ color: 0x0000ff }),
      new THREE.MeshBasicMaterial({ color: 0x00ff00 }),
      new THREE.MeshBasicMaterial({ color: 0xff00ff }),
      new THREE.MeshBasicMaterial({ color: 0x00ffff }),
      new THREE.MeshBasicMaterial({ color: 0xffff00 })
    ];

    // const ROW_COUNT = 4;
    // const SPREAD = 1;
    // const HALF = ROW_COUNT / 2;
    // for (let i = 0; i < ROW_COUNT; i++) {
    //   for (let j = 0; j < ROW_COUNT; j++) {
    //     for (let k = 0; k < ROW_COUNT; k++) {
    //       //박스 사이의 경계선
    //       const box = new THREE.Mesh(new THREE.BoxBufferGeometry(0.2, 0.2, 0.2), materials);
    //       box.position.set(i - HALF, j - HALF, k - HALF);
    //       box.position.multiplyScalar(SPREAD);
    //       console.log("box = " + JSON.stringify(box));
    //       console.log("box.position = " + JSON.stringify(box.position));
    //       console.log("box.position.multiplyScalar = " + JSON.stringify(box.position.multiplyScalar));
    //       scene.add(box);
    //     }
    //   }
    // }

    if (navigator.geolocation) { // GPS를 지원하면
      navigator.geolocation.getCurrentPosition(function(position) {
        console.log(position.coords.latitude + ' ' + position.coords.longitude + ' ' + position.coords.altitude);
      }, function(error) {
        console.error(error);
      }, {
        enableHighAccuracy: false,
        maximumAge: 0,
        timeout: Infinity
      });
    } else {
      console('GPS를 지원하지 않습니다');
    }

      const bellygom = new Bellygom();
      bellygom.position.x = -0.4142801761627197;
      bellygom.position.y = -0.3452070355415344;
      bellygom.position.z = -1.8569954633712769;
      console.log("내가 설치한 벨리곰 위치" + JSON.stringify(bellygom.position));
      scene.add(bellygom);

    // for(var i = 0; i < couponPos.length; i++) {
    //   const bellygom = new Bellygom();
    //   bellygom.position.x = couponPos.x;
    //   bellygom.position.y = couponPos.y;
    //   bellygom.position.z = couponPos.z;
    //   console.log("내가 설치한 벨리곰 위치" + JSON.stringify(bellygom.position));
    //   scene.add(bellygom);
    // }

    return scene;
  }
};

/**
 * Toggle on a class on the page to disable the "Enter AR"
 * button and display the unsupported browser message.
 */
function onNoXRDevice() {
  document.body.classList.add('unsupported');
}

// const [couponPos, setCouponPos] = useState([]);
// const { url } = useContext(ServerConfigContext);
// const clientId = localStorage.getItem("clientId");
//
// const arCouponPos = async () =>{
//   await axios.get(url + `/calculate-service/arCoupon/client/searchCoupon`, {})
//       .then(function (resp) {
//         setCouponPos(resp.data.result.data.couponPos);
//       })
//       .catch(function (error) {
//         console.log(error);
//       })
// }