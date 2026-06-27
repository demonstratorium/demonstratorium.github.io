/* Einkaufsapp — Multi-Form für Einkaufsliste + Rezepte
   Muster: multi_form_3.html / app_multiform.mjs
   Daten: localStorage (kein AWS nötig)
*/
'use strict';
import { _ } from './lib.min.mjs';

(async () => {
  document.querySelector(':root').style.setProperty('--baseHue', '340');

  // Formulardefinitionen + Icons laden
  await Promise.all([
    'forms.json'
  , 'L_IC.json'
  ].map(async e => {
    const t = e.split('.')[0]
    ,     d = await _.D.gD(e);
    _.DATA[t] = d;
  }));

  // Icons rendern
  const ic = document.querySelector('#icons');
  _.I.aI(_.DATA['L_IC'], ic);

  // Tabs (welche Formulare)
  const TABS = Object.keys(_.DATA['forms']);

  // --- setForm: Kachel erzeugen ---
  const setForm = (f) => _["M"]["i2c"](
    f['form'].reduce((t, e) => {
      t['k'] += `|${e.n}`;
      t['o'] += `|${e.v}`;
      return t;
    }, { k: 'PID', o: `${f['title']}` })
  );

  // --- sF: Tile rendern (ohne inline onclick, mit Delegation) ---
  _["D"]["sF"] = (f, F) => {
    const ed = document.createElement('div')
    ,     ep = document.createElement('p')
    ,     eh = document.createElement('header')
    ,     th = document.createTextNode(f.title)
    ,     ts = document.createTextNode(f.info);
    eh.appendChild(th);
    ep.appendChild(ts);
    ed.setAttribute('class', 'box');
    ep.setAttribute('class', 'small');
    eh.setAttribute('class', 'rowflex');
    ep.addEventListener('click', () => { F(f); });
    ed.appendChild(eh);
    ed.appendChild(ep);
    document.querySelector('main').appendChild(ed);
  };

  // Tiles rendern
  TABS.forEach(e => _["D"]["sF"](_["DATA"]["forms"][e], setForm));

  // --- localStorage Persistenz ---
  // Datenstruktur: localStorage['einkaufsapp'] = JSON.stringify([...])
  const LS_KEY = 'einkaufsapp';
  let data = [];

  // Laden
  try { data = JSON.parse(localStorage.getItem(LS_KEY)) || []; } catch(e) { data = []; }

  // Save-Handler überschreiben
  _["fbtnsave"] = async (event) => {
    const fd = new FormData(document.querySelectorAll('#form')[0])
    ,     fj = Object.fromEntries([...fd.entries()]);
    fj['_id'] = Date.now().toString(36);
    fj['_time'] = new Date().toISOString().slice(0, 16);
    data.push(fj);
    localStorage.setItem(LS_KEY, JSON.stringify(data));
    document.querySelector('#info').textContent =
      `✅ ${fj.PID}: ${fj.produkt || fj.name || 'ok'} gespeichert`;
    document.querySelectorAll('.modal')[0].style.display = 'none';
    renderList();
  };

  // --- Liste der gespeicherten Einträge ---
  const renderList = () => {
    const listArea = document.querySelector('#saved-list');
    if (!listArea) return;
    if (data.length === 0) {
      listArea.innerHTML = '<p class="small" style="padding:1rem">Noch keine Einträge.</p>';
      return;
    }
    const html = data.slice().reverse().map((entry, i) => {
      const typ = entry.PID || 'Eintrag';
      const label = entry.produkt || entry.name || '(unbenannt)';
      const detail = entry.menge ? `${entry.menge} ${entry.einheit || ''}` :
                     entry.zeit ? `${entry.zeit} Min` : '';
      return `<div class="saved-item" data-idx="${data.length - 1 - i}">
        <span><svg class="icon"><use href="#${typ === 'Einkaufsliste' ? 'vw-task' : 'vw-gridview'}" /></svg>
        <strong>${label}</strong> ${detail ? `<span class="small">— ${detail}</span>` : ''}
        <span class="small">${entry.kategorie || ''}</span></span>
        <span class="close" onclick="if(confirm('Löschen?')){(function(){
          const d = JSON.parse(localStorage.getItem('einkaufsapp'))||[];
          d.splice(${data.length - 1 - i},1);
          localStorage.setItem('einkaufsapp', JSON.stringify(d));
          location.reload();
        })()}">&times;</span>
      </div>`;
    }).join('');
    listArea.innerHTML = html;
  };

  // --- Info-Button für gespeicherte Daten ---
  const toggleList = () => {
    const area = document.querySelector('#saved-list');
    if (area) area.style.display = area.style.display === 'none' ? 'block' : 'none';
  };

  // Info-Leiste mit Zähler
  document.querySelector('#info').textContent =
    `${data.length} Einträge · ${TABS.length} Formulare`;

  // --- setup ---
  window._ = _;
  document.querySelector(':root').style.setProperty('--baseHue', '210');
})();