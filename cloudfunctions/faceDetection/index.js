const cloud = require('wx-server-sdk')
const tencentcloud = require("tencentcloud-sdk-nodejs");

cloud.init();

var synDetectFace = function(url) {
  const IaiClient = tencentcloud.iai.v20180301.Client;
  const models = tencentcloud.iai.v20180301.Models;

  const Credential = tencentcloud.common.Credential;
  const ClientProfile = tencentcloud.common.ClientProfile;
  const HttpProfile = tencentcloud.common.HttpProfile;

  let cred = new Credential("AKIDzqW1Ka9XEk5FD1a9RXUGqETWQ9j8fUed", "4znQ1RiWDi1A95qRxJUWM1OZSHqEQQGc");
  let httpProfile = new HttpProfile();
  httpProfile.endpoint = "iai.tencentcloudapi.com";
  let clientProfile = new ClientProfile();
  clientProfile.httpProfile = httpProfile;
  let client = new IaiClient(cred, "", clientProfile);

  let req = new models.DetectFaceRequest();

  let params = '{"Url": "' + url + '", "NeedFaceAttributes": 1}'
  req.from_json_string(params);
  return new Promise(function(resolve, reject) {
    client.DetectFace(req, function(errMsg, response) {
      if (errMsg) {
        reject(errMsg)
      } else {
        resolve(response);
      }
    })
  });
}

exports.main = async(event, context) => {
  const data = event;
  const fileList = [data.fileID];
  const result = await cloud.getTempFileURL({
    fileList,
  });
  const url = result.fileList[0].tempFileURL;
  datas = await synDetectFace(url);
  return datas;

  // exports.main = async(event, context) => {
  //   const fileList = ['cloud://test-p3dro.7465-test-p3dro/zhengJianZhao.jpg']
  //   const result = await cloud.getTempFileURL({
  //     fileList,
  //   })
  //   return result.fileList
  // }
}