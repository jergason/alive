# Life.js

Life.js is an implementation of Conway's Game of Life in JavaScript. It should
work in both the browser and node.js.


## Installation

```bash
npm install life
```

## Usage

Life.js is packaged as a CommonJS module, which means it exports a function to a
global `module.exports` object. To use it in Node.js, just `require` it.

```JavaScript
// Node.js
var Life = require('alive')
  , life
```
To use in the browser, you need to define a global `module` object before you
load Alive.

```HTML
<head>
  <script type='text/javascript'>
    window.module = {};
  </script>
  <script type='text/javascript' src='alive.js'></script>
```

Your actual app code would look something like this.

```JavaScript
// size of the grid
life = new Life(64);
life.getCell(0, 0); // initialized to zero
life.setCell(0, 0, 1); // turn on a cell
life.setCell(0, 1, 1);
life.setCell(1, 1, 1);
life.tick()
```
