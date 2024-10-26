module.exports = function(grunt) {
	var fs = require('fs'),
		chalk = require('chalk'),
		uniqid = function () {
			var md5 = require('md5');
			result = md5((new Date()).getTime()).toString();
			grunt.verbose.writeln("Generate hash: " + chalk.cyan(result) + " >>> OK");
			return result;
		};
	
	String.prototype.hashCode = function() {
		var hash = 0, i, chr;
		if (this.length === 0) return hash;
		for (i = 0; i < this.length; i++) {
			chr   = this.charCodeAt(i);
			hash  = ((hash << 5) - hash) + chr;
			hash |= 0; // Convert to 32bit integer
		}
		return hash;
	};
	const NpmImportPlugin = require("less-plugin-npm-import");
	require('load-grunt-tasks')(grunt);
	require('time-grunt')(grunt);

	var gc = {
		assets: "dist/viewer/pdf_viewer"
	}
	grunt.initConfig({
		globalConfig : gc,
		pkg : grunt.file.readJSON('package.json'),
		concat: {
			options: {
				separator: "\n",
			},
			/**
			 * jquery.js
			 */
			jquery: {
				src: [
					"bower_components/jquery/dist/jquery.js"
				],
				dest: 'viewer/jquery.js'
			},
			/**
			 * fancybox.js
			 */
			fancybox: {
				src: [
					"bower_components/fancybox/src/js/core.js",
					"src/js/media.js",
					"bower_components/fancybox/src/js/guestures.js",
					"bower_components/fancybox/src/js/slideshow.js",
					"bower_components/fancybox/src/js/fullscreen.js",
					"bower_components/fancybox/src/js/thumbs.js",
					"bower_components/fancybox/src/js/hash.js",
					"bower_components/fancybox/src/js/wheel.js"
				],
				dest: 'viewer/fancybox.js'
			},
			/**
			 * app.js
			 */
			app: {
				src: [
					"src/js/main.js"
				],
				dest: 'viewer/app.js'
			}
		},
		uglify: {
			options: {
				sourceMap: false,
				compress: {
					drop_console: false
	  			}
			},
			app: {
				files: [
					/**
					 * jquery.js
					 */
					{
						expand: true,
						flatten : true,
						src: [
							'viewer/jquery.js'
						],
						dest: 'viewer',
						filter: 'isFile',
						rename: function (dst, src) {
							return dst + '/' + 'jquery.min.js';
						}
					},
					/**
					 * fancybox.js
					 */
					{
						expand: true,
						flatten : true,
						src: [
							'viewer/fancybox.js'
						],
						dest: 'viewer',
						filter: 'isFile',
						rename: function (dst, src) {
							return dst + '/' + 'fancybox.min.js';
						}
					},
					/**
					 * app.js
					 */
					{
						expand: true,
						flatten : true,
						src: [
							'viewer/app.js'
						],
						dest: 'viewer',
						filter: 'isFile',
						rename: function (dst, src) {
							return dst + '/' + 'app.min.js';
						}
					},
				]
			}
		},
		less: {
			app: {
				options : {
					compress: false,
					ieCompat: false,
					plugins: [
						new NpmImportPlugin({prefix: '~'})
					],
					modifyVars: {
						'hashes': '\'' + uniqid() + '\''
					}
				},
				files : {
					'test/css/app.css' : [
						'bower_components/fancybox/dist/jquery.fancybox.css',
						'src/less/main.less'
					],
					'test/css/style.css' : [
						'icons-full/style.less'
					]
				}
			}
		},
		autoprefixer:{
			options: {
				browsers: [
					"last 4 version"
				],
				cascade: true
			},
			app: {
				files: {
					'test/css/app.css' : [
						'test/css/app.css'
					],
					'test/css/style.css' : [
						'test/css/style.css'
					]
				}
			}
		},
		group_css_media_queries: {
			app: {
				files: {
					'test/css/app.css': ['test/css/app.css'],
					'test/css/style.css': ['test/css/style.css']
				}
			}
		},
		replace: {
			app: {
				options: {
					patterns: [
						{
							match: /\/\*.+?\*\//gs,
							replacement: ''
						},
						{
							match: /\r?\n\s+\r?\n/g,
							replacement: '\n'
						}
					]
				},
				files: [
					/**
					 * All style sheet 
					 */
					{
						expand: true,
						flatten : true,
						src: [
							'test/css/app.css'
						],
						dest: 'viewer/',
						filter: 'isFile'
					},
					{
						expand: true,
						flatten : true,
						src: [
							'test/css/style.css'
						],
						dest: 'icons-full/',
						filter: 'isFile'
					},
				]
			}
		},
		cssmin: {
			options: {
				mergeIntoShorthands: false,
				roundingPrecision: -1
			},
			app: {
				files: {
					'viewer/app.min.css' : [
						'viewer/app.css'
					],
					'icons-full/style.min.css' : [
						'icons-full/style.css'
					],
				}
			}
		},
	});
	grunt.registerTask('default', [
		'concat',
		'uglify',
		'less',
		'autoprefixer',
		'group_css_media_queries',
		'replace',
		'cssmin'
	]);
}