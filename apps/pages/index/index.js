const app = getApp();
const $ = require('../../utils/common.js');
const global = require('../../utils/global.js');

Page({
  data: {
    notice: "公告：欢迎新老客户！",    //公告
    discount: "请咨询商家了解店铺活动详情",  //活动简介
    _num: 0,    //商品&活动界面选择切换 0：商品 1：活动
    category_array: [],  //商品类别数组
    item_array: [],   //商品数组
    cateActiveId: 1,  //商品类别高亮显示
    car_deatil: false,  //购物详情显示&隐藏
    temp_car:[],      //购物车数组
    car_totalcount: 0,  //购物车商品总数
    totalPrice: 0            //购物车商品总价
  },

  //改变页面数组渲染
  setTempCar: function(){
    this.setData({
      item_array: app.globalData.item_array,
      temp_car: app.globalData.temp_car
    })
  },

  //查看用户是否授权登录
  getUserSetting: function(){
    wx.getSetting({
      success: res =>{
        if(!res.authSetting['scope.userInfo']){
          wx.navigateTo({
            url: '/pages/search/search',
          })
        }else{
          wx.getUserInfo({
            success: res => {
              app.globalData.userData = res.encryptedData;
            }
          })
        }
      }
    })
  },

  /**
   * 获取页面数据
   */
  getCategoryArray: function(){  //获取商品类别
    $.getPost($.BASEURL + '/FindShopCategory.php')
    .then(res => {
      this.setData({
        category_array: res
      })
    }).then(
      $.getPost($.BASEURL + '/FindShopCommodity.php')
        .then(res => {
          app.globalData.item_array = res;
          this.setData({
            item_array: app.globalData.item_array
          })
        })
    )
  },

  /**
   * 设置商品、活动切换
   */
  switch: function(e){
    this.setData({
      _num: e.target.dataset.num
    })
  },

  //上方活动简介点击转换
  discount: function(e){
    this.setData({
      _num: 1
    })
  },

  /**
   * 设置搜索商品页面跳转
   */
  Jsearch: function(){
    wx.navigateTo({
      url: '../search/search',
    })
  },

  /**
   * 购物详情显示/隐藏 （购物车总数为0不触发）
   */
  CarDetailSwitch: function(e){
    if(this.data.car_totalcount > 0){
      this.setData({
        car_deatil: !e.currentTarget.dataset.cardetail
      })
    }
  },

  /**
   * 设置商品加减
   */
  //计算购物车商品总数 遍历购物车数组累加count
  CarTotalCount: function(){
    global.CarTotalCount();
    this.setData({
      car_totalcount: app.globalData.car_totalcount
    })
  },

  //判断购物车是否为空 true 改变购物详情和遮盖层状态
  CarIsEmpty: function(){
    if (app.globalData.temp_car.length == 0){
      this.setData({
        car_deatil: !this.data.car_deatil
      })
    }
  },

  //购物车内商品减少操作 1.减少数量 2.判空（改变购物车详情状态 3.计算总数
  cardel: function(e){
    this.del(e);
    this.CarIsEmpty();
    this.CarTotalCount();
  },

  //计算总价 遍历购物车数组 count*price
  totalPrice: function(){
    global.totalPrice();
    this.setData({
      totalPrice: app.globalData.totalPrice
    })
  },
  
  //购物车添加 1.改变商品数组count 2.购物车内有无此商品 ? 改变购物车count : 将该商品添加至购物车数组 3.计算总价 4.计算总数
  add: function(e){
    global.add(e);
    this.totalPrice();
    this.CarTotalCount();
    this.setTempCar();
  },

  //购物车减少 count为0时不触发 1.改变商品数组count 2.改变购物车count 3.计算总价 4.计算总数
  del: function(e){
    global.del(e);
    this.totalPrice();
    this.CarTotalCount();
    this.setTempCar();
  },

  /**
   * 清空购物车 1.清空 2.计算总价 3.判空 4.计算总数
   */
  CleanCar: function(){
    wx.showModal({
      title: '清空购物车',
      content: '确定要清空购物车？',
      success: res => {
        if(res.confirm){
          for (let r of app.globalData.item_array){
            r.count = 0
          }
          app.globalData.temp_car = [];
          this.totalPrice();
          this.CarIsEmpty();
          this.CarTotalCount();
          this.setTempCar();
        }
      }
    })
  },

  /**
   * 设置点击指定类别，商品出现
   */
  switchCateActive: function(e){
    this.setData({
      cateActiveId: e.target.dataset.cateid
    })
  },

  //选好了
  submit: function(){
    if(app.globalData.car_totalcount <= 0){
      wx.showModal({
        title: '请点餐',
        content: '还没开始点餐哦',
      })
    }else{
      wx.navigateTo({
        url: '../order/order',
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getUserSetting();
    this.getCategoryArray();
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
      item_array: app.globalData.item_array,
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
