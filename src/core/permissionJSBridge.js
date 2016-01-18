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
        this.events = {};
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

    /**
     * 在App上增加一个菜单
     * @param option
     * @param callback
     * @returns {number}
     */
    AppJSBridge.prototype.addMenu = function (option) {
        var menuId = 0;
        if (window.jhssJSBridge) {
            menuId = Date.now();
            window.jhssJSBridge.addMenuItem(JSON.stringify({
                eventId: eventId,
                text: option.text,
                icon: option.icon
            }));
            this.events[menuId] = option.callback;
        }
        return menuId;
    };


    AppJSBridge.prototype.addMenus = function (menus) {
        this.addMenu(menus);
    };

    /**
     * 在App上移除一个菜单
     * @param menuId
     */
    AppJSBridge.prototype.removeMenu = function (menuId) {
        delete this.events[menuId];
    };

    /**
     * 触发回调事件
     * @param menuId
     * @param option
     */
    AppJSBridge.prototype.invokeMenuEvent = function (menuId, option) {
        var callback = this.events[menuId];
        if (callback) {
            callback(option);
        }
    };
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