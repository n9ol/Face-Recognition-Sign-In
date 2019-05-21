// pages/stuLog/stuLog.js
const db = wx.cloud.database();
const studentDB = db.collection('student');

let stuId = null;
let stuPassword = null;

Page({
  inputId(event) {
    console.log(event.detail);
    stuId = event.detail;
  },

  inputPassword(event) {
    console.log(event.detail);
    stuPassword = event.detail;
  },

  login() {
    studentDB.where({
      id: stuId,
      password: stuPassword
    }).get({
      success(res) {
        console.log("yes");
        wx.redirectTo({
          url: '../stuFace/stuFace',
        });
        wx.showToast({
          title: '成功',
          icon: 'success',
          duration: 1000,
          mask: true
        });
      },
      fail() {
        wx.showToast({
          title: '失败',
          icon: 'none',
          duration: 1000,
          mask: true
        })
      }
    })
  }


})