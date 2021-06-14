import {Object3D, Vector3, Color, MeshBasicMaterial, Mesh, CatmullRomCurve3, TubeGeometry, DoubleSide} from 'three'

export default class CustomCurve {
    constructor() {
        // Options

        // Set up
        this.container = new Object3D()
        this.container.name = 'Curve'

        this.createCurve()
        this.setPosition()
    }

    createCurve() {
        let points = [
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
//========== scale the curve to make it as large as you want
        //let scale = 5;
//========== Convert the array of points into vertices (in Blender the z axis is UP so we swap the z and y)
        for (let i = 0; i < points.length; i++) {
            let x = points[i][0];
            let y = points[i][1];
            let z = points[i][2];
            points[i] = new Vector3(x, z, -y);
        }

        console.log(points);
//========== Create a path from the points
        let curvePath = new CatmullRomCurve3(points);
        let radius = .1;
//========== Create a tube geometry that represents our curve
        let geometry = new TubeGeometry(curvePath, 400, radius, 4, false);
//========== Set a different color for each face of the tube. (a triangle represents 1 face in WebGL)
//========== add tube to the scene
        let material = new MeshBasicMaterial({
            side: DoubleSide,
            transparent: true,
            opacity: 1
        });
        this.tube = new Mesh(geometry, material);
        this.tube.position.z = 4.6
        this.tube.position.x = 12
        this.tube.position.y = 1.9
        //this.tube.scale.z = 0.18
        //this.tube.scale.x = 0.18
        //this.tube.scale.y = 0.18
        this.container.add(this.tube)
    }

    setPosition() {

    }
}
