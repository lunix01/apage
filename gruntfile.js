'use strict';
module.exports = function(grunt) {
  // 配置Grunt各种模块的参数
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
  });
  // 从node_modules目录加载模块文件
  //grunt.loadNpmTasks('grunt-contrib-jade');
  //grunt.loadNpmTasks('grunt-contrib-less');
  // 每行registerTask定义一个任务
  //grunt.registerTask('default', ['jade', 'less']);
};