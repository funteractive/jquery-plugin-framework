'use strict';

var licenseRegexp = /^\!|^@preserve|^@cc_on|\bMIT\b|\bMPL\b|\bGPL\b|\(c\)|License|Copyright/mi;
var isLicenseComment = (function() {
  var _prevCommentLine = 0;

  return function(node, comment) {
    if (licenseRegexp.test(comment.value) ||
      comment.line === 1 ||
      comment.line === _prevCommentLine + 1) {
      _prevCommentLine = comment.line;
      return true;
    }

    _prevCommentLine = 0;
    return false;
  };
})();


module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    bower: {
      install: {
        options: {
          targetDir: './lib',
          layout: 'byType',
          install: true,
          verbose: false,
          cleanTargetDir: true,
          cleanBowerDir: true
        }
      }
    },
    sass: {
      dist: {
        files: [{
          expand: true,
          cwd: 'styles',
          src: ['./demo/shared/scss/*.scss'],
          dest: './demo',
          ext: '.css'
        }]
      }
    },
    autoprefixer: {
      multiple_files: {
        expand: true,
        flatten: true,
        src: './demo/*.css',
        dest: './demo/'
      }
    },
    csslint: {
      strict: {
        options: {
          import: 2
        },
        src: ['./demo/*.css']
      }
    },
    jshint: {
      all: ['./src/*.js']
    },
    uglify: {
      my_target: {
        options:{
          preserveComments: isLicenseComment
        },
        files: {
          './src/pluginName.min.js': ['./src/pluginName.js']
        }
      }
    },
    watch: {
      css: {
        files: [ './demo/shared/scss/*.scss' ],
        tasks: [ 'sass', 'autoprefixer' ]
      },
      livereload: {
        options: { livereload: true },
        files: [ './src/*.js', './demo/shared/scss/*.scss', './demo/*.html' ]
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-bower-task');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-csslint');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', [ 'sass', 'autoprefixer', 'csslint', 'jshint' ]);
  grunt.registerTask('dist', [ 'sass', 'autoprefixer', 'csslint', 'uglify', 'jshint' ]);
  grunt.registerTask('build', [ 'bower:install' ]);

};
