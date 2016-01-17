'use strict';

const fs = require('fs');
const path = require('path');
const assert = require('assert');
const remarkupPo = require('../');

const readLocal = fn => fs.readFileSync(path.resolve(path.join(__dirname, fn)), 'utf-8');

describe('remarkup-po', function() {
  it('can unmarkup and remarkup .po(t) files', function() {
    this.timeout(20000);
    
    const originalPot = readLocal('res/unstripped/templates.pot');
    const strippedPo = readLocal('res/de.po');
    
    const strippedPot = remarkupPo.unmarkup(originalPot);
    const finalPo = remarkupPo.remarkup(originalPot, strippedPo);
    
    assert.ok(finalPo);
  });
});
