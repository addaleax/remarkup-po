'use strict';

const levenshtein = require('fast-levenshtein');
const pofile = require('pofile');
const ReMarkup = require('remarkup');
const munkres = require('munkres-js');

exports.unmarkup = function(input) {
  const pot = input.items ? input : pofile.parse(input);
  const rm = new ReMarkup({
    additionalElementFilters: ReMarkup.stripSpaces
  });
  
  const knownMsgids = {};
  
  for (let i = 0; i < pot.items.length; ++i) {
    pot.items[i].msgid = rm.unMarkup(stripTabs(pot.items[i].msgid));
    
    // remove duplicates
    const prevItem = knownMsgids[pot.items[i].msgid];
    if (prevItem) {
      // merge with previous message
      prevItem.references = prevItem.references.concat(pot.items[i].references);
      prevItem.comments = prevItem.comments.concat(pot.items[i].comments);
      prevItem.extractedComments = prevItem.extractedComments.concat(pot.items[i].extractedComments);
      prevItem.obsolete = prevItem.obsolete && pot.items[i].obsolete;
      prevItem.msgctxt = prevItem.msgctxt || pot.items[i].msgctxt;
      prevItem.msgid_plural = prevItem.msgid_plural || pot.items[i].msgid_plural;
      delete pot.items[i];
    } else {
      knownMsgids[pot.items[i].msgid] = pot.items[i];
    }
  }
  
  return pot;
};

exports.remarkup = function(potInput, poInput) {
  const pot = potInput.items ? potInput : pofile.parse(potInput),
        po  = poInput.items  ? poInput  : pofile.parse(poInput);
    
  const rm = new ReMarkup();
  
  /* compute the levenshtein distances between all
   * unMarkupped .pot entries and the msgids
   * in the stripped .po file */
  const distanceMatrix = [];
  for (let i = 0; i < pot.items.length; ++i) {
    distanceMatrix[i] = [];
    const potMsgID = rm.unMarkup(stripTabs(pot.items[i].msgid));
    
    for (let j = 0; j < po.items.length; ++j)
      distanceMatrix[i][j] = levenshtein.get(potMsgID, po.items[j].msgid);
  }
  
  const m = new munkres.Munkres();
  const indices = m.compute(distanceMatrix);

  for (let k = 0; k < indices.length; ++k) {
    const ci = indices[k][0],
          cj = indices[k][1];
    
    po.items[cj].msgid = pot.items[ci].msgid;
    for (let l = 0; l < po.items[cj].msgstr.length; ++l)
      po.items[cj].msgstr[l] = rm.reMarkup(pot.items[ci].msgid, po.items[cj].msgstr[l]);
  }
  
  return po;
};


function stripTabs(msgid) { return msgid.replace(/^\s*|\s*$/gm, ''); }
