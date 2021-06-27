import {Object3D} from 'three'
import MooveCamera from "../../../Tools/MooveCamera";
import gsap from "gsap";

export default class BG {
    constructor(options) {
        // Options
        this.time = options.time
        this.assets = options.assets
        this.wheel = new MooveCamera()

        // Set up
        this.container = new Object3D()
        this.container.name = 'bg'

        this.createBG()
        this.setPosition()

      this.wheel.on('keydown', () => {
        this.MoveBg()
      })
    }

    createBG() {
        this.bg = this.assets.models.chap1.BG.scene
        this.container.add(this.bg)
    }

    setPosition() {
        this.bg.scale.x = 2.2
        this.bg.scale.y = 2.2
        this.bg.scale.z = 2.2
        this.bg.position.x = 7
        this.bg.rotation.y = Math.PI / -2
        this.bg.position.y = -0.5
        this.bg.position.z = -56.4
    }

    MoveBg(){
      gsap.timeline().to(this.bg.position ,{x: this.bg.position.x + this.wheel.getDelta()})
    }
}
