# JC Tiler website

Single-page static website compiled with [Webpack](https://webpack.github.io).

JavaScript source is written in ES6/ES2015 and compiled to browser-ready JavaScript with [Babel](https://babeljs.io).

Styles are written in [Sass](http://sass-lang.com) and utilize core components from [bootstrap-sass](https://github.com/twbs/bootstrap-sass) such as reset, grid, and type.

HTML templates written in [Pug](https://github.com/pugjs/pug) (formerly known as Jade).

## Requirements

Build tasks require Node.js version 4 or higher.

## Tasks

`npm run lint` lint project files

`npm run build` compile into `dist` directory

`npm run dev` compile and serve with Webpack Dev Server with continuous re-compiling on source file changes
