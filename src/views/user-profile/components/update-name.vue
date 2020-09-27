<template>
  <div class="update-name">
    <van-nav-bar
      title="修改昵称"
      left-text="取消"
      right-text="完成"
      @click-left="$emit('close')"
      @click-right="onConfirm"
    />
    <div class="pop-pad">
      <van-field
        v-model="locaName"
        rows="2"
        autosize
        type="textarea"
        maxlength="7"
        placeholder="请输入昵称"
        show-word-limit
      />
    </div>
  </div>
</template>

<script>
import { updateUserProfile } from "@/api/user";
export default {
  name: "UpdateName",
  props: {
    userName: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      locaName: this.userName,
    };
  },
  methods: {
    async onConfirm() {
      this.$toast.loading({
        message: "保存中",
        forbidClick: true,
      });

      try {
        await updateUserProfile({
          name: this.locaName,
        });
        this.$emit("update-name", this.locaName);
        this.$emit("close");
        this.$toast.success("保存成功");
      } catch (err) {
        if (err && err.response && err.response.status == 409) {
          this.$toast.fail("昵称已存在");
        }
      }
    },
  },
};
</script>

<style scoped lang="less">
.pop-pad {
  padding: 10px;
}
</style>
