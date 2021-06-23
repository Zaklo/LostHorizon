import {Object3D, AnimationMixer, Clock, Vector3, CatmullRomCurve3} from 'three'
import MooveCamera from "../Tools/MooveCamera";
import gsap from "gsap";

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
            [-0.550810694694519, -0.10798951983451843, -0.11461710929870605],
            [3.0179755687713623, -0.21237486600875854, -0.1561770737171173],
            [5.1838459968566895, -0.2123749703168869, -0.3269340991973877],
            [7.3220109939575195, -0.21237507462501526, -0.6293777823448181],
            [8.677023887634277, -0.21237511932849884, -0.4230862855911255],
            [11.03775405883789, -0.21189792454242706, -0.3828252851963043],
            [14.057902336120605, -0.2118980586528778, -0.11564087867736816],
            [16.57720184326172, -0.21189816296100616, -0.152473583817482],
            [18.48532485961914, -0.7244242429733276, -0.3956238031387329],
            [19.949073791503906, -0.944055438041687, -0.6627591848373413],
            [21.04134750366211, -1.3790597915649414, -0.8970562815666199],
            [22.094377517700195, -1.1093471050262451, -1.2361270189285278],
            [23.512174606323242, -1.1093472242355347, -1.6170072555541992],
            [22.744096755981445, -0.44974485039711, -1.228834867477417],
            [21.064668655395508, 0.07317600399255753, -0.817520260810852],
            [21.922163009643555, 0.18858860433101654, -0.8739985227584839],
            [25.6021728515625, 0.2628764808177948, -0.6675372123718262],
            [28.123493194580078, 0.26287639141082764, -0.4844586253166199],
            [30.495742797851562, 0.2628763020038605, -0.5631588101387024],
            [32.78929138183594, 0.2628762125968933, -0.6418589949607849],
            [33.92607879638672, 1.2198820114135742, -0.15522313117980957],
            [35.141845703125, 2.077836275100708, 0.22706952691078186],
            [37.89427185058594, 2.9154913425445557, 1.1622947454452515],
            [39.74934768676758, 2.9154913425445557, 1.8785645961761475],
            [41.48486328125, 2.7059338092803955, 3.01143741607666],
            [43.201786041259766, 2.8839805126190186, 4.175906658172607],
            [44.37131881713867, 2.8839805126190186, 5.1684112548828125],
            [45.91355514526367, 2.8839805126190186, 5.928855895996094],
            [47.946929931640625, 3.066267490386963, 6.436025142669678],
            [47.22024154663086, 3.2775840759277344, 6.363436698913574],
            [45.281253814697266, 3.387052059173584, 5.766999244689941],
            [42.4444694519043, 3.387052059173584, 3.865004777908325],
            [40.877098083496094, 3.387052059173584, 2.6910738945007324],
            [38.92045974731445, 3.387052059173584, 1.3920825719833374],
            [36.95908737182617, 2.1237783432006836, 0.5730525255203247],
            [37.75524139404297, 0.5193849205970764, 0.2139107882976532],
            [39.137882232666016, -1.1919947862625122, -0.2913849353790283],
            [42.58243179321289, -2.3624916076660156, -0.7626411318778992],
            [47.659488677978516, -2.3624918460845947, -0.6698849201202393],
            [49.96635055541992, -2.4656448364257812, -0.6325913071632385],
            [51.55099105834961, -1.6500000953674316, -0.1540590226650238],
            [53.24776077270508, -0.6510710716247559, 0.030107807368040085],
            [55.17831802368164, 0.21899084746837616, 0.6061881184577942],
            [56.65324020385742, 0.21899078786373138, 1.2517008781433105],
            [58.660404205322266, 1.0934382677078247, 2.1677348613739014],
            [60.718101501464844, 1.0934381484985352, 3.1892833709716797],
            [64.56914520263672, 1.0934380292892456, 4.382188320159912],
            [66.60578155517578, 1.0934380292892456, 4.49266242980957],
        ];
        for (let i = 0; i < this.points.length; i++) {
            let x = this.points[i][0]
            let y = this.points[i][1] - 4.7;
            let z = this.points[i][2] + .1
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

        this.container.add(this.perso)
    }

    setPosition() {
        this.perso.scale.x = 0.14
        this.perso.scale.y = 0.14
        this.perso.scale.z = 0.14
        this.perso.rotation.y = Math.PI / -2

        let p1 = this.curvePath.getPointAt(this.percentage % 1);

        this.perso.position.x = p1.x - 13.3
        this.perso.position.y = p1.y
        this.perso.position.z = p1.z - 4.6
    }

    animate() {
        let delta = this.clock.getDelta();
        if (this.mixer) this.mixer.update(delta);
    }

    MoveCamera() {
        this.percentage += 0.0095 * this.wheel.getDelta();
        let p1 = this.curvePath.getPointAt(this.percentage % 1);
        //let p2 = this.curvePath.getPointAt((this.percentage + 0.01) % 1);

        gsap.timeline().to(this.perso.position, {x: p1.x - 13.3, y: p1.y, z: p1.z - 4.6})
        console.log(p1);

        if (p1.x === 23.501121677200647 && p1.z === 5.741706626191953) {
            gsap.timeline().to(this.perso.rotation, {y: Math.PI / 2})
        }

        if (p1.x > 3.018 && p1.x < 14.058) {
            document.querySelector('.ch2_1').style.display = "block"
        }
        else{
            document.querySelector('.ch2_1').style.display = "none"
        }

        if (p1.x > 20 && p1.x < 23.512) {
            document.querySelector('.ch2_2').style.display = "block"
        }
        else{
            document.querySelector('.ch2_2').style.display = "none"
        }

        if (p1.x > 21.922163009643555 && p1.x < 30.495742797851562 && p1.z < 4.60191595832) {
            document.querySelector('.ch2_3').style.display = "block"
        }
        else{
            document.querySelector('.ch2_3').style.display = "none"
        }

        if (p1.x > 38.92 && p1.x < 42.444 && p1.z > 1.5 && p1.z < 3) {
            document.querySelector('.ch2_4').style.display = "block"
        }
        else{
            document.querySelector('.ch2_4').style.display = "none"
        }

        if (p1.x > 42.582 && p1.x < 49.966 & p1.z > 5) {
            document.querySelector('.ch2_8').style.display = "block"
        }
        else{
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


        /*
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
        });*/
    }
}
