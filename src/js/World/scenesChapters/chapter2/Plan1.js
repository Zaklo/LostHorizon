import {Object3D, AnimationMixer, Mesh, MeshBasicMaterial} from 'three'

export default class Plan1 {
  constructor(options) {
    // Options
    this.time = options.time
    this.assets = options.assets

    // Set up
    this.container = new Object3D()
    this.container.name = 'Plan1'

    this.createPlan1()
    this.setPosition()
  }

  createPlan1() {
    this.plan1 = this.assets.models.chap2.plan1.scene
    this.plan1.traverse(n => { if ( n.isMesh ) {
      n.castShadow = true;
      n.receiveShadow = true;
      if(n.material.map) n.material.map.anisotropy = 16;
    }});
    this.container.add(this.plan1)
  }

  setPosition() {
    // Set camera position
    this.plan1.rotation.y = Math.PI / -2
    this.plan1.position.y = -0.5
    this.plan1.position.z = -36.5
  }
}
