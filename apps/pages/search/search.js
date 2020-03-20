const app = getApp();
const $ = require('../../utils/common.js');
const global = require('../../utils/global.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    search: '',
    macthingGoods: []
  },

  //获取search
  getSearch: function (e){
    this.setData({
      search: e.detail.value
    })
    this.findGoods();
  },

  //清空input的内容
  ClearInput: function(){
    this.setData({
      search: ''
    })
  },

  //发送请求，获取查找的商品
  findGoods: function(){
    $.getPost($.BASEURL + 'FindMatchingGoods.php',{keyword: this.data.search}).then(res => {
      const arr = res;
      this.xuan(arr);
    })
  },

  xuan: function(arr){
    if(app.globalData.temp_car.length == 0){
      for(let r of arr){
        r.count = 0
      }
    }
    if (arr.length > 0 && app.globalData.temp_car.length > 0) {
      for (let c of app.globalData.temp_car) {
        for (let r of arr) {
          if (r.sid == c.sid) {
            r.count = c.count
          }
        }
      }
    }
    this.setData({
      macthingGoods: arr
    })
  },

  add: function(e){
    global.add(e);
    global.CarTotalCount();
    global.totalPrice();
    this.xuan(this.data.macthingGoods);
  },

  del: function(e){
    global.del(e);
    global.CarTotalCount();
    global.totalPrice();
    this.xuan(this.data.macthingGoods);
    console.log(this.data.macthingGoods);
  },

  search: function(){
    this.findGoods()
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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