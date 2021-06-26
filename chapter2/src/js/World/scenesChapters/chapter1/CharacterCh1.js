import {Object3D, AnimationMixer, Clock} from 'three'
import MooveCamera from "../../../Tools/MooveCamera";
import gsap from "gsap";
import splineChap1 from "../chapter1/splineChap1";

export default class CharacterCh1 {
    constructor(options) {
        // Options
        this.time = options.time
        this.assets = options.assets
        this.position = options.position

        this.wheel = new MooveCamera()
        this.clock = new Clock()
        this.percentage = 0;


//========== Create a path from the points
        this.curvePath = splineChap1();

        // Set up
        this.container = new Object3D()
        this.container.name = 'perso'

        this.createCharacter()
        this.setPosition()

        this.wheel.on('keydown', () => {
            this.animate()
            this.MoveCamera()
        })
    }

    createCharacter() {
        this.perso = this.assets.models.perso.scene
        this.mixer = new AnimationMixer(this.perso);
        this.mixer.uncacheRoot(this.mixer.getRoot());

        let clips = this.assets.models.perso.animations
        clips.forEach((clip) => {
            this.mixer.clipAction(clip).play();
        });

        this.container.add(this.perso)
    }

    setPosition() {
        this.perso.scale.x = 0.14
        this.perso.scale.y = 0.14
        this.perso.scale.z = 0.14
        this.perso.rotation.y = Math.PI / -2
        let p1 = this.curvePath.getPointAt(this.percentage % 1);
        this.perso.position.x = p1.x
        this.perso.position.y = p1.y
        this.perso.position.z = p1.z
    }

    animate() {
        let delta = this.clock.getDelta();
        if (this.mixer) this.mixer.update(delta);
    }

    MoveCamera() {
        this.percentage += 0.0095 * this.wheel.getDelta();
        let p1 = this.curvePath.getPointAt(this.percentage % 1);
        //let p2 = this.curvePath.getPointAt((this.percentage + 0.01) % 1);

        gsap.timeline().to(this.perso.position, {x: p1.x, y: p1.y - 0.1, z: p1.z})

        console.log(p1)

        if (p1.x === 23.501121677200647 && p1.z === 5.741706626191953) {
            gsap.timeline().to(this.perso.rotation, {y: Math.PI / 2})
        }

        if (p1.x > -7.90 && p1.x < -5) {
            document.querySelector('.ch1_1').style.display = "block"
        } else {
            document.querySelector('.ch1_1').style.display = "none"
        }

        if (p1.x > 0.210222 && p1.x < 0.22) {
            document.querySelector('.ch1_2').style.display = "block"
        } else {
            document.querySelector('.ch1_2').style.display = "none"
        }



        

        document.addEventListener('keydown', (event) => {
            const key = event.key; // "ArrowRight", "ArrowLeft", "ArrowUp", or "ArrowDown"
            switch (event.key) {
                case "ArrowLeft":
                    this.perso.rotation.y = Math.PI / 2
                    break;
                case "ArrowRight":
                    this.perso.rotation.y = Math.PI / -2
                    break;
            }
        });
    }
}
