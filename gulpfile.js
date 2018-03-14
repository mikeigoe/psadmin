"use strict";

var gulp = require('gulp');
var connect = require('gulp-connect'); // Runs a local dev server
var open = require('gulp-open'); // Open a URL in a browser
var browserify = require('browserify'); // Bundles JS
var reactify = require('reactify'); // Transforms React JSX to JS
var source = require('vinyl-source-stream'); // Use conventional text streams with gulp
var concat = require('gulp-concat'); // Concatenates files
var lint = require('gulp-eslint'); // Lint JS & JSX files

// Config for the local development server

var config = {
  port: 9005,
  devBaseUrl: 'http://localhost',
  paths: {
    html: './src/*.html',
    js: './src/**/*.js',
    images: './src/images/*',
    css: [
      'node_modules/bootstrap/dist/css/bootstrap.min.css',
      'node_modules/bootstrap/dist/css/bootstrap-theme.min.css'
    ],
    dist: './dist',
    mainJs: './src/main.js'
  }
}

// Start a local development server (named 'connect')

gulp.task('connect', function(){
  connect.server({
    root: ['dist'],
    port: config.port,
    base: config.devBaseUrl,
    livereload: true
  });
});

// Opens a given file on the server
// ['connect'] here is a dependency, we are stating that when we run 'open', we want to run 'connect' 
// before our function.

gulp.task('open', ['connect'], function(){
  gulp.src('dist/index.html')
    .pipe(open({ uri: config.devBaseUrl + ':' + config.port + '/'}));
});

// Task to move html files from src to dist

gulp.task('html', function() {
  gulp.src(config.paths.html) // Get any html files from src
    .pipe(gulp.dest(config.paths.dist)) //pass them to a destination (dist folder)
    .pipe(connect.reload()); // Restart the dev server
});

// Task to move js files from src to dist

gulp.task('js', function(){
  browserify(config.paths.mainJs)
    .transform(reactify) // Compile JSX
    .bundle() // Bundles all JS files into one
    .on('error', console.error.bind(console)) // error logging
    .pipe(source('bundle.js')) // Name of our single bundle file
    .pipe(gulp.dest(config.paths.dist + '/scripts')) // pushing bundle.js to the dist folder
    .pipe(connect.reload());
});

// Task to move css files from src to dist

gulp.task('css', function(){
  gulp.src(config.paths.css) // Get any css files
    .pipe(concat('bundle.css'))
    .pipe(gulp.dest(config.paths.dist + '/css'));
});

// Migrates images to dist folder
// Note that I could even optimise my images here

gulp.task('images', function(){
  gulp.src(config.paths.images)
    .pipe(gulp.dest(config.paths.dist + '/images'))
    .pipe(connect.reload());

    // Publish Favicon
    gulp.src('./src/favicon.ico')
      .pipe(gulp.dest(config.paths.dist));
});

// Task to Lint JS/JSX files

gulp.task('lint', function(){
  return gulp.src(config.paths.js)  // note we are return results so we can see the output of our linting
    .pipe(lint({config: 'eslint.config.json'}))
    .pipe(lint.format());
});


// Give gulp a watch task so that every time we make a change, it knows and reloads the browser

gulp.task('watch', function(){
  gulp.watch(config.paths.html, ['html']);
  gulp.watch(config.paths.js, ['js', 'lint']);
});

// Give gulp a default task
// the default task runs an array of tasks defined above, 'html', 'open' and 'watch'

gulp.task('default', ['html', 'js', 'css', 'images', 'lint', 'open', 'watch']); 