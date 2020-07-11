// pages/email/email.js
// citation: https://cloud.tencent.com/developer/article/1481793

Page({
  data: {
    registeredEmail: "",
    inputedEmail: "",

    deltaTime: 0,
    interval: 30000,

    code: Math.round(Math.random()*900000+100000),
    inputedCode: "",
  },

  emailUpdated: function(e){
    this.data.inputedEmail = e.detail.value
  },

  codeUpdated: function(e){
    this.data.inputedCode = e.detail.value
  },

  sendCode: function(){
    if (this.data.inputedEmail.match("^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$")){
      if (Date.parse(new Date()) - this.data.deltaTime > this.data.interval){
        
        wx.cloud.callFunction({
          name: 'sendEmail',
          data:{
            fromEmail: 'indream_internship@163.com',
            toEmail: this.data.inputedEmail,
            authCode: 'KZAEAALGACNWXMWJ',
            subject: '[' + this.data.code + ']入海 Indream',
            content: '入海Indream的邮箱验证码是[' + this.data.code + ']。\n如果本次操作不是您发起的，请忽略此邮件。'
          },
          success(res){
            console.log("发送成功",res)
          },
          fail(res){
            console.log("发送失败",res)
          }
        })
        // 'timsfdong@163.com', 'WCPHSBRETRMBZBZT'
        // '2317043712@qq.com', 'hatcpvnvkgrcecdf'
        // 'indream_internship', 'KZAEAALGACNWXMWJ'

        this.data.deltaTime = Date.parse(new Date());
      }else{
        wx.showToast({
          title: '请等待' + (this.data.deltaTime+this.data.interval-Date.parse(new Date()))/1000 + "秒",
          icon: "none"
        })
      }
    }else{
      wx.showToast({
        title: 'Invalid Email',
        icon: 'none'
      })
    }
  },

  confirmEmail: function(){
    if (this.data.inputedCode == String(this.data.code)){
      wx.showToast({
        title: "Success",
        icon: 'success'
      })
      this.setData({
        registeredEmail: this.data.inputedEmail
      })
      wx.setStorageSync('registeredEmail', this.data.inputedEmail)
    }else{
      wx.showToast({
        title: 'Failed',
        icon: "none"
      })
    }

  },

  unlinkEmail: function(){
    this.setData({
      registeredEmail: ""
    })
  },

  onLoad: function (options) {
    this.setData({
      // this should be stored in the server in the future if possible
      registeredEmail: wx.getStorageSync('registeredEmail')
    })
  },

  onReady: function () {
  },

  onShow: function () {
  },

  onHide: function () {
  },

  onUnload: function () {
  },

  onPullDownRefresh: function () {
  },

  onReachBottom: function () {
  },

  onShareAppMessage: function () {
  }
})