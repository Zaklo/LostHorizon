import {Object3D, MeshDistanceMaterial, TextureLoader, RGBADepthPacking} from 'three'

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
        this.plan2 = this.assets.models.chap1.plan2.scene
        this.container.add(this.plan2)
    }

    setPosition() {
        this.plan2.rotation.y = Math.PI / -2
        this.plan2.position.y = -0.5
        this.plan2.position.z = -50
    }
}
