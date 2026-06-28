/* RDF-Hierarchie App — Text-basierte RDF-Tripel eingeben & navigieren */
'use strict';
import { _ } from './lib.min.mjs';

(async () => {
  document.querySelector(':root').style.setProperty('--baseHue', '340');

  // Icons laden
  await Promise.all([
    'L_IC.json'
  ].map(async e => {
    const d = await _.D.gD(e);
    _.DATA['L_IC'] = d;
  }));

  const ic = document.querySelector('#icons');
  _.I.aI(_.DATA['L_IC'], ic);

  // DOM references
  const aside = document.querySelector('#hierarchy')
  ,     main  = document.querySelector('#detail')
  ,     input = document.querySelector('#rdf-input')
  ,     info  = document.querySelector('#info')
  ,     btn   = document.querySelector('#parse-btn');

  // Parse RDF Text → JSON Graph
  const parseRDF = (text) => {
    const lines = text.split('\n')
      .map(l => l.trim())
      .filter(l => l && !l.startsWith('-'));  // filtert Trennlinien und Leerzeilen
    const rdf = _.R.B(lines, ['C','A']);
    // @HC (HasChildren) pro Knoten aufbauen
    _.X.OE(rdf).reduce((t, e) => {
      if (t[e[1]['@parent']]) {
        t[e[1]['@parent']]['@HC'] = (t[e[1]['@parent']]['@HC'] || []).concat(e[0]);
      }
      return t;
    }, rdf);
    return rdf;
  };

  // Rendert einen Entity-Namen mit Klick → Children + Details
  const HE = (entities, container, rdf, depth = 2) => {
    container.innerHTML = '';  // leeren
    const dd = document.createElement('div');
    _.X.OK(entities).forEach(t => {
      const dv = document.createElement('div')
      ,     sp = document.createElement('span');
      sp.appendChild(document.createTextNode(t));
      sp.addEventListener('click', () => {
        // Children dieser Ebene holen
        const jh = _.H.JH(rdf);
        const children = _.H.HF(jh, t, depth)
          .reduce((acc, e) => { acc[e.e] = e.e; return acc; }, {});
        HE(children, container, rdf, depth + 1);

        // Details im Main anzeigen
        const entity = rdf[t];
        if (entity) {
          const attrs = _.X.OE(entity).filter(e => !e[0].startsWith('@'));
          let html = `<div class="detail-header">🔍 ${t}</div>`;
          if (attrs.length) {
            html += '<table class="attr-table"><tr><th>Attribut</th><th>Wert</th></tr>';
            attrs.forEach(a => {
              html += `<tr><td>${a[0]}</td><td>${a[1]}</td></tr>`;
            });
            html += '</table>';
          } else {
            html += '<p class="small">(keine Attribute — nur Container)</p>';
          }
          // Children anzeigen
          if (entity['@HC']?.length) {
            html += `<div class="small" style="margin-top:1rem">🧩 ${entity['@HC'].length} Children</div>`;
          }
          main.innerHTML = html;
        }
      });
      dv.appendChild(sp);
      dd.appendChild(dv);
    });
    container.appendChild(dd);
  };

  // Main Parse-Button
  btn.addEventListener('click', () => {
    const text = input.value;
    if (!text.trim()) {
      info.textContent = '❌ Bitte RDF-Tripel eingeben';
      return;
    }
    try {
      _.DATA['rdf'] = parseRDF(text);
      const root = _.H.MH(_.H.JH(_.DATA['rdf']));
      HE(root, aside, _.DATA['rdf'], 2);
      info.textContent = `✅ ${_.X.OK(_.DATA['rdf']).length} Entitäten · ${text.split('\n').filter(l => l.trim() && !l.startsWith('-')).length} Tripel`;
      document.querySelector(':root').style.setProperty('--baseHue', '210');
    } catch (e) {
      info.textContent = `❌ Fehler: ${e.message}`;
      console.error('RDF Parse Error', e);
    }
  });

  // Beispiel laden
  const loadExample = () => {
    input.value = `empolis hat Type enterprise
products hat Type oe
customers hat Type oe
Personals hat Type oe
empolis hat gegruendet 2020-01-01
empolis hat sitz kaiserslautern
empolis hat HRB 313117_hrb_kaiserslautern
kaiserslautern hat Type stadt
Personals contains klueter
Personals contains senger
Personals contains steinacker
Personals contains brabaender
Personals contains jaeger
Personals contains schneider
Personals contains firyn
steinacker hat Type Person
steinacker hat firstname achim
steinacker hat keynote https://www.youtube.com/watch?v=ZWoWU_NvMLw
steinacker hat position director-delivery-operations
jaeger hat Type Person
jaeger hat firstname thorsten
jaeger hat position vice-president-product-development
jaeger hat keynote https://www.youtube.com/watch?v=l4gRyeJIvsA
senger hat Type Person
senger hat firstname roman
schneider hat Type Person
schneider hat firstname claudia
schneider hat position senior-product-marketing-manager
firyn hat Type Person
firyn hat firstname alexander
firyn hat position senior-product-manager
firyn hat keynote https://www.youtube.com/watch?v=ySKTvFNsX5A
klueter hat firstname andreas
klueter hat Type Person
klueter hat position GF
brabaender hat Type Person
brabaender hat firstname eric
brabaender hat position senior-vice-president-product-management
klueter hat keynote https://www.youtube.com/watch?v=Nm11B5oqSpI
buddy hat Type product
knowledgeexpress hat Type product
contentexpress hat Type product
serviceexpress hat Type product
buddy hat href https://www.youtube.com/watch?v=KiIrByOgdnI
empolis contains products
empolis contains customers
empolis contains Personals
customers contains homag
customers contains innio
customers contains ottomartin
customers contains koenigbauer
customers contains abb
customers contains agco
homag hat sitz aa
agco hat sitz aa
innio hat sitz aa
koenigbauer hat sitz aa
abb hat sitz aa
ottomartin hat sitz bb
homag hat Type customer
agco hat Type customer
innio hat Type customer
koenigbauer hat Type customer
abb hat Type customer
ottomartin hat Type customer
products contains buddy
products contains contentexpress
products contains serviceexpress
products contains knowledgeexpress`;
    btn.click();
  };
  document.querySelector('#example-btn').addEventListener('click', loadExample);

  window._ = _;
  document.querySelector(':root').style.setProperty('--baseHue', '210');
  info.textContent = '✅ Bereit — Tripel eingeben oder Beispiel laden';
})();