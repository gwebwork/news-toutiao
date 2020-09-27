<template>
  <div class="search-history">
    <van-cell title="搜索历史">
      <div v-if="isShow">
        <span @click="$emit('delete-all',[])">全部删除</span>
        &nbsp;&nbsp;
        <span @click="isShow = false">完成</span>
      </div>
      <van-icon @click="isShow = true" v-else name="delete"></van-icon>
    </van-cell>

    <van-cell
      v-for="(item, index) in searchHistory"
      @click="deleteData(item, index)"
      :key="index"
      :title="item"
    >
      <van-icon name="close" v-show="isShow"></van-icon>
    </van-cell>
  </div>
</template>

<script>
// import { setItem } from "@/utils/storage";
export default {
  name: "SearchHistory",
  props: {
    searchHistory: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      isShow: false,
    };
  },
  methods: {
    deleteData(item, index) {
      // 删除状态下
      if (this.isShow) {
        this.searchHistory.splice(index, 1);
        // setItem("user-searchHistory", this.searchHistory);
      } else {
        // 非删除状态
        this.$emit("search", item);
      }
    },
    deleteHis(){

    }
  },
};
</script>

<style lang="less" scoped>
.search-suggestion {
}
</style>
