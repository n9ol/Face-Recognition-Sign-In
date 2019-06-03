//app.js
App({
  globalData: {
    openid: null,
    firstLogin: true,
    hasFace: false
  },

  onLaunch: function() {
    var that = this;
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力');
    } else {
      wx.cloud.init({
        env: 'test-p3dro',
        traceUser: true,
      });
    }
    wx.cloud.callFunction({
      name: 'getOpenid',
      success: res => {
        var openid = res.result;
        console.log('Your openid is ' + openid);
        that.globalData.openid = openid;
      }
    })
  }
})