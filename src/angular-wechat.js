/**
 * angular-wechat.js
 * @author vivian
 * @time 2015-03-03
 * Copyright 2015 by gandxiaowei@gmail.com
 */
(function (angular, window) {
    'use strict';
    var module = angular.module('$wechat', []);
    module.provider('$wechat', function () {
        this.$get = [function () {
            return window.wechat;
        }];
    });
})(angular, window);