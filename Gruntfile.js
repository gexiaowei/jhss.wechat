/**
 * Gruntfile.js
 * grunt 打包脚本
 * @author Vivian
 * @version 1.0.0
 * copyright 2014-2015, gandxiaowei@gmail.com. all rights reserved.
 */
var banner = '/**\n * jquery.<%=pkg.name%>.js\n * @author <%=pkg.author%>\n * @version <%=pkg.version%>\n * copyright 2014-2015, gandxiaowei@gmail.com. all rights reserved.\n */\n';

module.exports = function (grunt) {
    // 项目配置
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: {
            dist: ['dist']
        },
        jshint: {
            all: ['src/*.js']
        },
        uglify: {
            dist: {
                options: {
                    banner: banner,
                    sourceMap: true
                },
                files: {
                    'dist/jhss.wechat.min.js': ['src/core/auth.js', 'src/core/wechat.js', 'src/core/permissionJSBridge.js'],
                    'dist/angular-wechat.min.js': ['src/core/auth.js', 'src/core/wechat.js', 'src/core/permissionJSBridge.js', 'src/angular-wechat.js']
                }
            }
        }
    });
    // 加载任务的插件
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-clean');

    // 构建文件
    grunt.registerTask('build', ['jshint', 'clean', 'uglify']);
};