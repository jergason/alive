(function () {
  "use strict";

  function initGrid(size) {
    var grid = []
      , i
      , j
      ;

    for (i = 0; i < size; i++) {
      grid[i] = [];
      for (j = 0; j < size; j++) {
        grid[i][j] = 0;
      }
    }
    return grid;
  }

  function isInBounds(grid, x, y) {
    var xLen = grid.length
      , yLen = grid[0].length
      ;
    return ((x >= 0) && (x < xLen) && (y >= 0) && (y < yLen));
  }

  function numberOfNeighbors(grid, x, y) {
    var neighbors = 0
      , surroundings
      ;

    // Offsets from x and y to check all eight surrounding squares
    surroundings = [
      [-1, -1], [0, -1], [1, -1],
      [-1, 0], [1, 0],
      [-1, 1], [0, 1], [1, 1]
    ];

    surroundings.forEach(function (pair) {
      if (isInBounds(grid, x+pair[0], y+pair[1])) {
        if (grid[x+pair[0]][y+pair[1]]) {
          neighbors++;
        }
      }
    });

    return neighbors;
  }

  function Board(size) {
    var grid
      , nextTickGrid
      ;

    grid = initGrid(size);
    nextTickGrid = initGrid(size);

    return {

      /*
       * Do one iteration of the game of life.
       * Implement the rules of the Game of Life.
       * 1. Any live cell with fewer than two live neighbors dies.
       * 2. Any live cell with two or three live neighbors lives.
       * 3. Any live cell with more than three neighbors dies.
       * 4. Any dead cell with exactly three neighbors lives.
       */
      tick: function () {
        var that = this
          ;
        grid.forEach(function (col, x) {
          col.forEach(function (cell, y) {
            var neighbors
              ;
            neighbors = numberOfNeighbors(grid, x, y);
            // If this cell is alive, check the relevant cases
            if (that.getCell(x, y)) {
              if (neighbors < 2) {
                nextTickGrid[x][y] = 0;
              }
              else if (neighbors === 2 || neighbors === 3) {
                nextTickGrid[x][y] = 1;
              }
              else {
                nextTickGrid[x][y] = 0;
              }
            }
            // Cell is dead, so the only thing that can happen is to become 
            // alive.
            else {
              if (neighbors === 3) {
                nextTickGrid[x][y] = 1;
              }
            }
          });
        });

        // update the game board
        grid = nextTickGrid;
        nextTickGrid = initGrid(size);
      },

      /*
       * Get a value for a cell.
       */
      getCell: function (x, y) {
        if ((x > grid.length - 1) || (x < 0)
            || (y > grid[0].length - 1) || (y < 0)) {
          throw new Error("Attempt to get a cell out of bounds.");
        }
        return grid[x][y];
      },

      /*
       * Turn on or off a specific cell.
       */
      setCell: function (x, y, value) {
        if ((x > grid.length - 1) || (x < 0)
            || (y > grid[0].length - 1) || (y < 0)) {
          throw new Error("Attempt to set a cell out of bounds.");
        }
        grid[x][y] = value;
      },

      length: size
    };
  }

  module.exports = Board;
}());
