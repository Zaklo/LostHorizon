import { Object3D, AnimationMixer } from 'three'

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
    this.container.add(this.plan1)
  }

  setMovement() {
    this.time.on('tick', () => {
      let mixer= new AnimationMixer(this.plan1);
      this.plan1.animations.forEach((clip) => {mixer.clipAction(clip).play(); });
    })
  }

  setPosition() {
    // Set camera position
    this.plan1.position.z = 0.35
    this.plan1.position.x = 0
    this.plan1.position.y = -0.39
  }
}
