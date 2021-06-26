import EventEmitter from './EventEmitter.js'

export default class Scroll extends EventEmitter {
  constructor() {
    // Get parent methods
    super()
    this.delta = 0
    // Set up

    document.addEventListener('keydown', (event) => {
      const key = event.key; // "ArrowRight", "ArrowLeft", "ArrowUp", or "ArrowDown"
      switch (event.key) {
        case "ArrowLeft":
          this.backwardMove(event);
          break;
        case "ArrowRight":
          this.forwardMove(event);
          break;
      }
    });
  }

  forwardMove() {
    this.delta = this.delta + 0.1
    this.trigger('keydown')
  }

  backwardMove() {
    this.delta = this.delta - 0.1
    this.trigger('keydown')
  }

  getDelta() {
    const delta = this.delta
    this.delta = 0
    return delta
  }

  // Cancel animation frame
  stop() {
    window.cancelAnimationFrame(this.ticker)
  }
}
