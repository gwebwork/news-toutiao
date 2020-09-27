<template>
  <!-- 页头 -->
  <div class="login-container">
    <van-nav-bar
      class="app-nav-bar"
      title="登录/注册"
      left-arrow
      @click-left="$router.back()"
    />

    <!-- 输入框和登录按钮 -->
    <van-form
      :show-error="false"
      :show-error-message="false"
      validate-first
      ref="login-form"
      @submit="onLogin"
      @failed="onFailed"
    >
      <!-- 手机号输入框 -->
      <van-field
        v-model="user.mobile"
        icon-prefix="iconfont"
        left-icon="iconshouji"
        placeholder="请输入手机号"
        name="mobile"
        center
        :rules="formRules.mobile"
      />
      <!-- 验证码输入框 -->
      <van-field
        v-model="user.code"
        clearable
        icon-prefix="iconfont"
        left-icon="iconyanzhengma"
        placeholder="请输入验证码"
        name="code"
        center
        :rules="formRules.code"
      >
        <template #button>
          <van-count-down
            v-if="isCountShow"
            :time="1000 * 60"
            format="sss"
            @finish="isCountShow = false"
          />
          <van-button
            v-else
            size="small"
            class="send-btn"
            :loading="isBtnLoading"
            round
            @click.prevent="onSendms"
            >获取验证码</van-button
          >
        </template>
      </van-field>
      <!-- 登录按钮 -->
      <div class="login-btn-wrap">
        <van-button class="login-btn" type="info" block>登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { login, sendSms } from "@/api/user";
import { Toast } from "vant";
export default {
  name: "LoginIndex",
  data() {
    return {
      user: {
        mobile: "17090086870", //手机号
        code: "246810", //验证码
      },
      formRules: {
        mobile: [
          { required: true, message: "请输入手机号" },
          { pattern: /^1[3|5|7|8|9]\d{9}$/, message: "手机号格式错误" },
        ],
        code: [
          { required: true, message: "请输入验证码" },
          { pattern: /^\d{6}$/, message: "验证码错误" },
        ],
      },
      isCountShow: false,
      isBtnLoading: false,
    };
  },
  methods: {
    async onLogin() {
      // 登录提示,必须写在前面
      Toast.loading({
        message: "登录中...",
        forbidClick: true, //禁止背景点击
        duration: 0, //展示时长，值为0时，toast不会消失
      });
      //登录方法
      //1.找到数据接口
      //2.封装请求方法
      try {
        //3.请求调用登录
        //4.处理响应结果
        const res = await login(this.user);
        console.log(res);
        Toast.success("登录成功");
        //登录成功将用户信息(token)存储到vuex中
        this.$store.commit("setUser", res.data.data);
        // 清除layout的缓存
        this.$store.commit('removecachePages','LayoutIndex')
        this.$router.back();
      } catch (err) {
        Toast.fail("登录失败,手机号或验证码错误");
      }
    },
    onFailed(error) {
      if (error.errors[0]) {
        Toast({
          message: error.errors[0].message,
          position: "top",
        });
      }
    },

    async onSendms() {
      //发送验证码
      try {
        // 校验手机号码
        await this.$refs["login-form"].validate("mobile");
        await sendSms(this.user.mobile);
        this.isBtnLoading = true; //让按钮转
        this.isCountShow = true;
        // 验证通过，发送验证码
      } catch (err) {
        let message = "";
        if (err && err.response && err.response.status == 429) {
          message = "发送太频繁了，请稍后重试";
        } else if (err.name == "mobile") {
          message = err.message;
        } else {
          message = "发送失败，请稍后重试";
        }
        Toast({
          message,
          position: "top",
        });
      }
      this.isBtnLoading = false;
    },
  },
};
</script>

<style lang="less" scoped>
.login-container {
  .login-btn-wrap {
    padding: 16px 26px;
    border-radius: 5px;
    .login-btn {
      background-color: #6db4fb;
      border: none;
      .van-button__text {
        font-size: 15px;
      }
    }
  }
  .send-btn {
    width: 80px;
    height: 30px;
    background-color: #ededed;
    .van-button__text {
      font-size: 11px;
      color: #666;
    }
  }
}
</style>
