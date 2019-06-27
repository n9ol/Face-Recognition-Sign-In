Page({
  scan() {
    wx.showLoading({
      title: '搜寻中',
    });
    const ctx = wx.createCameraContext()
    var random = Date.parse(new Date()) + Math.ceil(Math.random() * 1000)
    ctx.takePhoto({
      quality: 'high',
      success: res => {        
        const tempImagePath = res.tempImagePath;
        wx.cloud.uploadFile({
          cloudPath: random + '.png',
          filePath: tempImagePath,
          success: res => {
            wx.cloud.callFunction({
              name: 'searchFace',
              data: {
                fileID: res.fileID
              },
              success: res => {
                wx.hideLoading();
                const mostSimStu = res.result.Results["0"].Candidates["0"]
                if (mostSimStu.Score > 85) {
                  console.log(res.result.Results['0']);
                  wx.showToast({
                    title: '学号: ' + mostSimStu.PersonId + '\r\n置信度: ' + parseInt(mostSimStu.Score) + '%',
                    icon: 'none'
                  })
                } else {
                  wx.showToast({
                    title: '未找到此人',
                    icon: 'none'
                  })
                }
              },
              fail: err => {
                wx.hideLoading();
                console.log(err);
              }
            })
          }
        })
      }
    })
  }
})