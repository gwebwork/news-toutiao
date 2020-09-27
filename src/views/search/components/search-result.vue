<template>
  <div class="search-result">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell v-for="(item,index) in list" :key="index" :title="item.title" />
    </van-list>
  </div>
</template>

<script>
import { getSearchResult } from "@/api/search";
export default {
  name: "SearchResult",
  props: {
    searchText: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1, //页码
      perPage: 10, //每页多少条
    };
  },
  methods: {
    async onLoad() {
      const { data } = await getSearchResult({
        page: this.page, //页码
        per_page: this.perPage, //每页大小
        q: this.searchText //搜索字符
      })
      this.list.push(...data.data.results)
      this.loading=false
      if(data.data.results){
        this.page++
      }else{
        this.finished=true
      }
    },
  },
};
</script>

<style lang="less" scoped>
.search-result {
  position: fixed;
  top: 55px;
  left: 0;
  right: 0;
  bottom: 0;
  overflow-y: auto;
}
</style>
