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
    this.perso.traverse(n => { if ( n.isMesh ) {
      n.castShadow = true;
      n.receiveShadow = true;
      if(n.material.map) n.material.map.anisotropy = 16;
    }});
    this.container.add(this.perso)
  }

  setPosition() {
    // Set camera position
    this.perso.position.y = -0.40
    this.perso.position.z = 1
    this.perso.scale.x = 0.14
    this.perso.scale.y = 0.14
    this.perso.scale.z = 0.14
    this.perso.rotation.y = 2
    this.perso.position.x = -3
  }
}
