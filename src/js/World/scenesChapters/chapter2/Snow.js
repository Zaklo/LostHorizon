import {Geometry} from "three/examples/jsm/deprecated/Geometry";
import {Vector3, PointsMaterial, Points, Object3D} from "three";

export default class Snow {
    constructor(options) {
        this.time = options.time
        this.assets = options.assets

        this.container = new Object3D()
        this.container.name = 'Snow'

        this.snowDrop()
        this.setMovement()
    }

    setMovement() {
        this.time.on('tick', () => {
            this.rainGeo.vertices.forEach(p => {
                p.velocity -= 3 * Math.random();
                p.y += p.velocity;
                if (p.y < -100) {
                    p.y = 100;
                    p.velocity = 0;
                }
            })
            this.rainGeo.verticesNeedUpdate = true;
            this.rain.rotation.y += 0.002;
        })
    }

    snowDrop() {
        this.rainCount = 9500;
        this.rainGeo = new Geometry();
        for (let i = 0; i < this.rainCount; i++) {
            let rainDrop = new Vector3(
                Math.random() * 400 - 200,
                Math.random() * 500 - 250,
                Math.random() * 400 - 200
            )
            rainDrop.velocity = {};
            rainDrop.velocity = 0;
            this.rainGeo.vertices.push(rainDrop);
        }

        let rainMaterial = new PointsMaterial({
            color: 0xaaaaaa,
            size: 0.1,
            transparent: true
        })

        this.rain = new Points(this.rainGeo, rainMaterial);
        this.container.add(this.rain)
    }
}
