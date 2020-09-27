
import request from '@/utils/request'
/**
 *文章相关请求模块 
 **/
export const getArticles=params=>{
    return request({
        method:'GET',
        url:'/app/v1_1/articles',
        params
    })
}

/**
 *获取全部频道
 **/
export const getAllChannels=()=>{
    return request({
        method:'GET',
        url:'/app/v1_0/channels'
    })
}

/**
 *添加指定用户频道
 **/
export const addUserChannel=data=>{
    return request({
        method:'PATCH',
        url:'/app/v1_0/user/channels',
        data
    })
}

/**
 *删除指定用户频道
 **/
export const deleteUserChannel=channelId=>{
    return request({
        method:'DELETE',
        url:`/app/v1_0/user/channels/${channelId}`
    })
}

/**
 *获取文章详情
 **/
export const getArticleById=articleId=>{
    return request({
        method:'GET',
        url:`/app/v1_0/articles/${articleId}`
    })
}

/**
 * 获取评论列表
 */
export function getComments(params) {
    return request({
      method: "GET",
      url: "/app/v1_0/comments",
      params
    });
  }

