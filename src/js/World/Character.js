import {Object3D, AnimationMixer, Clock, Vector3, CatmullRomCurve3} from 'three'
import MooveCamera from "../Tools/MooveCamera";

export default class Character {
    constructor(options) {
        // Options
        this.time = options.time
        this.assets = options.assets
        this.position = options.position
        this.wheel = new MooveCamera()
        this.clock = new Clock()
        this.percentage = 0;
        this.points = [
            [-25.086929321289062, 4.557759761810303, -1.752099633216858],
            [-17.81485939025879, 4.113916873931885, -2.0287508964538574],
            [-12.873396873474121, 4.113916873931885, -2.323667287826538],
            [-9.353116035461426, 4.113916397094727, -1.8804125785827637],
            [-3.658903121948242, 4.113916397094727, -2.53462553024292],
            [-0.22402030229568481, 3.322291612625122, -3.225576162338257],
            [-2.9920358657836914, 4.795302867889404, -2.5323925018310547],
            [3.5579428672790527, 4.8221116065979, -2.220460891723633],
            [8.82685661315918, 4.773304462432861, -2.31036639213562],
            [14.132623672485352, 6.751862049102783, -0.8459522724151611],
            [18.582887649536133, 7.485363006591797, 1.924562692642212],
            [21.664758682250977, 7.478051662445068, 4.002956867218018],
            [24.122623443603516, 7.83150053024292, 4.5962982177734375],
            [21.84029197692871, 6.959893226623535, 3.8982350826263428],
            [18.73647689819336, 7.275397777557373, 1.9779555797576904],
            [14.206768035888672, 6.136593818664551, -1.0336993932724],
            [14.352560043334961, 3.6339423656463623, -2.248628616333008],
            [18.412771224975586, 2.3622260093688965, -2.142258405685425],
            [26.667251586914062, 2.3622257709503174, -2.142258405685425],
            [30.812881469726562, 4.442076683044434, -1.2122597694396973],
            [34.07444763183594, 5.485990047454834, 0.2866070866584778],
            [37.41644287109375, 5.485990047454834, 1.596125841140747],
            [39.8670539855957, 5.485990047454834, 2.5169894695281982],
        ];
        for (let i = 0; i < this.points.length; i++) {
            let x = this.points[i][0] + 10;
            let y = this.points[i][1] - 4.7;
            let z = this.points[i][2]+ .1
            this.points[i] = new Vector3(x, z, -y);
        }

//========== Create a path from the points
        this.curvePath = new CatmullRomCurve3(this.points);
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
        this.perso.traverse(n => {
            if (n.isMesh) {
                n.castShadow = true;
                n.receiveShadow = false;
                if (n.material.map) n.material.map.anisotropy = 16;
            }
        });
        this.mixer = new AnimationMixer(this.perso);
        this.mixer.uncacheRoot(this.mixer.getRoot());

        let clips = this.assets.models.perso.animations
        clips.forEach((clip) => {
            this.mixer.clipAction(clip).play();
        });
        console.log(this.perso)
        this.container.add(this.perso)
    }

    setPosition() {
        /*this.perso.rotation.y = Math.PI / -2
        this.perso.position.y = -0.5
        this.perso.position.z = -36.5*/

        this.perso.scale.x = 0.16
        this.perso.scale.y = 0.16
        this.perso.scale.z = 0.16
        this.perso.rotation.y = Math.PI / -2
        this.perso.position.x = -3
        this.perso.position.y = -0.40
        this.perso.position.z = 1
    }

    animate() {
        let delta = this.clock.getDelta();
        if (this.mixer) this.mixer.update(delta);
    }

    MoveCamera() {
        this.percentage += 0.0095 * this.wheel.getDelta();
        let p1 = this.curvePath.getPointAt(this.percentage % 1);
        //let p2 = this.curvePath.getPointAt((this.percentage + 0.01) % 1);

        this.perso.position.x = p1.x
        this.perso.position.y = (p1.y + 1.75)
        this.perso.position.z = p1.z
    }
}
