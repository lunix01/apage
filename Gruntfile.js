/*
* name: apage
* version: 0.1.0
* author: lunix01
* Copyright (c) 2014
*/
'use strict';
module.exports = function(grunt) {
  require("load-grunt-tasks")(grunt); // babel
  // 配置Grunt各种模块的参数
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    conf: {
      date: '<%= grunt.template.today("yyyymmdd") %>',
      less: '<%= conf.date %>/less',
      css: '<%= conf.date %>/css',
      image: '<%= conf.date %>/image',
      js: '<%= conf.date %>/js',
      es: '<%= conf.date %>/es'
    },
    mkdir: {
      all: {
        options: {
          create: ['<%= conf.less %>','<%= conf.css %>','<%= conf.image %>','<%= conf.js %>','<%= conf.es %>']
        }
      }
    },
    copy: {
      main: {
        files: [
          {src: ['index.jade'], dest: '<%= conf.date %>/index.jade'},
          {src: ['style.less'], dest: '<%= conf.date %>/less/style.less'},
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
      options: {
        shorthandCompacting: false,
        roundingPrecision: -1
      },
      target: {
        files: {
          '<%= conf.date %>/css/style.css': ['<%= conf.date %>/css/style.css']
        }
      }
    },
    babel: {
      dist: {
        files: {
          "<%= conf.date %>/js/js.js": "<%= conf.date %>/es/*.js"
        }
      }
    },
    uglify: {
      options: {
        mangle: false
      },
      my_target: {
        files: {
          '<%= conf.date %>/js/js.js': ['<%= conf.date %>/js/js.js']
        }
      }
    },
    watch: {
      jade: {
        files: ['<%= conf.date %>/*.jade'],
        tasks: ['jade'],
        options: {
          livereload: true
        }
      },
      less: {
        files: ['<%= conf.date %>/less/*.less'],
        tasks: ['less'],
        options: {
          livereload: true
        }
      },
      cssmin: {
        files: ['<%= conf.date %>/css/*.css'],
        tasks: ['cssmin'],
        options: {
          livereload: true
        }
      },
      babel: {
        files: ['<%= conf.date %>/es/*.js'],
        tasks: ['babel'],
        options: {
          livereload: true,
        }
      },
      uglify: {
        files: ['<%= conf.date %>/js/*.js'],
        tasks: ['uglify'],
        options: {
          livereload: true,
        }
      }
    }
  });
  // 从node_modules目录加载模块文件
  grunt.loadNpmTasks('grunt-mkdir');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  // 每行registerTask定义一个任务
  grunt.registerTask('default', ['jade','less','cssmin','babel','uglify','watch']);
  grunt.registerTask('apage', ['mkdir','copy','jade','less','cssmin','babel','uglify','watch']);
};
