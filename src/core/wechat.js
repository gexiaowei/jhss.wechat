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
    /**
     * 暂时支持分享
     * @constructor
     */
    function Wechat() {
        this.debug = false;
        this.default = {
            share: {
                title: document.title, // 分享标题
                link: window.location.href, // 分享链接
                imgUrl: (document.getElementsByName('shareLogo').length ? document.getElementsByName('shareLogo')[0].content : 'http://img.itc.cn/photo/jbkRk8qUehb'), // 分享图标
                desc: (document.getElementsByName('description').length ? document.getElementsByName('description')[0].content : '') // 分享描述(只有分享给朋友才存在)
            }
        };
        this.shareMessage = this.default.share;
    }

    /**
     * 根据授权配置微信
     */
    Wechat.prototype.register = function () {
        if (typeof wx !== 'undefined' && !!window.capvision.wechatAuth) {
            if (this.debug) {
                console.log('开始加载数据');
            }
            var that = this;
            window.capvision.wechatAuth.done(function (config) {
                if (this.debug) {
                    console.log('开始配置微信权限', config);
                }
                wx.config(config);
            });
            wx.ready(function () {
                that.ready = true;
                that.getNetworkType = wx.getNetworkType;
                that._setAppMessage();
                that._setTimeline();
                if (that.readyCallback) {
                    that.readyCallback();
                }
            });
        }
        return this;
    };

    Wechat.prototype.isIn = function () {
        return navigator.userAgent.toLowerCase().indexOf("micromessenger") >= 0;
    };

    Wechat.prototype.setReadyCallback = function (callback) {
        this.readyCallback = callback;
        if (this.ready) {
            callback();
        }
    };

    /**
     * 分享给朋友
     * @param appMessage
     * @returns {Wechat}
     * @private
     */
    Wechat.prototype._setAppMessage = function () {
        if (this.isIn()) {
            var appMessage = this.shareMessage || {};
            wx.onMenuShareAppMessage({
                title: appMessage.appTitle || appMessage.title,
                link: appMessage.appLink || appMessage.link,
                imgUrl: appMessage.appImgUrl || appMessage.imgUrl,
                desc: appMessage.desc
            });
        }
        return this;
    };

    /**
     * 分享到朋友圈
     * @param timeLine
     * @returns {Wechat}
     * @private
     */
    Wechat.prototype._setTimeline = function () {
        if (this.isIn()) {
            var timeLine = this.shareMessage || {};
            wx.onMenuShareTimeline({
                title: timeLine.timelineTitle || timeLine.title,
                link: timeLine.timelineLink || timeLine.link,
                imgUrl: timeLine.timelineImgUrl || timeLine.imgUrl
            });
        }
        return this;
    };

    /**
     * 设置分享信息
     * @param shareMessage
     */
    Wechat.prototype.setShareMessage = function (shareMessage) {
        for (var item in shareMessage) {
            if (!!shareMessage[item]) {
                this.shareMessage[item] = shareMessage[item];
            }
        }
        if (this.ready) {
            if (this.debug) {
                console.log('设置分享内容', this.shareMessage);
            }
            this._setAppMessage()._setTimeline();
        }
        return this;
    };

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

    window.capvision.wechat = new Wechat();
    if (window.capvision.wechat.isIn() && !hasScript) {
        var head = document.getElementsByTagName('head')[0];
        script = document.createElement('script');
        script.onload = function () {
            window.capvision.wechat.register();
        };
        script.type = 'text/javascript';
        script.src = res;
        head.appendChild(script);
    } else {
        window.capvision.wechat.register();
    }
})(window, document);