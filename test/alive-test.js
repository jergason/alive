(function () {
  "use strict";
  var vows = require('vows')
    , assert = require('assert')
    , Life = require(__dirname + '/../alive')
    , suite
    ;

  var suite = vows.describe('life').addBatch({
    'given an initialized game': {
      topic: function () {
        return new Life(64);
      },
      'it is initialized correctly': function (game) {
        var i
          , j
          ;

        for (i = 0; i < 64; i++) {
          for (j = 0; j < 64; j++) {
            assert.strictEqual(0, game.getCell(i, j), "Incorrectly initialized value");
          }
        }
        assert.throws(function () {
          game.getCell(-1, 0);
        }, "Should throw error");
        assert.throws(function () {
          game.getCell(-1, -1);
        }, "Should throw error");
        assert.throws(function () {
          game.getCell(0, -1);
        }, "Should throw error");
        assert.throws(function () {
          game.getCell(64, 64);
        }, "Should throw error");
        assert.throws(function () {
          game.getCell(63, 64);
        }, "Should throw error");
        assert.throws(function () {
          game.getCell(64, 63);
        }, "Should throw error");
      }
    },
    'given a game with some cells set': {
      topic: function () {
        var l = new Life(64)
          ;
        l.setCell(5, 5, 1);
        return l;
      },
      'cells are correctly set': function (t) {
        assert.strictEqual(t.getCell(5, 5), 1);
        assert.strictEqual(t.getCell(1, 1), 0);
      }
    },
    'given a set-up board': {
      topic: function () {
        var l = new Life(8)
          ;

        // Set up figures from original game of life article at
        // http://ddi.cs.uni-potsdam.de/HyFISCH/Produzieren/lis_projekt/proj_gamelife/ConwayScientificAmerican.htm
        l.setCell(5, 5, 1);
        l.setCell(5, 6, 1);
        l.setCell(6, 7, 1);


        return l;
      },
      'it should tick correctly': function (board) {
        var i = 0
          , j = 0
          ;

        board.tick();
        assert.strictEqual(board.getCell(5,5), 0);
        assert.strictEqual(board.getCell(5,6), 1);
        assert.strictEqual(board.getCell(6,6), 1);
        assert.strictEqual(board.getCell(5,7), 0);
        assert.strictEqual(board.getCell(6,7), 0);
        assert.strictEqual(board.getCell(5,7), 0);
        assert.strictEqual(board.getCell(5,4), 0);

        board.tick();
        for (i = 0; i < board.length; i++) {
          for (j = 0; j < board.length; j++) {
            assert.strictEqual(board.getCell(i, j), 0);
          }
        }
      },
      'when we reset it': {
        topic: function (board) {
          board.reset();
          return board;
        },
        'it should be clear': function (board) {
          var x = 0
            , y = 0
            ;

          for (x; x < board.size; x++) {
            for (y; y < board.size; y++) {
              assert.strictEqual(board.getCell(x, y), 0);
            }
          }
        }
      }
    }
  });


  suite.export(module);

}());
