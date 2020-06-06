let gulp = require("gulp");
let htmlmin = require("gulp-htmlmin");
let cssmin = require("gulp-clean-css");
let uglify = require("gulp-uglify");
let imagemin=require("gulp-imagemin");

gulp.task("default", async () => {
    gulp.watch("./*.html", async () => {
        gulp.src("./*.html")
            .pipe(gulp.dest("d:\\phpstudy\\www\\kaola"));
    })
    gulp.watch("./css/**/*", async () => {
        gulp.src("./css/**/*")
            .pipe(gulp.dest("d:\\phpstudy\\www\\kaola\\css"));
    })
    gulp.watch("./*.php", async () => {
        gulp.src("./*.php")
            .pipe(gulp.dest("d:\\phpstudy\\www\\kaola"));
    })
    gulp.watch("./js/**/*", async () => {
        gulp.src("./js/**/*")
            .pipe(gulp.dest("d:\\phpstudy\\www\\kaola\\js"));
    })
    gulp.watch("./images/**/*", async () => {
        gulp.src("./images/**/*")
            .pipe(gulp.dest("d:\\phpstudy\\www\\kaola\\images"));
    })
})
gulp.task("watch-all",async ()=>{
    gulp.watch("./*.html",async ()=>{
        gulp.src("./*.html")
        .pipe(htmlmin({
            collapseWhitespace: true,
            removeComments: true,  
            collapseBooleanAttributes: true,
            removeEmptyAttributes: true, 
            removeScriptTypeAttributes: true,
            removeStyleLinkTypeAttributes: true, 
            minifyJS: true,
            minifyCSS: true
        }))
        .pipe(gulp.dest("d:\\phpstudy\\www\\kaola"));
    });

    // 监听css文件
    gulp.watch("./css/**/*", async ()=>{
        gulp.src("./css/**/*")
        .pipe(cssmin())
        .pipe(gulp.dest("d:\\phpstudy\\www\\kaola\\css"))
    });
    gulp.watch("./images/**/*", async ()=>{
        gulp.src("./images/**/*")
        .pipe(imagemin())
        .pipe(gulp.dest("d:\\phpstudy\\www\\kaola\\images"))
    });
})
// var gulp = require('gulp'),
//     imagemin = require('gulp-imagemin');

// gulp.task('testImagemin', function () {
//     gulp.src('src/img/*.{png,jpg,gif,ico}')
//         .pipe(imagemin())
//         .pipe(gulp.dest('dist/img'));
// });