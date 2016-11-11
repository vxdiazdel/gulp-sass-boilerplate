var gulp 				= require('gulp'),
		babel				= require('gulp-babel'),
		concat			= require('gulp-concat'),
		sourcemaps	= require('gulp-sourcemaps'),
		uglify 			= require('gulp-uglify'),
		sass 				= require('gulp-sass')
		plumber 		= require('gulp-plumber'),
		prefix 			= require('gulp-autoprefixer'),
		imagemin 		= require('gulp-imagemin'),
		browserSync	=	require('browser-sync').create();

// Scripts task
// Uglifies javascript files
gulp.task('scripts', function() {
	gulp.src('./src/js/**/*.js')
		.pipe(plumber())
		.pipe(sourcemaps.init())
		.pipe(babel({
			presets: ['es2015']
		}))
		.pipe(concat('bundle.js'))
		.pipe(uglify())
		.pipe(gulp.dest('./build/js'));
});	

// Styles task
// Compiles sass and autoprefixes CSS
gulp.task('styles', function() {
	gulp.src('./src/sass/main.scss')
		.pipe(plumber())
		.pipe(sass({outputStyle: 'compressed'}))
		.pipe(prefix())
		.pipe(gulp.dest('./build/css'));
});

// Images task
// Compresses image files
gulp.task('images', function() {
	gulp.src('./src/img/*')
		.pipe(plumber())
		.pipe(imagemin())
		.pipe(gulp.dest('./build/img'));
});

// Browser Sync
gulp.task('browser-sync', function() {
	browserSync.init({
		server: {
			proxy: 'localhost:3000'
		}	
	});
});

// Watch task
gulp.task('watch', ['browser-sync'], function() {
	gulp.watch('./src/js/**/*.js', ['scripts']);
	gulp.watch('./src/sass/**/*.scss', ['styles']);
	gulp.watch('./src/img/*', ['images']);
	gulp.watch(['*.html', './src/js/**/*.js', './src/sass/**/*.scss']).on('change', browserSync.reload);
});

gulp.task('default', ['scripts', 'styles', 'images', 'watch']);



	
