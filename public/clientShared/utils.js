window.gltfLoader = new THREE.GLTFLoader();

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
        this.loader.load("https://kokodo.shop/clientShared/scene.gltf", (gltf) => {
        // this.loader.load("https://immersive-web.github.io/webxr-samples/media/gltf/sunflower/sunflower.gltf", (gltf) => {
        // this.loader.load("https://kokodo.shop/test/shared/scene.gltf", (gltf) => {
            // this.loader.load("./scene.gltf", (gltf) => {
            this.add(gltf.scene);
        })

        this.visible = true;
    }
}

//여기서 레온이 파일을 설정해줘야한다.
// window.gltfLoader.load("https://immersive-web.github.io/webxr-samples/media/gltf/sunflower/sunflower.gltf", function(gltf) {
window.gltfLoader.load("https://kokodo.shop/clientShared/scene.gltf", function (gltf) {
// window.gltfLoader.load('./scene.gltf', function(gltf) {
    const flower = gltf.scene.children.find(c => c.name === 'sunflower')
    // flower.castShadow = true;
    window.sunflower = gltf.scene;
});


window.DemoUtils = {
    createLitScene() {
        const scene = new THREE.Scene();
        const light = new THREE.AmbientLight(0xffffff, 1);
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.3);
        directionalLight.position.set(10, 15, 10);

        directionalLight.castShadow = true;

        const planeGeometry = new THREE.PlaneGeometry(2000, 2000);
        planeGeometry.rotateX(-Math.PI / 2);

        const shadowMesh = new THREE.Mesh(planeGeometry, new THREE.ShadowMaterial({
            color: 0x111111,
            opacity: 0.2,
        }));

        shadowMesh.name = 'shadowMesh';
        shadowMesh.receiveShadow = true;
        shadowMesh.position.y = 10000;

        scene.add(shadowMesh);
        scene.add(light);
        scene.add(directionalLight);

        if (navigator.geolocation) { // GPS를 지원하면
            navigator.geolocation.getCurrentPosition(function (position) {
                console.log(position.coords.latitude + ' ' + position.coords.longitude + ' ' + position.coords.altitude);
            }, function (error) {
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
        console.log("util.js" + couponArr.length)

        for (var i = 0; i < couponArr.length; i++) {
            const bellygom = new Bellygom();
            bellygom.position.x = couponArr[i].xpos;
            bellygom.position.y = couponArr[i].ypos;
            bellygom.position.z = couponArr[i].zpos;
            console.log("내가 설치한 벨리곰 위치" + JSON.stringify(bellygom.position));
            scene.add(bellygom);
        }

        return scene;
    }
};

function onNoXRDevice() {
    document.body.classList.add('unsupported');
}