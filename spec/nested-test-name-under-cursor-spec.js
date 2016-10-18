const fs = require('fs');
var nestedTestNameUnderCursor = require('../src/nested-test-name-under-cursor');

describe('nested-test-name-under-cursor', function () {
  var es5filename = __dirname + '/fixtures/sample.js';
  var es6filename = __dirname + '/fixtures/module.es6.js';
  function lastLine(filename) {
    return fs.readFileSync(filename, 'utf-8').split("\n").length;
  }

  describe('boundary conditions', function () {
    it('returns the name of the first root-level test if the line number falls before any test', function () {
      var result = nestedTestNameUnderCursor.determineTestName(es5filename, 1);
      expect(result).toEqual("my amazing test suite");

      result = nestedTestNameUnderCursor.determineTestName(es6filename, 1);
      expect(result).toEqual("my module test suite");
    });

    it('returns the name of the first root-level test if the line number falls after any test', function () {
      var result = nestedTestNameUnderCursor.determineTestName(es5filename, lastLine(es5filename));
      expect(result).toEqual("my amazing test suite");

      result = nestedTestNameUnderCursor.determineTestName(es6filename, lastLine(es6filename));
      expect(result).toEqual("my module test suite");
    });
  });

  it('returns the test name for the line number in a column if the line is inside a block', function () {
    var result = nestedTestNameUnderCursor.determineTestName(es5filename, 4);
    expect(result).toEqual("my amazing test suite");
  });

  it('returns the test name for the line number in a column if the line is at the start of a block', function () {
    var result = nestedTestNameUnderCursor.determineTestName(es5filename, 9);
    expect(result).toEqual("my amazing test suite nest level 1");
  });

  it('accumulates the full test name for nested blocks', function () {
    var result = nestedTestNameUnderCursor.determineTestName(es5filename, 20);
    expect(result).toEqual("my amazing test suite nest level 1 nest level 2 can add 2 + 2 as well");
  });
});