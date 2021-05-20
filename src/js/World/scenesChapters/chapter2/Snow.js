import {Vector3, PointsMaterial, Points, Object3D, Float32BufferAttribute, BufferGeometry} from "three";
import {AdditiveBlending} from "three";

const vertex = new Vector3();
export default class Snow {
    constructor(options) {
        this.time = options.time
        this.assets = options.assets

        this.container = new Object3D()
        this.container.name = 'Snow'

        this.snowDrop()
        this.setMovement()
    }

    rainVariation() {
        let positionAttribute = this.rain.geometry.getAttribute('position');
        for (let i = 0; i < positionAttribute.count; i++) {
            vertex.fromBufferAttribute(positionAttribute, i);
            vertex.y -= 0.02 * Math.random();
            if (vertex.y < -20) {
                vertex.y = 20;
            }
            positionAttribute.setXYZ(i, vertex.x, vertex.y, vertex.z);
        }
        positionAttribute.needsUpdate = true;
    }

    setMovement() {
        this.time.on('tick', () => {
            this.rainVariation()
        })
    }

    snowDrop() {
        const geometry = new BufferGeometry();
        const vertices = [];

        for (let i = 0; i < 4000; i++) {
            vertices.push(
                Math.random() * 100 - 50,
                Math.random() * 40 - 20,
                Math.random() * 20 - 10
            );
        }

        geometry.setAttribute('position', new Float32BufferAttribute(vertices, 3));

        const material = new PointsMaterial({
            color: '#ffffff',
            size: 0.02,
            transparent: true,
            blending: AdditiveBlending
        });

        this.rain = new Points(geometry, material);
        this.container.add(this.rain)
    }
}
