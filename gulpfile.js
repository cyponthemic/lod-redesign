// Gulp plugin setup

var gulp = require('gulp');
var gulpConfig = require('./gulp/gulp-config.js');
// Watches single files
var watch = require('gulp-watch');
var gulpShopify = require('gulp-shopify-upload');
var options = {
    "basePath": "src/"
};
var config = gulpConfig.apiKeys;

gulp.task('shopifywatch', function() {
    return watch('./src/+(assets|layout|config|snippets|templates|locales)/**')
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