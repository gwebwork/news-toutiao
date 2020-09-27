/**
 * 本地存储模块封装 
**/

//获取本地存储数据,name要存储的名字
export const getItem=name=>{
   const data= window.localStorage.getItem(name)
   //如果数据是json字符串就try转成对象，如果不是json就报错，就直接返回数据
   try{
    return JSON.parse(data)
   }catch(err){
    return data
   }
}

//存储本地存储数据,name要存储的名字,value存储的值,本地存储不能存储对象，
//所以判断value是不是对象,如果是对象转成字符串
export const setItem=(name,value)=>{
    if(typeof value==='object'){
        value=JSON.stringify(value)
    }
    window.localStorage.setItem(name,value)
}

//删除本地存储数据
export const removeItem=name=>{
    window.localStorage.removeItem(name)
}