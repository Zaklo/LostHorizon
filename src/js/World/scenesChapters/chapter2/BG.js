import { Object3D } from 'three'

export default class BG {
  constructor(options) {
    // Options
    this.time = options.time
    this.assets = options.assets

    // Set up
    this.container = new Object3D()
    this.container.name = 'bg'

    this.createBG()
    this.setPosition()
  }

  createBG() {
    this.bg = this.assets.models.chap2.BG.scene
    this.container.add(this.bg)
  }

  setMovement() {
    this.time.on('tick', () => {
      this.bg.rotation.y += 0.005
    })
  }

  setPosition() {
    // Set camera position
    this.bg.position.y = -1
    this.bg.scale.x = 2
    this.bg.scale.y = 2
    this.bg.position.x = 8
  }
}
