let name = null;
let id = null;

Page({
  inputName(event) {
    console.log(event.detail);
    name = event.detail;
  },
  inputID(event) {
    console.log(event.detail);
    id = event.detail;
  },
  isNameValid() {
    wx.cloud.callFunction({
      name: 'getGroupInfo',
      success(res) {
        const groupInfos = res.result.GroupInfos;
        console.log(groupInfos);
        var flag = true;
        for (var i = 0; i < groupInfos.length; i++) {
          if (name === groupInfos[i].GroupName) {
            flag = false;
            wx.showToast({
              title: '人员库名称不合法',
              icon: 'none',
              duration: 2000
            })
            console.log('wrong name');
            break;
          }
        }
        if (flag) {
          wx.showToast({
            title: '人员库名称合法',
            duration: 2000
          });
        }
      }
    })
  },
  isIDValid() {
    wx.cloud.callFunction({
      name: 'getGroupInfo',
      success(res) {
        const groupInfos = res.result.GroupInfos;
        console.log(groupInfos);
        var flag = true;
        for (var i = 0; i < groupInfos.length; i++) {
          if (id === groupInfos[i].GroupId) {
            flag = false;
            wx.showToast({
              title: '人员库ID不合法',
              icon: 'none',
              duration: 2000
            });
            break;
          }
        }
        if (flag) {
          wx.showToast({
            title: '人员库ID合法',
            duration: 2000
          });
        }
      }
    })
  },
  onClickCreateGroupBtn() {
    wx.showLoading({
      title: '正在创建',
    });
    wx.cloud.callFunction({
      name: 'createGroup',
      data: {
        groupName: name,
        groupID: id
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
          icon: 'none',
          duration: 500
        })
      }
    })
  }
})