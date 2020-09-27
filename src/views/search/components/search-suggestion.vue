<template>
  <div class="search-suggestion">
    <van-cell
      icon="search"
      v-for="(item, index) of suggestions"
      @click="$emit('search', item)"
      :key="index"
    >
      <div slot="title" v-html="highlight(item)"></div>
    </van-cell>
  </div>
</template>

<script>
import { getSearchSuggestions } from "@/api/search";
import { debounce } from "lodash";
export default {
  name: "SearchSuggestion",
  props: {
    searchText: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      suggestions: [], //获取的搜索建议
    };
  },
  watch: {
    searchText: {
      handler: debounce(async function() {
        //用户输入时，请求接口获取搜索建议
        const { data } = await getSearchSuggestions(this.searchText);
        console.log(data);
        this.suggestions = data.data.options;
      }, 500),
      immediate: true,
    },
  },
  methods: {
    highlight(item) {
      return item.replace(
        new RegExp(this.searchText, "gi"),
        `<span style="color:red">${this.searchText}</span>`
      );
    },
  },
};
</script>

<style lang="less" scoped>
.search-suggestion {
}
</style>
