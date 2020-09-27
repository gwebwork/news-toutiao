<template>
  <div class="article-list" ref="article-list">
    <van-pull-refresh
      :success-text="refreshSuccessText"
      :success-duration="800"
      v-model="isRefreshLoading"
      @refresh="onRefresh"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <article-item
          v-for="(article, index) in articles"
          :key="index"
          :article="article"
        />
        <!-- <van-cell
          v-for="(article, index) in articles"
          :key="index"
          :title="article.title"
        /> -->
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticles } from "@/api/article";
import ArticleItem from "@/components/article-item";
import { debounce } from "lodash";
export default {
  name: "ArticleList",
  components: {
    ArticleItem,
  },
  props: {
    channel: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      articles: [], //文章列表
      loading: false,
      finished: false,
      timestamp: null,
      isRefreshLoading: false, //下拉刷新
      refreshSuccessText: "", //下拉刷新成功提示
      scrollTop: 0, //列表滚动的顶部的距离
    };
  },
  methods: {
    async onLoad() {
      // 异步请求更新数据
      const { data } = await getArticles({
        channel_id: this.channel.id,
        timestamp: this.timestamp || Date.now(), //时间戳，相当于页码
        with_top: 1, //是否包含置顶文章1是要置顶，0不置顶
      });
      console.log(data);
      // 把数据放到list中
      this.articles.push(...data.data.results);
      // 加载状态结束
      this.loading = false;
      // 数据全部加载完成
      if (data.data.length) {
        this.timestamp = data.data.pre_timestamp;
      } else {
        this.finished = true;
      }
    },
    async onRefresh() {
      // 下拉获取数据
      const { data } = await getArticles({
        channel_id: this.channel.id,
        timestamp: Date.now(), //时间戳，相当于页码
        with_top: 1, //是否包含置顶文章1是要置顶，0不置顶
      });
      this.articles.unshift(...data.data.results);
      this.isRefreshLoading = false;
      this.refreshSuccessText = `更新了${data.data.results.length}条数据`;
    },
  },
  mounted() {
    const articleList = this.$refs["article-list"];
    articleList.onscroll = debounce(() => {
      this.scrollTop = articleList.scrollTop;
    },50);
  },
  activated(){
    this.$refs["article-list"].scrollTop=this.scrollTop
  }
};
</script>

<style lang="less" scoped>
.article-list {
  width: 100%;
  position: fixed;
  bottom: 50px;
  left: 0;
  top: 90px;
  overflow-y: auto;
}
</style>
