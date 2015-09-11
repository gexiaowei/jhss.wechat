/**
 * wechat.js
 * @author Vivian
 * @version 1.0.0
 * copyright 2014-2015, gandxiaowei@gmail.com all rights reserved.
 */

/**
 *加载微信插件脚本
 * 脚本加载完成会自动调用授权过程
 */
(function (window, document) {
    var res = '//res.wx.qq.com/open/js/jweixin-1.0.0.js';
    var scripts = document.getElementsByTagName('script');
    var hasScript = false;
    for (var i = 0; i < scripts.length; i++) {
        var script = scripts[i];
        var scriptRes = script.getAttribute('src');
        if (scriptRes && scriptRes.indexOf(res) >= 0) {
            hasScript = true;
            break;
        }
    }

    window.wechat = new Wechat();
    if (!hasScript) {
        var head = document.getElementsByTagName('head')[0];
        script = document.createElement('script');
        script.onload = function () {
            window.wechat.register();
        };
        script.type = 'text/javascript';
        script.src = res;
        head.appendChild(script);
    } else {
        window.wechat.register();
    }
})(window, document);

/**
 * 扩展继承
 * @param another
 * @returns {Object}
 */
Object.prototype.extendObject = function (another) {
    another = another || {};
    for (var item in another) {
        if (!!another[item]) {
            this[item] = another[item];
        }
    }
    return this;
};

/**
 * 暂时支持分享
 * @constructor
 */
function Wechat() {
    this.default = {
        share: {
            title: document.title, // 分享标题
            link: window.location.href, // 分享链接
            imgUrl: 'http://img.itc.cn/photo/jbkRk8qUehb', // 分享图标
            desc: (document.getElementsByName('description').length ? document.getElementsByName('description')[0].content : '') // 分享描述(只有分享给朋友才存在)
        }
    }
}

/**
 * 根据授权配置微信
 */
Wechat.prototype.register = function () {
    var auth = new Auth();
    var that = this;
    auth.done(function (config) {
        wx.config(config);
    });
    wx.ready(function () {
        that._setAppMessage();
        that._setTimeline();
    });
};

/**
 * 分享给朋友
 * @param appMessage
 * @returns {Wechat}
 * @private
 */
Wechat.prototype._setAppMessage = function (appMessage) {
    appMessage = appMessage || {};
    appMessage.extendObject(this.default.share);
    wx.onMenuShareAppMessage(appMessage);
    return this;
};

/**
 * 分享到朋友圈
 * @param timeLine
 * @returns {Wechat}
 * @private
 */
Wechat.prototype._setTimeline = function (timeLine) {
    timeLine = timeLine || {};
    timeLine.extendObject(this.default.share);
    wx.onMenuShareTimeline(timeLine);
    return this;
};

/**
 * 设置分享信息
 * @param shareMessage
 */
Wechat.prototype.setShareMessage = function (shareMessage) {
    this.default.share.extendObject(shareMessage);
    this._setAppMessage({
        title: shareMessage.appTitle || shareMessage.title,
        link: shareMessage.appLink || shareMessage.link,
        imgUrl: shareMessage.appImgUrl || shareMessage.imgUrl,
        desc: shareMessage.desc
    });
    this._setTimeline({
        title: shareMessage.timelineTitle || shareMessage.title,
        link: shareMessage.timelineLink || shareMessage.link,
        imgUrl: shareMessage.timelineImgUrl || shareMessage.imgUrl
    });
};