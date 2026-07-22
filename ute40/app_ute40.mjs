'use strict';
import {_} from './lib.ute40.mjs';

(async () => {
  document.querySelector(':root').style.setProperty('--baseHue', '210');

  // 1. CFG + Daten laden
  await Promise.all([
    'cfg_lieferungen.json',
    'L_IC_min.json',
    'lkws.json',
    'fahrer.json',
    'kunden.json',
    'lieferungen.json'
  ].map(async e => {
    const t = e.split('.')[0];
    _.DATA[t] = await _.D.gD(e);
  }));

  // 2. Icons
  const iconsEl = document.querySelector('#icons');
  _.I.aI(_.DATA.L_IC_min, iconsEl);

  // 3. Lookup-Namen in lieferungen einfügen (readable Anzeige)
  const lkws = Object.fromEntries(_.DATA.lkws.map(l => [l._id, l.typ]));
  const fahrer = Object.fromEntries(_.DATA.fahrer.map(l => [l._id, l.name]));
  const kunden = Object.fromEntries(_.DATA.kunden.map(l => [l._id, l.name]));

  // 4. ETL: PMM + Kosten
  _.DATA.lieferungen = _.DATA.lieferungen.map(row => ({
    ...row,
    PMM: (row.datum || '2025-01-01').substring(5, 7),  // "01".."12"
    kunde_name: kunden[row.kunde] || row.kunde,
    lkw_typ: lkws[row.lkw] || row.lkw,
    fahrer_name: fahrer[row.fahrer] || row.fahrer,
    kosten: +(row.gewicht * row.km * row.tonnenKm).toFixed(2)
  }));

  _.DATA.fs_lieferungen = _.DATA.lieferungen;
  _.GT.push('lieferungen');
  _.GX.lieferungen = {};
  _.D.sT('lieferungen', _.DATA.cfg_lieferungen.cfg);
  _.T.rf('lieferungen');

  // 5. Kreuztabelle Kunde x Monat
  const kx = _.X.kreuz(_.DATA.lieferungen, {f: [], s: ['kunde_name', 'PMM'], c: ['kosten']});
  // M01..M12 formatieren + Summe pro Zeile
  const kx_formatted = kx.map(row => {
    const out = { 'kunde,kunde': row['kunde_name,PMM'] };
    let sum = 0;
    for (let m = 1; m <= 12; m++) {
      const key = String(m).padStart(2, '0');
      const val = +(row[key] || 0).toFixed(2);
      out['M' + key] = val;
      sum += val;
    }
    out.SUM = +sum.toFixed(2);
    return out;
  });
  _.DATA.kunde_x = kx_formatted;
  _.DATA.fs_kunde_x = kx_formatted;

  // 6. Kreuztabelle LKW x Monat
  const lx = _.X.kreuz(_.DATA.lieferungen, {f: [], s: ['lkw_typ', 'PMM'], c: ['kosten']});
  const lx_formatted = lx.map(row => {
    const out = { 'lkw,lkw': row['lkw_typ,PMM'] };
    let sum = 0;
    for (let m = 1; m <= 12; m++) {
      const key = String(m).padStart(2, '0');
      const val = +(row[key] || 0).toFixed(2);
      out['M' + key] = val;
      sum += val;
    }
    out.SUM = +sum.toFixed(2);
    return out;
  });
  _.DATA.lkw_x = lx_formatted;
  _.DATA.fs_lkw_x = lx_formatted;

  // 7. CFGs für Kreuztabellen dynamisch aktualisieren
  const kunde_x_cfg = {
    info: 'kunde_x',
    views: { show: {} },
    cfg: {
      page: 0, pageSize: 50, maxPage: 0,
      header: 'Kosten Kunde × Monat (2025)',
      tableName: 'kunde_x',
      link: 'lieferungen',
      structure: ['kunde,kunde'].concat(Array.from({length: 12}, (_, i) => 'M' + String(i+1).padStart(2, '0'))).concat(['SUM']),
      searchfields: ['kunde,kunde'],
      view: 'show', sort: ['dos', 'kunde,kunde', false],
      jfilter: {}, sfilter: {}, GF: {}
    }
  };
  _.DATA.cfg_kunde_x = kunde_x_cfg;

  const lkw_x_cfg = {
    info: 'lkw_x',
    views: { show: {} },
    cfg: {
      page: 0, pageSize: 50, maxPage: 0,
      header: 'Kosten LKW × Monat (2025)',
      tableName: 'lkw_x',
      link: 'lieferungen',
      structure: ['lkw,lkw'].concat(Array.from({length: 12}, (_, i) => 'M' + String(i+1).padStart(2, '0'))).concat(['SUM']),
      searchfields: ['lkw,lkw'],
      view: 'show', sort: ['dos', 'lkw,lkw', false],
      jfilter: {}, sfilter: {}, GF: {}
    }
  };
  _.DATA.cfg_lkw_x = lkw_x_cfg;

  _.GT.push('kunde_x', 'lkw_x');
  _.GX.kunde_x = {};
  _.GX.lkw_x = {};

  _.D.sT('kunde_x', _.DATA.cfg_kunde_x.cfg);
  _.D.sT('lkw_x', _.DATA.cfg_lkw_x.cfg);

  _.T.delGF();
  window._ = _;
  document.querySelector(':root').style.setProperty('--baseHue', '210');
})();
