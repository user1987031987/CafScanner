module.exports = function (grunt) {
    var serverPath = ""; // We will use this path to paste build all content in sever.
    var devMode = true;
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        clean: {
            build: {
                src: ["build", "temp","stylesheets"]
            }
        },
        copy: {
            build: {
                files: [{
                    expand: true,
                    src: ["resources/images", "index.html"],
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
                    dest: 'build/resources',
                    filter: 'isFile'
                }, {
                    expand: true,
                    flatten: true,
                    src: ['temp/cafscanner.js'],
                    dest: 'build/',
                    filter: 'isFile'
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
                    "bower_components/angular-material/angular-material.js",
                    "bower_components/angular-ui-grid/ui-grid.js",
                    "app/*",
                    "app/components/main/**/*.js"
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
        }
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-compass');

    var taskArray = undefined;
    if (devMode) {
        taskArray = [
            "clean:build",
            'copy:build',
            "compass",
            'concat',
            'copy:devModedeploy'
        ];
    } else {
        taskArray = [
            "clean:build",
            'copy:build',
            "compass",
            'concat',
            'uglify',
            'cssmin'
        ];
    }
    grunt.registerTask('default', taskArray);

};