/**
 * ShopFloor App - Experiment 2
 * datengetrieben · funktional · hierarchisch · agentisch
 * 
 * App layer: loads config + data, sets icons, initializes tables
 * Uses lib.mjs (_) for data operations
 */
'use strict';
import { _ } from './lib.mjs';

(async () => {
  // Set theme hue
  document.querySelector(':root').style.setProperty('--baseHue', '210');

  // Load config and icons in parallel
  await Promise.all([
    'cfg.json',
    'icons.json'
  ].map(async (e) => {
    const key = e.split('.')[0];
    const d = await _.D.gD(e);
    _.DATA[key] = d;
  }));

  // Set SVG icons
  const ic = document.querySelector('#icons');
  if (ic && _.DATA['icons']) {
    ic.innerHTML = _.DATA['icons'];
  }

  // Initialize tables
  ['rdf', 'person', 'meldung', 'status', 'value', 'playbook', 'material', 'projekt']
    .forEach((e) => {
      _.GT.push(e);
      _.GX[e] = {};
      _.D.sT(e, _.DATA['cfg'] ? _.DATA['cfg'] : {});
      _.T.rf(e);
    });

  // Expose _ to window for debugging
  window._ = _;

  // Clear all filters
  _.T.delGF();

  // Set base hue back
  document.querySelector(':root').style.setProperty('--baseHue', '210');
})();
