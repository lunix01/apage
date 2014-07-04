'use strict';
module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    conf: {
      date: '<%= grunt.template.today("yyyymmdd") %>',
      less: '<%= conf.date %>/less',
      css: '<%= conf.date %>/css',
      js: '<%= conf.date %>/js',
      images: '<%= conf.date %>/images'
    },
    mkdir: {
      all: {
        options: {
          create: ['<%= conf.less %>','<%= conf.css %>','<%= conf.js %>','<%= conf.images %>']
        },
      },
    }
  });
  grunt.loadNpmTasks('grunt-mkdir');
  grunt.registerTask('default',['mkdir']);
};
