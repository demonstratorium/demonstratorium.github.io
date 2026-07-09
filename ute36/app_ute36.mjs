'use strict';
import { _ } from './lib.min.mjs';

(async () => {
  document.querySelector(':root').style.setProperty('--baseHue', '210');

  // Config + Daten laden
  await Promise.all([
    'cfg_ute36.json',
    'einkauf.json'
  ].map(async e => {
    const t = e.split('.')[0];
    _.DATA[t] = await _.D.gD(e);
  }));

  // ETL: PYY/PMM aus SID (YYYY-MM-DD) extrahieren
  // (PYM ist schon im File, aber PYY+PMM für GF brauchen wir noch)
  _.DATA['einkauf'] = _.DATA['einkauf'].map(e => ({
    ...e,
    PYY: (e?.SID||'NN').replace(/(\d{4})-(\d{2})-(\d{2})/,'$1')||'NN',
    PMM: (e?.SID||'NN').replace(/(\d{4})-(\d{2})-(\d{2})/,'$2')||'NN'
  }));

  // Filter-Kopie
  _.DATA['fs_einkauf'] = _.DATA['einkauf'];

  // Global-Filter auf cfg setzen
  _.DATA['cfg_ute36']['cfg']['GF']['PYY'] = {'f':'eF','k':'PYY'};
  _.DATA['cfg_ute36']['cfg']['GF']['PMM'] = {'f':'eF','k':'PMM'};

  // Tabelle registrieren
  _.GT.push('einkauf');
  _.GX['einkauf'] = {};
  _.D.sT('einkauf', _.DATA['cfg_ute36']['cfg']);
  _.T.rf('einkauf');

  // Globale Filter anzeigen
  _.T.delGF();

  window._ = _;
  document.querySelector(':root').style.setProperty('--baseHue', '210');
})();