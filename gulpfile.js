var gulp = require( 'gulp' );
var pug = require( 'gulp-pug' );
var browserSync = require("browser-sync");

//pugをhtmlに変換
gulp.task("pug", () => {
    var option = {
        pretty: true
    }
    gulp.src("./pug/**/*.pug")
        .pipe(plumber({
            errorHandler: notify.onError("Error: <%= error.message %>")
        }))
        .pipe(pug(option))
        .pipe(gulp.dest("./"))
});

//ブラウザ自動リロード
gulp.task('browser-sync', () => {
    browserSync({
        server: {
            baseDir: "./"   //サーバとなるrootディレクトリ
        }
    });
    //ファイルの監視
    //以下のファイルが変わったらリロードする
    gulp.watch("./*.html", gulp.series('reload'));
});

//ブラウザリロード処理
gulp.task('reload', () => {
    browserSync.reload();
});

//sassとpugの監視をして変換処理させる
gulp.task('watch', () => {
    gulp.watch(['./sass/**'], () => {
        gulp.start(['sass']);
    });
    gulp.watch(['./pug/**'], () => {
        gulp.start(['pug']);
    });
});
