<template>
  <div id="app">
    <keep-alive>
      <router-view :include="cachePages" />
    </keep-alive>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name:'App',
  computed:{
    ...mapState(['cachePages'])
  }
};
</script>

<style lang="less">
.box {
  width: 200px;
  height: 200px;
  background: #ccc;
}
</style>
