var gulp 		= require('gulp'),
	uglify 		= require('gulp-uglify'),
	sass 			= require('gulp-sass')
	plumber 	= require('gulp-plumber'),
	prefix 		= require('gulp-autoprefixer'),
	imagemin 	= require('gulp-imagemin');

// Scripts task
// Uglifies javascript files
gulp.task('scripts', function() {
	gulp.src('./src/js/**/*.js')
		.pipe(plumber())
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

// Watch task
gulp.task('watch', function() {
	gulp.watch('./src/js/**/*.js', ['scripts']);
	gulp.watch('./src/sass/**/*.scss', ['styles']);
	gulp.watch('./src/img/*', ['images']);
});

gulp.task('default', ['scripts', 'styles', 'images', 'watch']);



	
