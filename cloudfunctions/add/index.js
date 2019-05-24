// 云函数入口文件
const cloud = require('wx-server-sdk')

// cloud.init()

// 云函数入口函数
exports.main = async (event, context) => ({
  sum: event.a + event.b
  // const wxContext = cloud.getWXContext()

  // return {
  //   event,
  //   openid: wxContext.OPENID,
  //   appid: wxContext.APPID,
  //   unionid: wxContext.UNIONID,
  // }
})