<template>
  <div class="user-chat">
    <van-nav-bar
      class="app-nav-bar"
      title="人工服务"
      left-arrow
      @click-left="$router.back()"
    />
    <van-cell-group class="message-list">
      <van-cell title="单元格" />
      <van-cell title="单元格" />
      <van-cell title="单元格" />
      <van-cell title="单元格" /> <van-cell title="单元格" />
      <van-cell title="单元格" /> <van-cell title="单元格" />
      <van-cell title="单元格" /> <van-cell title="单元格" />
      <van-cell title="单元格" /> <van-cell title="单元格" />
      <van-cell title="单元格" /> <van-cell title="单元格" />
      <van-cell title="单元格" /> <van-cell title="单元格" />
      <van-cell title="单元格" /> <van-cell title="单元格" />
      <van-cell title="单元格" /> <van-cell title="单元格" />
      <van-cell title="单元格" /> <van-cell title="单元格" />
      <van-cell title="单元格" /> <van-cell title="单元格" />
      <van-cell title="单元格" /> <van-cell title="单元格" />
      <van-cell title="单元格" /> <van-cell title="单元格" />
      <van-cell title="单元格" /> <van-cell title="单元格" />
      <van-cell title="单元格" /> <van-cell title="单元格" />
      <van-cell title="单元格" /> <van-cell title="单元格" />
      <van-cell title="单元格" /> <van-cell title="单元格" />
      <van-cell title="单元格" /> <van-cell title="单元格" />
      <van-cell title="单元格" /> <van-cell title="单元格" />
      <van-cell title="单元格" /> <van-cell title="单元格" />
      <van-cell title="单元格" /> <van-cell title="单元格" />
      <van-cell title="单元格" />
    </van-cell-group>

    <van-cell-group class="send-message-wrap">
      <van-field :border="false" v-model="message" placeholder="请输入消息" />
      <van-button @click="onSend" type="info" class="v-btn" size="small"
        >发送</van-button
      >
    </van-cell-group>
  </div>
</template>

<script>
import io from "socket.io-client";
export default {
  data() {
    return {
      message: "",
      socket: null,
      messages: [],
    };
  },
  created() {
    //建立连接
    const socket = io("http://ttapi.research.itcast.cn");
    this.socket = socket;
    socket.on("connect", function() {
      console.log("连接成功");
    });
    socket.on("disconnect", function() {
      console.log("断开了");
    });

    socket.on("message", data=>{
      this.message.push(data);
    });
  },
  methods: {
    onSend() {
      const data = {
        msg: this.message,
        timestamp: Date.now(),
      };
      this.socket.emit("message", data);
      this.message.push(data);
    },
  },
};
</script>

<style scoped lang="less">
.send-message-wrap {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  padding: 0 14px;
  align-items: center;
}
.message-list {
  position: fixed;
  left: 0;
  right: 0;
  top: 46px;
  bottom: 45px;
  overflow-y: auto;
}
</style>
