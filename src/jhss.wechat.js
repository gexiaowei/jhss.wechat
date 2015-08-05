/**
 * jhss.wechat.js.js
 * @author Vivian
 * @version 1.0.0
 * copyRight 2014-2015, gandxiaowei@gmail.com all rights reserved.
 */
(function (window, document) {
    'use strict';

    var readyCallback;

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
     * @param callback 微信注册成功回调
     */
    var register = function (options, callback) {
        readyCallback = callback;
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
        options = extend({
            imgUrl: shareOption.imgUrl,
            title: shareOption.title,
            desc: shareOption.desc,
            link: shareOption.link
        }, options);
        wx.onMenuShareAppMessage(options);
    };

    /**
     * 设置分享到朋友圈参数
     * @param options 分享出去的参数（包括:title,link,imgUrl）
     */
    var setTimeline = function (options) {
        options = extend({
            title: shareOption.desc,
            link: shareOption.link,
            imgUrl: shareOption.imgUrl
        }, options);
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
            jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'chooseImage', 'uploadImage']
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

    var getLocalImage = function (callback) {
        if (!callback) {
            return;
        }
        wx.chooseImage({
            count: 1, // 默认9
            sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
            success: function (res) {
                callback(res.localIds); // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
            }
        });
    };

    var uploadLocalImage = function (id, callback) {
        wx.uploadImage({
            localId: id, // 需要上传的图片的本地ID，由chooseImage接口获得
            isShowProgressTips: 1, // 默认为1，显示进度提示
            success: function (res) {
                if (callback) {
                    callback(res.serverId); // 返回图片的服务器端ID
                }
            }
        });
    };

    wx.ready(function () {
        setAppMessage();
        setTimeline();
        if (readyCallback) {
            readyCallback();
        }
    });

    var wechat = {
        register: register,
        setAppMessage: setAppMessage,
        setTimeline: setTimeline,
        hideMenu: hideMenu,
        getNetworkType: getNetworkType,
        getLocalImage: getLocalImage,
        uploadLocalImage: uploadLocalImage
    };

    window.wechat = wechat;

})
(window, document);