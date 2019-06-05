const app = getApp();
const db = wx.cloud.database();
const teaDb = db.collection('teacher');

Page({
  onLoad: function (options) {
    teaDb.where({
      _id: app.globalData.teaId
    }).get({
      success: res => {
        wx.showLoading({
          title: '正在获取信息',
        });
        console.log(res.data);
        const examInfo = res.data[0].examInfo;
        this.setData({
          examInfo: examInfo
        });
        wx.hideLoading();
      }
    });
  },
  enter() {
    wx.navigateTo({
      url: '../teaScan/teaScan',
    })
  }
})