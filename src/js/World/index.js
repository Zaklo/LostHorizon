import { AxesHelper, Object3D } from 'three'

import AmbientLightSource from './AmbientLight'
import PointLightSource from './PointLight'
import Plan1 from './../World/scenesChapters/chapter2/Plan1'
import Plan2 from './../World/scenesChapters/chapter2/Plan2'
import Plan3 from './../World/scenesChapters/chapter2/Plan3'
import BG from './../World/scenesChapters/chapter2/BG'
import Character from './Character'
import MooveCamera from '../Tools/MooveCamera'
import Sol from "./scenesChapters/chapter2/Sol";

export default class World {
  constructor(options) {
    // Set options
    this.time = options.time
    this.debug = options.debug
    this.assets = options.assets
    this.wheel = new MooveCamera()

    // Set up
    this.container = new Object3D()
    this.container.name = 'World'

    if (this.debug) {
      this.container.add(new AxesHelper(5))
      this.debugFolder = this.debug.addFolder('World')
      this.debugFolder.open()
    }

    this.setLoader()

    this.time.on('tick', () => {
      // this.toggleNDMode()
      this.wheel.on('wheelMove', () => {
        this.MoveCamera()
      })
    })
  }
  init() {
    this.setAmbientLight()
    this.setPointLight()
    this.setPlans()
    this.setChar()
  }
  setLoader() {
    this.loadDiv = document.querySelector('.loadScreen')
    this.loadModels = this.loadDiv.querySelector('.load')
    this.progress = this.loadDiv.querySelector('.progress')

    if (this.assets.total === 0) {
      this.init()
      this.loadDiv.remove()
    } else {
      this.assets.on('ressourceLoad', () => {
        this.progress.style.width = this.loadModels.innerHTML = `${
          Math.floor((this.assets.done / this.assets.total) * 100) +
          Math.floor((1 / this.assets.total) * this.assets.currentPercent)
        }%`
      })

      this.assets.on('ressourcesReady', () => {
        setTimeout(() => {
          this.init()
          this.loadDiv.style.opacity = 0
          setTimeout(() => {
            this.loadDiv.remove()
          }, 550)
        }, 1000)
      })
    }
  }
  setAmbientLight() {
    this.ambientlight = new AmbientLightSource({
      debug: this.debugFolder,
    })
    this.container.add(this.ambientlight.container)
  }
  setPointLight() {
    this.light = new PointLightSource({
      debug: this.debugFolder,
    })
    this.container.add(this.light.container)
  }
  setPlans() {
    this.plan1 = new Plan1({
      time: this.time,
      assets: this.assets,
    })
    this.plan2 = new Plan2({
      time: this.time,
      assets: this.assets,
    })
    this.plan3 = new Plan3({
      time: this.time,
      assets: this.assets,
    })
    this.bg = new BG({
      time: this.time,
      assets: this.assets,
    })
    this.sol = new Sol({
      time: this.time,
      assets: this.assets,
    })
    this.container.add(
      this.plan1.container,
      this.plan2.container,
      this.plan3.container,
      this.bg.container,
      this.sol.container
    )
  }
  setChar() {
    this.character = new Character({
      time: this.time,
      assets: this.assets,
    })
    this.container.add(this.character.container)
  }
  MoveCamera() {
    this.character.perso.position.x += this.wheel.getDelta() * 0.001
  }
}
