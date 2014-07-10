/*
* name: apage
* version: 0.1.0
* author: lunix01
* Copyright (c) 2014
*/
'use strict';
module.exports = function(grunt) {
  // 配置Grunt各种模块的参数
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    conf: {
      date: '<%= grunt.template.today("yyyymmdd") %>',
      less: '<%= conf.date %>/less',
      css: '<%= conf.date %>/css',
      js: '<%= conf.date %>/js',
      image: '<%= conf.date %>/image'
    },
    mkdir: {
      all: {
        options: {
          create: ['<%= conf.less %>','<%= conf.css %>','<%= conf.js %>','<%= conf.image %>']
        },
      },
    },
    copy: {
      main: {
        files: [
          {expand: true, src: ['index.jade'], dest: '<%= conf.date %>/', filter: 'isFile'},
          {expand: true, src: ['style.less'], dest: '<%= conf.date %>/less/', filter: 'isFile'},
        ]
      },
    },
    jade: {
      compile: {
        files: {
          "<%= conf.date %>/index.html": "<%= conf.date %>/index.jade"
        }
      }
    },
    less: {
      production: {
        files: {
          "<%= conf.date %>/css/style.css": "<%= conf.date %>/less/style.less"
        }
      }
    },
    cssmin: {
      minify: {
        expand: true,
        cwd: '<%= conf.date %>/css/',
        src: ['*.css', '!*.min.css'],
        dest: '<%= conf.date %>/css/',
        ext: '.min.css'
      }
    }
  });
  // 从node_modules目录加载模块文件
  grunt.loadNpmTasks('grunt-mkdir');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  // 每行registerTask定义一个任务
  grunt.registerTask('default',['mkdir','copy','jade','less','cssmin']);
  grunt.registerTask('apage',  ['mkdir','copy','jade','less','cssmin']);
};
