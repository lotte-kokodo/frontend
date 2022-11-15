(async function() {
  const isArSessionSupported = navigator.xr && navigator.xr.isSessionSupported && await navigator.xr.isSessionSupported("immersive-ar");
  if (isArSessionSupported) {
    window.app.arCouponClickEvent(() => 1, "테스트 쿠폰_김남협 작성", 20, 2, 3,
        50000, 10000,"2022-11-10T00:00:00", "2022-11-20T00:00:00", "2022-11-14T00:00:00");
    document.getElementById("enter-ar").addEventListener("click", window.app.activateXR);
  } else {
    // window.app.arCouponClickEvent(() => 1, "테스트 쿠폰_김남협 작성", 20, 2, 3,
    //     50000, 10000,"2022-11-10T00:00:00", "2022-11-20T00:00:00", "2022-11-14T00:00:00");
    onNoXRDevice();
  }
})();

class sellerApp {
  /*
  버튼 클릭시 아래 부분이 동작한다.
   */
  activateXR = async () => {
    try {
      // Initialize a WebXR session using "immersive-ar".
      //xr.requestSession을 통해 immersive-ar 모드인것을 확인하고 렌더링한다.
      //inmersive-ar을 통해 this.xrSession을 초기화한다.
      // requiredFeatures는 거리를 통해 객체와의 거리를 확인하는 방식을 설정한다.
      this.xrSession = await navigator.xr.requestSession("immersive-ar", {
        requiredFeatures: ['hit-test', 'dom-overlay'],
        domOverlay: { root: document.body }
      });
      this.createXRCanvas();
      await this.onSessionStarted();
    } catch(e) {
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
    this.hitTestSource = await this.xrSession.requestHitTestSource({ space: this.viewerSpace });

    this.xrSession.requestAnimationFrame(this.onXRFrame);

    this.xrSession.addEventListener("select", this.onSelect);
  }

  onSelect = () => {
    if (window.sunflower) {
      const clone = window.sunflower.clone();
      clone.position.copy(this.reticle.position);
      this.scene.add(clone)

      console.log("reticle.position ="  + JSON.stringify(this.reticle.position))

      window.app.arCouponClickEvent(1, "테스트 쿠폰_김남협 작성", 20, 2, 3,
          50000, 10000,"2022-11-10T00:00:00", "2022-11-20T00:00:00", "2022-11-14T00:00:00");

      const shadowMesh = this.scene.children.find(c => c.name === 'shadowMesh');
      shadowMesh.position.y = clone.position.y;
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

  arCouponClickEvent = async (productId, couponName, rate, x, y, z, minPrice, startDate, endDate, regDate) =>{
    await axios.post(url + `/arCoupon/seller/saveCoupon`, {
      "sellerId" : sellerId,
      "productId" : productId,
      "couponName" : couponName,
      "rate" : rate,
      "x" : x,
      "y" : y,
      "z" : z,
      "minPrice" : minPrice,
      "startDate" : startDate,
      "endDate" : endDate,
      "regDate" : regDate
    }).then(function (resp) {
      console.log(resp)
    }).catch(function (error) {
      console.log(error);
    })
  }
};

const url = "http://18.177.67.173:8001/promotion-service";
const sellerId = localStorage.getItem("sellerId");

window.app = new sellerApp();
