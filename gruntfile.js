module.exports = function(grunt) {

	grunt.initConfig({
        copy: {
            public: {
                cwd: 'src', 
                src: '**', 
                dest: 'dist', 
                expand: true
            }
		}, 
		clean: {
            dist: {
                 src: 'dist'
            }
        },
		useminPrepare: {
			html: 'dist/**/*.html'
		},
		usemin: {
			html: 'dist/**/*.html'
		},
		imagemin: {
			public: {
				expand: true,
				cwd: 'dist/images',
				src: '**/*.{png,jpg,gif}',
				dest: 'dist/images'
			}
		},
		rev: {
			options: {
				encoding: 'utf8',
				algorithm: 'md5',
				length: 5
			},
			imagens: {
				src: ['dist/img/**/*.{png,jpg,gif}']
			},
			minificados: {
				src: ['dist/js/**/*.min.js', 'dist/css/**/*.min.css']
			}
		},
		jshint: {
		   js: {
			  src: ['src/js/**/*.js']
			}
		},
		browserSync: {
			public: {
				bsFiles: {
					src : ['src/**/*']
				}
			}, 
			options: {
				watchTask: true,
				server: {
					baseDir: "src"
				}
			}
		},
		watch: {
			js: {
			  options: {
				 event: ['changed']
			  },
			  files: 'src/js/**/*.js',
			  tasks: 'jshint:js'
			},

		}
	});

	grunt.registerTask('dist', ['clean', 'copy']);
	grunt.registerTask('minifica', ['useminPrepare', 'concat', 'uglify', 'cssmin', 'rev:imagens','rev:minificados', 'usemin', 'imagemin']);
	
	// task que automatiza o grunt
	grunt.registerTask('default', ['dist', 'minifica']);
	grunt.registerTask('server', ['browserSync', 'watch']);

	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-usemin');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-rev');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-browser-sync');

};