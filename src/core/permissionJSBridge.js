/**
 * permissionJSBridge.js
 * jhss内部js桥实现
 * @author Vivian
 * @version 1.0.0
 * copyright 2014-2015, gandxiaowei@gmail.com all rights reserved.
 */
(function (window) {
    function AppJSBridge() {
        this.platforms = ['WechatMoments', 'Wechat', 'QZone', 'QQ', 'SinaWeibo'];
        document.onready = function () {
            this.setPermissions();
            this.setShareMessage();
        }
    }

    /**
     * 设置权限
     */
    AppJSBridge.prototype.setPermissions = function () {
        if (jhssJSBridge) {
            jhssJSBridge.setPermissions(this._getMetaContent('jhss-permission').split(','));
        }
    };

    /**
     * 设置
     * @param shareMessage
     * @param platform
     */
    AppJSBridge.prototype.setShareMessage = function (shareMessage, platform) {
        if (jhssJSBridge) {
            var shareKeys = ['title', 'description', 'shareLogo', 'link'];
            var message = {};
            this.platforms.map(function (tempPlatform) {
                var platformShareMessage = this._getDefaultShareMessage(tempPlatform);
                if (platform === tempPlatform) {
                    shareKeys.map(function (key) {
                        if (shareMessage && shareMessage[key]) {
                            platformShareMessage[key] = shareMessage[key];
                        }
                    });
                }
                message[tempPlatform] = platformShareMessage;
            });
            jhssJSBridge.setShareMessage(message);
        }
    };

    /**
     * 获取默认的分享内容
     * @param platform
     * @private
     */
    AppJSBridge.prototype._getDefaultShareMessage = function (platform) {
        return {
            title: this._getMetaContent('platform-title') || document.title || location.href,
            description: this._getMetaContent('platform-description') || this._getMetaContent('description') || location.href,
            shareLogo: this._getMetaContent('platform-shareLogo') || this._getMetaContent('description') || '',
            link: this._getMetaContent('platform-link') || this._getMetaContent('link') || location.href
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