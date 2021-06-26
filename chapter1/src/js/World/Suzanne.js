import { Object3D } from 'three'

export default class Suzanne {
  constructor(options) {
    // Options
    this.time = options.time
    this.assets = options.assets

    // Set up
    this.container = new Object3D()
    this.container.name = 'Suzanne'

    this.createSuzanne()
    this.setPosition()
  }
  createSuzanne() {
    this.suzanne = this.assets.models.suzanne.scene
    this.container.add(this.suzanne)
  }
  setMovement() {
    this.time.on('tick', () => {
      this.suzanne.rotation.y += 0.005
    })
  }
  setPosition() {
    // Set camera position
    this.suzanne.scale.x = 2
    this.suzanne.position.x = 2
  }
}
