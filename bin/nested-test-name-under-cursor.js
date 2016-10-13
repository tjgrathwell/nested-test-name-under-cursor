#!/usr/bin/env node

'use strict';

const path = require('path');

function printUsage() {
  console.log(
    "Usage:",
    path.basename(process.argv[1]),
    "file_name",
    "line_number"
  );
}

var jasmineTestUnderCursor = require('../src/nested-test-name-under-cursor');

var userArgs = process.argv.slice(2);
if (userArgs < 2) {
  printUsage();
  return;
}

var fileName = userArgs[0];
var lineNumber = userArgs[1];
if (!fileName || !lineNumber) {
  printUsage();
  return;
}

console.log(jasmineTestUnderCursor.determineTestName(fileName, lineNumber));