import {Object3D, BoxGeometry, Mesh, MeshBasicMaterial} from 'three'

export default class TestCube {
    constructor(options) {
        // Options
        this.time = options.time
        this.assets = options.assets

        // Set up
        this.container = new Object3D()
        this.container.name = 'cube'

        this.createCube()
        this.setPosition()
    }

    createCube() {
        const geometry = new BoxGeometry( 1, 1, 1 );
        const material = new MeshBasicMaterial( {color: 0x00ff00} );
        this.cube = new Mesh( geometry, material );
        this.cube.castShadow = true; //default is false
        this.cube.receiveShadow = false; //default
        this.container.add(this.cube)
    }

    setPosition() {
        this.cube.position.x = -1
        this.cube.position.z = -4.4
        this.cube.position.y = 4
    }
}
