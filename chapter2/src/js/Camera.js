import {Object3D, PerspectiveCamera} from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import MooveCamera from "./Tools/MooveCamera";
import gsap from 'gsap';
import splineChap2 from "./World/scenesChapters/chapter2/splineChap2";

let points = splineChap2
export default class Camera {
    constructor(options) {
        // Set Options
        this.sizes = options.sizes
        this.renderer = options.renderer
        this.debug = options.debug
        this.addPercentage = 0.0080
        this.wheel = new MooveCamera()
        this.percentage = 0;

//========== Create a path from the points
        this.curvePath = splineChap2()

        // Set up
        this.container = new Object3D()
        this.container.name = 'Camera'

        this.setCamera()
        this.setPosition()
        //this.setOrbitControls()
    }

    stopMove() {
        this.addPercentage = 0
        setTimeout(() => {
            this.addPercentage = 0.008
        }, 2000)
    }

    setCamera() {
        // Create camera
        this.camera = new PerspectiveCamera(
            55,
            this.sizes.viewport.width / this.sizes.viewport.height,
            0.1,
            100
        )
        this.container.add(this.camera)
        // Change camera aspect on resize
        this.sizes.on('resize', () => {
            this.camera.aspect =
                this.sizes.viewport.width / this.sizes.viewport.height
            // Call this method because of the above change
            this.camera.updateProjectionMatrix()
        })

        // this.toggleNDMode()
        this.wheel.on('keydown', () => {
            this.MoveCamera()
        })
    }

    setPosition() {
        // Set camera position
        let p1 = this.curvePath.getPointAt(this.percentage % 1);
        this.camera.position.x = p1.x - 13.3
        this.camera.position.y = p1.y + 1
        this.camera.position.z = p1.z - .9
    }

    setOrbitControls() {
        // Set orbit control
        this.orbitControls = new OrbitControls(
            this.camera,
            this.renderer.domElement
        )
        this.orbitControls.enabled = true
        this.orbitControls.enableKeys = true
        this.orbitControls.zoomSpeed = 1

        if (this.debug) {
            this.debugFolder = this.debug.addFolder('Camera')
            this.debugFolder.open()
            this.debugFolder
                .add(this.orbitControls, 'enabled')
                .name('Enable Orbit Control')
        }
    }

    MoveCamera() {
        this.percentage += this.addPercentage * this.wheel.getDelta();
        let p1 = this.curvePath.getPointAt(this.percentage % 1);

        gsap.timeline().to(this.camera.position, {x: p1.x - 13.3, y: p1.y + 1, z: p1.z - .9})
        if (p1.x === 23.47177580293144 && p1.z === 5.840683542784142) {
            this.stopMove()
        }

        if (p1.x === 47.89090735236253 && p1.z === 1.6660744384882213) {
            this.stopMove()
        }

        if (p1.x === 44.77510493115564 && p1.z === 7.157337627410166) {
            this.stopMove()
        } 

        gsap.timeline().to(this.camera.position, {x: p1.x - 13.3, y: p1.y + 1, z: p1.z - 1})

        this.camera.updateProjectionMatrix();
    }
}
