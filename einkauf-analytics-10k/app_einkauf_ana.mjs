/* einkauf analytics app
   Muster: app_irgendwas.mjs
   Daten: Einkaufsliste (k1) + Bestellungen (k2) — komprimiert als .zsd
   10.000 Datensätze pro Tabelle
*/
'use strict';
import { _ } from './lib.min.mjs';

(async () => {
  document.querySelector(':root').style.setProperty('--baseHue', '340');

  // Configs + Icons laden
  await Promise.all([
    'cfg_k1.json'
  , 'cfg_k2.json'
  , 'L_IC.json'
  ].map(async e => {
    const t = e.split('.')[0]
    ,     d = await _.D.gD(e);
    _.DATA[t] = d;
  }));

  // Daten laden — komprimiert als .zsd (gzip)
  await Promise.all([
    'k1.zstd'
  , 'k2.zstd'
  ].map(async e => {
    const t = e.split('.')[0]
    ,     d = await _.D.gD(e, _.DATA['cfg_'+t]?.cfg?.tableDir || '');
    _.DATA[t] = d;
    if (d?.length) _.DATA['fs_'+t] = d;
  }));

  // Icons rendern
  const ic = document.querySelector('#icons');
  _.I.aI(_.DATA['L_IC'], ic);

  // Tabellen setzen + rendern
  ['k1', 'k2'].forEach(e => {
    _.GT.push(e);
    _.GX[e] = {};
    _.D.sT(e, _.DATA['cfg_'+e]['cfg']);
    _.T.rf(e);
  });

  window._ = _;
  _.T.delGF();

  document.querySelector('#info').textContent =
    `📋 ${_.DATA['k1'].length} Einkaufsartikel · 📦 ${_.DATA['k2'].length} Bestellungen · 92% komprimiert`;
  document.querySelector(':root').style.setProperty('--baseHue', '210');
})();
