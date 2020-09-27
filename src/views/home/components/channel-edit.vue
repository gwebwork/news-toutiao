<template>
  <div class="channel-edit">
    <van-cell center :border="false">
      <div slot="title" class="channel-title">我的频道</div>
      <van-button
        @click="isEdit = !isEdit"
        round
        type="danger"
        plain
        size="mini"
        >{{ isEdit ? "完成" : "编辑" }}</van-button
      >
    </van-cell>
    <!--   -->
    <van-grid :gutter="10">
      <van-grid-item
        class="grid-item"
        :class="{ active: index === active }"
        :icon="isEdit && index !== 0 ? 'clear' : ''"
        v-for="(channel, index) in userChannels"
        :key="index"
        :text="channel.name"
        @click="onUserChannelClick(channel,index)"
      />
    </van-grid>

    <van-cell center :border="false">
      <div slot="title" class="channel-title">频道推荐</div>
    </van-cell>
    <van-grid :gutter="10">
      <van-grid-item
        class="grid-item"
        v-for="(channel, index) in recommendChannels"
        :key="index"
        :text="channel.name"
        @click="onAdd(channel)"
      />
    </van-grid>
  </div>
</template>

<script>
import { getAllChannels, addUserChannel,deleteUserChannel } from "@/api/article";
import { mapState } from "vuex";
import { setItem } from "@/utils/storage";
export default {
  name: "ChannelEdit",
  props: {
    userChannels: {
      type: Array,
      required: true,
    },
    active: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      allChannels: [], //所有频道列表
      isEdit: false, //
    };
  },
  computed: {
    ...mapState(["user"]), //获取用户token
    //   推荐频道等于所有频道减去我的频道
    recommendChannels() {
      //   return this.allChannels.filter(channel=>{
      //       return !this.userChannels.find(userChannel=>{
      //           return userChannel.id===channel.id
      //       })

      //   })

      const arr = [];
      this.allChannels.forEach((channel) => {
        let flag = false;
        for (let i = 0; i < this.userChannels.length; i++) {
          if (this.userChannels[i].id === channel.id) {
            flag = true;
            break;
          }
        }
        if (!flag) {
          arr.push(channel);
        }
      });
      return arr;
    },
  },
  methods: {
    async loadAllChannels() {
      //  获取所以有频道
      const { data } = await getAllChannels();
      this.allChannels = data.data.channels;
    },
    //点击频道推荐添加到我的频道
    async onAdd(channel) {
      //把channel添加到我的频道userChannels中，
      this.userChannels.push(channel);
      //这样可以做，但页面刷新又恢复原样了，所以要进行数据持久化
      if (this.user) {
        await addUserChannel({
          channels: [
            {
              id: channel.id,
              seq: this.userChannels.length,
            },
          ],
        });
      } else {
        setItem("user-channels", this.userChannels);
      }
    },
    // 点击非编辑时，点击频道关闭弹层切换到频道，编辑时，删除频道
    onUserChannelClick(channel,index) {
      if (this.isEdit && index != 0) {
        this.deleteChannel(channel,index);
      } else {
        this.switchChannel(index);
      }
    },
    async deleteChannel(channel,index) {
      if (index <= this.active) {
        this.$emit("updata-active", this.active - 1);
      }
      this.userChannels.splice(index, 1);
      // 删除数据持久化
      if (this.user) {
       await deleteUserChannel(channel.id)
      } else {
        setItem('user-channels',this.userChannels)
      }
    },
    switchChannel(index) {
      //点击按钮关闭他的父组件的弹出层,传一个close给父组件
      this.$emit("close", index);
      //获取点击的下标,并传给父组件，替换父组件的ative
      this.$emit("updata-active", index);
    },
  },
  created() {
    this.loadAllChannels();
  },
};
</script>

<style lang="less" scoped>
.channel-edit {
  padding-top: 55px;
  .channel-title {
    font-size: 15px;
    color: #333;
  }
  .grid-item {
    width: 80px;
    height: 43px;
    /deep/.van-grid-item__content {
      background-color: #f4f5f6;
      .van-grid-item__text {
        font-size: 14px;
        color: #222;
        margin-top: 0;
      }
    }
    /deep/.van-grid-item__icon {
      position: absolute;
      top: -5px;
      right: -5px;
      font-size: 20px;
      color: #ccc;
    }
  }
  .active {
    /deep/.van-grid-item__text {
      color: red !important;
    }
  }
}
</style>
