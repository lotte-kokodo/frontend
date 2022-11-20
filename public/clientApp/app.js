(async function () {
    const isArSessionSupported = navigator.xr && navigator.xr.isSessionSupported && await navigator.xr.isSessionSupported("immersive-ar");
    if (isArSessionSupported) {
        document.getElementById("enter-ar").addEventListener("click", window.app.activateXR)
        arCouponPos();
    } else {
        arCouponPos();
        // arCouponFindEvent(16);
        onNoXRDevice();
    }
})();

let couponArr = new Array();
class App {
    activateXR = async () => {
        try {
            this.xrSession = await navigator.xr.requestSession("immersive-ar", {
                requiredFeatures: ['hit-test', 'dom-overlay'],
                domOverlay: {root: document.body}
            });
            this.createXRCanvas();
            await this.onSessionStarted();
        } catch (e) {
            console.log(e);
            onNoXRDevice();
        }
    }

    createXRCanvas() {
        this.canvas = document.createElement("canvas");
        document.body.appendChild(this.canvas);
        this.gl = this.canvas.getContext("webgl", {xrCompatible: true});

        this.xrSession.updateRenderState({
            baseLayer: new XRWebGLLayer(this.xrSession, this.gl)
        });
    }

    onSessionStarted = async () => {
        document.body.classList.add('ar');
        this.setupThreeJs();
        this.localReferenceSpace = await this.xrSession.requestReferenceSpace('local');
        this.viewerSpace = await this.xrSession.requestReferenceSpace('viewer');
        this.hitTestSource = await this.xrSession.requestHitTestSource({space: this.viewerSpace});
        this.xrSession.requestAnimationFrame(this.onXRFrame);
        this.xrSession.addEventListener("select", this.onSelect);
    }

    /** Place a sunflower when the screen is tapped. */
    onSelect = () => {
        console.log(couponArr)
        console.log(couponArr[0].xpos)
        for (var idx = 0; idx < couponArr.length; idx++) {
            var xleft = couponArr[idx].xpos - (couponArr[idx].xpos / 2);
            var xright = couponArr[idx].xpos + (couponArr[idx].xpos / 2);
            if (xleft > xright) {
                [xleft, xright] = [xright, xleft]
            }
            var yleft = couponArr[idx].ypos - (couponArr[idx].ypos / 2);
            var yright = couponArr[idx].ypos + (couponArr[idx].ypos / 2);
            if (yleft > yright) {
                [yleft, yright] = [yright, yleft]
            }
            var zleft = couponArr[idx].zpos - (couponArr[idx].zpos / 2);
            var zright = couponArr[idx].zpos + (couponArr[idx].zpos / 2);
            if (zleft > zright) {
                [zleft, zright] = [zright, zleft]
            }

            console.log("xleft = " + xleft + " xright" + xright);
            console.log("yleft = " + yleft + " yright" + yright);
            console.log("zleft = " + zleft + " zright" + zright);
            if (this.reticle.position.x >= xleft && this.reticle.position.x <= xright) {
                console.log("1 단계")
                // if (this.reticle.position.z >= zleft && this.reticle.position.z <= zright) {
                arCouponFindEvent(couponArr[idx].rateCoupon.id);
                alert("시바를 잡으셨습니다!")
                // }
            }
        }
    }

    onXRFrame = (time, frame) => {
        this.xrSession.requestAnimationFrame(this.onXRFrame);

        const framebuffer = this.xrSession.renderState.baseLayer.framebuffer
        this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, framebuffer)
        this.renderer.setFramebuffer(framebuffer);

