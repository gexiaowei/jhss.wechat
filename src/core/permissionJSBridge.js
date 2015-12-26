/**
 * permissionJSBridge.js
 * jhss内部js桥实现
 * @author Vivian
 * @version 1.0.0
 * copyright 2014-2015, gandxiaowei@gmail.com all rights reserved.
 */
(function (window) {
    function AppJSBridge() {
        this.ready = false;
        window.onload = function () {
            this.ready = true;
            this.addPermissions();
            this.setShareMessage();
        }.bind(this);
    }

    /**
     * 设置权限
     */
    AppJSBridge.prototype.addPermissions = function () {
        if (window.jhssJSBridge) {
            window.jhssJSBridge.addPermissions(this._getMetaContent('jhss-permission'));
        }
    };

    /**
     * 设置分享内容
     * @param shareMessage
     * @param platform
     */
    AppJSBridge.prototype.setShareMessage = function (shareMessage, platform) {
        if (!this.ready) {
            this.shareMessage = shareMessage;
        }
        if (window.jhssJSBridge && this._getPermissions().indexOf('share') >= 0) {
            var platforms = ['WechatMoments', 'Wechat', 'QZone', 'QQ', 'SinaWeibo'],
                shareKeys = ['title', 'description', 'shareLogo', 'link'];

            shareMessage = shareMessage || this.shareMessage;

            var message = {};
            platforms.map(function (tempPlatform) {
                var platformShareMessage = this._getDefaultShareMessage(tempPlatform);
                if (!platform || platform === tempPlatform) {
                    shareKeys.map(function (key) {
                        if (shareMessage && (shareMessage[tempPlatform + '-' + key] || shareMessage[key])) {
                            platformShareMessage[key] = (shareMessage[tempPlatform + '-' + key] || shareMessage[key]);
                        }
                    });
                }
                message[tempPlatform] = platformShareMessage;
            }.bind(this));
            window.jhssJSBridge.setShareMessage(JSON.stringify(message));
        }
    };

    //AppJSBridge.prototype.invoke = function (eventName) {
    //    if (this.events[eventName]) {
    //        this.events[eventName].map(function (callback) {
    //            callback();
    //        });
    //    }
    //};
    //
    //AppJSBridge.prototype.on = function (eventName, callback) {
    //    if (!this.events[eventName]) {
    //        this.events[eventName] = [];
    //    }
    //    this.events[eventName].add(callback);
    //};

    /**
     * 获取网页内权限
     * @returns {Array}
     * @private
     */
    AppJSBridge.prototype._getPermissions = function () {
        return this._getMetaContent('jhss-permission').split(',');
    };

    /**
     * 获取默认的分享内容
     * @param platform
     * @private
     */
    AppJSBridge.prototype._getDefaultShareMessage = function (platform) {
        return {
            title: this._getMetaContent(platform + '-title') || document.title || location.href,
            description: this._getMetaContent(platform + '-description') || this._getMetaContent('description') || location.href,
            shareLogo: this._getMetaContent(platform + '-shareLogo') || this._getMetaContent('shareLogo') || '',
            link: this._getMetaContent(platform + '-link') || this._getMetaContent('link') || location.href
        }
    };

    /**
     * 获取meta信息
     * @param name
     * @returns {*}
     * @private
     */
    AppJSBridge.prototype._getMetaContent = function (name) {
        var meta = document.getElementsByName(name)[0];
        return meta ? (meta.getAttribute('content') || '') : '';
    };


    window.appJSBridge = new AppJSBridge();
})(window);