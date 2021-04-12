import { Object3D } from 'three'

export default class Sol {
  constructor(options) {
    // Options
    this.time = options.time
    this.assets = options.assets

    // Set up
    this.container = new Object3D()
    this.container.name = 'sol'

    this.createSol()
    this.setPosition()
  }

  createSol() {
    this.sol = this.assets.models.chap2.sol.scene
    this.container.add(this.sol)
  }

  setMovement() {
    this.time.on('tick', () => {
      this.sol.rotation.y += 0.005
    })
  }

  setPosition() {
    // Set camera position
    this.sol.position.y = -0.42
    this.sol.position.x = 2
  }
}
