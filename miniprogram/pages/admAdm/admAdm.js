Page({
  onClickCreateGroupBtn() {
    wx.showLoading({
      title: '正在创建',
    });
    wx.cloud.callFunction({
      name: 'createGroup',
      data: {
        groupName: "sb",
        groupID: '250'
      },
      success(res) {
        console.log(res.requestID);
        wx.hideLoading();
        wx.showToast({
          title: '创建成功',
          icon: 'success',
          duration: 500
        })
      },
      fail(res) {
        wx.hideLoading();
        wx.showToast({
          title: '创建失败',
          icon: 'fail',
          duration: 500
        })
      }
    })
  }
})