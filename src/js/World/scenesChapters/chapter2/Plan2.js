import { Object3D } from 'three'

export default class Plan2 {
  constructor(options) {
    // Options
    this.time = options.time
    this.assets = options.assets

    // Set up
    this.container = new Object3D()
    this.container.name = 'Plan2'

    this.createPlan2()
    this.setPosition()
  }

  createPlan2() {
    this.plan2 = this.assets.models.chap2.plan2.scene
    this.container.add(this.plan2)
  }

  setMovement() {
    this.time.on('tick', () => {
      this.plan2.rotation.y += 0.005
    })
  }

  setPosition() {
    // Set camera position
    this.plan2.position.y = -0.35
    this.plan2.position.x = 2
  }
}
