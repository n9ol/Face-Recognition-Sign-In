let app = getApp();

const db = wx.cloud.database();
const studentDB = db.collection('student');

let stuId = null;
let stuPassword = null;

Page({
  inputId(event) {
    console.log(event.detail.value);
    stuId = event.detail.value;
  },

  inputPassword(event) {
    console.log(event.detail.value);
    stuPassword = event.detail.value;
  },

  login() {
    studentDB.where({
      _openid: app.globalData.openid
    }).get({
      success(res) {
        let userInfos = res.data;
        console.log(userInfos);
        if (userInfos && userInfos.length > 0) {
          let user = userInfos[0];
          console.log(user);
          console.log(stuId + ' ' + stuPassword);
          if ((user.id !== stuId) || (user.password !== stuPassword)) {
            wx.showToast({
              title: '账号或密码错误',
              icon: 'none',
              duration: 3000
            });
          } else {
            console.log("login-success");
            if (app.globalData.firstLogin) {
              console.log("first-login");
              wx.redirectTo({
                url: '../stuFace/stuFace',
              });
            } else {
              wx.redirectTo({
                url: '../stuInfo/stuInfo',
              })
            }
            wx.showToast({
              title: '登陆成功',
              duration: 3000
            });
          }
        } else {}
      }
    })
  }
})