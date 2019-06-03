let app = getApp();
const db = wx.cloud.database();
const studentDb = db.collection('student');

let faceId = null;
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
                    wx.showToast({
                      title: '上传完成',
                    });
                    console.log(res);
                    if (!app.globalData.hasFace) {
                      faceId = res.result.FaceId;
                      app.globalData.hasFace = true;
                    }
                  },
                  fail: err => {
                    wx, wx.hideLoading();
                    console.log(err);
                    if (err.Code = 'InvalidParameterValue.PersonIdAlreadyExist') {
                      wx.showModal({
                        title: '新的相片',
                        content: '是否上传新的人脸？',
                        success: res => {
                          if (res.confirm) {
                            wx.showLoading({
                              title: '上传至人员库',
                            });
                            console.log('学生选择了确定');
                            // 重新上传人脸 fileId personId
                            wx.cloud.callFunction({
                              name: 'createFace',
                              data: {
                                fileID: fileId,
                                personId: id
                              },
                              success: res => {
                                wx.hideLoading();
                                wx.showToast({
                                  title: '上传成功',
                                });
                                console.log(res);
                                app.globalData.hasFace = true;
                                wx.cloud.callFunction({
                                  name: 'deleteFace',
                                  data: {
                                    personId: id,
                                    faceId: faceId
                                  },
                                  success: res => {
                                  },
                                  fail: err => {
                                    wx.hideLoading();
                                    console.log(err);
                                  }
                                });
                                faceId = res.result.FaceId;
                              },
                              fail: err => {
                                wx.hideLoading();
                                wx.showToast({
                                  title: '上传失败',
                                  icon: 'none'
                                });
                                console.log(err);
                              }
                            });
                          } else if (res.cancel) {
                            console.log('学生选择了否');
                          }
                        }
                      })
                    }
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