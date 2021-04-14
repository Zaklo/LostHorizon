import {Object3D, AmbientLight, Color, SpotLight} from 'three'

export default class AmbientLightSource {
  constructor(options) {
    // Set options
    this.debug = options.debug

    // Set up
    this.container = new Object3D()
    this.container.name = 'Ambient Light'
    this.params =
        {
          color: 0x404040,
          intensity: 0.05
        }

    this.createAmbientLight()

    if (this.debug) {
      this.setDebug()
    }
  }
  createAmbientLight() {
    this.light = new SpotLight( 0xffffff, 0.2);
    this.light.castShadow = true;
    this.light.shadow.bias = -0.0001;
    this.light.shadow.mapSize.width = 1024*4;
    this.light.shadow.mapSize.height = 1024*4;
    this.container.add(this.light)
  }
  setDebug() {
    this.debugFolder = this.debug.addFolder('Ambient Light')
    this.debugFolder.open()
    this.debugFolder
      .addColor(this.params, 'color')
      .name('Color')
      .onChange(() => {
        this.light.color = new Color(this.params.color)
      })
  }
}
