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
    data(){
        return{
            dataList: [],
        }
    },
    created(){
    // js动态生成的路径无法被url-loader解析到，如果你去build，会发现图片甚至不会打包输出到dist目录（webpack是按需打包的）。
    // webpack 不会解析 html 的内容,但是会寻找所有的 require ,并将require的内容搜寻后打包
        var testList = []
        this.dataList = testList.map(val=>{
            val.til = val.til.replace(/\s+/g,"")
            val.content = val.content.replace(/\s+/g,"")
            return val
        })
        for(var i = 0 ; i < 1 ; i++){
            this.$http.get('/api?type=1&page=1').then(res=>{
                res.data.data.forEach(val => {
                    this.dataList.push({til:val.name,pngSrc:val.bimageuri,path:val.type,content:val.text})
                });
                this.dataList.reverse()
            })
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
