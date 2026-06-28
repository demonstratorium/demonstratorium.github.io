/* RDF-Hierarchie v2 — wie hierarchie5: RKV-Histogramm + Filter-Buttons + Baum */
'use strict';
import { _ } from './lib.min.mjs';

(async () => {
  document.querySelector(':root').style.setProperty('--baseHue', '340');

  await Promise.all(['L_IC.json'].map(async e => {
    _.DATA[e.split('.')[0]] = await _.D.gD(e);
  }));

  const ic = document.querySelector('#icons');
  _.I.aI(_.DATA['L_IC'], ic);

  const AS = document.querySelector('#aside'),
        INFO = document.querySelector('#rdfinfo'),
        INPUT = document.querySelector('#rdf-input'),
        KV = document.querySelector('#keyvalues'),
        TYPES = document.querySelector('#types'),
        ATTRS = document.querySelector('#attributes');

  // === Parse & Build ===
  const build = (text) => {
    document.querySelector(':root').style.setProperty('--baseHue', '340');

    // (1) RDF Graph bauen
    _.DATA['rdf'] = _.R.B(text.split('\n'), ['A', 'C']);

    // (2) RKV Histogramm: { key: { value: count, ... }, ... }
    _.DATA['rkv'] = _.R.RKV(_.DATA['rdf']);
    delete _.DATA['rkv']['from'];
    delete _.DATA['rkv']['@HC'];

    // (3) Filter-Buttons in der Nav bauen
    // Leeren
    ['#keyvalues span', '#types span', '#attributes span'].forEach(sel => {
      const el = document.querySelector(sel);
      if (el) el.innerHTML = '';
    });
    KV.innerHTML = '<span></span>';
    TYPES.innerHTML = '<span></span>';
    ATTRS.innerHTML = '<span></span>';

    // RKV: jedes Attribut → Filter-Buttons
    _.X.OE(_.DATA['rkv']).forEach(e => {
      const key = e[0];
      const values = e[1];
      const span = document.createElement('span');

      if (key.toLowerCase() === 'type') {
        // Type-Buttons in #types
        _.X.OK(values).forEach(v => {
          span.appendChild(_.R.b4RKV(_.DATA['rdf'], key, v, 'rdfinfo', 'value', 'KeV'));
        });
        TYPES.appendChild(span);
      } else if (['firstname', 'position', 'keynote', 'sitz', 'href', 'gegruendet', 'hrb'].includes(key)) {
        // Attribute-Buttons in #attributes
        _.X.OK(values).forEach(v => {
          span.appendChild(_.R.b4RKV(_.DATA['rdf'], key, v, 'rdfinfo', 'value', 'KeV'));
        });
        ATTRS.appendChild(span);
      } else {
        // Alle anderen in #keyvalues
        _.X.OK(values).forEach(v => {
          span.appendChild(_.R.b4RKV(_.DATA['rdf'], key, v, 'rdfinfo', 'value', 'KeV'));
        });
        KV.appendChild(span);
      }
    });

    // (4) Baum im Aside bauen
    document.querySelector('#info').textContent =
      `${_.X.OK(_.DATA['rdf']).length} Entitäten analysiert`;

    // Alte aside-Elemente löschen
    ['VR0', 'VR1', 'VR2', 'VR3', 'VR4', 'VR5'].forEach(id => {
      const el = document.getElementById(id);
      if (el) _.H.DE(AS, el);
    });

    // Root-Ebene bauen
    _.X.OK(_.H.MH(_.H.JH(_.DATA['rdf']))).forEach((e, i) => {
      _.H.AE(AS, e, 'VR' + i, _.DATA['rdf']);
    });

    document.querySelector(':root').style.setProperty('--baseHue', '210');
  };

  // === Parse Button ===
  document.querySelector('#parse-btn').addEventListener('click', () => {
    const text = INPUT.value.trim();
    if (!text) return;
    try { build(text); } catch (e) {
      INFO.value = `❌ Fehler: ${e.message}`;
      console.error(e);
    }
  });

  // === Beispiel laden ===
  document.querySelector('#example-btn').addEventListener('click', () => {
    INPUT.value = `empolis hat Type enterprise\nproducts hat Type oe\ncustomers hat Type oe\nPersonals hat Type oe\nempolis hat gegruendet 2020-01-01\nempolis hat sitz kaiserslautern\nempolis hat HRB 313117_hrb_kaiserslautern\nkaiserslautern hat Type stadt\nPersonals contains klueter\nPersonals contains senger\nPersonals contains steinacker\nPersonals contains brabaender\nPersonals contains jaeger\nPersonals contains schneider\nPersonals contains firyn\nsteinacker hat Type Person\nsteinacker hat firstname achim\nsteinacker hat keynote https://www.youtube.com/watch?v=ZWoWU_NvMLw\nsteinacker hat position director-delivery-operations\njaeger hat Type Person\njaeger hat firstname thorsten\njaeger hat position vice-president-product-development\njaeger hat keynote https://www.youtube.com/watch?v=l4gRyeJIvsA\nsenger hat Type Person\nsenger hat firstname roman\nschneider hat Type Person\nschneider hat firstname claudia\nschneider hat position senior-product-marketing-manager\nfiryn hat Type Person\nfiryn hat firstname alexander\nfiryn hat position senior-product-manager\nfiryn hat keynote https://www.youtube.com/watch?v=ySKTvFNsX5A\nklueter hat firstname andreas\nklueter hat Type Person\nklueter hat position GF\nbrabaender hat Type Person\nbrabaender hat firstname eric\nbrabaender hat position senior-vice-president-product-management\nklueter hat keynote https://www.youtube.com/watch?v=Nm11B5oqSpI\nbuddy hat Type product\nknowledgeexpress hat Type product\ncontentexpress hat Type product\nserviceexpress hat Type product\nbuddy hat href https://www.youtube.com/watch?v=KiIrByOgdnI\nempolis contains products\nempolis contains customers\nempolis contains Personals\ncustomers contains homag\ncustomers contains innio\ncustomers contains ottomartin\ncustomers contains koenigbauer\ncustomers contains abb\ncustomers contains agco\nhomag hat sitz aa\nagco hat sitz aa\ninnio hat sitz aa\nkoenigbauer hat sitz aa\nabb hat sitz aa\nottomartin hat sitz bb\nhomag hat Type customer\nagco hat Type customer\ninnio hat Type customer\nkoenigbauer hat Type customer\nabb hat Type customer\nottomartin hat Type customer\nproducts contains buddy\nproducts contains contentexpress\nproducts contains serviceexpress\nproducts contains knowledgeexpress`;
    document.querySelector('#parse-btn').click();
  });

  window._ = _;
  document.querySelector(':root').style.setProperty('--baseHue', '210');
})();