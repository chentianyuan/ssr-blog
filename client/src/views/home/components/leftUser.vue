<template>
  <div class="page-home--left-user">
    <div class="part">
      <div class="part-head">
        <img :src="require('@/static/imgs/common/avatar.png')">
        <h1 class="title">
          <a class="name">{{userInfo.name}}</a>
          <p class="motto">{{userInfo.motto}}</p>
        </h1>
      </div>
      <div class="part-contact">
        <a class="icon-font"></a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      userInfo: {
        name: 'Tacker',
        motto: '死亡如风 常伴吾身'
      }
    }
  }
}
</script>

<style lang="less">
.page-home--left-user {
  position: relative;
  flex-basis: 50%;
  background: url('../../../static/imgs/common/bk-home.jpg');
  .part {
    position: absolute;
    height: 400px;
    width: 400px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    .part-head {
      --fontColor: #5e5e5e;
      .flex-column();
      justify-content: center;
      align-items: center;
      img {
        height: 100px;
        width: 100px;
        border-radius: 50%;
        transition: all .5s;
        box-shadow: 10px 10px 10px #5e5e5e;
        cursor: pointer;
      }
      img:hover {
        transform: rotate(360deg);
        box-shadow: 0 0 20px #fff;
      }
      .title {
        text-align: center;
        .name, .motto {
          padding-top: 10px;
          padding-bottom: 10px;
          color: var(--fontColor);
        }
        .name {
          font-size: 22px;
          font-weight: bold;
        }
        .motto {
          font-size: 12px;
        }
      }
    }
  }
}
</style>
