var gulp = require('gulp')
var sass = require('gulp-sass')
var browserSync = require('browser-sync').create()

var config = {
    proxyTarget: 'https://magento2.test/',
}

gulp.task('watch', function () {
    browserSync.init({
        proxy: {
            target: config.proxyTarget,
        },
        reloadDelay: 1000,
        reloadDebounce: 1000,
        https: false,
    })
    gulp.watch('./styles/styles.scss', gulp.series('sass')).on(
        'change',
        browserSync.reload
    )
})

gulp.task('reload-js', function () {
    browserSync.reload()
})

gulp.task('sass', function () {
    const postcss = require('gulp-postcss')
    return gulp
        .src('./styles/styles.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(
            postcss([
                require('postcss-import'),
                require('tailwindcss'),
                require('autoprefixer'),
            ])
        )
        .pipe(gulp.dest('web/css'))
        .pipe(browserSync.stream())
})

gulp.task('build', gulp.series('sass'))

gulp.task('default', gulp.series('build'))
