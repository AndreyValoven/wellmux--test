var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    pug = require('gulp-pug'),
    concat = require('gulp-concat'),
    uglify  = require('gulp-uglifyjs'),
    cssmin = require('gulp-cssmin'),
    rename = require('gulp-rename'),
    imagemin = require('gulp-imagemin');

gulp.task('sass', function() {
    return gulp.src('src/sass/main.sass')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('src/css'))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: 'src'
        },
        notify: false
    });
});

gulp.task('dist', function() {
    browserSync({
        server: {
            baseDir: 'dist'
        },
        notify: false
    });
});


gulp.task('pug', function () {
    return gulp.src('./src/pug/index.pug')
        .pipe(pug({
            pretty: true
        }).on('error', function(err) {
            console.log(err);
        }))
        .pipe(gulp.dest('./src'))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('font', function() {
    return gulp.src('src/libs/font-awesome/css/font-awesome.min.css')
                .pipe(gulp.dest('src/css/'));
});

gulp.task('bootstrap--var', function() {
    return gulp.src('src/libs/bootstrap-sass/assets/stylesheets/bootstrap/_variables.scss')
                .pipe(concat('libs.scss'))
                .pipe(gulp.dest('src/sass/'))
});

gulp.task('lib--js', function() {
    return gulp.src(['src/libs/jquery/dist/jquery.slim.min.js','src/libs/bootstrap-sass/assets/javascripts/bootstrap/carousel.js','src/libs/bootstrap-sass/assets/javascripts/bootstrap/collapse.js'])
                .pipe(concat('libs.js'))
                .pipe(gulp.dest('src/js/'));
});


// gulp.task('concat', function() {
//     return gulp.src(['app/sass/base/*.sass', 'app/sass/layout/*.sass', 'app/sass/module/*.sass', 'app/sass/state/*.sass'])
//         .pipe(concat('main.sass'))
//         .pipe(gulp.dest('app/sass'))
// });

// min js
gulp.task('js-min', function() {
    return gulp.src('src/js/**/*.js')
        .pipe(uglify())
        // .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('dist/js'));
});


// min css
gulp.task('cssmin', function() {
    return gulp.src('src/css/main.css')
        .pipe(cssmin())
        // .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('dist/css'));
});

// image min task
gulp.task('img', function() {
    return gulp.src('src/img/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/img'));
});


// html
gulp.task('html', function() {
    return gulp.src('src/*.html')
        .pipe(gulp.dest('dist'));
})


// bild project to dist
gulp.task('bild',['html','cssmin','js-min','img']);


gulp.task('watch', ['pug', 'sass', 'browser-sync'], function() {
    gulp.watch('./src/pug/**/*.pug', ['pug']);
    gulp.watch('./src/*.html', browserSync.reload);
    gulp.watch('./src/sass/**/*.+(scss|sass)',['sass']);
    gulp.watch('./src/js/**/*.js', browserSync.reload);
});