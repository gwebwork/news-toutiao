<template>
  <div class="search-container">
    <!-- 搜索栏 -->
    <form action="/">
      <van-search
        show-action
        placeholder="请输入搜索关键词"
        v-model="searchText"
        @search="onSearch(searchText)"
        @cancel="$router.back()"
        @focus="isResultShow = false"
      />
    </form>

    <!-- 搜索结果 -->
    <search-result v-if="isResultShow" :search-text="searchText" />

    <!-- 联想建议 -->
    <search-suggestion
      @search="onSearch"
      v-else-if="searchText"
      :search-text="searchText"
    />

    <!-- 搜索历史记录 -->
    <search-history
      @delete-all="searchHistory = $event"
      @search="onSearch"
      :search-history="searchHistory"
      v-else
    />
  </div>
</template>

<script>
import SearchSuggestion from "./components/search-suggestion";
import SearchHistory from "./components/search-history";
import SearchResult from "./components/search-result";
import { setItem, getItem } from "@/utils/storage";
export default {
  name: "SearchIndex",
  data() {
    return {
      searchText: "",
      isResultShow: false, //控制搜索结果的显示状态
      searchHistory: getItem("user-searchHistory") || [], //历史记录数组
    };
  },
  methods: {
    onSearch(searchText) {
      //触发搜索
      this.searchText = searchText;
      const i = this.searchHistory.indexOf(searchText);
      if (i !== -1) {
        this.searchHistory.splice(i, 1);
      }
      this.searchHistory.unshift(searchText);
      this.isResultShow = true;
      // 数据本地化
    },
    onCancel() {
      //取消搜索
    },
  },
  watch: {
    searchHistory() {
      setItem("user-searchHistory", this.searchHistory);
    },
  },
  components: {
    SearchSuggestion,
    SearchHistory,
    SearchResult,
  },
};
</script>

<style lang="less" scoped>
.search-container {
}
</style>
