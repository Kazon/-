const BASEURL = 'http://127.0.0.1/Self%20service%20ordering%20system/';

function getPost(url, data){
  return new Promise((resolve, reject) => {
    wx.showLoading({
      title: '加载中'
    });
    wx.request({
      url,
      data,
      method: 'GET',
      success: res => {
        resolve(res.data)
      },
      fail: res => {
        reject(e)
      },
      complete() {
        wx.hideLoading();
      }
    })
  })
}

module.exports = {
  getPost,
  BASEURL
}