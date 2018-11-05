// pages/calculator/calculator.js
Page({

  /**
   * 页面的初始数据
   */
  
  data: {
    numdata : new Array(),
    key:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var reveal = 0;
    this.setData({ reveal: reveal})
  },
  click:function(option){
    var  flag = option.target.id
    var str = this.data.reveal; 

    //判断选择参数
    switch(flag){
      case '+': this.sign(flag, str) ; break;
      case '-': this.sign(flag, str) ; break;
      case '÷': this.sign(flag, str) ; break;
      case '×': this.sign(flag, str) ; break;
      case '=': this.data.numdata[this.data.key] = this.data.reveal; var data = this.data.numdata; this.Equal(data); break;
      case '.': ; break;
      case 'CE': this.cleanOne() ; break;
      case 'C': this.cleanAll() ; break;
      case '《--': this.cleanBack(); break;
      default:this.numcheck(flag,str);break;
    }
  },
  //拼接数字
  numcheck: function(flag,str){
    if (this.data.reveal == 0) {
      str = flag
      this.setData({ 'reveal': str })
    } else {
      str = str + flag
      this.setData({ 'reveal': str })
    }
  },
  //拼接符号
  sign: function (flag, str){
    this.data.numdata[this.data.key] = this.data.reveal;
    this.data.key++;
    this.data.numdata[this.data.key] = flag;
    this.data.key++;
    //console.log(this)
    var data = this.data.data
    if (data == undefined){
      data = str + flag
    }else{
      data = data + str + flag
    }
    this.setData({'data':data});
    this.setData({ 'reveal': 0 });
  },
  cleanOne:function(){
    this.setData({ 'reveal': 0 });
  },
  cleanAll:function(){
    this.setData({ 'reveal': 0 });
    this.setData({ 'data': '' });
    this.data.numdata = new Array;
    console.log(this.data.numdata)
  },
  cleanBack:function(){
    var reveal = this.data.reveal;
    if (reveal == 0) {
      this.setData({ 'reveal': 0 });
    } else {
      var Slenth = reveal.length;
      this.setData({ 'reveal': reveal.substring(0, Slenth - 1) });
    }
  },
  //计算字符串结果
  Equal:function(data){
    if(data.length==1){
      this.setData({ 'data': '' });
      this.setData({ 'reveal': data[0] });
    }else{
      var bz = '';
      for (var i in data) {
        if (data[i] == '×' || data[i] == '÷') {
          //console.log(i)
          var operation = '';
          switch (data[i]) {
            case '×': operation = data[i - 1] * data[parseInt(i) + 1]; break;
            case '÷': operation = data[i - 1] / data[parseInt(i) + 1]; break;
          }
          //console.log(i)
          this.data.numdata[i - 1] = operation;
          this.data.numdata.splice(i, parseInt(i) + 1);
          var newdata = this.data.numdata
          this.Equal(newdata)

        } else {
          if (data[(parseInt(i) + 2)] == '×' || data[(parseInt(i) + 2)] == '÷') {
            continue;
          } else {
            console.log(data)
            switch(data[i]){
              case '+': operation = parseInt(data[i - 1]) + parseInt(data[parseInt(i) + 1]) ;break;
              case '-': operation = data[i - 1] - data[parseInt(i) + 1];break;
            }
            if(operation!=undefined){
              data[i - 1] = operation;
              data.splice(i, parseInt(i) + 1);
              this.Equal(data)
            }
          }
        }
      }
    }
    

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