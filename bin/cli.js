#!/usr/bin/env node
'use strict';

const minimist = require('minimist');
const fs = require('fs');
const remarkupPo = require('../');

const argv = minimist(process.argv.slice(2));

const command = argv._.shift() || 'help';

if (command === 'help' ||
    ['unmarkup', 'remarkup'].indexOf(command) === -1 ||
    argv._.length < 1) {
console.info([
'Usage:',
'remarkup-po unmarkup original.pot > output.pot',
'remarkup-po remarkup original.pot unmarkupped.po > output.po',
''
].join('\n'));

process.exit(0);
}

const originalPot = argv._.shift();
const originalPotContent = fs.readFileSync(originalPot, 'utf-8');

if (command === 'unmarkup') {
  process.stdout.write(remarkupPo.unmarkup(originalPotContent).toString());
} else if (command === 'remarkup') {
  const unmarkuppedFileContent = fs.readFileSync(argv._[0], 'utf-8');
  
  const result = remarkupPo.remarkup(originalPotContent, unmarkuppedFileContent);
  process.stdout.write(result.toString());
}
