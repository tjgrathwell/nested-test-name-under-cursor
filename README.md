# nested-test-name-under-cursor

[![Build Status](https://travis-ci.org/tjgrathwell/nested-test-name-under-cursor.svg?branch=master)](http://travis-ci.org/tjgrathwell/nested-test-name-under-cursor)

Determine the full name of a test or group of tests at a given file + line number.

Given the following Jasmine/Mocha/etc test:

```
describe("my amazing test suite", function () {
  describe("nest level 1", function () {
    it("knows how to add 2 + 2", function () {
      expect(2 + 2).toEqual(4);
    });
  });
});
```

`nested-test-name-under-cursor sample_spec.js 1` => "my amazing test suite"

`nested-test-name-under-cursor sample_spec.js 4` => "my amazing test suite nest level 1 knows how to add 2 + 2"

## Why?

Using a [spec filter](http://jasmine.github.io/1.3/introduction.html#section-36), Jasmine can focus tests based on name or deterministic test ID, but not by line number.

The output of this tool (plus some IDE and test suite specific finessing) can be used to implement focused testrunning without having to `fit` or `fdescribe` your tests.