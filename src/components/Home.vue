<template>
  <div class='homePage'>
      <navBar>
        <nav class='nav-til'>
          <a :class="activeNav == key?'nav-item active-item':'nav-item'" 
             href="javascript:" 
             v-for="(item,key) in navItems"
             @click="changeNav(key)"
          >{{item.itemName}}</a>
          <span :class="initP?'nav-border init':'nav-border'"></span>
        </nav>
      </navBar>
      <router-view></router-view>
      <Foot>
        <div>
          prerender测试
        </div>
      </Foot>
  </div>
</template>

<script>
import navBar from './common/navBar'
import Foot from './common/foot'
export default {
  data(){
    return{
      navItems: [{itemName:'沸点'},{itemName:'发现'}],
      activeNav: 0,
      initP: false,
      firstTime: true
    }
  },
  components:{
    navBar,Foot
  },
  watch:{
    '$route':function(){
      this.setNavbom()
    }
  },
  created(){
    this.setNavbom()
  },
  methods:{
    changeNav(index){
      this.initP = true                
      this.activeNav = index
      var route =  this.$route
      if(route.path !== '/findNews' && index === 1){
        this.$router.push({path:'/findNews'})
      }
      if((route.path !== '/' || route.path !== '/hotNews') && index === 0){
        this.$router.push({path:'/hotNews'})
      }
    },
    setNavbom(){
      // 路由 --> activeNav --> navBottom
      if(this.$route.path === '/findNews'){
        this.activeNav = 1
      }else{
        this.activeNav = 0
      }
      this.$nextTick(()=>{
        var left = document.querySelector(".active-item").getBoundingClientRect().left 
        document.querySelector(".nav-border").style.left = `${left}px`
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .homePage{
    font-size: 0.24rem;    
    .navBar{
      .nav-til{
        display: flex;
        justify-content: space-around;
        background: #f8f8f8;
        .nav-item{
          flex:1;
          font-size: 0.14rem;
          line-height: 0.5rem;
          color:#000;
          text-align: center;
        }
        .active-item{
          position: relative;
          color:dodgerblue;
        }
        .nav-border{
          top: 0.5rem;
          position: absolute;
          height: 2px;
          width: 50%;
          background: rgb(132, 172, 212);
          left: 0;
        }
        .init{
          transition: .25s cubic-bezier(.42, 0, .58, 1) all;          
        }
      }
    }
    footer{
      width:100%;
      position: fixed;
      bottom: 0.1rem;
      text-align: center;
      font-size: 0.12rem;
    }
  }
</style>
