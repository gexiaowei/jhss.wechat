/**
 * auth.js
 * @author Vivian
 * @version 1.0.0
 * copyright 2014-2015, gandxiaowei@gmail.com all rights reserved.
 */

/**
 * 在使用微信jsAPI之前需要进行一步授权操作
 * @constructor
 */
function Auth() {
    this.authURL = 'http://asteroid.youguu.com/asteroid/wx/signature';
    this.appId = 'wx7f5b58f40c143dcc';
    this.apiList = ['onMenuShareTimeline', 'onMenuShareAppMessage'];
}

/**
 * 授权过程
 * 根据自己需求修改
 * 具体需求参考http://mp.weixin.qq.com/wiki/7/aaa137b55fb2e0456bf8dd9148dd613f.html#.E6.AD.A5.E9.AA.A4.E4.B8.89.EF.BC.9A.E9.80.9A.E8.BF.87config.E6.8E.A5.E5.8F.A3.E6.B3.A8.E5.85.A5.E6.9D.83.E9.99.90.E9.AA.8C.E8.AF.81.E9.85.8D.E7.BD.AE
 */
Auth.prototype.done = function (done) {
    var self = this;
    var xhr = new XMLHttpRequest();
    xhr.open('get', this.authURL + '?url=' + encodeURIComponent(window.location.href.replace(window.location.hash, '')), true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var data = JSON.parse(xhr.responseText);
            if (data && data.status == '0000' && done) {
                done({
                    appId: self.appId,
                    timestamp: data.timestamp,
                    nonceStr: data.noncestr,
                    signature: data.signature,
                    jsApiList: self.apiList,
                });
            }
        }
    };
    xhr.send();
};