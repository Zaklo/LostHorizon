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
        let loader = new TextureLoader();
        let clothTexture = loader.load('./arbre.png');
        clothTexture.anisotropy = 16;

        this.plan2 = this.assets.models.chap2.plan2.scene

        this.plan2.customDistanceMaterial = new MeshDistanceMaterial({
            map: clothTexture,
            alphaTest: 0.5,
        });

        this.plan2.traverse(n => {
            if (n.isMesh) {
                n.castShadow = true;
                n.receiveShadow = false;
                if (n.material.map) n.material.map.anisotropy = 16;
            }
        });

        this.container.add(this.plan2)
    }

    setPosition() {
        this.plan2.rotation.y = Math.PI / -2
        this.plan2.position.y = -0.5
        this.plan2.position.z = -36.5
    }
}
