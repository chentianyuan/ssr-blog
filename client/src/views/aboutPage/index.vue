<template>
  <div class="about-page hack-padding">
    <div class="userInfo">
      <div class="info">
        <p>
          <i class="iconfont icon">&#xe7ae;</i>
          <span></span>
        </p>
        <p>
          <i class="iconfont icon">&#xe7c6;</i>
          <span>江南大学 · 计算机科学与技术专业</span>
        </p>
        <p>
          <i class="iconfont icon">&#xe849;</i>
          <span>唱，跳，rap，篮球，😂</span>
        </p>
        <p>
          <i class="iconfont icon">&#xe783;</i>
          <span>为了爱与世界和平而努力</span>
        </p>
        <p>
          <i class="iconfont icon">&#xe7de;</i>
          <span>
            <a href="https://www.jianshu.com/u/933ffe49535e" target="_blank">
              <i class="iconfont like">&#xe602;</i>
            </a>
            <a href="https://github.com/chentianyuan" target="_blank">
              <i class="iconfont like">&#xe64a;</i>
            </a>
            <a href="https://www.zhihu.com/people/chen-xiao-sa-30/activities" target="_blank">
              <i class="iconfont like">&#xe87c;</i>
            </a>
            <a href="https://weibo.com/5321922711/profile?topnav=1&wvr=6" target="_blank">
              <i class="iconfont like">&#xe882;</i>
            </a>
          </span>
        </p>
        <p>
          <i class="iconfont icon">&#xe7fc;</i>
          <span>很多事情不是因为有希望才去坚持，而是坚持了才有希望。</span>
        </p>
      </div>
      <div class="user">
        <div class="bg stage">
          <canvas id="canvas"></canvas>
        </div>
        <div class="name">
          <h2 class="title">Ytc</h2>
          <p class="disc">JS stack developer</p>
          <p class="friend">Friend me</p>
          <div class="weixin"></div>
        </div>
        <img class="avatar" :src="require('@/static/imgs/common/avatar.png')">
        <!-- <img class="averter" :src="require('@/static/imgs/common/avatar.png')"> -->
      </div>
    </div>
    <div id="map" class="map"></div>
  </div>
</template>

<script>
/* eslint-disable */
import { map } from './util/map.js'
function initialize () {
  // 百度地图API功能
  let BMap = window.BMap
  let map = new BMap.Map('map') // 创建Map实例
  let point = new BMap.Point(120.254125, 30.210784)
  let marker = new BMap.Marker(point)
  let infoWindow = new BMap.InfoWindow('where i am')
  map.addOverlay(marker)
  map.centerAndZoom(point, 16) // 初始化地图,设置中心点坐标和地图级别
  //添加地图类型控件
  map.addControl(
    new BMap.MapTypeControl({
      mapTypes: [BMAP_NORMAL_MAP, BMAP_HYBRID_MAP]
    })
  )
  map.setCurrentCity('浙江') // 设置地图显示的城市 此项是必须设置的
  map.enableScrollWheelZoom(true) // 开启鼠标滚轮缩放
  marker.addEventListener('click', function () {
    map.openInfoWindow(infoWindow, point)
  })
}
export default {
  name: 'about',
  mounted () {
    if (!window.BMap) {
      map('9sFypaCX7Idv33zycVShV5nK3l9e1bLm').then(BMap => initialize(BMap)).catch(e => console.log(e))
    }
  }
}
</script>

<style lang="less">
.about-page {
  width: 900px;
  margin: 0 auto;
  color: #555;
  overflow: hidden;
  .userInfo {
    margin-top: 10px;
    clear: both;
    overflow: hidden;
    height: 382px;
    display: flex;
    justify-content: space-between;
    .info {
      width: 630px;
      border: 1px solid #f1f1f1;
      box-sizing: border-box;
      padding: 20px;
      height: 380px;
      p {
        line-height: 54px;
        color: #555;
        transition: color 0.3s;
      }
      .icon {
        font-size: 16px;
        padding-right: 15px;
        color: #ccc;
      }
      .like {
        color: #555;
        display: inline-block;
        padding-right: 15px;
      }
    }
    .user {
      width: 250px;
      height: 380px;
      position: relative;
      cursor: pointer;
      .stage {
        width: 250px;
        height: 110px;
        background-color: #ccc;
      }
      .name {
        text-align: center;
        border-left: 1px solid #f1f1f1;
        border-bottom: 1px solid #f1f1f1;
        border-right: 1px solid #f1f1f1;
        overflow: hidden;
        position: relative;
        box-sizing: border-box;
        height: 270px;
        .title {
          font-weight: 400;
          margin-top: 80px;
        }
        .disc {
          margin-top: 10px;
        }
        .friend {
          display: inline-block;
          padding: 5px 20px;
          border: 1px dashed #3fb76c;
          margin-top: 20px;
        }
      }
      .avatar {
        position: absolute;
        width: 80px;
        height: 80px;
        border-radius: 50px;
        z-index: 1;
        left: 85px;
        top: 70px;
        border: 4px solid hsla(0, 0%, 100%, 0.5);
        transition: 0.3s;
      }
      .weixin {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        width: 100%;
        height: 100%;
        background-image: url('~@/static/imgs/weixin.jpg');
        background-size: contain;
        background-repeat: no-repeat;
        background-position: top;
        opacity: 0;
        z-index: 2;
      }
      &:hover .avatar {
        transform: rotate(360deg);
      }
      &:hover .weixin {
        opacity: 1;
      }
    }
  }
  .map {
    width: 900px;
    border: 1px solid #f1f1f1;
    height: 200px;
    margin-top: 20px;
    padding: 10px;
    .BMap_cpyCtrl, .anchorBL {
      display: none;
    }
  }
}
</style>
