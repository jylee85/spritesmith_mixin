var gulp = require('gulp'),
	spritesmith = require('gulp.spritesmith'),
	sass = require('gulp-sass'),
	sourcemaps = require('gulp-sourcemaps');

var spArr = [
		'sp'
	];

gulp.task('watch',function() {
	//scss 파일 수정 시
	gulp.watch('./src/sass/*.scss',['sass']);
	//sp 이미지 수정 시
	gulp.watch(['./src/scss/_sprite/**', './src/img/sp/*.png'],['sprite','sass']);
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

