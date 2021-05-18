import { Object3D } from 'three'

export default class Plan3 {
  constructor(options) {
    // Options
    this.time = options.time
    this.assets = options.assets

    // Set up
    this.container = new Object3D()
    this.container.name = 'Plan3'

    this.createPlan3()
    this.setPosition()
  }

  createPlan3() {
    this.plan3 = this.assets.models.chap2.plan3.scene
    this.container.add(this.plan3)
  }

  setPosition() {
    // Set camera position
    this.plan3.position.z = -0.1
    this.plan3.position.y = -0.32
    this.plan3.position.x = 2
  }
}
