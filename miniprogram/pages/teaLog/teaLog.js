const app = getApp();
const db = wx.cloud.database();
const teaDb = db.collection('teacher');

let teaId = null;
let teaPassword = null;

Page({
  inputId(event) {
    console.log(event.detail.value);
    teaId = event.detail.value;
  },
  inputPassword(event) {
    console.log(event.detail.value);
    teaPassword = event.detail.value;
  },
  login() {
    teaDb.where({
      _id: teaId
    }).get({
      success: res => {
        let userInfos = res.data
        if (userInfos && userInfos.length > 0) {
          let user = userInfos[0];
          if ((user._id !== teaId) || (user.password !== teaPassword)) {
            wx.showToast({
              title: '账号或密码错误',
              icon: 'none',
              duration: 3000
            });
          } else {
            app.globalData.teaId = teaId;
            wx.redirectTo({
              url: '../teaInfo/teaInfo',
            });
          }
        } else {
          wx.showToast({
            title: '账号或密码错误',
            icon: 'none',
            duration: 3000
          });
        }
      }
    })
  }
})