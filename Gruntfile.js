module.exports = function(grunt) {
	var fs = require('fs'),
		path = require('path'),
		chalk = require('chalk'),
		uniqid = function () {
			var md5 = require('md5');
			result = md5((new Date()).getTime()).toString();
			grunt.log.writeln("Generate hash: " + chalk.cyan(result));
			grunt.log.writeln([" "]);
			return result;
		};
	
	const NpmImportPlugin = require("less-plugin-npm-import");
	require('load-grunt-tasks')(grunt);
	require('time-grunt')(grunt);

	let pkg_json = grunt.file.readJSON('package.json');

	var gc = {
			assets: "dist/viewer/pdf_viewer",
			pkg: pkg_json,
			url: pkg_json.repository.url.replace(".git", "").replace("git+", "")
		};

	grunt.log.writeln([" "]);

	// Delete food.zip
	let food_zip = path.normalize(path.join(__dirname, "food.zip")).replace(/\\/g, "/");
	if(fs.existsSync(food_zip)) {
		fs.unlinkSync(food_zip);
		grunt.log.writeln(["Delete file: " + chalk.cyan(food_zip)]);
		grunt.log.writeln([" "]);
	}

	grunt.initConfig({
		globalConfig : gc,
		pkg : gc.pkg,
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
					// Строка 673. Огромная разница в получении ссылки
					"src/js/core.js",
					// Поддержка Rutube, pdf (viewer), xlsx (viewer), docx (viewer)
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
				options: {
					separator: "\n",
					banner: `/**
* <%= pkg.name %> v<%= pkg.version %>
* 
* <%= pkg.description %>
* 
* <%= globalConfig.url %>
* 
* License <%= pkg.license %>
* Author: <%= pkg.author.name %> <<%= pkg.author.email %>> <%= pkg.author.url %>
* Compiled at: <%= grunt.template.today("dd-mm-yyyy") %>
*
**/
`,
				},
				src: [
					"bower_components/js-cookie/src/js.cookie.js",
					"src/js/main.js"
				],
				dest: 'viewer/app.js'
			}
		},
		uglify: {
			app: {
				options: {
					sourceMap: false,
					compress: {
						drop_console: false
		  			},
		  			output: {
		  				ascii_only: true
		  			}
				},
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
				]
			},
			main: {
				options: {
					sourceMap: false,
					compress: {
						drop_console: false
		  			},
					banner: `/**
* <%= pkg.name %> v<%= pkg.version %>
* 
* <%= pkg.description %>
* 
* <%= globalConfig.url %>
* 
* License <%= pkg.license %>
* Author: <%= pkg.author.name %> <<%= pkg.author.email %>> <%= pkg.author.url %>
* Compiled at: <%= grunt.template.today("dd-mm-yyyy") %>
*
**/`,
		  			output: {
		  				ascii_only: true
		  			}
				},
				files: [
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
			},
			main: {
				options: {
					patterns: [
						{
							match: /\r?\n\s+\r?\n/g,
							replacement: '\n'
						}
					]
				},
				files: [
					{
						expand: true,
						flatten : true,
						src: [
							'viewer/app.js',
							'viewer/app.min.js'
						],
						dest: 'viewer/',
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
		compress: {
			main: {
				options: {
					archive: 'food.zip'
				},
				files: [
					{
						expand: true,
						cwd: './',
						src: [
							'viewer/**',
							// .htaccess
							'viewer/.*',
							'viewer/**/.*',
							'food/.*',
							// Только нужные файлы
							'icons-full/.*',
							'icons-full/*.css',
							'icons-full/*.php',
							'icons-full/*.png',
							'icons-full/*.shtml'
						],
						dest: '/food/'
					},
				],
			},
		}
	});
	grunt.registerTask('default', [
		'concat',
		'uglify',
		'less',
		'autoprefixer',
		'group_css_media_queries',
		'replace',
		'cssmin',
		'compress'
	]);
}