Page({
  onTapJumpStu: function(event) {
    wx.navigateTo({
      url: '../stuLog/stuLog',
    });
    wx.cloud.callFunction({
      name: 'add',
      data: {
        a: 1,
        b: 2,
      },
      success(res) {
        console.log(res.result.sum);
      },
      fail: console.error
    })
  },

  onTapJumpTea: function(event) {
    wx.navigateTo({
      url: '../teaLog/teaLog',
    })
  },

  onTapJumpAdm: function (event) {
    wx.navigateTo({
      url: '../admLog/admLog',
    })
  }
})
