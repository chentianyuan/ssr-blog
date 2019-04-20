<template>
  <div class="article-list--wrap">
    <ul class="article-list--list">
      <li class="item" v-for="(article, key) in articles" :key="key" @click="$router.push({path: `/article/${123}`})">
        <nav class="article-title">标题标题标题标题标题标题</nav>
        <h6 class="article-desc">descript descript descript</h6>
        <div class="article-info">
          <span>article.meta.views</span>
          <span>article.meta.comments</span>
          <span>article.meta.like</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    articles: {
      type: Array,
      default: () => [1, 2, 3]
    }
  }
}
</script>

<style lang="less">
.article-list--wrap {
  float: left;
  .article-list--list {
    list-style: none;
    .item {
      padding: 24px 18px;
      overflow: hidden;
      position: relative;
      .article-title {
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
      .article-desc {
        line-height: 24px;
        color: #777;
      }
      .article-info {
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
