const app = getApp();
const $ = require('../../utils/common.js');
const global = require('../../utils/global.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    car_totalcount: 0,
    totalPrice: 0,
    temp_car: [],
    deskid: ''
  },

  //改变页面数组渲染
  setTempCar: function () {
    this.setData({
      temp_car: app.globalData.temp_car
    })
  },

  //计算购物车商品总数 遍历购物车数组累加count
  CarTotalCount: function () {
    global.CarTotalCount();
    this.setData({
      car_totalcount: app.globalData.car_totalcount
    })
  },

  //计算总价 遍历购物车数组 count*price
  totalPrice: function () {
    global.totalPrice();
    this.setData({
      totalPrice: app.globalData.totalPrice
    })
  },
  
  //购物车添加 1.改变商品数组count 2.购物车内有无此商品 ? 改变购物车count : 将该商品添加至购物车数组 3.计算总价 4.计算总数
  add: function (e) {
    global.add(e);
    this.totalPrice();
    this.CarTotalCount();
    this.setTempCar();
  },

  //购物车减少 count为0时不触发 1.改变商品数组count 2.改变购物车count 3.计算总价 4.计算总数
  del: function (e) {
    global.del(e);
    this.totalPrice();
    this.CarTotalCount();
    this.setTempCar();
  },

  //返回首页
  back: function(){
    wx.switchTab({
      url: '../index/index',
    })
  },

  //唤起扫一扫
  scan: function(){
    wx.scanCode({
      onlyFromCamera: true,
      success: res =>{
        console.log(res.path)
      }
    })
  },

  //下单
  go: function(){
    //生成订单  生成订单号
    //清空购物车&改变商品数组的count
    //向后台发送订单
    $.getPost($.BASEURL + '',{order: app.globalData.order}).then(res =>{
      //唤起支付
      //支付成功 发送订单id改变状态
      $.getPost($.BASEURL + '', { orderId: app.globalData.order.oid }).then(res =>{
        if(res){  //修改成功返回成功界面
          wx.navigateTo({
            url: '',
          })
        }else{  //修改失败&请求出错返回异常界面
          wx.navigateTo({
            url: '',
          })
        }
      })
      //支付失败   返回支付失败页面
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      deskid: app.globalData.deskid
    });
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
    this.setData({
      temp_car: app.globalData.temp_car,
      totalPrice: app.globalData.totalPrice,
      car_totalcount: app.globalData.car_totalcount
    })
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