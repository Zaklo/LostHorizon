import {Object3D, AnimationMixer, Clock} from 'three'
import MooveCamera from "../../../Tools/MooveCamera";
import gsap from "gsap";
import splineChap2 from "./splineChap2";

export default class CharacterCh2 {
    constructor(options) {
        // Options
        this.time = options.time
        this.assets = options.assets
        this.position = options.position
        this.addPercentage = 0.0080
        this.wheel = new MooveCamera()
        this.clock = new Clock()
        this.percentage = 0;


//========== Create a path from the points
        this.curvePath = splineChap2();

        // Set up
        this.container = new Object3D()
        this.container.name = 'perso'

        this.createCharacter()
        this.setPosition()

        this.wheel.on('keydown', () => {
            if(this.addPercentage > 0){
                this.animate()
                this.MoveCamera()
            }
        })
    }

    stopMove() {
        this.addPercentage = 0
        setTimeout(() => {
            this.addPercentage = 0.008
        }, 2000)
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
        this.perso.position.x = p1.x - 13.3
        this.perso.position.y = p1.y + .1
        this.perso.position.z = p1.z - 4.7
    }

    animate() {
        let delta = this.clock.getDelta();
        if (this.mixer) this.mixer.update(delta);
    }

    MoveCamera() {
        this.percentage += this.addPercentage * this.wheel.getDelta();
        let p1 = this.curvePath.getPointAt(this.percentage % 1);

        gsap.timeline().to(this.perso.position, {x: p1.x - 13.3, y: p1.y + 0.1, z: p1.z - 4.7})

        if (p1.x === 23.514076781571916 && p1.z === 5.8038313931210315) {
            this.stopMove()
            gsap.timeline().to(this.perso.rotation, {y: Math.PI / 2})
        }

        if (p1.x > 3.018 && p1.x < 14.058) {
            document.querySelector('.ch2_1').style.display = "block"
        } else {
            document.querySelector('.ch2_1').style.display = "none"
        }

        if (p1.x > 20 && p1.x < 23.512) {
            document.querySelector('.ch2_2').style.display = "block"
        } else {
            document.querySelector('.ch2_2').style.display = "none"
        }

        if (p1.x > 21.922163009643555 && p1.x < 30.495742797851562 && p1.z < 4.60191595832) {
            document.querySelector('.ch2_3').style.display = "block"
        } else {
            document.querySelector('.ch2_3').style.display = "none"
        }

        if (p1.x > 38.92 && p1.x < 42.444 && p1.z > 1.5 && p1.z < 3) {
            document.querySelector('.ch2_4').style.display = "block"
        } else {
            document.querySelector('.ch2_4').style.display = "none"
        }

        if (p1.x > 42.582 && p1.x < 49.966 && p1.z > 5) {
            document.querySelector('.ch2_8').style.display = "block"
        } else {
            document.querySelector('.ch2_8').style.display = "none"
        }

        if (p1.x === 21.088409331423215 && p1.z === 4.602447984017861) {
            gsap.timeline().to(this.perso.rotation, {y: Math.PI / -2})
        }

        if (p1.x === 47.86300163149727 && p1.z === 1.5783586098214515) {
            gsap.timeline().to(this.perso.rotation, {y: Math.PI / 2})
        }

        if (p1.x === 36.96768983024135 && p1.z === 2.879518983922841) {
            gsap.timeline().to(this.perso.rotation, {y: Math.PI / -2})
        }
    }
}
