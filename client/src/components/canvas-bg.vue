<template>
  <canvas id="canvas" ref="canvas"></canvas>
</template>

<script>
import { Animate } from '../lib/canvasAnimate.js'
export default {
  data () {
    return {
      animation: null
    }
  },
  mounted () {
    this.init()
    window.addEventListener('resize', this.init, false)
  },
  methods: {
    init () {
      if (this.animation) {
        this.animation.cancelAnimation()
      }
      let rw = window.innerWidth
      let rh = window.innerHeight
      const canvas = this.$refs.canvas
      const context = canvas.getContext('2d')
      canvas.width = rw
      canvas.height = rh
      this.animation = new Animate(context)
      for (let i = 0; i < 8; i++) {
        let line = {
          t: {
            speed: 1
          },
          b: {
            speed: 1
          }
        }
        if (i % 2 === 0) {
          line.direction = 'vertical'
          line.t.x = this.InitRandom(rw)
          line.t.y = 0
          line.b.x = this.InitRandom(rw)
          line.b.y = rh
        } else {
          line.direction = 'horizontal'
          line.t.x = 0
          line.t.y = this.InitRandom(rh)
          line.b.x = rw
          line.b.y = this.InitRandom(rh)
        }
        this.animation.lineList.push(line)
      }
      this.animation.draw()
    },
    InitRandom (root) {
      return Math.floor(root * Math.random(new Date().getTime()))
    }
  }
}
</script>

<style lang="less">
#canvas {
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
}
</style>
