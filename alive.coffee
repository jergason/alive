"use strict"

initGrid =  (size) ->
  grid = []
  for i in [0...size]
    grid[i] = []
    for j in [0...size]
      grid[i][j] = 0
  return grid

isInBounds = (grid, x, y) ->
  xLen = grid.length
  yLen = grid[0].length
  return ((0 <= x < xLen) and (0 <= y < yLen))

numberOfNeighbors = (grid, x, y) ->
  neighbors = 0
  surroundings = [
    [-1, -1], [0, -1], [1, -1],
    [-1, 0], [1, 0],
    [-1, 1], [0, 1], [1, 1]
  ]

  for pair in surroundings
    if isInBounds(grid, x+pair[0], y+pair[1]) and grid[x+pair[0]][y+pair[1]]
      neighbors++

  return neighbors

class Board
  constructor: (@size) ->
    @grid = initGrid(@size)
    @nextTickGrid = initGrid(@size)

  tick: ->
    for x in [0...@size]
      for y in [0...@size]
        neighbors = numberOfNeighbors(@grid, x, y)
        # If cell is currently alive
        if @getCell(x, y)
          if neighbors < 2
            @nextTickGrid[x][y] = 0
          else if neighbors == 2 or neighbors == 3
            @nextTickGrid[x][y] = 1
          else
            # Overcrowded, so dies out
            @nextTickGrid[x][y] = 0
        else
          # Cell is dead, so it may become alive
          if neighbors == 3
            @nextTickGrid[x][y] = 1

    @grid = @nextTickGrid
    @nextTickGrid = initGrid(@size)

  reset: ->
    for x in [0...@size]
      for y in [0...@size]
        @setCell(x, y, 0)

  getCell: (x, y) ->
    throw new Error("out of bounds") if not isInBounds(@grid, x, y)
    return @grid[x][y]

  setCell: (x, y, val) ->
    throw new Error("out of bounds") if not isInBounds(@grid, x, y)
    @grid[x][y] = val

module.exports = Board
