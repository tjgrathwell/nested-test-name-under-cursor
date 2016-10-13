#!/usr/bin/env node

'use strict';

const path = require('path');

function printUsage() {
  console.log("Usage:");
  console.log(
    ' ',
    path.basename(process.argv[1]),
    "file_name",
    "line_number"
  );
  console.log(
    ' ',
    path.basename(process.argv[1]),
    "file_name:line_number"
  );
}

var jasmineTestUnderCursor = require('../src/nested-test-name-under-cursor');

var userArgs = process.argv.slice(2);
var fileName = userArgs[0];
var lineNumber = userArgs[1];
if (userArgs.length === 1 && userArgs[0].indexOf(':') !== -1) {
  var parts = userArgs[0].split(':');
  fileName = parts[0];
  lineNumber = parts[1];
}

if (!fileName || !lineNumber) {
  printUsage();
  return;
}

console.log(jasmineTestUnderCursor.determineTestName(fileName, lineNumber));