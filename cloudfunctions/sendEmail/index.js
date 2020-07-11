// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()

var getProvider = function(email){
  if (email.search(/@163.com/i) != -1){
    return '163';
  }else if (email.search(/@126.com/i) != -1){
    return '126';
  }else if (email.search(/@qq.com/i) != -1){
    return 'qq';
  }else if (email.search(/@outlook.com/i) != -1){
    return 'outlook';
  }
}

var getHost = function(provider){
  if (provider == '163'){
    return 'smtp.163.com';
  }else if (provider == '126'){
    return 'smtp.126.com';
  }else if (provider == 'qq'){
    return 'smtp.qq.com';
  }else if (provider == 'outlook'){
    return 'smtp-mail.outlook.com';
  }
}

var getPort = function(provider){
  if (provider == '163'){
    return 25;
  }else if (provider == '126'){
    return 25;
  }else if (provider == 'qq'){
    return 465;
  }else if (provider == 'outlook'){
    return 587; // alter: 25
  }
}

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  var nodemailer = require('nodemailer');

  var provider = getProvider(event.fromEmail);
  var host = getHost(provider);
  var port = getPort(provider);
  
  var config = {
    host: host,
    port: port,
    auth:{
      user: event.fromEmail,
      pass: event.authCode
    }
  };
  var mailer = nodemailer.createTransport(config);
  var mail={
    from: event.fromEmail,
    subject: event.subject,
    to: event.toEmail,
    text: event.content
  };
  let res = await mailer.sendMail(mail);
  return res;
}