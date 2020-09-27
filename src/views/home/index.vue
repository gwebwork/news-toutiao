<template>
  <div class="home-container">
    <!-- 导航栏 -->
    <van-nav-bar class="app-nav-bar">
      <van-button
        slot="title"
        class="search-btn"
        type="info"
        icon="search"
        size="small"
        round
        to="/search"
        >搜索</van-button
      >
    </van-nav-bar>

    <!-- 文章频道列表 -->
    <van-tabs class="channel-tabs" v-model="active">
      <van-tab v-for="item in channels" :key="item.id" :title="item.name"
        ><article-list :channel="item"
      /></van-tab>

      <div slot="nav-right" class="wap-nav-ploace"></div>
      <div slot="nav-right">
        <van-icon
          name="wap-nav"
          class="wap-nav-wrap"
          @click="isChannelEditshow = true"
        />
      </div>
    </van-tabs>

    <!-- 选择频道弹出层 -->
    <van-popup
      v-model="isChannelEditshow"
      position="bottom"
      closeable
      class="channel-edit"
      close-icon-position="top-left"
      get-container="body"
      style="height:100%"
      ><channel-edit
        :user-channels="channels"
        @close="isChannelEditshow = false"
        @updata-active="updataActive"
        :active="active"
    /></van-popup>
  </div>
</template>

<script>
import { getUserChannels } from "@/api/user";
import ArticleList from "./components/article-list";
import ChannelEdit from "./components/channel-edit";
import { mapState } from "vuex";
import { getItem } from "@/utils/storage";
export default {
  name: "HomeIndex",
  data() {
    return {
      active: 0,
      channels: [], //频道列表
      isChannelEditshow: true,
    };
  },
  methods: {
    // 获取频道列表
    async loadChannels() {
      let channels = []
      if (this.user) {
        const { data } = await getUserChannels();
        channels = data.data.channels;
      } else {
        const localChannels = getItem("user-channels");
        if (localChannels) {
          channels = localChannels
        } else {
          const { data } = await getUserChannels();
          channels = data.data.channels;
        }
      }
      this.channels=channels
    },
    updataActive(index) {
      this.active = index;
    },
  },
  computed: {
    ...mapState(["user"]) 
  },
  created() {
    // 页面一加载频道列表显示在顶部
    this.loadChannels();
  },

  components: {
    ArticleList,
    ChannelEdit,
  },
};
</script>

<style lang="less" scoped>
.home-container {
  /deep/ .van-nav-bar__title {
    max-width: none;
  }
  .search-btn {
    width: 277px;
    height: 32px;
    background: #5babfb;
    border: none;
    .van-button__text {
      font-size: 14px;
    }
    .van-icon {
      font-size: 16px;
    }
  }

  .channel-tabs {
    /deep/.van-tab {
      border-right: 1px solid #edeff3;
      border-bottom: 1px solid #edeff3;
    }
    /deep/.van-tabs__line {
      width: 15px !important;
      height: 3px;
      background: #3296fa;
      bottom: 20px;
    }
  }
  // 频道选择弹出层
  .channel-edit {
  }
  .wap-nav-wrap {
    height: 44px;
    width: 33px;
    position: fixed;
    right: 0;
    line-height: 44px;
    background-color: #fff;
    opacity: 0.9;
    display: flex;
    justify-content: center;
    align-items: center;
    .van-icon {
      font-size: 24px;
    }
  }
  .wap-nav-ploace {
    width: 33px;
    flex-shrink: 0;
  }
}
</style>
