'use strict';
import { _ } from './lib.min.mjs';

(async () => {
  document.querySelector(':root').style.setProperty('--baseHue', '210');

  // Konfiguration + Lookups laden
  await Promise.all([
    'cfg_ute35.json',
    'L_KT.json',
    'L_IC.json'
  ].map(async e => {
    const t = e.split('.')[0];
    _.DATA[t] = await _.D.gD(e);
  }));

  // Icons rendern
  _.I.aI(_.DATA['L_IC'], document.querySelector('#icons'));

  // 5000 realistische Testdaten generieren
  const KATS = ['Versicherungen','Pkw','Nahrungsmittel','Sport','Sonstiges'];
  const START = new Date('2023-01-01');
  const ute35 = Array.from({length: 5000}, (_, i) => {
    const d = new Date(START);
    d.setDate(d.getDate() + Math.floor(Math.random() * 900));
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    return {
      _id: i + 1,
      datum: d.toISOString().split('T')[0],
      PYY: 'Y' + String(y).slice(2),
      PMM: 'M' + m,
      kategorie: KATS[Math.floor(Math.random() * KATS.length)],
      betrag: parseFloat((Math.random() * 400 + 5).toFixed(2))
    };
  });

  // Daten in _.DATA speichern
  _.DATA['ute35'] = ute35;
  _.DATA['fs_ute35'] = ute35;

  // Global-Filter auf cfg setzen (dGf braucht das Mapping)
  _.DATA['cfg_ute35']['cfg']['GF']['PYY'] = {'f':'eF','k':'PYY'};
  _.DATA['cfg_ute35']['cfg']['GF']['PMM'] = {'f':'eF','k':'PMM'};
  _.DATA['cfg_ute35']['cfg']['GF']['kategorie'] = {'f':'eF','k':'kategorie'};

  // Tabelle registrieren
  _.GT.push('ute35');
  _.GX['ute35'] = {};
  _.D.sT('ute35', _.DATA['cfg_ute35']['cfg']);
  _.T.rf('ute35');

  // Globale Filter anzeigen
  _.T.delGF();

  window._ = _;

  document.querySelector(':root').style.setProperty('--baseHue', '210');
})();