        const pose = frame.getViewerPose(this.localReferenceSpace);
        if (pose) {
            const view = pose.views[0];

            const viewport = this.xrSession.renderState.baseLayer.getViewport(view);
            this.renderer.setSize(viewport.width, viewport.height)

            this.camera.matrix.fromArray(view.transform.matrix)
            this.camera.projectionMatrix.fromArray(view.projectionMatrix);

            this.camera.updateMatrixWorld(true);

            const hitTestResults = frame.getHitTestResults(this.hitTestSource);

            if (!this.stabilized && hitTestResults.length > 0) {
                this.stabilized = true;
                document.body.classList.add('stabilized');
            }
            if (hitTestResults.length > 0) {
                const hitPose = hitTestResults[0].getPose(this.localReferenceSpace);
                this.reticle.visible = true;
                this.reticle.position.set(hitPose.transform.position.x, hitPose.transform.position.y, hitPose.transform.position.z)
                this.reticle.updateMatrixWorld(true);
            }

            this.renderer.render(this.scene, this.camera)
        }
    }

    setupThreeJs() {
        this.renderer = new THREE.WebGLRenderer({
            alpha: true,
            preserveDrawingBuffer: true,
            canvas: this.canvas,
            context: this.gl
        });
        this.renderer.autoClear = false;
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

        this.scene = DemoUtils.createLitScene();

        this.reticle = new Reticle();
        this.scene.add(this.reticle);

        this.camera = new THREE.PerspectiveCamera();
        this.camera.matrixAutoUpdate = false;
    }
};

const url = "https://api.kokodo.shop/promotion-service/"
// const url = "http://18.177.67.173:8001/promotion-service/"
// const url = "http://localhost:8001/promotion-service/"
const clientId = localStorage.getItem("clientId");

const arCouponPos = async () => {
    await axios.get(url + `arCoupon/client/searchCoupon`, {})
        .then(function (resp) {
            couponArr = resp.data.result.data
            console.log(resp)
            console.log(couponArr)
            console.log(couponArr[0].xpos)
            console.log(couponArr[0].rateCoupon.id)
        })
        .catch(function (error) {
            console.log(error);
        })
}

const arCouponFindEvent = async (couponId) => {
    await axios.post(url + `arCoupon/client/arFindEvent`, {
        "clientId" : clientId,
        "couponId" : couponId
    }).then(function (resp) {
    }).catch(function (error) {
        console.log(error);
    })
}
window.app = new App();


