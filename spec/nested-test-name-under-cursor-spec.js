const fs = require('fs');
var nestedTestNameUnderCursor = require('../src/nested-test-name-under-cursor');

describe('nested-test-name-under-cursor', function () {
  var filename;
  beforeEach(function () {
    filename = __dirname + '/fixtures/sample.js';
  });

  describe('boundary conditions', function () {
    it('returns the name of the first root-level test if the line number falls before any test', function () {
      var result = nestedTestNameUnderCursor.determineTestName(filename, 1);
      expect(result).toEqual("my amazing test suite");
    });

    it('returns the name of the first root-level test if the line number falls after any test', function () {
      var result = nestedTestNameUnderCursor.determineTestName(filename, 24);
      expect(result).toEqual("my amazing test suite");
    });
  });

  it('returns the test name for the line number in a column if the line is inside a block', function () {
    var result = nestedTestNameUnderCursor.determineTestName(filename, 4);
    expect(result).toEqual("my amazing test suite");
  });

  it('returns the test name for the line number in a column if the line is at the start of a block', function () {
    var result = nestedTestNameUnderCursor.determineTestName(filename, 9);
    expect(result).toEqual("my amazing test suite nest level 1");
  });

  it('accumulates the full test name for nested blocks', function () {
    var result = nestedTestNameUnderCursor.determineTestName(filename, 20);
    expect(result).toEqual("my amazing test suite nest level 1 nest level 2 can add 2 + 2 as well");
  });
});