'use strict';

const acorn = require('acorn');
const acornWalk = require('acorn/dist/walk');
const fs = require('fs');

function lineNumberToOffset (str, lineNumber) {
  var lastIndex;
  var remaining = lineNumber;
  for (lastIndex = 0; remaining > 0 && lastIndex !== -1; remaining -= 1) {
    lastIndex = str.indexOf("\n", lastIndex ? (lastIndex + 1) : lastIndex);
    if (lastIndex === -1 && remaining > 1) {
      throw new Error("Unable to find line " + lineNumber + " in file!");
    }
  }
  return lastIndex ? (lastIndex + 1) : lastIndex;
}

function isJasminey(functionName) {
  var validNames = ['describe', 'it'];
  return validNames.indexOf(functionName) !== -1;
}

function findFirstDescribe(tree) {
  let result;
  const visitors = {
    CallExpression: function (node, st, c) {
      if (isJasminey(node.callee.name) && !result) {
        result = node;
      }
    }
  };
  const walker = acornWalk.make({
    // Don't descend into tree any deeper than the first function call(s)
    CallExpression: function (node, st, c) { }
  });
  acornWalk.simple(tree, visitors, walker);
  return result;
}

module.exports = {
  determineTestName: function (filename, lineNumber) {
    const content = fs.readFileSync(filename, 'utf8');
    const tree = acorn.parse(content);
    const offset = lineNumberToOffset(content, lineNumber);

    let ancestors = [];

    const walker = acornWalk.make({
      CallExpression: function (node, st, c) {
        if (isJasminey(node.callee.name)) {
          ancestors.push(node);
        }
        return acornWalk.base.CallExpression.call(this, node, st, c);
      }
    });

    const result = acornWalk.findNodeAround(tree, offset, null, walker);
    if (result && result.node.type == 'Program') {
      const firstDescribe = findFirstDescribe(tree);
      if (firstDescribe) {
        ancestors.push(firstDescribe);
      }
    }

    return ancestors.map(function (node) {
      return node.arguments[0].value;
    }).join(" ");
  }
};