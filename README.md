remarkup-po
===========

[![NPM Version](https://img.shields.io/npm/v/remarkup-po.svg?style=flat)](https://npmjs.org/package/remarkup-po)
[![NPM Downloads](https://img.shields.io/npm/dm/remarkup-po.svg?style=flat)](https://npmjs.org/package/remarkup-po)
[![Build Status](https://travis-ci.org/addaleax/remarkup-po.png?style=flat)](https://travis-ci.org/addaleax/remarkup-po)
[![Coverage Status](https://coveralls.io/repos/addaleax/remarkup-po/badge.svg?branch=master)](https://coveralls.io/r/addaleax/remarkup-po?branch=master)
[![Dependency Status](https://david-dm.org/addaleax/remarkup-po.svg?style=flat)](https://david-dm.org/addaleax/remarkup-po)
[![devDependency Status](https://david-dm.org/addaleax/remarkup-po/dev-status.svg?style=flat)](https://david-dm.org/addaleax/remarkup-po#info=devDependencies)

Utilities for using [remarkup](https://github.com/addaleax/remarkup) with `.po` files.

Install via `npm install remarkup-po`.

## CLI usage
```
remarkup-po unmarkup original.pot > output.pot
remarkup-po remarkup original.pot unmarkupped.po > output.po
```

## Programmatic usage

```js
const originalPot = fs.readFileSync('(...).pot', 'utf-8');
const strippedPo = fs.readFileSync('(...).po', 'utf-8');

const strippedPot = remarkupPo.unmarkup(originalPot);
const finalPo = remarkupPo.remarkup(originalPot, strippedPo);

fs.writeFileSync('(...).po', finalPo);
```

## License

MIT
