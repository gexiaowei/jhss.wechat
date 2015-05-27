# jhss.wechat

------

该插件**只能用于http://www.youguu.com及其子域名下**

在需要调用JS接口的页面引入如下JS文件，（支持https）：http://res.wx.qq.com/open/js/jweixin-1.0.0.js


jQuery插件($.wechat)使用方法：

1.在调用插件前必须使用

  ```javascript
    $.wechat.register(option);
  ```
  
来注册微信分享

2.可以使用

  ```javascript
    $.wechat.setAppMessage(option); //分享给好友
    $.wechat.setTimeline(option);   //分享到朋友圈
  ```
分享的内容互相独立不影响
