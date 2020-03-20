const app = getApp();

//购物车添加 1.改变商品数组count 2.购物车内有无此商品 ? 改变购物车count : 将该商品添加至购物车数组 3.计算总价 4.计算总数
function add(e) {
  const sid = e.currentTarget.dataset.sid;
  const iindex = app.globalData.item_array.findIndex(r => r.sid == sid);
  app.globalData.item_array[iindex].count = parseInt(app.globalData.item_array[iindex].count) + 1;
  const cindex = app.globalData.temp_car.findIndex(r => r.sid == sid);
  if (cindex == -1) {
    app.globalData.temp_car.push(app.globalData.item_array[iindex]);
  } else {
    app.globalData.temp_car[cindex].count = app.globalData.item_array[iindex].count;
  }
}

//购物车减少 count为0时不触发 1.改变商品数组count 2.改变购物车count 3.计算总价 4.计算总数
function del(e) {
  const sid = e.currentTarget.dataset.sid;
  const iindex = app.globalData.item_array.findIndex(r => r.sid == sid);
  if (app.globalData.item_array[iindex].count > 0) {
    app.globalData.item_array[iindex].count = parseInt(app.globalData.item_array[iindex].count) - 1;
    const cindex = app.globalData.temp_car.findIndex(r => r.sid == sid);
    app.globalData.temp_car[cindex].count = app.globalData.item_array[iindex].count;
    if (app.globalData.temp_car[cindex].count == 0) {
      app.globalData.temp_car.splice(cindex, 1);
    }
  }
}

function totalPrice() {
  app.globalData.totalPrice = app.globalData.temp_car.reduce((prev, curr) => curr.price * curr.count + prev, 0)
}

function CarTotalCount(){
  app.globalData.car_totalcount = app.globalData.temp_car.reduce((prev, curr) => curr.count + prev, 0)
}


module.exports = {
  add,
  del,
  totalPrice,
  CarTotalCount
}