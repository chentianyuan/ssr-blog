<template>
  <section class="hot">  
      <ul>
          <li class="hot-item" v-for="item in dataList" @click="hotArticle(item.path)">
            <img class="hot-img" :src="item.pngSrc"/>
            <div class="hot-word">
                <a class="hot-til">{{item.til}}</a>
                <p class="hot-content">{{item.content}}</p>
            </div>
          </li>
      </ul>
  </section>
</template>

<script>
export default {
    name:'find',
    asyncData({store,route}){
        return store.dispatch('fetchSSRNews')
    },
    computed:{
        dataList(){
            return this.$store.state.dataList
        }
    },
    methods:{
        hotArticle(path){
            // this.$router.push({path:`/article/${path}`,params:{articleId:path}})
            // params可以用来传参，也可以用于路由跳转
            this.$router.push({name:'article',params:{articleId:path}})
            // 而query只是写在路由中的查询参数，无法用于路由跳转
        }
    }
}
</script>

<style lang="less" scoped>
    .hot{
      padding: 0.16rem 0.12rem;
      ul{
          display: flex;
          flex-wrap: wrap;
          .hot-item{
              flex-basis: 100%;
              display: flex;
              align-items: center;
              margin-bottom: 0.12rem;
              .hot-img{
                height: 0.6rem;
                width: 0.6rem;
                border-radius:50%;
              }
              .hot-word{
                  flex: 5;
                  margin-left: 0.1rem;
                .hot-til{
                  font-size: 0.14rem;
                }
                .hot-content{
                    font-size: 0.12rem;
                    position: relative;
                    overflow: hidden;
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 3;
                }
              }
          }
          &:last-child{
              margin-bottom: 0.2rem;
          }
      } 
    }
</style>
