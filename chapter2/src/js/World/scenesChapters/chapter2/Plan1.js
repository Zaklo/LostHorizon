import {Object3D} from 'three'
import gsap from "gsap";
import MooveCamera from "../../../Tools/MooveCamera";

export default class Plan1 {
  constructor(options) {
    // Options
    this.time = options.time
    this.assets = options.assets
    this.wheel = new MooveCamera()
    // Set up
    this.container = new Object3D()
    this.container.name = 'Plan1'

    this.createPlan1()
    this.setPosition()

    this.wheel.on('keydown', () => {
      //this.Move()
    })
  }

  createPlan1() {
    this.plan1 = this.assets.models.chap2.plan1.scene
    this.container.add(this.plan1)
  }

  setPosition() {
    this.plan1.rotation.y = Math.PI / -2
    this.plan1.position.y = -0.5
    this.plan1.position.z = -36.5
  }

  Move(){
    gsap.timeline().to(this.plan1.position ,{x: this.plan1.position.x - this.wheel.getDelta() * .5})
  }
}
