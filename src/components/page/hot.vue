<template>
  <section class="hot">
      <aside>
        <span>这里是测试文本</span>    
        <span>这里是测试文本</span>    
        <span>这里是测试文本</span>    
        <span>这里是测试文本</span>    
        <span>这里是测试文本</span>    
        <span>这里是测试文本</span>    
        <span>这里是测试文本</span>    
        <span>这里是测试文本</span>    
        <span>这里是测试文本</span>    
        <span>这里是测试文本</span>    
      </aside>  
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
    name:'hot',
    data(){
        return{
            dataList: [
                {til:'webpack4.0打包优化策略整理',pngSrc:require('../../static/avatar.png'),path:'0',content:"cacheDirectory是loader的一个特定的选项，默认值是false。指定的目录(use: 'babel-loader?cacheDirectory=cacheLoader')将用来缓存loader的执行结果，减少webpack构建时Babel重新编译过程。如果设置一个空值(use: 'babel-loader?cacheDirectory') 或true(use: 'babel-loader?cacheDirectory=true') 将使用默认的缓存目录(node_modules/.cache/babel-loader)，如果在任何根目录下都没有找到 node_modules 目录，将会降级回退到操作系统默认的临时文件目录。。"},
                {til:'盘点中国医疗 “独角兽”',pngSrc:require('../../static/avatar.png'),path:'1',content:"这个春天，A股拥抱“独角兽”的消息无疑让创新型企业和资本市场感受到了融融暖意。为了支持优质创新型企业上市融资，以及吸纳已在境外上市的“BATJ”们回到A股资本市场，证监会、上交所、深交所动作积极，吸收国际资本市场经验、改革上市制度、增加制度包容性等系列举措步步推进，为独角兽企业登陆A股资本市场开辟了“绿色通道”。对独角兽的拥抱为何在此时密集发力、将采取哪些手段拥抱独角兽、哪些独角兽将驶入IPO快车道？动脉网拟解答以上问题。"},
                {til:'盘点中国医疗 “独角兽”',pngSrc:require('../../static/avatar.png'),path:'1',content:"这个春天，A股拥抱“独角兽”的消息无疑让创新型企业和资本市场感受到了融融暖意。为了支持优质创新型企业上市融资，以及吸纳已在境外上市的“BATJ”们回到A股资本市场，证监会、上交所、深交所动作积极，吸收国际资本市场经验、改革上市制度、增加制度包容性等系列举措步步推进，为独角兽企业登陆A股资本市场开辟了“绿色通道”。对独角兽的拥抱为何在此时密集发力、将采取哪些手段拥抱独角兽、哪些独角兽将驶入IPO快车道？动脉网拟解答以上问题。"}
            ],
        }
    },
    created(){
    // js动态生成的路径无法被url-loader解析到，如果你去build，会发现图片甚至不会打包输出到dist目录（webpack是按需打包的）。
    // webpack 不会解析 html 的内容,但是会寻找所有的 require ,并将require的内容搜寻后打包
        this.dataList = this.dataList.map(val=>{
            val.til = val.til.replace(/\s+/g,"")
            val.content = val.content.replace(/\s+/g,"")
            return val
        })
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
      aside{
          display: flex;
          flex-wrap: wrap;
          span{
              flex-basis: 50%;
              font-size: 0.14rem;
              text-align: center;
          }
      }
    }
</style>
