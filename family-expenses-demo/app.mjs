'use strict';
import { _ } from './lib.min.mjs';

(async () => {
  document.querySelector(':root').style.setProperty('--baseHue', '340');

  // Configs + Icons laden
  await Promise.all([
    'cfg_d1.json'
  , 'L_IC.json'
  ].map(async e => {
    const t = e.split('.')[0]
    ,     d = await _.D.gD(e);
    _.DATA[t] = d;
  }));

  // Daten laden
  await Promise.all(['d1'].map(async e => {
    const d = await _.D.gD(e + '.json');
    _.DATA[e] = d;
    if (d?.length) _.DATA['fs_' + e] = d;
  }));

  // Icons rendern
  const ic = document.querySelector('#icons');
  _.I.aI(_.DATA['L_IC'], ic);

  // Tabelle setzen + rendern
  ['d1'].forEach(e => {
    _.GT.push(e);
    _.GX[e] = {};
    _.D.sT(e, _.DATA['cfg_' + e]['cfg']);
    _.T.rf(e);
  });

  window._ = _;
  _.T.delGF();

  document.querySelector('#info').textContent =
    `💰 ${_.DATA['d1'].length} Ausgaben · 20 Kategorien · 3 Zahler`;
  document.querySelector(':root').style.setProperty('--baseHue', '210');
})();
