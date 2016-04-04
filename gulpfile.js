var gulp = require('gulp'),
	spritesmith = require('gulp.spritesmith'),
	sass = require('gulp-sass'),
	sourcemaps = require('gulp-sourcemaps'),
	php2html = require('gulp-php2html'),
	clean = require('gulp-clean'),
	imageResize = require('gulp-image-resize'),
	rename = require("gulp-rename");

var spArr = [
		'sp',
		'sp_common'
	];

gulp.task('watch',function() {
	//scss 파일 수정 시
	gulp.watch('./src/sass/*.scss',['sass']);
	//sp 이미지 수정 시
	gulp.watch(['./src/sass/sprite/**', './src/img/sp_**/*.png'],['sprite','sass']);
});

gulp.task('clean',function(){
	return gulp.src('./dist/', {read: false})
		.pipe(clean({force: true}))
		.pipe(gulp.dest('dist'));
});

gulp.task('php2html',function(){
	return gulp.src(['./src/*.php','!./src/@*.php','!./src/_*.php'])
	.pipe(php2html())
	.pipe(gulp.dest("./dist"));
});

gulp.task('sprite', function(){
	for (var i = 0; i < spArr.length; i++){
		var spriteData = gulp.src('./src/im/'+spArr[i]+'/*.png')
			.pipe(spritesmith({
				imgName: spArr[i]+'.png',
				cssName: '_'+spArr[i]+'.scss',
				imgPath: '../img/'+spArr[i]+'.png',
				cssTemplate: 'sprites_format.handlebars',
				cssSpritesheetName: spArr[i],
				padding: 10
			}));

		spriteData.img.pipe(gulp.dest('./src/im/'))
					  .pipe(gulp.dest('./dist/im/'));
		spriteData.css.pipe(gulp.dest('./src/sass/_sprites/'));
	}
});

gulp.task('imageResize', function () {
	for (var i = 0; i < spArr.length; i++){
		gulp.src('./src/im/'+spArr[i]+'.png')
		.pipe(imageResize({
			imageMagick: true,
			width: '50%',
			height: '50%',
			quality: 1
		}))
		.pipe(rename(function (path) { path.basename += "_pc"; }))
		.pipe(gulp.dest('./src/im/')).pipe(gulp.dest('./dist/im/'));
	}
});

gulp.task('sass', function () {
	return gulp.src('./src/sass/*.scss')
		.pipe(sourcemaps.init())
		.pipe(sass({outputStyle: 'compact'}).on('error', sass.logError))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('./src/css'))
		.pipe(gulp.dest('./dist/css'));
});

gulp.task('default',['sprite'], function() {
	console.log('done');
});

