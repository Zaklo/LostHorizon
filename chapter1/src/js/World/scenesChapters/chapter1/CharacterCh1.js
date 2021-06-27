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
        this.addPercentage = 0.0095
        this.wheel = new MooveCamera()
        this.clock = new Clock()
        this.percentage = 0;

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

    stopMove() {
        this.addPercentage = 0
        setTimeout(() => {
            this.addPercentage = 0.0095
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
        this.perso.position.x = p1.x
        this.perso.position.y = p1.y
        this.perso.position.z = p1.z
    }

    animate() {
        let delta = this.clock.getDelta();
        if (this.mixer) this.mixer.update(delta);
    }

    MoveCamera() {
        this.percentage += this.addPercentage * this.wheel.getDelta();
        let p1 = this.curvePath.getPointAt(this.percentage % 1);

        gsap.timeline().to(this.perso.position, {x: p1.x, y: p1.y - 0.1, z: p1.z})

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

        if (p1.x > 3.8140 && p1.x < 3.85) {
            document.querySelector('.ch1_3').style.display = "block"
        } else {
            document.querySelector('.ch1_3').style.display = "none"
        }

        if (p1.x > 6.1578498821375 && p1.x < 6.20) {
            document.querySelector('.ch1_4').style.display = "block"
        } else {
            document.querySelector('.ch1_4').style.display = "none"
        }

        if (p1.x > 17.470078476750732 && p1.x < 19.000) {
            document.querySelector('.ch1_5').style.display = "block"
        } else {
            document.querySelector('.ch1_5').style.display = "none"
        }

        if (p1.x > 21.23 && p1.x < 25.084) {
            document.querySelector('.ch1_6').style.display = "block"
        } else {
            document.querySelector('.ch1_6').style.display = "none"
        }

        if (p1.x > 27.340186) {
            document.querySelector('.scenes').classList.add("fadeOutScene");
            setTimeout(function(){ window.location.replace('chapter2.html'); }, 2000 );
        }

        document.addEventListener('keydown', (event) => {
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
