<template>
  <div class="page-article-list--wrap">
    <ul class="page-article-list--list">
      <li class="page-article-list--item" v-for="(article, key) in articles" :key="key">
        <nav class="page-article-list--article-title" @click="$router.push({path: `/article/${article.id}`})">{{article.title}}</nav>
        <h6 class="page-article-list--article-desc">{{article.descript}}</h6>
        <div class="page-article-list--article-info">
          <span>{{article.created_at | getLocalTime}}</span>
          <i class="iconfont">&#xe60b;</i>
          <span>{{article.meta.views}}次阅读</span>
          <i class="iconfont">&#xe60b;</i>
          <span>{{article.meta.likes}}人喜欢</span>
          <i class="iconfont">&#xe60b;</i>
          <span>{{article.meta.comments}}条评论</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    articles: Array
  }
}
</script>

<style lang="less">
@prefix: page-article-list;
.@{prefix}--wrap {
  float: left;
  .@{prefix}--list {
    list-style: none;
    .@{prefix}--item {
      padding: 24px 18px 24px 0;
      margin-left: 18px;
      overflow: hidden;
      position: relative;
      .@{prefix}--article-title {
        font-weight: 400;
        font-size: 20px;
        display: inline-block;
        position: relative;
        margin-bottom: 15px;
        cursor: pointer;
        &::after {
          content: "";
          display: block;
          position: absolute;
          height: 1px;
          background-color: #555;
          width: 100%;
          bottom: 0;
          left: 0;
          transform-origin: center center;
          transform: scaleX(0);
          transition: 0.3s;
        }
        &:hover::after {
          transform: scaleX(1);
        }
      }
      .@{prefix}--article-desc {
        line-height: 24px;
        color: #777;
      }
      .@{prefix}--article-info {
        display: flex;
        align-items: center;
        margin-top: 20px;
        color: #8c8c8c;
        font-size: 12px;
      }
      &::after {
        content: "";
        display: block;
        position: absolute;
        height: 1px;
        background-color: #f1f1f1;
        bottom: 0;
        left: 0;
        width: 150px;
      }
    }
  }
}
</style>
