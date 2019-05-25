// pages/stuFace/stuFace.js
Page({
  data: {
    textOfButton: "上传图片",
    beauty: "",
    progress: 0,
  },
  chooseImage() {
    var that = this;
    var random = Date.parse(new Date()) + Math.ceil(Math.random() * 1000)

    wx.cloud.init();
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function(res) {
        that.setData({
          src: res.tempFilePaths[0]
        });
        var uploadTask = wx.cloud.uploadFile({
          cloudPath: 'upLoadFace_' + random + '.png', // deal with concurrent
          filePath: res.tempFilePaths[0],
          success: res => {
            wx.showLoading({
              title: '正在识别',
            });
            console.log(res.fileID);
            wx.cloud.callFunction({
              name: 'faceDetection',
              data: {
                fileID: res.fileID
              },
              success: res => {
                wx.hideLoading()
                wx.showToast({
                  title: '成功',
                  icon: 'success',
                  duration: 500
                })
                console.log(res.result);
                that.setData({
                  beauty: res.result.FaceInfos[0].FaceAttributesInfo.Beauty
                })
              },
              fail: err => {
                console.log(err);
              }
            })
          }
        });
        uploadTask.onProgressUpdate((res) => {
          that.setData({
            progress: res.progress
          })
        })
      },
      fail: function(res) {
        console.log(res);
      },
      complete: function(res) {},
    });
  },
  finished() {
    wx.navigateTo({
      url: '../stuInfo/stuInfo',
    });
  },
  onLoad() {
    wx.cloud.init();
  },
  error(e) {
    console.log(e.detail)
  }
})