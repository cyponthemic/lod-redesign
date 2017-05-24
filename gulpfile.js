// Gulp plugin setup
var gulp = require('gulp');
var gulpConfig = require('./gulp/gulp-config.js');
// Watches single files
var watch = require('gulp-watch');
// Uploads to shopify
var gulpShopify = require('gulp-shopify-upload');
//Compile sass
var sass         = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
// Notifies of errors
var notify = require("./gulp/gulp-handle-error.js");
// Concats your JS files
var browserify = require('browserify');
var watchify = require('watchify');
var source = require('vinyl-source-stream');
// Image optimization
var imagemin   = require('gulp-imagemin');
var changed    = require('gulp-changed');


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
    //watch js
    gulp.watch('./src/js/**/*.js', ['browserify']);
    //watch images
    gulp.watch('src/images/*.{jpg,jpeg,png,gif,svg}', ['images']);

    var watcher = watchify(browserify({
        // Specify the entry point of your app
        entries: ['./src/js/app.js'],
        debug: true,
        cache: {}, packageCache: {}, fullPaths: true
    }));

    return watcher.on('update', function() {
        watcher.bundle()
            .pipe(source('bundle.js'))
            .pipe(gulp.dest('./dev/assets/'))
    })
});

gulp.task('browserify', function() {
    return browserify('./src/js/app.js')
        .bundle()
        .on('error', notify.error)
        //Pass desired output filename to vinyl-source-stream
        .pipe(source('bundle.js'))
        // Start piping stream to tasks!
        .pipe(gulp.dest('./dev/assets/'));
});
gulp.task('images', function() {
    return gulp.src('./src/images/**')
        .pipe(changed('./dev/assets/')) // Ignore unchanged files
        .pipe(imagemin()) // Optimize
        .pipe(gulp.dest('./dev/assets/'))
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
            ).pipe(notify("Uploaded!"));
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
