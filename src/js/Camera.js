import {CatmullRomCurve3, Object3D, PerspectiveCamera, Vector3} from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import MooveCamera from "./Tools/MooveCamera";
import gsap from 'gsap';

export default class Camera {
  constructor(options) {
    // Set Options
    this.sizes = options.sizes
    this.renderer = options.renderer
    this.debug = options.debug

    this.wheel = new MooveCamera()
    this.percentage = 0;
    let points = [
      [-0.550810694694519, -0.10798951983451843, -0.11461710929870605] ,
      [3.0179755687713623, -0.21237486600875854, -0.1561770737171173] ,
      [5.1838459968566895, -0.2123749703168869, -0.3269340991973877] ,
      [7.3220109939575195, -0.21237507462501526, -0.6293777823448181] ,
      [8.677023887634277, -0.21237511932849884, -0.4230862855911255] ,
      [11.03775405883789, -0.21189792454242706, -0.3828252851963043] ,
      [14.057902336120605, -0.2118980586528778, -0.11564087867736816] ,
      [16.57720184326172, -0.21189816296100616, -0.152473583817482] ,
      [18.48532485961914, -0.7244242429733276, -0.3956238031387329] ,
      [19.949073791503906, -0.944055438041687, -0.6627591848373413] ,
      [21.04134750366211, -1.3790597915649414, -0.8970562815666199] ,
      [22.094377517700195, -1.1093471050262451, -1.2361270189285278] ,
      [23.512174606323242, -1.1093472242355347, -1.6170072555541992] ,
      [22.744096755981445, -0.44974485039711, -1.228834867477417] ,
      [21.064668655395508, 0.07317600399255753, -0.817520260810852] ,
      [21.922163009643555, 0.18858860433101654, -0.8739985227584839] ,
      [25.6021728515625, 0.2628764808177948, -0.6675372123718262] ,
      [28.123493194580078, 0.26287639141082764, -0.4844586253166199] ,
      [30.495742797851562, 0.2628763020038605, -0.5631588101387024] ,
      [32.78929138183594, 0.2628762125968933, -0.6418589949607849] ,
      [33.92607879638672, 1.2198820114135742, -0.15522313117980957] ,
      [35.141845703125, 2.077836275100708, 0.22706952691078186] ,
      [37.89427185058594, 2.9154913425445557, 1.1622947454452515] ,
      [39.74934768676758, 2.9154913425445557, 1.8785645961761475] ,
      [41.48486328125, 2.7059338092803955, 3.01143741607666] ,
      [43.201786041259766, 2.8839805126190186, 4.175906658172607] ,
      [44.37131881713867, 2.8839805126190186, 5.1684112548828125] ,
      [45.91355514526367, 2.8839805126190186, 5.928855895996094] ,
      [47.946929931640625, 3.066267490386963, 6.436025142669678] ,
      [47.22024154663086, 3.2775840759277344, 6.363436698913574] ,
      [45.281253814697266, 3.387052059173584, 5.766999244689941] ,
      [42.4444694519043, 3.387052059173584, 3.865004777908325] ,
      [40.877098083496094, 3.387052059173584, 2.6910738945007324] ,
      [38.92045974731445, 3.387052059173584, 1.3920825719833374] ,
      [36.95908737182617, 2.1237783432006836, 0.5730525255203247] ,
      [37.75524139404297, 0.5193849205970764, 0.2139107882976532] ,
      [39.137882232666016, -1.1919947862625122, -0.2913849353790283] ,
      [42.58243179321289, -2.3624916076660156, -0.7626411318778992] ,
      [47.659488677978516, -2.3624918460845947, -0.6698849201202393] ,
      [49.96635055541992, -2.4656448364257812, -0.6325913071632385] ,
      [51.55099105834961, -1.6500000953674316, -0.1540590226650238] ,
      [53.24776077270508, -0.6510710716247559, 0.030107807368040085] ,
      [55.17831802368164, 0.21899084746837616, 0.6061881184577942] ,
      [56.65324020385742, 0.21899078786373138, 1.2517008781433105] ,
      [58.660404205322266, 1.0934382677078247, 2.1677348613739014] ,
      [60.718101501464844, 1.0934381484985352, 3.1892833709716797] ,
      [64.56914520263672, 1.0934380292892456, 4.382188320159912] ,
      [66.60578155517578, 1.0934380292892456, 4.49266242980957] ,
    ];
//========== scale the curve to make it as large as you want
    //let scale = 5;
//========== Convert the array of points into vertices (in Blender the z axis is UP so we swap the z and y)
    for (let i = 0; i < points.length; i++) {
      let x = points[i][0]
      let y = points[i][1] - 10
      let z = points[i][2] + 0.1;
      points[i] = new Vector3(x, z, -y);
    }

//========== Create a path from the points
    this.curvePath = new CatmullRomCurve3(points);

    // Set up
    this.container = new Object3D()
    this.container.name = 'Camera'

    this.setCamera()
    this.setPosition()
    //this.setOrbitControls()
  }
  setCamera() {
    // Create camera
    this.camera = new PerspectiveCamera(
      60,
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
    this.camera.position.x  = p1.x - 13.3;
    this.camera.position.y  = p1.y + 1

    this.camera.position.z = 2 + 2
    this.camera.rotation.y = 0
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
    this.percentage += 0.0095 * this.wheel.getDelta();
    let p1 = this.curvePath.getPointAt(this.percentage % 1);
    let p2 = this.curvePath.getPointAt((this.percentage + 0.01) % 1);

    gsap.timeline().to(this.camera.position ,{x: p1.x - 13.3, y: p1.y + 1, z: p1.z - 6.7})

    this.camera.updateProjectionMatrix();
  }
}
