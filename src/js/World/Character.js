import { Object3D } from 'three'

export default class Character {
  constructor(options) {
    // Options
    this.time = options.time
    this.assets = options.assets

    // Set up
    this.container = new Object3D()
    this.container.name = 'perso'

    this.createCharacter()
    this.setPosition()
  }

  createCharacter() {
    this.perso = this.assets.models.perso.scene
    this.container.add(this.perso)
  }

  setPosition() {
    // Set camera position
    this.perso.position.y = -0.44
    this.perso.position.x = 6.5
  }
}
