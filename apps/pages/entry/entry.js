let app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    username: '新用户',
    userimg: '../img/wx.png'
  },

  //查看用户是否授权登录
  getUserData: function () {
    wx.getSetting({
      success: res => {
        if(res.authSetting['scope.userInfo']){
          wx.switchTab({
            url: '../index/index'
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (wx.getLaunchOptionsSync().scene === 1011){
      app.globalData.deskid = wx.getLaunchOptionsSync().query.deskid
    }
    wx.getUserInfo({
      success: res =>{
        this.setData({
          username: res.userInfo.nickName,
          userimg: res.userInfo.avatarUrl
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})