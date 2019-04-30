<template>
  <div class="project-page hack-padding">
    <section class="project-page-projectBox">
      <div class="project-page-projectBox-item" v-for="(project, key) in projectItems" :key="key">
        <div class="project-page-projectBox-item-icon iconfont icon">&#xe64a;</div>
        <h3 class="project-page-projectBox-item-title">{{project.name}}</h3>
        <p class="project-page-projectBox-item-desc">{{project.desc}}</p>
        <div class="project-page-projectBox-item-btn">
          <a>
            <i class="iconfont icon">&#xe64a;</i>
            github
          </a>
          <a>
            <i class="iconfont icon">&#xe7fc;</i>
            view
          </a>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { projectItems } from '~/data/project.json'
// Vue2.6.x新增显示创建响应式对象
// const reactiveState = Vue.observable({
//   projectItems: []
// })
export default {
  data () {
    return {
      projectItems
    }
  },
  // Vue2.6.x新增内置错误处理机制
  errorHandler (a, b, c, d, e) {
    [...arguments].forEach(p => {
      console.log(p)
    })
  }
}
</script>

<style lang="less">
.project-page {
  margin-top: 10px;
  &-projectBox {
    width: 900px;
    margin: 0 auto;
    overflow: hidden;
    &-item {
      width: 217px;
      height: 280px;
      background: rgba(0, 0, 0, .02);
      border: 1px solid #f1f1f1;
      box-sizing: border-box;
      padding: 10px;
      cursor: pointer;
      transition: background .3s;
      float: left;
      margin-right: 10px;
      margin-bottom: 10px;
      &:hover &-icon {
        transform: rotate(-360deg);
      }
      &:hover &-title {
        color: #000;
      }
      &-icon {
        height: 120px;
        text-align: center;
        line-height: 120px;
        font-size: 70px;
        transition: .5s transform;
      }
      &-title {
        text-align: center;
        white-space: nowrap;
        text-overflow: ellipsis;
        width: 100%;
        height: 32px;
        line-height: 32px;
        overflow: hidden;
        font-size: 16px;
        transition: .3s;
      }
      &-desc {
        width: 100%;
        height: 50px;
        margin-top: 10px;
        overflow: hidden;
        line-height: 26px;
        margin-bottom: 10px;
      }
      &-btn {
        border-top: 1px solid #eee;
        display: flex;
        height: 40px;
        a {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 50%;
          position: relative;
          text-align: center;
          line-height: 40px;
          box-sizing: border-box;
          i {
            margin-right: 5px;
          }
        }
        a:first-child::before {
          content: '';
          position: absolute;
          right: 0;
          top: 15%;
          width: 1px;
          height: 70%;
          background-color: #eee;
        }
        a:hover {
          color: #8ed53c;
        }
      }
    }
  }
}
</style>
