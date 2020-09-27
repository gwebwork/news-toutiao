<template>
  <div class="my-container">
    <van-cell-group v-if="user" class="my-info">
      <van-cell
        :border="false"
        class="base-info"
        center
      >
        <van-image
          class="avatar"
          slot="icon"
          fit="cover"
          round
          :src="currentUser.photo"
        />
        <div class="myName" slot="title">{{currentUser.name}}</div>
        <van-button to="/user/profile" class="update-btn" size="small">编辑资料</van-button>
      </van-cell>

      <van-grid class="data-info" :border="false">
        <van-grid-item class="data-info-item">
          <div class="text-wrap" slot="text">
            <div class="count">{{currentUser.art_count}}</div>
            <div class="text">头条</div>
          </div>
        </van-grid-item>
        <van-grid-item class="data-info-item">
          <div class="text-wrap" slot="text">
            <div class="count">{{currentUser.follow_count}}</div>
            <div class="text">关注</div>
          </div>
        </van-grid-item>
        <van-grid-item class="data-info-item">
          <div class="text-wrap" slot="text">
            <div class="count">{{currentUser.fans_count}}</div>
            <div class="text">粉丝</div>
          </div>
        </van-grid-item>
        <van-grid-item class="data-info-item">
          <div class="text-wrap" slot="text">
            <div class="count">{{currentUser.like_count}}</div>
            <div class="text">获赞</div>
          </div>
        </van-grid-item>
      </van-grid>
    </van-cell-group>

    <!-- 未登录时页面样式 -->
    <div v-else class="not-login">
      <img
        @click="$router.push('/login')"
        class="mobile"
        src="./avatar-phone.png"
        alt=""
      />
      <div @click="$router.push('/login')" class="text">登录/注册</div>
    </div>

    <van-grid class="nav-grid mb-4" :column-num="2">
      <van-grid-item class="nav-grid-item" icon="star-o" text="收藏" />
      <van-grid-item
        class="nav-grid-item"
        icon="browsing-history-o"
        text="历史"
      />
    </van-grid>

    <van-cell title="消息通知" is-link to="/index" />
    <van-cell class="mb-4" to="/user/chat" title="人工服务" is-link />
    <van-cell v-if="user" @click="onLogout" class="logout-call" title="退出登录" />
  </div>
</template>

<script>
import { mapState } from "vuex";
import { getCurrentUser } from '@/api/user'
export default {
  name: "MyIndex",
  data() {
    return {
      currentUser:{}
    };
  },
  methods: {
    onLogout() {
      this.$dialog.confirm({
        title: "退出",
        message: "确认退出吗？"
      })
        .then(() => { //确认
          // 清空token
          this.$store.commit('setUser',null);
        })
        .catch(() => { //取消
          
        });
    },
    // 获取当前用户信息
    async loadCurrentUser(){
      const {data}=await getCurrentUser();
      console.log(data)
      this.currentUser=data.data
    }
  },
  created(){
    this.loadCurrentUser()
  },
  computed: {
    ...mapState(["user"]), //把vuex保存的token映射到本地
  },
};
</script>

<style lang="less" scoped>
.my-container {
  .my-info {
    background: url("./banner.png") no-repeat;
    background-size: cover;
    .base-info {
      box-sizing: border-box;
      height: 115px;
      padding-top: 38px;
      padding-bottom: 11px;
      background-color: unset;
      .avatar {
        box-sizing: border-box;
        width: 66px;
        height: 66px;
        border: 1px solid #fff;
        margin-right: 11px;
      }
      .myName {
        color: #fff;
        font-size: 15px;
      }
      .update-btn {
        height: 20px;
        font-size: 10px;
        color: #666;
        border-radius: 10px;
      }
    }
    .data-info {
      .data-info-item {
        height: 65px;
        color: #fff;
        .text-wrap {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          .count {
            font-size: 18px;
          }
          .text {
            font-size: 11px;
          }
        }
      }
    }
    /deep/.van-grid-item__content {
      background-color: unset;
    }
  }
  .nav-grid {
    .nav-grid-item {
      height: 70px;
    }
  }
  .logout-call {
    text-align: center;
    color: #d86262;
  }
  .mb-4 {
    margin-bottom: 5px;
  }
  .not-login {
    height: 180px;
    background: url("./banner.png") no-repeat;
    background-size: cover;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    .mobile {
      width: 66px;
      height: 66px;
    }
    .text {
      color: #fff;
      font-size: 14px;
      margin-top: 5px;
    }
  }
}
</style>
