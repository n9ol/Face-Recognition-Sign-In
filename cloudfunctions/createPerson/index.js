const cloud = require('wx-server-sdk');
const tencentcloud = require("tencentcloud-sdk-nodejs");

cloud.init();

var asyncCreatePerson = function(groupId, personName, personId, url) {
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

  let req = new models.CreatePersonRequest();

  let params = '{"GroupId":"' + groupId + '","PersonName":"' + personName + '","PersonId":"' + personId + '","Url":"' + url + '"}'
  req.from_json_string(params);

  return new Promise(function(resolve, reject) {
    client.CreatePerson(req, function(errMsg, response) {
      if (errMsg) {
        reject(errMsg);
      } else {
        resolve(response);
      }
    })
  })
}

exports.main = async(event, context) => {
  const {groupId, personName, personId, fileId} = event;
  const fileList = [event.fileId];
  const ret = await cloud.getTempFileURL({
    fileList,
  });
  const url = ret.fileList[0].tempFileURL;
  const result = await asyncCreatePerson(groupId, personName, personId, url);

  return result;
}