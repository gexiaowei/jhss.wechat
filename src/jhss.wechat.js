/**
 * jhss.wechat.js.js
 * @author Vivian
 * @version 1.0.0
 * copyRight 2014-2015, gandxiaowei@gmail.com all rights reserved.
 */
(function (window, document) {
    'use strict';

    //默认设置
    var shareOption = {
        imgUrl: 'http://www.youguu.com/images/logo.gif',
        title: document.title,
        desc: document.getElementById('desc') ? document.getElementById('desc').innerText : '',
        link: window.location.href
    };

    function extend(obj1, obj2) {
        obj2 = obj2 || {};
        for (var item in obj2) {
            obj1[item] = obj2[item];
        }
        return obj1;
    }

    /**
     * 注册微信组件
     * @param options 分享参数
     */
    var register = function (options) {
        extend(shareOption, options);
        var xhr = new XMLHttpRequest();
        xhr.open('get', 'http://asteroid.youguu.com/asteroid/wx/signature?url=' + encodeURIComponent(window.location.href.replace(window.location.hash, '')), true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                var data = JSON.parse(xhr.responseText);
                if (data && data.status == '0000') {
                    processWechatAuth(data);
                }
            }
        };
        xhr.send();
    };

    /**
     * 设置分享到朋友额参数
     * @param options 分享出去的参数（包括:title,desc,link,imgUrl）
     */
    var setAppMessage = function (options) {
        options = options || {};
        extend(options, shareOption);
        wx.onMenuShareAppMessage(options);
    };

    /**
     * 设置分享到朋友圈参数
     * @param options 分享出去的参数（包括:title,link,imgUrl）
     */
    var setTimeline = function (options) {
        options = options || {};
        extend(options, {
            title: shareOption.desc,
            link: shareOption.link,
            imgUrl: shareOption.imgUrl
        });
        wx.onMenuShareTimeline(options);
    };

    /**
     * 转换微信授权的参数
     * @param data 后台处理过后的参数
     */
    var processWechatAuth = function (data) {
        var wx_options = {
            debug: false,
            appId: 'wx7f5b58f40c143dcc',
            timestamp: data.timestamp,
            nonceStr: data.noncestr,
            signature: data.signature,
            jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage']
        };
        wx.config(wx_options);
    };

    /**
     * 隐藏微信菜单
     * @param menus 菜单名称列表(具体名字参照：http://mp.weixin.qq.com/wiki/7/aaa137b55fb2e0456bf8dd9148dd613f.html#.E9.99.84.E5.BD.953-.E6.89.80.E6.9C.89.E8.8F.9C.E5.8D.95.E9.A1.B9.E5.88.97.E8.A1.A8)
     */
    var hideMenu = function (menus) {
        if (!menus) {
            wx.hideOptionMenu();
        } else {
            wx.hideMenuItems({
                menuList: menus // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录3
            });
        }
    };

    /**
     * 获取用户手机网络状态
     * @param callback 成功回调函数
     */
    var getNetworkType = function (callback) {
        if (!callback) {
            return;
        }
        wx.getNetworkType({
            success: callback
        });
    };

    wx.ready(function () {
        setAppMessage();
        setTimeline();
    });

    var wechat = {
        register: register,
        setAppMessage: setAppMessage,
        setTimeline: setTimeline,
        hideMenu: hideMenu,
        getNetworkType: getNetworkType
    };

    window.wechat = wechat;

})
(window, document);