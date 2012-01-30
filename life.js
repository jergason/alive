(function() {
  "use strict";
  var Board, initGrid, isInBounds, numberOfNeighbors;

  initGrid = function(size) {
    var grid, i, j;
    grid = [];
    for (i = 0; 0 <= size ? i < size : i > size; 0 <= size ? i++ : i--) {
      grid[i] = [];
      for (j = 0; 0 <= size ? j < size : j > size; 0 <= size ? j++ : j--) {
        grid[i][j] = 0;
      }
    }
    return grid;
  };

  isInBounds = function(grid, x, y) {
    var xLen, yLen;
    xLen = grid.length;
    yLen = grid[0].length;
    return ((0 <= x && x < xLen)) && ((0 <= y && y < yLen));
  };

  numberOfNeighbors = function(grid, x, y) {
    var neighbors, pair, surroundings, _i, _len;
    neighbors = 0;
    surroundings = [[-1, -1], [0, -1], [1, -1], [-1, 0], [1, 0], [-1, 1], [0, 1], [1, 1]];
    for (_i = 0, _len = surroundings.length; _i < _len; _i++) {
      pair = surroundings[_i];
      if (isInBounds(grid, x + pair[0], y + pair[1]) && grid[x + pair[0]][y + pair[1]]) {
        neighbors++;
      }
    }
    return neighbors;
  };

  Board = (function() {

    function Board(size) {
      this.size = size;
      this.grid = initGrid(this.size);
      this.nextTickGrid = initGrid(this.size);
    }

    Board.prototype.tick = function() {
      var neighbors, x, y, _ref, _ref2;
      for (x = 0, _ref = this.size; 0 <= _ref ? x < _ref : x > _ref; 0 <= _ref ? x++ : x--) {
        for (y = 0, _ref2 = this.size; 0 <= _ref2 ? y < _ref2 : y > _ref2; 0 <= _ref2 ? y++ : y--) {
          neighbors = numberOfNeighbors(this.grid, x, y);
          if (this.getCell(x, y)) {
            if (neighbors < 2) {
              this.nextTickGrid[x][y] = 0;
            } else if (neighbors === 2 || neighbors === 3) {
              this.nextTickGrid[x][y] = 1;
            } else {
              this.nextTickGrid[x][y] = 0;
            }
          } else {
            if (neighbors === 3) this.nextTickGrid[x][y] = 1;
          }
        }
      }
      this.grid = this.nextTickGrid;
      return this.nextTickGrid = initGrid(this.size);
    };

    Board.prototype.reset = function() {
      var x, y, _ref, _results;
      _results = [];
      for (x = 0, _ref = this.size; 0 <= _ref ? x < _ref : x > _ref; 0 <= _ref ? x++ : x--) {
        _results.push((function() {
          var _ref2, _results2;
          _results2 = [];
          for (y = 0, _ref2 = this.size; 0 <= _ref2 ? y < _ref2 : y > _ref2; 0 <= _ref2 ? y++ : y--) {
            _results2.push(this.setCell(x, y, 0));
          }
          return _results2;
        }).call(this));
      }
      return _results;
    };

    Board.prototype.getCell = function(x, y) {
      if (!isInBounds(this.grid, x, y)) throw new Error("out of bounds");
      return this.grid[x][y];
    };

    Board.prototype.setCell = function(x, y, val) {
      if (!isInBounds(this.grid, x, y)) throw new Error("out of bounds");
      return this.grid[x][y] = val;
    };

    return Board;

  })();

  module.exports = Board;

}).call(this);
