/**
 * File name: Gruntfile.js
 * Author: Lindon Camaj
 * Date: 7/2/2015
 * Copyright (c) 2015 Bild Studio
 * http://www.bild-studio.com
 */
module.exports = function(grunt){

    var vendorLibraries = [
        "node_modules/angular/angular.min.js",
        "node_modules/angular-ui-router/build/angular-ui-router.min.js",
        "node_modules/jquery/dist/jquery.min.js",
        "node_modules/angular-resource/angular-resource.min.js",
		"node_modules/bootstrap/dist/js/bootstrap.min.js"
    ];

    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),

        tag: {
            banner: '/*!\n' +
            ' * <%= pkg.title %>\n' +
            ' * <%= pkg.url %>\n' +
            ' * @author <%= pkg.author %>\n' +
            ' * @version <%= pkg.version %>\n' +
            ' * Copyright (c) <%= pkg.copyright %>. All rights reserved.\n' +
            ' */\n'
        },

        clean: ["build"],

        // jshint
        jshint: {
            all: ['src/js/**/*.js'],
            angular: ['src/js/app/**/*.js'],
            api: ['src/js/api/**/*.js'],
            widgets: ['src/js/widgets/**/*.js'],
            plugins: ['src/js/plugins/**/*.js'],
            options: {
                notypeof: true,
                debug: true,
                eqnull: true,
                globals: {
                    jQuery: true,
                    console: true,
                    module: true,
                    document: true
                }
            }
        },

        // concat
        concat: {
            options: {
                banner: '<%= tag.banner %>',
                separator: '\n\n/* ------------------------------------------------------------------------------------------------------------ */\n\n'
            },

            vendor:{
                src: vendorLibraries,
                dest: "build/js/vendor.js"
            },

            angular: {
                src: ['src/js/app/app.js', 'src/js/app/**/*.module.js', 'src/js/app/**/*.service.js', 'src/js/app/**/*.directive.js', 'src/js/app/**/*.controller.js'],
                dest: 'build/js/app.js'
            },

            api: {
                src: ['src/js/api/**/*.js'],
                dest: 'build/js/api.js'
            },

            widgets: {
                src: ['src/js/widgets/**/*.js'],
                dest: 'build/js/widgets.js'
            },

            plugins: {
                src: ['src/js/plugins/**/*.js'],
                dest: 'build/js/plugins.js'
            }
        },

        // replace text
        // replace matched strings in files
        replace: {
            angular: {
                src: ['<%= concat.angular.dest %>'],
                overwrite: true,
                replacements: [
                    {
                        from: /@!views/g,
                        to: '/build/app/views'
                    }
                ]
            },

            angularViews: {
                src: ['build/app/views/**/*.html'],
                overwrite: true,
                replacements: [
                    {
                        from: /@!views/g,
                        to: '/build/app/views'
                    }
                ]
            }
        },

        // uglify javascript files
        uglify: {

            options: {
                banner: '<%= tag.banner %>',
                mangle: {
                    except: ['jQuery', 'angular', '$', 'require', 'exports', 'kendo']
                }
            },

            angular: {
                files: {
                    'build/js/app.min.js': ['<%= concat.angular.dest %>']
                }
            },

            api: {
                files: {
                    'build/js/api.min.js': ['<%= concat.api.dest %>']
                }
            },

            widgets: {
                files: {
                    'build/js/widgets.min.js': ['<%= concat.widgets.dest %>']
                }
            },

            plugins: {
                files: {
                    'build/js/plugins.min.js': ['<%= concat.plugins.dest %>']
                }
            }

        },

        // minify html files
        htmlmin: {
            angular: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: [
                    {
                        expand: true,
                        cwd: 'src/js/app/views/',
                        src: ['**/*.html'],
                        dest: 'build/app/views/'
                    }
                ]
            }
        },

        // image min
        imagemin: {
            dynamic: {
                files: [{
                    expand: true,
                    cwd: "src/images/",
                    src: ["**/*.{png,jpg,gif}"],
                    dest: "build/images/"
                }]
            }
        },

        // Compass configuration
        compass: {
            dist: {
                options: {
                    config: "compass.rb",
                    outputStyle: "compressed"
                }
            }
        },

        // Watch file changes
        watch: {
            options: {
                livereload: true
            },

            // Watch CSS
            css: {
                files: ["**/*.scss"],
                tasks: ["compass"],
                options: {
                    spawn: false
                }
            },

            angular: {
                files:['src/js/app/**/*.js', 'src/js/app/**/*.html'],
                tasks: ['jshint:angular', 'concat:angular', 'htmlmin', 'replace']
            },

            api:{
                files:['src/js/api/**/*.js'],
                tasks: ['jshint:api', 'concat:api']
            },

            widgets:{
                files:['src/js/widgets/**/*.js'],
                tasks: ['jshint:widgets', 'concat:widgets']
            },

            plugins: {
                files:['src/js/plugins/**/*.js'],
                tasks: ['jshint:plugins', 'concat:plugins']
            },

            // Watch Images
            images: {
                files: [
                    "src/images/**/*.{png,jpg,gif}"
                ],
                tasks: ["imagemin"],
                options: {
                    spawn: false
                }
            }
        }

    });

    // Load Grunt Tasks Plugins
    require("load-grunt-tasks")(grunt);

    grunt.registerTask("default", ["jshint:all", "compass", "concat", "htmlmin", "replace", "imagemin"]);
    grunt.registerTask('production', ["jshint:all", "compass", "concat", "htmlmin", "replace", "imagemin", "uglify"]);

};