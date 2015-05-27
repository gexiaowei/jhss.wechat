# jhss.wechat

------

该插件**只能用于http://www.youguu.com及其子域名下**

在需要调用JS接口的页面引入如下JS文件，（支持https）：http://res.wx.qq.com/open/js/jweixin-1.0.0.js


##jQuery插件($.wechat)使用方法：

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

##AgularJS插件($wechat)使用方法：

1.在调用插件前必须使用

  ```javascript
    $wechat.register(option);
  ```
  
来注册微信分享

2.可以使用

  ```javascript
    $wechat.setAppMessage(option); //分享给好友
    $wechat.setTimeline(option);   //分享到朋友圈
  ```
分享的内容互相独立不影响

##参数 option

  ```javascript
    title: '', // 分享标题
    link: '', // 分享链接
    imgUrl: '', // 分享图标
    desc: '', // 分享描述(只有分享给朋友才存在)
  ```