'use strict';

var srcpath = "./src/public/";
var dist = "./dist/";

var fs = require('fs');
var packageJSON = JSON.parse(fs.readFileSync('./package.json'));
var version = packageJSON.version;



var gulp = require('gulp');

//for js module manage. refer to task:js
var gutil = require("gulp-util");
var webpack = require("webpack");
var WebpackDevServer = require("webpack-dev-server");
var webpackConfig = require("./webpack.config.js");
////////////////////////////for SASS to CSS///////////////////////
//sass compile to css
var sass = require('gulp-sass');
//generate source maps for the Sass to CSS
var sourcemaps = require('gulp-sourcemaps');
//css autoprefixer
var autoprefixer = require('gulp-autoprefixer');

///////////////////////////sprite images, support retina///////////////////////////////////////
var spritesmith = require('gulp.spritesmith');
var buffer = require('vinyl-buffer');
//minimize css file
var csso = require('gulp-csso');
var imagemin = require('gulp-imagemin');
var merge = require('merge-stream');
//////////////////////////////////////////////////////////////////

var concat = require('gulp-concat');
///////////////////////////replace version/////////////////////////////////
var replace = require('gulp-replace-task');

/////////////////////////////////////////////////////////
var runSequence = require('run-sequence');


var debug = require('gulp-debug');
var clean = require('gulp-clean');

//depended on replaceVersion:js
gulp.task('webpack', function(callback){
	return webpack(webpackConfig, function(err, stats){
		if(err) throw new gutil.PluginError('webpack', err);
		gutil.log('[webpack]', stats.toString({
			colors: true
		}));
		callback();
	});
});

//compile scss to css, have soucemap not compress
gulp.task('sass', function () {
 return gulp.src('./src/public/sass/foundation-flex.scss')
  .pipe(debug())
  .pipe(sourcemaps.init())
  .pipe(sass().on('error', sass.logError))
  .pipe(autoprefixer({
        browsers: ['last 2 versions', '> 1%', 'ie >= 9', 'ff>20', 'last 3 iOS versions']
   }))
  .pipe(sourcemaps.write())
  .pipe(gulp.dest('./src/public/css'));
});

//images sprite
//TODO change sprite image name random, prevent cacheing
gulp.task('sprite', function(){
	var spriteData = gulp.src(srcpath+'images/*.png').pipe(
		spritesmith({
			imgName: 'sprite.png',
			cssName: 'sprite.css',
			//cssFormat: 'scss',
			retinaSrcFilter: [srcpath+'images/*@2x.png'],
			retinaImgName: 'sprite@2x.png',
			padding: 5,
			imgPath: '../sprite/sprite.png',
			retinaImgPath: '../sprite/sprite@2x.png'

		})
	);
	var imgStream = spriteData.img
	.pipe(buffer())
	.pipe(imagemin())
	.pipe(gulp.dest(dist + 'sprite/'));

	var cssStream = spriteData.css
	//.pipe(csso())
	.pipe(gulp.dest(srcpath + 'css/'));

	return merge(imgStream, cssStream);
});

//dependent on sass, sprite
gulp.task('concat:css', function(){
	return gulp.src(srcpath+'css/*.css')
	.pipe(debug())
	.pipe(concat('style.css'))
	.pipe(csso())
	.pipe(gulp.dest(dist+'css/'));
});

//version
gulp.task('replaceVersion:html', function(){
	return gulp.src(srcpath + 'index.html')
	.pipe(replace({
		patterns: [
           {
           	match: 'version',
           	replacement: version
           }
		]
	}))
	.pipe(gulp.dest(dist))
});
gulp.task('replaceVersion:js', function(){
	return gulp.src('./src/global.js')
	.pipe(debug())
	.pipe(replace({
		patterns: [
           {
           	match: 'version',
           	replacement: version
           }
		]
	}))
	.pipe(gulp.dest(srcpath + 'script/common'))
});

gulp.task('clean', function(){
	return gulp.src([
		dist, 
		srcpath+'script/common/global.js',
		srcpath+'css',
		srcpath+'sprite'
		], {read: false})
	.pipe(clean());
});


gulp.task('build:js', function(callback){
	runSequence('clean', 'replaceVersion:js', 'webpack', callback);
});

gulp.task('build:css', function(callback){
	runSequence(
		'clean', 
		['sass', 'sprite'], 
		['concat:css', 'replaceVersion:html'], 
		callback
		);
});

gulp.task('build', function(callback){
	runSequence(
		'clean', 
		['sass', 'sprite', 'replaceVersion:js'],
		['concat:css', 'replaceVersion:html', 'webpack'],
		callback
		)
});

