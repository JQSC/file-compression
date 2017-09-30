let gulp = require('gulp'),
    ngAnnotate = require('gulp-ng-annotate'),   //annotate解决angularjs依赖注入的插件
    concat = require('gulp-concat'),  //合并
    uglify = require('gulp-uglify'),  //压缩
    RevAll = require('gulp-rev-all'), //生成版本号
    rename = require('gulp-rename'),   //文件重命名
    notify = require('gulp-notify');   //提示

let creatTask = function (file, path, callback) {
    gulp.src(file)
        .pipe(ngAnnotate())
        .pipe(concat("a.js"))       
        .pipe(RevAll.revision())
        .pipe(gulp.dest(path))  
        .pipe(rename({ suffix: '.min' }))    
        .pipe(uglify())                   
        .pipe(gulp.dest(path))            
        .pipe(notify(function (file) {
            callback(file)
            return "压缩完成!"
        }))
};

let realTimeTask = function (file, path, callback) {
    gulp.src(file)
        .pipe(ngAnnotate())
        .on('error', function (err) {
            this.end();
            callback(err)
        })
        .pipe(uglify())                    
        .pipe(gulp.dest(path))            
        .pipe(notify(function () {
            callback()
            return "压缩完成!"
        }))
};
exports.realTimeTask = realTimeTask;
exports.creatTask = creatTask;