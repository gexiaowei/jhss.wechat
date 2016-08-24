# jhss.wechat

![img](https://travis-ci.org/gexiaowei/jhss.wechat.svg)

------

该插件**只能用于http://www.youguu.com及其子域名下**

别的地方调用需修改src/core/下的auth.js的授权过程，重新用grunt构建


##jQuery插件(wechat)使用方法：

wechat函数绑定在window下，可以直接调用

### setShareMessage(message)
> Example:
```
 wechat.setShareMessage({
    title(|appTile|timelineTitle):'标题信息（默认：document.title）',
    imgUrl(|appImgUrl|timelineImgUrl):'图标地址（默认：meta标签name为:shareLogo的content 或则 http://img.itc.cn/photo/jbkRk8qUehb）',
    link(|appLink|timelineLink):'分享指定连接地址（默认：window.location.href）',
    desc:'描述信息（默认：meta标签name为:description的content）',
 });
```

# appJSBridge
------

Native内部JS桥

### register(option)

手动去注册appJSBridge,自动调用addPermissions和setShareMessage

### addPermissions()

增加权限 不需要调用,在name为jhss-permission的meta中配置就可以了,暂时只支持share

### setShareMessage(message)
设置分享信息 可以设置WechatMoments, Wechat, QZone, QQ, SinaWeibo5个平台的信息,可以分开设置 也可以在meta中配置

### addMenus(menus)
设置右上角的菜单 menu为一个数组
> Example:
```
addMenus([{
    text:'菜单名称',
    success:function(){
        alert('触发回调')
    }
}])
```

### 历史版本

#### 0.3.3
> [http://m.youguu.com/mobile/jhss.wechat/0.3.3/jhss.wechat.min.js](http://m.youguu.com/mobile/jhss.wechat/0.3.3/jhss.wechat.min.js)
> [http://m.youguu.com/mobile/jhss.wechat/0.3.3/angular-wechat.min.js](http://m.youguu.com/mobile/jhss.wechat/0.3.3/angular-wechat.min.js)

#### 0.3.2
> [http://m.youguu.com/mobile/jhss.wechat/0.3.2/jhss.wechat.min.js](http://m.youguu.com/mobile/jhss.wechat/0.3.2/jhss.wechat.min.js)
> [http://m.youguu.com/mobile/jhss.wechat/0.3.2/angular-wechat.min.js](http://m.youguu.com/mobile/jhss.wechat/0.3.2/angular-wechat.min.js)

#### 0.2.2
> [http://m.youguu.com/mobile/jhss.wechat/0.2.2/jhss.wechat.min.js](http://m.youguu.com/mobile/jhss.wechat/0.2.2/jhss.wechat.min.js)
> [http://m.youguu.com/mobile/jhss.wechat/0.2.2/angular-wechat.min.js](http://m.youguu.com/mobile/jhss.wechat/0.2.2/angular-wechat.min.js)