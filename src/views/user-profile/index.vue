<template>
  <div class="user-profile">
    <van-nav-bar
      class="app-nav-bar"
      title="个人信息"
      left-arrow
      @click-left="$router.back()"
    />

    <van-cell title="头像" is-link center>
      <van-image round width="30" height="30" fit="cover" :src="user.photo" />
    </van-cell>
    <van-cell
      title="昵称"
      @click="isEditUserShow = true"
      :value="user.name"
      is-link
    />
    <van-cell title="性别" :value="user.gender" is-link />
    <van-cell title="生日" :value="user.birthday" is-link />

    <van-popup
      v-model="isEditUserShow"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <update-name
        v-if="isEditUserShow"
        @update-name="user.name = $event"
        :userName="user.name"
        @close="isEditUserShow = false"
      />
    </van-popup>
  </div>
</template>

<script>
import { getUserProfile } from "@/api/user";
import UpdateName from "./components/update-name";
export default {
  name: "UserProfile",
  data() {
    return {
      user: {}, //用户数据
      isEditUserShow: true,
    };
  },
  created() {
    this.loadUserProfile();
  },
  methods: {
    async loadUserProfile() {
      const { data } = await getUserProfile();
      this.user = data.data;
    },
  },
  components: {
    UpdateName,
  },
};
</script>

<style lang="less" scoped>
.van-popup {
  background-color: #f5f7f9;
}
</style>
