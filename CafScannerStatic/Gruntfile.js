module.exports = function(grunt) {
    var serverPath = ""; // We will use this path to paste build all content in sever.
    var devMode = true;
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        clean: {
            build: {
                src: ["build", "temp", "stylesheets"]
            }
        },
        copy: {
            build: {
                files: [{
                    expand: true,
                    src: ["resources/icons", "resources/icons/*.*", "index.html"],
                    dest: 'build/'
                }, {
                    expand: true,
                    flatten: true,
                    src: ['bower_components/angular-ui-grid/*.{ttf,woff,eot,svg}'],
                    dest: 'build/resources',
                    filter: 'isFile'
                }]
            },
            devModedeploy: {
                files: [{
                    expand: true,
                    flatten: true,
                    src: ['temp/cafscanner.css'],
                    dest: 'build/resources'
                }, {
                    expand: true,
                    flatten: true,
                    src: ['temp/cafscanner.js'],
                    dest: 'build/'
                }]
            }
        },
        concat: {
            options: {
                separator: '\n',
            },
            jsFiles: {
                src: [
                    "bower_components/loadsh/lodash.js",
                    "bower_components/angular/angular.js",
                    "bower_components/angular-messages/angular-messages.js",
                    "bower_components/angular-aria/angular-aria.js",
                    "bower_components/angular-animate/angular-animate.js",
                    "bower_components/svg-assets-cache.js/svg-assets-cache.js",
                    "bower_components/angular-material/angular-material.js",
                    "bower_components/angular-ui-grid/ui-grid.js",
                    "bower_components/angular-ui-router/release/angular-ui-router.js",
                    "app/app.js",
                    "app/*",
                    "temp/all-templates.js",
                    "app/components/**/*.js"
                ],
                dest: 'temp/<%= pkg.name %>.js',
            },
            cssFiles: {
                src: [
                    'bower_components/angular-ui-grid/ui-grid.css',
                    "bower_components/angular-material/angular-material.css",
                    "stylesheets/*.css"
                ],
                dest: 'temp/<%= pkg.name %>.css'
            }
        },
        uglify: {
            my_target: {
                files: {
                    'build/<%= pkg.name %>.js': ['temp/<%= pkg.name %>.js']
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
                    'build/resources/<%= pkg.name %>.css': ['temp/<%= pkg.name %>.css']
                }
            }
        },
        compass: {
            dist: {
                options: {
                    sassDir: 'sass',
                    cssDir: 'stylesheets'
                }
            }
        },
        ngtemplates: {
            //The "common" key should match the application module name
            common: {
                src: ['app/**/*.html', 'resources/icons/*.svg'],
                dest: 'temp/all-templates.js',
                options: {
                    htmlmin: {
                        collapseBooleanAttributes: true,
                        collapseWhitespace: true,
                        removeAttributeQuotes: true,
                        removeComments: true, // Only if you don't use comment directives!
                        removeEmptyAttributes: true,
                        removeRedundantAttributes: true,
                        removeScriptTypeAttributes: true,
                        removeStyleLinkTypeAttributes: true
                    }
                }
            }
        },
        watch: {
            css: {
                files: ['sass/*.scss', 'app/**/*.html', "index.html"],
                tasks: [
                    "clean:build",
                    'copy:build',
                    "compass",
                    "ngtemplates",
                    'concat',
                    'copy:devModedeploy', 'reload'
                ]
            },
            js: {
                files: ['app/**/*.js'],
                tasks: [
                    "clean:build",
                    'copy:build',
                    "compass",
                    "ngtemplates",
                    'concat',
                    'copy:devModedeploy', 'reload'
                ]
            }
        },
        reload: {
            current: {
                options: {
                    match: /Caf Scanner/
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-angular-templates');

    //Below two tasks is to watch any file changes and reload the chrome current tab;
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-reload-chrome');
    var taskArray = undefined;
    if (devMode) {
        taskArray = [
            "clean:build",
            'copy:build',
            "compass",
            "ngtemplates",
            'concat',
            'copy:devModedeploy'
        ];
    } else {
        taskArray = [
            "clean:build",
            'copy:build',
            "compass",
            "ngtemplates",
            'concat',
            'uglify',
            'cssmin'
        ];
    }
    grunt.registerTask('default', taskArray);

};