// /*
//  * 이곳에서 AR을 사용할 수 있는지 없는지 판단한다.
//  * navigator.xr : 기계가 호환이 가능할 경우 True값을 반환한다.
//  * onNoXRDevice(): XR 세션은 만든 이후 동작한다. isArsessionSupported가 False 값이 반환 될경우  onNoXRDevice()가 동작하면서 Device의 AR을 지원하는 Resource가 부족할 시 자원이 부족하다는 메시지를 반환한다.
//  */
// // const parse = require('axios');
// // import React from "react"
// // import axios from "axios";
// // import {useContext, useState} from "react";
// // import {ServerConfigContext} from "../../../src/context/serverConfigProvider";
//
// (async function () {
//     const isArSessionSupported = navigator.xr && navigator.xr.isSessionSupported && await navigator.xr.isSessionSupported("immersive-ar");
//     console.log("Error Check Point 0");
//     if (isArSessionSupported) {
//         arCouponPos();
//         console.log("Error Check Point 01");
//         document.getElementById("enter-ar").addEventListener("click", window.app.activateXR)
//         // window.app.arCouponPos();
//     } else {
//         arCouponPos();
//         // window.app.arCouponPos();
//         console.log("Error Check Point 02");
//         onNoXRDevice();
//     }
// })();
//
// let arCouponPosArray = new Array();
// class App {
//     /*
//     버튼 클릭시 아래 부분이 동작한다.
//      */
//     activateXR = async () => {
//         try {
//             this.xrSession = await navigator.xr.requestSession("immersive-ar", {
//                 requiredFeatures: ['hit-test', 'dom-overlay'],
//                 domOverlay: {root: document.body}
//             });
//             this.createXRCanvas();
//             await this.onSessionStarted();
//         } catch (e) {
//             console.log(e);
//             onNoXRDevice();
//         }
//     }
//
//     createXRCanvas() {
//         this.canvas = document.createElement("canvas");
//         document.body.appendChild(this.canvas);
//         this.gl = this.canvas.getContext("webgl", {xrCompatible: true});
//
//         this.xrSession.updateRenderState({
//             baseLayer: new XRWebGLLayer(this.xrSession, this.gl)
//         });
//     }
//
//     onSessionStarted = async () => {
//         document.body.classList.add('ar');
//         this.setupThreeJs();
//         this.localReferenceSpace = await this.xrSession.requestReferenceSpace('local');
//         this.viewerSpace = await this.xrSession.requestReferenceSpace('viewer');
//         this.hitTestSource = await this.xrSession.requestHitTestSource({space: this.viewerSpace});
//         this.xrSession.requestAnimationFrame(this.onXRFrame);
//         this.xrSession.addEventListener("select", this.onSelect);
//     }
//
//     onSelect = () => {
//         // this.arCouponPos()
//
//         var xleft = -0.4142801761627197 - (-0.4142801761627197 / 1.5);
//         var xright = -0.4142801761627197 + (-0.4142801761627197 / 1.5);
//         if (xleft > xright) {
//             [xleft, xright] = [xright, xleft]
//         }
//         var yleft = -0.3452070355415344 - (-0.3452070355415344 / 1.5);
//         var yright = -0.3452070355415344 + (-0.3452070355415344 / 1.5);
//         if (yleft > yright) {
//             [yleft, yright] = [yright, yleft]
//         }
//         var zleft = -1.8569954633712769 - (-1.8569954633712769 / 1.5);
//         var zright = -1.8569954633712769 + (-1.8569954633712769 / 1.5);
//         if (zleft > zright) {
//             [zleft, zright] = [zright, zleft]
//         }
//         console.log("xleft = " + xleft + " xright" + xright);
//         console.log("yleft = " + yleft + " yright" + yright);
//         console.log("zleft = " + zleft + " zright" + zright);
//         if (this.reticle.position.x >= xleft && this.reticle.position.x <= xright) {
//             console.log("1 단계")
//             if (this.reticle.position.z >= zleft && this.reticle.position.z <= zright) {
//                 // alert("click 성공" + arCouponFindEvent())
//                 alert("click 성공")
//             }
//         }
//
//         // arCouponFindEvent();
//         //================================================
//         // for(var idx = 0; idx < couponPos.length; idx++) {
//         //   var xleft = couponPos[idx].xPos - (couponPos[idx].xPos / 1.5);
//         //   var xright = couponPos[idx].xPos + (couponPos[idx].xPos / 1.5);
//         //   if (xleft > xright) {
//         //     [xleft, xright] = [xright, xleft]
//         //   }
//         //   var yleft =  couponPos[idx].yPos - (couponPos[idx].yPos / 1.5);
//         //   var yright = couponPos[idx].yPos + (couponPos[idx].yPos / 1.5);
//         //   if (yleft > yright) {
//         //     [yleft, yright] = [yright, yleft]
//         //   }
//         //   var zleft = couponPos[idx].zPos - (couponPos[idx].zPos / 1.5);
//         //   var zright = couponPos[idx].zPos + (couponPos[idx].yPos / 1.5);
//         //   if (zleft > zright) {
//         //     [zleft, zright] = [zright, zleft]
//         //   }
//         //
//         //   console.log("xleft = " + xleft + " xright" + xright);
//         //   console.log("yleft = " + yleft + " yright" + yright);
//         //   console.log("zleft = " + zleft + " zright" + zright);
//         //   if (this.reticle.position.x >= xleft && this.reticle.position.x <= xright) {
//         //     console.log("1 단계")
//         //     // if (this.reticle.position.y >= yleft && this.reticle.position.y <= yright) {
//         //     console.log("2 단계")
//         //     if (this.reticle.position.z >= zleft && this.reticle.position.z <= zright) {
//         //       arCouponFindEvent();
//         //       alert("시바를 잡으셨습니다!")
//         //     }
//         //     // }
//         //   }
//         // }
//     }
//
//     onXRFrame = (time, frame) => {
//         this.xrSession.requestAnimationFrame(this.onXRFrame);
//         const framebuffer = this.xrSession.renderState.baseLayer.framebuffer
//         this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, framebuffer)
//         this.renderer.setFramebuffer(framebuffer);
//         const pose = frame.getViewerPose(this.localReferenceSpace);
//         if (pose) {
//             const view = pose.views[0];
//             const viewport = this.xrSession.renderState.baseLayer.getViewport(view);
//             this.renderer.setSize(viewport.width, viewport.height)
//             this.camera.matrix.fromArray(view.transform.matrix)
//             this.camera.projectionMatrix.fromArray(view.projectionMatrix);
//             this.camera.updateMatrixWorld(true);
//             const hitTestResults = frame.getHitTestResults(this.hitTestSource);
//
//             if (!this.stabilized && hitTestResults.length > 0) {
//                 this.stabilized = true;
//                 document.body.classList.add('stabilized');
//             }
//
//             if (hitTestResults.length > 0) {
//                 const hitPose = hitTestResults[0].getPose(this.localReferenceSpace);
//                 this.reticle.visible = true;
//                 this.reticle.position.set(hitPose.transform.position.x, hitPose.transform.position.y, hitPose.transform.position.z)
//                 this.reticle.updateMatrixWorld(true);
//             }
//             this.renderer.render(this.scene, this.camera)
//         }
//     }
//
//     setupThreeJs() {
//         this.renderer = new THREE.WebGLRenderer({
//             alpha: true,
//             preserveDrawingBuffer: true,
//             canvas: this.canvas,
//             context: this.gl
//         });
//         this.renderer.autoClear = false;
//         this.renderer.shadowMap.enabled = true;
//         this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
//
//         this.scene = DemoUtils.createLitScene();
//
//         this.reticle = new Reticle();
//         this.scene.add(this.reticle);
//
//         this.camera = new THREE.PerspectiveCamera();
//         this.camera.matrixAutoUpdate = false;
//     }
//
//     arCouponPos = async () => {
//         // const url = "http://localhost:8123/arCoupon/client/searchCoupon";
//         await axios.get('http://localhost:8123/arCoupon/client/searchCoupon',{})
//             .then(function (resp) {
//                 console.log(resp)
//                 // arCouponPosArray = resp.data.result.data.couponPos
//                 // setCouponPos(resp.data.result.data.couponPos);
//             })
//             .catch(function (error) {
//                 console.log(error);
//             })
//     }
// };
//
// const arCouponPos = async () => {
//     await axios.get(`http://localhost:8123/arCoupon/client/searchCoupon`, {})
//         .then(function (resp) {
//             console.log(resp)
//             // arCouponPosArray() = resp.data.result.data.couponPos
//             // setCouponPos(resp.data.result.data.couponPos);
//         })
//         .catch(function (error) {
//             console.log(error);
//         })
// }
//
// // console.log("arCouponPos" + JSON.stringify(arCouponPosArray));
//
// // const [couponPos, setCouponPos] = useState([]);
// // const { url } = useContext(ServerConfigContext);
// // const clientId = localStorage.getItem("memberId");
//
// // const arCouponFindEvent = async () => {
// //     await axios.post(url + `/promotion-service/arCoupon/client/arFindEvent/${clientId}`, {
// //         "clientId": clientId
// //         //쿠폰의 좌표 정보가 추가적으로 필요
// //     }).then(function (resp) {
// //         // setCouponPos(resp.data.result.data.couponPos);
// //     }).catch(function (error) {
// //         console.log(error);
// //     })
// // }
//
// window.app = new App();
