let app = getApp();
const db = wx.cloud.database();
const studentDb = db.collection('student');

let fileId = null;
let url = null;

Page({
  data: {
    textOfButton: "上传图片",
    beauty: "",
    progress: 0,
  },
  chooseAndUploadImage() {
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
              title: '上传至人员库',
            });
            fileId = res.fileID;
            console.log(res.fileID);
            studentDb.where({
              _openid: app.globalData.openid
            }).get({
              success: res => {
                const name = res.data[0].name;
                const id = res.data[0].id;
                wx.cloud.callFunction({
                  name: 'createPerson',
                  data: {
                    groupId: '001',
                    personName: name,
                    personId: id,
                    fileId: fileId
                  },
                  success: res => {
                    wx.hideLoading();
                    console.log(name);
                    console.log(id);
                    wx.showToast({
                      title: '上传完成',
                    });
                    console.log(res);
                  },
                  fail: err => {
                    wx,wx.hideLoading();
                    console.log(err);
                  }
                });
              }
            });
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