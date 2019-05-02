<template>
  <div class="page-home--left-user">
    <div class="page-home--part">
      <div class="page-home--part-head">
        <img :src="require('@/static/imgs/common/avatar.png')">
        <h1 class="page-home--title">
          <a class="page-home--name">{{userInfo.name}}</a>
          <p class="page-home--motto">{{userInfo.motto}}</p>
        </h1>
      </div>
      <div class="page-home--part-contact">
        <slot name="icon" />
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
  background-image: url('../../../static/imgs/common/bk-home2.jpg');
  background-repeat: round;
  .page-home--part {
    position: absolute;
    height: 400px;
    width: 400px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 2;
    .page-home--part-head {
      --fontColor: #5e5e5e;
      .flex-column(center, center);
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
      .page-home--title {
        text-align: center;
        padding-top: 16px;
        padding-bottom: 30px;
        .name, .motto {
          padding-top: 10px;
          padding-bottom: 10px;
          color: var(--fontColor);
        }
        .page-home--name {
          font-size: 22px;
          font-weight: bold;
        }
        .page-home--motto {
          font-size: 12px;
          padding-top: 10px;
          padding-bottom: 10px;
        }
      }
    }
    .page-home--part-contact {
      margin: 20px 0;
      .flex-initial(center, center);
      a {
        height: 34px;
        width: 34px;
        color: #fff;
        .flex-initial(center, center);
        background-color: #5e5e5e;
        transition: background-color .3s;
        border-radius: 2px;
        margin: 0 10px;
        cursor: pointer;
      }
      a:hover {
        background-color: transparent;
      }
    }
  }
  &::after {
    content: '';
    width: 100%;
    height: 100%;
    position: absolute;
    background: hsla(0, 0%, 0, 0.5);
    z-index: 1;
  }
}
</style>
