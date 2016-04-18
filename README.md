# jhss.wechat

------

该插件**只能用于http://capvision.cn及其子域名下**

别的地方调用需修改src/core/下的auth.js的授权过程，重新用grunt构建


## 使用方法：

wechat函数绑定在window.capvision下，可以直接调用

### setShareMessage(message)
> Example:
```
 capvision.wechat.setShareMessage({
    title(|appTile|timelineTitle):'标题信息（默认：document.title）',
    imgUrl(|appImgUrl|timelineImgUrl):'图标地址（默认：meta标签name为:shareLogo的content 或则 http://img.itc.cn/photo/jbkRk8qUehb）',
    link(|appLink|timelineLink):'分享指定连接地址（默认：window.location.href）',
    desc:'描述信息（默认：meta标签name为:description的content）',
 });
```