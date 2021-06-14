import {BasicShadowMap, CatmullRomCurve3, Clock, FogExp2, Scene, sRGBEncoding, Vector3, WebGLRenderer} from 'three'
import * as dat from 'dat.gui'
import MooveCamera from './Tools/MooveCamera'

import Sizes from '@tools/Sizes'
import Time from '@tools/Time'
import Assets from '@tools/Loader'

import Camera from './Camera'
import World from '@world/index'

export default class App {
  constructor(options) {
    // Set options
    this.canvas = options.canvas

    // Set up
    this.time = new Time()
    this.sizes = new Sizes()
    this.assets = new Assets()
    this.wheel = new MooveCamera()
    this.percentage = 0;
    let points = [
      [-25.086929321289062, 4.557759761810303, -1.752099633216858],
      [-17.81485939025879, 4.113916873931885, -2.0287508964538574],
      [-12.873396873474121, 4.113916873931885, -2.323667287826538],
      [-9.353116035461426, 4.113916397094727, -1.8804125785827637],
      [-3.658903121948242, 4.113916397094727, -2.53462553024292],
      [-0.22402030229568481, 3.322291612625122, -3.225576162338257],
      [-2.9920358657836914, 4.795302867889404, -2.5323925018310547],
      [3.5579428672790527, 4.8221116065979, -2.220460891723633],
      [8.82685661315918, 4.773304462432861, -2.31036639213562],
      [14.132623672485352, 6.751862049102783, -0.8459522724151611],
      [18.582887649536133, 7.485363006591797, 1.924562692642212],
      [21.664758682250977, 7.478051662445068, 4.002956867218018],
      [24.122623443603516, 7.83150053024292, 4.5962982177734375],
      [21.84029197692871, 6.959893226623535, 3.8982350826263428],
      [18.73647689819336, 7.275397777557373, 1.9779555797576904],
      [14.206768035888672, 6.136593818664551, -1.0336993932724],
      [14.352560043334961, 3.6339423656463623, -2.248628616333008],
      [18.412771224975586, 2.3622260093688965, -2.142258405685425],
      [26.667251586914062, 2.3622257709503174, -2.142258405685425],
      [30.812881469726562, 4.442076683044434, -1.2122597694396973],
      [34.07444763183594, 5.485990047454834, 0.2866070866584778],
      [37.41644287109375, 5.485990047454834, 1.596125841140747],
      [39.8670539855957, 5.485990047454834, 2.5169894695281982],
    ];
//========== scale the curve to make it as large as you want
    //let scale = 5;
//========== Convert the array of points into vertices (in Blender the z axis is UP so we swap the z and y)
    for (let i = 0; i < points.length; i++) {
      let x = points[i][0] + 10;
      let y = points[i][1] - 4.7;
      let z = points[i][2] + 0.1;
      points[i] = new Vector3(x, z, -y);
    }

//========== Create a path from the points
    this.curvePath = new CatmullRomCurve3(points);

    this.setConfig()
    this.setRenderer()
    this.setCamera()
    this.setWorld()
  }
  setRenderer() {
    // Set scene
    this.scene = new Scene()
    this.scene.fog = new FogExp2(0xFFFFFF, 0.07);
    // Set renderer
    this.renderer = new WebGLRenderer({
      canvas: this.canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    })
    this.renderer.outputEncoding = sRGBEncoding
    this.renderer.gammaFactor = 2.2
    // Set background color
    this.renderer.setClearColor(0x212121, 1)
    // Set renderer pixel ratio & sizes
    this.renderer.setPixelRatio(window.devicePixelRatio)
    this.renderer.setSize(this.sizes.viewport.width, this.sizes.viewport.height)

    this.renderer.shadowMap.enabled = true
    this.renderer.shadowMap.type = BasicShadowMap
    // Resize renderer on resize event
    this.sizes.on('resize', () => {
      this.renderer.setSize(
        this.sizes.viewport.width,
        this.sizes.viewport.height
      )
    })

    this.time.on('tick', () => {
      this.renderer.render(this.scene, this.camera.camera)
      // this.toggleNDMode()
      this.wheel.on('keydown', () => {
        this.MoveCamera()
      })
    })
    // Set RequestAnimationFrame with 60fps
    this.time.on('tick', () => {
      // When tab is not visible (tab is not active or window is minimized), browser stops requesting animation frames. Thus, this does not work
      // if the window is only in the background without focus (for example, if you select another window without minimizing the browser one),
      // which might cause some performance or batteries issues when testing on multiple browsers
      if (!(this.renderOnBlur?.activated && !document.hasFocus())) {
        this.renderer.render(this.scene, this.camera.camera)
      }
    })

    if (this.debug) {
      this.renderOnBlur = { activated: true }
      const folder = this.debug.addFolder('Renderer')
      folder.open()
      folder.add(this.renderOnBlur, 'activated').name('Render on window blur')
    }
  }
  setCamera() {
    // Create camera instance
    this.camera = new Camera({
      sizes: this.sizes,
      renderer: this.renderer,
      debug: this.debug,
    })
    // Add camera to scene
    this.scene.add(this.camera.container)
  }
  setWorld() {
    // Create world instance
    this.world = new World({
      time: this.time,
      debug: this.debug,
      assets: this.assets,
    })
    // Add world to scene
    this.scene.add(this.world.container)
  }
  setConfig() {
    if (window.location.hash === '#debug') {
      this.debug = new dat.GUI({ width: 450 })
    }
  }

  MoveCamera() {
    this.percentage += 0.0095 * this.wheel.getDelta();
    let p1 = this.curvePath.getPointAt(this.percentage % 1);
    let p2 = this.curvePath.getPointAt((this.percentage + 0.01) % 1);

    this.camera.camera.position.x  = p1.x;
    this.camera.camera.position.y  = p1.y + 2.5;

    this.camera.camera.updateProjectionMatrix();
  }


}
