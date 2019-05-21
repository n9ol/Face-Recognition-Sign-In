Page({
  onTapJumpStu: function(event) {
    wx.navigateTo({
      url: '../stuLog/stuLog',
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
