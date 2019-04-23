class Animate {
  constructor (context) {
    this.t = {}
    this.b = {}
    this.requestId = ''
    this.ctx = context
    this.lineList = []
  }

  draw () {
    let context = this.ctx
    context.clearRect(0, 0, window.innerWidth, window.innerHeight)
    this.makePoint()
    this.lineList.forEach(line => {
      context.strokeStyle = '#f4f4f4'
      context.beginPath()
      context.moveTo(line.t.x, line.t.y)
      context.lineTo(line.b.x, line.b.y)
      context.stroke()
      context.closePath()
      if (line.direction === 'vertical') {
        if (line.t.x >= window.innerWidth || line.t.x <= 0) {
          line.t.speed = -line.t.speed
        }
        if (line.b.x >= window.innerWidth || line.b.x <= 0) {
          line.b.speed = -line.b.speed
        }
        line.t.x += line.t.speed
        line.b.x += line.b.speed
      } else {
        if (line.t.y >= window.innerHeight || line.t.y <= 0) {
          line.t.speed = -line.t.speed
        }
        if (line.b.y >= window.innerHeight || line.b.y <= 0) {
          line.b.speed = -line.b.speed
        }
        line.t.y += line.t.speed
        line.b.y += line.b.speed
      }
    })
    this.requestId = requestAnimationFrame(this.draw.bind(this))
  }

  makePoint () {
    let l = this.lineList.length
    for (let i = 0; i < l; i++) {
      for (let j = i + 1; j < l; j++) {
        let line1 = this.lineList[i]
        let line2 = this.lineList[j]
        let k1 = (line1.t.y - line1.b.y) / (line1.t.x - line1.b.x)
        let k2 = (line2.t.y - line2.b.y) / (line2.t.x - line2.b.x)
        let b1 = line1.t.y - k1 * line1.t.x
        let b2 = line2.t.y - k2 * line2.t.x
        this.drawPonit({
          x: (b2 - b1) / (k1 - k2),
          y: k1 * (b2 - b1) / (k1 - k2) + b1
        })
      }
    }
  }

  drawPonit (p) {
    if (p.x > 0 && p.y > 0) {
      let ctx = this.ctx
      ctx.beginPath()
      ctx.arc(p.x, p.y, 2, 0, 2 * Math.PI)
      ctx.fillStyle = '#eee'
      ctx.fill()
    }
  }

  cancelAnimation () {
    if (this.requestId) {
      this.requestId = ''
      window.cancelAnimationFrame(this.requestId)
    }
  }
}

export {
  Animate
}
