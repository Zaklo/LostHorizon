import {BasicShadowMap, FogExp2, Scene, sRGBEncoding, WebGLRenderer} from 'three'
import * as dat from 'dat.gui'

import Sizes from '@tools/Sizes'
import Time from '@tools/Time'
import Assets from '@tools/Loader'

import Camera from './Camera'
import Chapter2 from "./World/scenesChapters/chapter2";
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
        this.setChapter2()
    }

    setRenderer() {
        // Set scene
        this.scene = new Scene()
        this.scene.fog = new FogExp2(0xFFFFFF, 0.07);
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
            this.renderer.render(this.scene, this.camera.camera)
            // this.toggleNDMode()
        })
        // Set RequestAnimationFrame with 60fps
        this.time.on('tick', () => {
            // When tab is not visible (tab is not active or window is minimized), browser stops requesting animation frames. Thus, this does not work
            // if the window is only in the background without focus (for example, if you select another window without minimizing the browser one),
            // which might cause some performance or batteries issues when testing on multiple browsers
            if (!(this.renderOnBlur?.activated && !document.hasFocus())) {
                this.renderer.render(this.scene, this.camera.camera)
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
        // Create chapter 1 instance
        this.chapter1 = new Chapter1({
            time: this.time,
            debug: this.debug,
            assets: this.assets,
        })
        // Add chapter to scene
        this.scene.add(this.chapter1.container)
    }

    setChapter2() {
        // Create chapter 2 instance
        this.chapter2 = new Chapter2({
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
