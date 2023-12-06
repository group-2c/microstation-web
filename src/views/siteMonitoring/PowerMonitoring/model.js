/*
 * @author: zzp
 * @date: 2023-12-04 15:59:27
 * @fileName: model.js
 * @filePath: src/views/siteMonitoring/PowerMonitoring/model.js
 * @description: 模型处理相关
 */
import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js"

class PowerModel {
  mixer
  clock
  renderer
  scene
  camera
  controls
  model

  _animate = () => {
    requestAnimationFrame(this._animate)
    const delta = this.clock.getDelta()
    this.mixer.update(delta)

    this.controls.update()
    this.renderer.render(this.scene, this.camera)
  }

  initModelView = (container, url, callBack) => {
    // Remove old model instance
    container.innerHTML = ''

    this.clock = new THREE.Clock()

    this.renderer = new THREE.WebGLRenderer({ antialias: true })
    this.renderer.setPixelRatio(window.devicePixelRatio)
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    container.appendChild(this.renderer.domElement)

    const pmremGenerator = new THREE.PMREMGenerator(this.renderer)

    this.scene = new THREE.Scene()
    this.scene.background = new THREE.Color(0xbfe3dd)
    this.scene.environment = pmremGenerator.fromScene(new RoomEnvironment(this.renderer), 0.04).texture

    this.camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 100)
    this.camera.position.set(5, 2, 8)

    this.controls = new OrbitControls(this.camera, this.renderer.domElement)
    this.controls.target.set(0, 0.5, 0)
    this.controls.update()
    this.controls.enablePan = false
    this.controls.enableDamping = true

    const manager = new THREE.LoadingManager()
    manager.onLoad = () => {
      callBack && callBack()
    }

    const loader = new GLTFLoader(manager)
    loader.load(url, gltf => {
      console.log(gltf)
      this.model = gltf.scene
      this.model.position.set(1, 1, 0)
      this.scene.add(this.model)

      this.mixer = new THREE.AnimationMixer(this.model)
      // this.mixer.clipAction(gltf.animations[0]).play()

      this._animate()
    })
  }
}

export default PowerModel