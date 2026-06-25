'use strict';
import _ from './lib.mjs';

(async () => {
  const root = document.querySelector(':root');
  root.style.setProperty('--baseHue', '340');

  // Load config/table metadata
  await Promise.all(
    ['cfg_k1.json', 'L_IC.json'].map(async e => {
      const t = e.split('.')[0];
      _.DATA[t] = await _.D.gD(e);
    })
  );

  // Load data files
  await Promise.all(
    ['file1.json', 'file2.json'].map(async e => {
      const t = e.split('.')[0];
      const d = await _.D.gD(e, './data/');
      _.DATA[t] = d;
      if (d?.length) _.DATA['fs_' + t] = d;
    })
  );

  // Set icons
  const ic = document.querySelector('#icons');
  if (ic) _.I.aI(_.DATA['L_IC'], ic);

  // Initialize tables from config
  ['k1'].forEach(e => {
    _.GT.push(e);
    _.GX[e] = {};
    _.D.sT(e, _.DATA['cfg_' + e]?.['cfg'] || {});
    _.T.rf(e);
  });

  // Expose lib globally
  window._ = _;

  // Clear all filters
  _.T.delGF();

  root.style.setProperty('--baseHue', '210');
})();
