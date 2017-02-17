// Gulp plugin setup
var gulp = require('gulp');
var gulpConfig = require('./gulp/gulp-config.js');
// Watches single files
var watch = require('gulp-watch');
var gulpShopify = require('gulp-shopify-upload');
//Compile sass
var sass         = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
// Notifies of errors
var notify = require("./gulp/gulp-handle-error.js");

gulp.task('sass', function () {
    //process scss
    gulp.src('./src/scss/*.{sass,scss}')
        //{includePaths: neat}
        .pipe(sass())
        .on('error', notify.error)
        .pipe(autoprefixer({ browsers: ['last 2 version'] }))
        .pipe(gulp.dest('./dev/assets'));
});

gulp.task('watch', function () {
    //watch scss
    gulp.watch('./src/scss/**/*.{sass,scss}', ['sass']);
});

//default dist folder to upload on watch
var options = {
    "basePath": "dev/"
};
var config = gulpConfig.apiKeys;

gulp.task('shopifywatch', function() {
    return watch('./dev/+(assets|layout|config|snippets|templates|locales)/**')
        .pipe(
            gulpShopify(
                config.dev.apiKey,
                config.dev.password,
                config.dev.siteUrl,
                config.dev.themeId,
                options
            )
        );
});

gulp.task('deploy', function() {
    return gulp.src('./dev/+(assets|layout|config|snippets|templates|locales)/**')
        .pipe(
            gulpShopify(
                config.dev.apiKey,
                config.dev.password,
                config.dev.siteUrl,
                config.dev.themeId,
                options
            )
        );
});

gulp.task('deploy to staging', function() {
    return gulp.src('./+(assets|layout|config|snippets|templates|locales)/**')
        .pipe(
            gulpShopify(
                config.staging.apiKey,
                config.staging.password,
                config.staging.siteUrl,
                config.staging.themeId
            )
        );
});

gulp.task('deploy to live', ['build'], function() {
    return gulp.src('./+(assets|layout|config|snippets|templates|locales)/**')
        .pipe(
            gulpShopify(
                config.live.apiKey,
                config.live.password,
                config.live.siteUrl,
                config.live.themeId
            )
        );
});

gulp.task('default', [
    'shopifywatch', 'watch'
]);