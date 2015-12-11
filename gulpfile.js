var gulp          = require('gulp'),
  addStream       = require('add-stream'),
  useref          = require('gulp-useref'),
  jshint          = require('gulp-jshint'),
  concat          = require('gulp-concat'),
  rename          = require('gulp-rename'),
  uglify          = require('gulp-uglify'),
  replace         = require('gulp-replace'),  
  shorthand       = require('gulp-shorthand'),
  stylish         = require('jshint-stylish'),
  minifyCSS       = require('gulp-minify-css'),
  ngAnnotate      = require('gulp-ng-annotate'),
  minifyHTML      = require('gulp-minify-html'),
  templateCache   = require('gulp-angular-templatecache')

function prepareTemplates() {
  return gulp.src('components/**/*.html')
    .pipe(minifyHTML({ quotes: true }))
    .pipe(templateCache())
} 

//new RegExp('components/.+/', 'g')
gulp.task('js', function() {
  return gulp.src([
    'js/lib/ionic.bundle.js',
    'js/lib/pouchdb.js',
    'js/lib/underscore.js',
    'js/app.js',
    'js/filters.js',
    'js/services.js',
    'components/**/*.js'
  ])
  .pipe(replace('http://localhost/bible/', 'http://bible.afrobots.co/'))
  .pipe(replace('http://localhost:8080', 'http://audio.shonahistory.co.za'))
  .pipe(ngAnnotate())
  .pipe(jshint())
  .pipe(jshint.reporter(stylish))
  .pipe(addStream.obj(prepareTemplates()))
  .pipe(replace(/components\//g, ''))
  .pipe(concat('all.js'))
  .pipe(uglify())
  .pipe(rename('app.min.js'))
  .pipe(gulp.dest('build'))
})

gulp.task('css', function() {
  return gulp.src('css/**/*.css')
    .pipe(concat('all.css'))
    .pipe(shorthand())
    .pipe(minifyCSS())
    .pipe(rename('app.min.css'))
    .pipe(gulp.dest('build'))
})

gulp.task('copy', function() {
  gulp.src('css/ionicons.woff').pipe(gulp.dest('build'))
  gulp.src(['img/**/*']).pipe(gulp.dest('build/img'))
  
  gulp.src(['index.html'])
  .pipe(useref())
  .pipe(gulp.dest('build'))
})

gulp.task('default', ['js', 'css', 'copy'])