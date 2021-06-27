import {Object3D, AnimationMixer, Clock, PointLight, SpotLight} from 'three'
import MooveCamera from "../../../Tools/MooveCamera";
import gsap from "gsap";
import splineChap1 from "../chapter1/splineChap1";

export default class CharacterCh1 {
    constructor(options) {
        // Options
        this.time = options.time
        this.assets = options.assets

        this.addPercentage = 0.0095
        this.wheel = new MooveCamera()
        this.clock = new Clock()
        this.percentage = 0;

        this.curvePath = splineChap1();

        // Set up
        this.container = new Object3D()
        this.container.name = 'perso'

        this.createCharacter()
        this.setObjects()
        this.setPosition()
        this.torchLight()

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

    setObjects() {
        this.torche = this.assets.models.chap1.torche.scene
        this.carte = this.assets.models.chap1.carte.scene
        this.jumelles = this.assets.models.chap1.jumelles.scene

        this.container.add(this.torche, this.carte, this.jumelles);
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

        this.torche.position.x = 6.157849
        this.torche.position.y = p1.y - .2
        this.torche.position.z = p1.z + .8

        this.jumelles.position.x = 3.8140
        this.jumelles.position.y = p1.y - .096
        this.jumelles.position.z = p1.z + 1.3

        this.carte.position.x = 17.470078
        this.carte.position.y = p1.y - .91
        this.carte.position.z = p1.z + .5

        this.carte.rotation.z = 60
    }

    torchLight() {
        this.light = new SpotLight('#e7953c', 4, 4)
        let p1 = this.curvePath.getPointAt(this.percentage % 1);
        this.light.position.set(6.157849, p1.y - .12, p1.z + .88)
        this.light.target.position.set(6.157847, p1.y - 2, p1.z + 2)
        this.light.angle = Math.PI / 4
        this.light.decay = 1
        this.container.add(this.light.target)
        this.container.add(this.light)
    }

    removeObject(object){
        object.position.y += 10
    }

    animate() {
        let delta = this.clock.getDelta();
        if (this.mixer) this.mixer.update(delta);
    }

    MoveCamera() {
        this.percentage += this.addPercentage * this.wheel.getDelta();
        let p1 = this.curvePath.getPointAt(this.percentage % 1);

        gsap.timeline().to(this.perso.position, {x: p1.x, y: p1.y - 0.1, z: p1.z})

        if(this.perso.position.x > 3.8){
            this.container.remove(this.jumelles)
        }

        if(this.perso.position.x > 6.2){
            this.container.remove(this.torche, this.light)
        }

        if(this.perso.position.x > 17.470078){
            this.container.remove(this.carte)
        }

        console.log(p1)

        if (p1.x > -7.90 && p1.x < -5) {
            document.querySelector('.ch1_1').style.display = "block"
        } else {
            document.querySelector('.ch1_1').style.display = "none"
        }

        if (p1.x === 0.2102226558357801) {
            document.querySelector('.ch1_2').style.display = "block"
            this.stopMove()
        } else {
            document.querySelector('.ch1_2').style.display = "none"
        }

        if (p1.x === 3.2959869261502677) {
            document.querySelector('.ch1_3').style.display = "block"
            this.stopMove()
        } else {
            document.querySelector('.ch1_3').style.display = "none"
        }

        if (p1.x === 5.49493757400784) {
            document.querySelector('.ch1_4').style.display = "block"
            this.stopMove()
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
            setTimeout(function () {
                window.location.replace('chapter2.html');
            }, 2000);
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
