<template>
  <div class="page-home--right-nav">
    <div class="part">
      <blockquote
      @mouseover="handleChange('enter', key)"
      @mouseout="handleChange('out', key)"
      v-for="(nav, key) in navItem" :key="key"
      @click.stop="linkTo(nav)">{{nav.enText}}</blockquote>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      navItem: [
        { text: '文章', navLink: '/articlePage', enText: 'articles' },
        { text: '其他', navLink: '/otherPage', enText: 'music' },
        { text: '项目', navLink: '/projectPage', enText: 'project' },
        { text: '关于', navLink: '/aboutPage', enText: 'about' }
      ]
    }
  },
  methods: {
    linkTo ({ navLink }) {
      this.$router.push({ path: navLink })
    },
    handleChange (event, key) {
      let temp = this.navItem[key].text
      this.navItem[key].text = this.navItem[key].enText
      this.navItem[key].enText = temp
    }
  }
}
</script>

<style lang="less">
.page-home--right-nav {
  position: relative;
  flex-basis: 50%;
  .part {
    position: absolute;
    height: 400px;
    width: 400px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    .flex-initial(center, center);
    flex-wrap: wrap;
    blockquote {
      margin: 20px;
      width: 100px;
      height: 100px;
      border: 1px solid #ccc;
      border-radius: 50%;
      text-align: center;
      line-height: 100px;
      font-size: 18px;
      color: #333;
      text-decoration: none;
      transition: background .3s;
      cursor: pointer;
    }
    blockquote:hover {
      background: #3fb76c;
      color: #fff;
    }
  }
}
</style>
