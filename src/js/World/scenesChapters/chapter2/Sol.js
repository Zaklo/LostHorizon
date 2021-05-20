import { Object3D,MeshDepthMaterial,RGBADepthPacking } from 'three'

export default class Sol {
    constructor(options) {
        // Options
        this.time = options.time
        this.assets = options.assets

        // Set up
        this.container = new Object3D()
        this.container.name = 'Sol'

        this.createSol()
        this.setPosition()
    }

    createSol() {
        this.sol = this.assets.models.chap2.Sol.scene
        this.sol.traverse(n => { if ( n.isMesh ) {
            n.castShadow = false;
            n.receiveShadow = true;
            n.material.depthWrite = !n.material.transparent;
            if(n.material.map) n.material.map.anisotropy = 16;
        }});

        this.container.add(this.sol)
    }

    setPosition() {
        this.sol.rotation.y = Math.PI / -2
        this.sol.position.y = -0.5
        this.sol.position.z = -36.5
    }
}
