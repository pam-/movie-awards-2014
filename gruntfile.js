var fs = require('fs');
var osenv = require('osenv');
var home = osenv.home();

// var secrets = JSON.parse(fs.readFileSync(home + '/.secrets/secrets.json', 'utf8'));

module.exports = function(grunt) {

  require('time-grunt')(grunt);
  // Project configuration.
  grunt.initConfig({
    config: {
      'name': '2014-movies',
      'src': 'src/',
      'build': 'www/',
      'tests': 'tests/',
      'tmp': '.tmp/'
    },
    pkg: grunt.file.readJSON('package.json'),
    sass: {
      dev: {
        options: {
          style: 'expanded'
        },
        files: {
          '<%=config.tmp%>project.css': '<%=config.src%>style/scss/project.scss'
        }
      },
      build: {
        options: {
          style: 'compressed'
        },
        files: {
          '<%=config.tmp%>project.css': '<%=config.src%>style/scss/project.scss'
        }
      }
    },
    autoprefixer: {
      options: {
        // Task-specific options go here.
      },
      dev: {
        options: {
          map: true
        },
        src: '<%=config.tmp%>project.css',
        dest: '<%=config.build%>style/project.css'
      },
      build: {
        options: {
          map: false
        },
        src: '<%=config.tmp%>project.css',
        dest: '<%=config.build%>style/project.css'
      }
    },
    jshint: {
      options: {
        scripturl: true,
        ignores: ['<%=config.src%>js/lib/*.js']
      },
      all: ['Gruntfile.js', 'test/*.js', '<%=config.src%>js/**/*.js']
    },
    jst: {
      compile: {
        options: {
          namespace: "JST",
          processName: function(filepath) {
            var result = filepath.substr(14);
            return result;
          },
          amd: true,
        },
        files: {
          "<%=config.src%>js/templates.js": ["<%=config.src%>templates/*.html"]
        }
      }
    },
    watch: {
      styles: {
        files: ['<%=config.src%>style/scss/*.scss'],
        tasks: ['sass:dev', 'autoprefixer:dev']
      },
      js: {
        files: ['<%=config.src%>js/**/*.js'],
        tasks: ['requirejs:dev']
      },
      jst: {
        files: ['<%=config.src%>templates/*'],
        tasks: ['jst', 'requirejs:dev']
      },
      data: {
        files: ['<%=config.src%>data/**/*.json'],
        tasks: ['copy:main']
      },
      test: {
        files: ['tests/spec/*.js', 'tests/*.html'],
        tasks: ['copy:test']
      },
      html: {
        files: ['<%=config.src%>*.html'],
        tasks: ['copy:main']
      },
      img: {
        files: ['<%=config.src%>img/*'],
        taks: ['copy:main']
      },
      options: {
        livereload: true,
      }
    },
    browserSync: {
      dev: {
        bsFiles: {
          src: '<%=config.build%>**/*'
        },
        options: {
          watchTask: true,
          server: {
            baseDir: "<%=config.build%>"
          }
        }
      },
      test: {
        bsFiles: {
          src: '<%=config.build%>**/*'
        },
        options: {
          watchTask: true,
          server: {
            baseDir: "<%=config.build%>",
            index: "SpecRunner.html"
          }
        }
      },

    },
    jasmine: {
      test: {
        src: 'src/**/*.js',
        options: {
          specs: 'test/*.js',
          helpers: 'test/*Helper.js'
        }
      }
    },
    requirejs: {
      dev: {
        options: {
          "modules": [{
            "name": "main",
          }],
          "baseUrl": "<%=config.src%>js",
          "dir": "<%=config.build%>js",
          "preserveLicenseComments": false,
          "optimize": "none",
          // "optimize": "uglify2",
          "useStrict": true,
          "uglify2": {
            "beautify": true,
            "toplevel": true
          },
          "paths": {
            "jquery": '../../bower_components/jquery/dist/jquery',
            "backbone": '../../bower_components/backbone/backbone',
            "underscore": '../../bower_components/underscore/underscore',
            "jquery_ui": "lib/jquery-ui.min",
            "jquery_ui_touch_punch": "lib/jquery.ui.touch-punch.min",
            "analytics": "lib/analytics",
            "mobile_detect": "lib/mobile-detect",
            "d3": '../../bower_components/d3/d3',
            "isotope": "../../bower_components/isotope/dist/isotope.pkgd",
            "imagesloaded": "../../bower_components/imagesloaded/imagesloaded.pkgd",
            "mapbox": '../../bower_components/mapbox.js/mapbox.uncompressed'
              // "api/ads": "api/ads",
              // "api/analytics": "api/analytics"
          },
          "shim": {
            'backbone': {
              "deps": ['underscore', 'jquery'],
              "exports": 'Backbone'
            },
            'underscore': {
              "exports": '_'
            },
            "jquery_ui": {
              "deps": [
                "jquery"
              ],
              "exports": "jQuery"
            },
            "jquery_ui_touch_punch": {
              "deps": [
                "jquery"
                // "jquery_ui"
              ],
              "exports": "jQuery"
            }
          }
        }
      },
      deploy: {
        options: {
          "modules": [{
            "name": "main",
            "exclude": [
              "jquery",
              "underscore",
              "backbone"
            ]
          }],
          "baseUrl": "<%=config.src%>js",
          "dir": "<%=config.build%>js",
          // "generateSourceMaps": true,
          "preserveLicenseComments": false,
          // "optimize": "none",
          "optimize": "uglify2",
          "useStrict": true,
          "uglify2": {
            "beautify": true,
            "toplevel": true
          },
          "paths": {
            "jquery": '../../bower_components/jquery/dist/jquery',
            "backbone": '../../bower_components/backbone/backbone',
            "underscore": '../../bower_components/underscore/underscore',
            "jquery_ui": "lib/jquery-ui.min",
            "jquery_ui_touch_punch": "lib/jquery.ui.touch-punch.min",
            "analytics": "lib/analytics",
            "mobile_detect": "lib/mobile-detect",
            "d3": '../../bower_components/d3/d3',
            "isotope": "../../bower_components/isotope/dist/isotope.pkgd",
            "imagesloaded": "../../bower_components/imagesloaded/imagesloaded.pkgd",
            "mapbox": '../../bower_components/mapbox.js/mapbox.uncompressed'
              // "api/ads": "api/ads",
              // "api/analytics": "api/analytics"
          },
          "shim": {
            'backbone': {
              "deps": ['underscore', 'jquery'],
              "exports": 'Backbone'
            },
            'underscore': {
              "exports": '_'
            },
            "jquery_ui_touch_punch": {
              "deps": [
                "jquery",
                "jquery_ui"
              ],
              "exports": "jQuery"
            }
          }
        }
      }
    },

    copy: {
      main: {
        files: [
          // includes files within path
          {
            expand: true,
            cwd: '<%=config.src%>',
            src: ['*.html'],
            dest: '<%=config.build%>',
            filter: 'isFile'
          },
          // {expand: true, src: ['js/**/*.js', 'js/**/*.json'], dest: 'www/', filter: 'isFile'},
          {
            expand: true,
            cwd: '<%=config.src%>',
            src: ['img/*'],
            dest: '<%=config.build%>',
            filter: 'isFile'
          }, {
            expand: true,
            cwd: '<%=config.src%>',
            src: ['data/*.json'],
            dest: '<%=config.build%>',
            filter: 'isFile'
          }, {
            expand: true,
            cwd: 'bower_components/requirejs/',
            src: ['require.js'],
            dest: '<%=config.build%>',
            filter: 'isFile'
          }

        ]
      },
      test: {
        files: [
          // includes files within path
          {
            expand: true,
            cwd: '<%=config.tests%>',
            src: ['**/*'],
            dest: '<%=config.build%>',
            filter: 'isFile'
          },
        ]
      },
      deploy: {
        files : [
          {
            expand: true,
            cwd: '<%=config.build%>',
            src: ['js/*.json'],
            dest: '',
            filter: 'isFile'
          },
          {
            expand: true,
            cwd: '<%=config.build%>',
            src: ['js/main.js'],
            dest: '',
            filter: 'isFile'
          },
          {
            expand: true,
            cwd: '<%=config.build%>',
            src: ['style/project.css'],
            dest: '',
            filter: 'isFile'
          }
        ]
      }
    },

    ftp: {
      // options: {
      //   host: secrets.akamai_1.host,
      //   user: secrets.akamai_1.user,
      //   pass: secrets.akamai_1.pass
      // },
      upload1: {
        files: {
          '/17200/experiments/usatoday/2015/01/movies-2014/': 'js/main.js'
          // '/17200/experiments/usatoday/2015/1/movies-2014/': 'data/*.json'
        }
      },
      upload2: {
        files: {
          '/17200/experiments/usatoday/2015/01/movies-2014/': 'style/project.css'
          // '/17200/experiments/usatoday/2015/1/movies-2014/': 'data/*.json'
        }
      },
      upload3: {
        files: {

          '/17200/experiments/usatoday/2015/01/movies-2014/': 'js/data.json'
        }
      }
    },

    clean: {
      dev: ['<%=config.build%>'],
      tmp: ['<%=config.tmp%>'],
      deploy:  ['js', 'style', 'data']
    }

  });

  // Load the plugins
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-browser-sync');
  grunt.loadNpmTasks('grunt-contrib-jst');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-ftp');

  // Default task(s).

  grunt.registerTask('default', ['clean:dev', 'jst', 'requirejs:dev', 'sass:dev', 'autoprefixer:dev', 'copy:main', 'clean:tmp', 'browserSync:dev', 'watch']);
  grunt.registerTask('test', ['clean:dev', 'jst', 'requirejs:dev', 'sass:dev', 'autoprefixer:dev', 'copy:main', 'copy:test', 'clean:tmp', 'browserSync:test', 'watch']);
  grunt.registerTask('build', ['clean:dev', 'jst', 'requirejs:deploy', 'sass:build', 'autoprefixer:build', 'copy:main'])
  grunt.registerTask('deploy', ['build', 'copy:deploy', 'ftp:upload1', 'ftp:upload2', 'ftp:upload3', 'clean:deploy']);
};