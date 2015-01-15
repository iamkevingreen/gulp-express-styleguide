Artemest Frontend Build
=======================

Dependencies: node > 0.10.35

##Setup

`cd` into the base, and run:

`npm install`

##Environments

The gulp tasks in this repository are configured based on the build environment,
which is determined by the `NODE_ENV` environment variable. By default, the
environment is set to `development`.

In the `development` environment, sourcemaps are available for both CSS and JS,
and neither are minified. In the `production` environment, CSS and JS are minified
and sourcemaps are left off.

##Version Control

Compiled CSS and JS are not kept under source control, and the `./css` and `./js`
directories are included in `.gitignore` to prevent accidental tracking.

##Tasks

### Default

run `gulp` in the root directory to start the livereload/server/watch tasks

### watch

Convenience task for development. Watches JS and SCSS files for changes, and runs
the `development` environment JS and SCSS tasks. Watched files are in `./app` and
`./scss`.

### build

Convenience task for production. Compiles JS and CSS, and minifies files.

### lint

Runs jshint against the JS files.

### scss:dev, scss:prod

Compile SCSS for `development` or `production` environments.

### js:dev, js:prod

Compile JS for `development` or `production` environments. The order in which JS
files are concatenated is determined by the `js.src` property of the `config`
object.
