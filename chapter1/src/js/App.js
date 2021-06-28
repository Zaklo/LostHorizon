import {BasicShadowMap, Clock, FogExp2, Scene, sRGBEncoding, WebGLRenderer} from 'three'
import {EffectComposer} from "three/examples/jsm/postprocessing/EffectComposer";
import {RenderPass} from "three/examples/jsm/postprocessing/RenderPass";
import {ShaderPass} from "three/examples/jsm/postprocessing/ShaderPass";

import * as dat from 'dat.gui'

import Sizes from '@tools/Sizes'
import Time from '@tools/Time'
import Assets from '@tools/Loader'

import Camera from './Camera'
import Chapter1 from "./World/scenesChapters/chapter1";

export default class App {
    constructor(options) {
        // Set options
        this.canvas = options.canvas

        // Set up
        this.time = new Time()
        this.sizes = new Sizes()
        this.assets = new Assets()

        this.setConfig()
        this.setRenderer()
        this.setCamera()
        this.setChapter1()

        this.composer = new EffectComposer(this.renderer);
        this.renderPass = new RenderPass(this.scene, this.camera.camera);
        this.composer.addPass(this.renderPass);

        //custom shader pass
        let vertShader = `varying vec2 vUv;
    void main() {
        vUv = uv;
        gl_Position = projectionMatrix
        * modelViewMatrix
        * vec4( position, 1.0 );
    }`
        let fragShader = `uniform float amount;
    uniform sampler2D tDiffuse;
    varying vec2 vUv;

    float random( vec2 p )
    {
        vec2 K1 = vec2(
        10.14069263277926, // e^pi (Gelfond's constant)
        2.665144142690225 // 2^sqrt(2) (Gelfondâ€“Schneider constant)
        );
        return fract( cos( dot(p,K1) ) * 12345.6789 );
    }

    void main() {

        vec4 color = texture2D( tDiffuse, vUv );
        vec2 uvRandom = vUv;
        uvRandom.y *= random(vec2(uvRandom.y,amount));
        color.rgb += random(uvRandom)*0.11;
        gl_FragColor = vec4( color  );
    }`
        this.counter = 0.0;
        let myEffect = {
            uniforms: {
                "tDiffuse": {value: null},
                "amount": {value: this.counter}
            },
            vertexShader: vertShader,
            fragmentShader: fragShader
        }

        this.customPass = new ShaderPass(myEffect);
        this.customPass.renderToScreen = true;
        this.composer.addPass(this.customPass);
    }

    setRenderer() {
        // Set scene
        this.scene = new Scene()
        this.scene.fog = new FogExp2(0x152238, .09);
        // Set renderer
        this.renderer = new WebGLRenderer({
            canvas: this.canvas,
            alpha: true,
            antialias: true,
            powerPreference: 'high-performance',
        })
        this.renderer.outputEncoding = sRGBEncoding
        this.renderer.gammaFactor = 2.2
        // Set background color
        this.renderer.setClearColor(0x212121, 1)
        // Set renderer pixel ratio & sizes
        this.renderer.setPixelRatio(window.devicePixelRatio)
        this.renderer.setSize(this.sizes.viewport.width, this.sizes.viewport.height)

        this.renderer.shadowMap.enabled = true
        this.renderer.shadowMap.type = BasicShadowMap
        // Resize renderer on resize event
        this.sizes.on('resize', () => {
            this.renderer.setSize(
                this.sizes.viewport.width,
                this.sizes.viewport.height
            )
        })

        this.time.on('tick', () => {
            this.counter += 0.01;
            this.customPass.uniforms["amount"].value = this.counter;
            this.composer.render()
            // this.toggleNDMode()
        })
        // Set RequestAnimationFrame with 60fps
        this.time.on('tick', () => {
            // When tab is not visible (tab is not active or window is minimized), browser stops requesting animation frames. Thus, this does not work
            // if the window is only in the background without focus (for example, if you select another window without minimizing the browser one),
            // which might cause some performance or batteries issues when testing on multiple browsers
            if (!(this.renderOnBlur?.activated && !document.hasFocus())) {
                this.composer.render()
            }
        })

        if (this.debug) {
            this.renderOnBlur = {activated: true}
            const folder = this.debug.addFolder('Renderer')
            folder.open()
            folder.add(this.renderOnBlur, 'activated').name('Render on window blur')
        }
    }

    setCamera() {
        // Create camera instance
        this.camera = new Camera({
            sizes: this.sizes,
            renderer: this.renderer,
            debug: this.debug,
        })
        // Add camera to scene
        this.scene.add(this.camera.container)
    }

    setChapter1() {
        // Create chapter 2 instance
        this.chapter2 = new Chapter1({
            time: this.time,
            debug: this.debug,
            assets: this.assets,
        })
        // Add chapter to scene
        this.scene.add(this.chapter2.container)
    }

    setConfig() {
        if (window.location.hash === '#debug') {
            this.debug = new dat.GUI({width: 450})
        }
    }
}
