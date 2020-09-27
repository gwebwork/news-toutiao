<template>
  <div class="article-container">
    <van-nav-bar
      class="app-nav-bar"
      title="文章详情"
      left-arrow
      @click-left="$router.back()"
    />
    <h1 class="title">{{ article.title }}</h1>
    <van-cell center class="user-info">
      <div slot="title" class="name">{{ article.aut_name }}</div>
      <van-image
        class="avatar"
        slot="icon"
        fit="cover"
        round
        :src="article.aut_photo"
      />
      <div slot="label" class="pudate">
        {{ article.pubdate | relativeTime }}
      </div>
      <van-button
        :icon="article.is_followed ? '' : 'plus'"
        round
        class="follow-btn"
        :type="article.is_followed ? 'default' : 'info'"
        size="small"
        @click="onFollow"
        >{{ article.is_followed ? "已关注" : "关注" }}</van-button
      >
    </van-cell>
    <div class="container" v-html="article.content"></div>


  </div>
</template>

<script>
import { getArticleById } from "@/api/article";
import { addFollow, deleteFollow } from "@/api/user";
export default {
  name: "ArticleIndex",
  props: {
    articleId: {
      type: [String, Number, Object],
      required: true,
    },
  },
  data() {
    return {
      article: {},
    };
  },
  methods: {
    async loadArticle() {
      const { data } = await getArticleById(this.articleId);
      this.article = data.data;
    },
    async onFollow() {
      //已关注，取消关注
      if (this.article.is_followed) {
        await deleteFollow(this.article.aut_id);
        // this.article.is_followed=false
      } else {
        //没关注，点击关注
        await addFollow(this.article.aut_id);
        // this.article.is_followed=true
      }
      this.article.is_followed = !this.article.is_followed;
    },
  },
  created() {
    this.loadArticle();
  },
  components: {
  },
};
</script>

<style lang="less" scoped>
.article-container {
  .title {
    font-size: 20px;
    color: #3a3a3a;
    padding: 14px;
    background-color: #fff;
    margin: 0;
  }
  .user-info {
    .name {
      font-size: 12px;
      color: #333;
    }
    .pudate {
      font-size: 11px;
      color: #b4b4b4;
    }
    .avatar {
      width: 35px;
      height: 35px;
      margin-right: 8px;
    }
    .follow-btn {
      width: 85px;
      height: 29px;
    }
  }
  .container {
    padding: 14px;
    background-color: #fff;
    margin: 0;
    list-style: unset;
    font-size: 12px;
  }
  
}
</style>