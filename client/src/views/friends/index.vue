<template>
  <div class="page-friends hack-padding" @click.stop="clickHandler">
    <section class="page-friends--wrap">
      <section class="page-friends--wrap-child1">
        <li data-url="https://blog.naice.me/">友链1</li>
        <div class="page-friends--wrap-child2">
          <li data-url="/xxx">友链2</li>
          <li data-url="/xxx">友链3</li>
        </div>
      </section>
      <section class="page-friends--wrap-child3">
        <li data-url="/xxx">友链4</li>
        <li data-url="/xxx">友链5</li>
      </section>
    </section>
  </div>
</template>

<script>
// grid试验地
const randomColor = new Array('#f68f26', '#4ba946', '#0376c2', '#c077af', '#f8d29d') // eslint-disable-line
export default {
  mounted () {
    let doms = Array.from(document.querySelectorAll('li'))
    for (let dom of doms) {
      let l = dom.length
      let index = Math.random() * l
      dom.style.backgroundColor = randomColor.splice(index, 1)
    }
  },
  methods: {
    clickHandler (e) {
      if (e.target && e.target.dataset.url) {
        let url = e.target.dataset.url
        this.$location.to(url)
      }
    }
  }
}
</script>

<style lang="less">
.page-friends {
  width: 900px;
  margin: 0 auto;
  height: 100%;
  position: relative;
  &--wrap {
    display: grid;
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    transform: translateX(-50%) translateY(-50%);
    grid-template-columns: 3fr 2fr;
    grid-template-rows: repeat(2, auto);
    margin-top: 10px;
    grid-gap: 10px 10px;
    &-child1 {
      display: grid;
      grid-template-columns: 1fr;
      grid-template-rows: 250px 150px;
      justify-items: stretch;
      align-items: stretch;
      grid-gap: 10px 10px;
    }
    &-child2 {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-template-rows: repeat(1, 150px);
      justify-content: space-around;
      justify-items: stretch;
      align-items: stretch;
      grid-gap: 10px 10px;
    }
    &-child3 {
      display: grid;
      grid-template-columns: auto;
      grid-template-rows: 150px 250px;
      justify-items: stretch;
      align-items: stretch;
      grid-gap: 10px 10px;
    }
    li {
      display: flex;
      justify-content: center;
      align-items: center;
      color: #fff;
      cursor: pointer;
      transition: all .5s;
    }
    li:hover {
      box-shadow: 0 0 6px 3px #999;
    }
  }
}
</style>
