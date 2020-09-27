/** 
* 初始化daayjs配置
**/
import Vue from 'vue'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

dayjs.locale('zh-cn') // 全局使用

Vue.filter('relativeTime',value=>{
    return dayjs(value).from(dayjs())
})
