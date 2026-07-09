'use strict';
import { _ } from './lib_min.mjs'; //mein streaming server kennt nur einen PUNKT, aus dem TYP wird das richtige content_type ermittelt

(async () => {
  document.querySelector(':root').style.setProperty('--baseHue', '340'); ///farbliche Coderung der Wartezeit --- wenn der Bildschirm blau wird, ist alles OK

  // Config + Daten laden
  await Promise.all([ 'cfg_einkauf.json'
                    , 'L_IC_min.json'   // Wir wollen ICONS sehen, für die Tabellen-View Schaltflächen zum Blättern und Sortieren
                    , 'einkauf.json'
  ].map(async e => {
    const t = e.split('.')[0];
    _["DATA"][t] = await _["D"]["gD"](e); // Lesen vom Streaming Server
  }));

  /* ACHTUNG, ich habe Config lesen und Daten lesen getrennt
     - config wird immer auf dem Streaming server vorgehalten
     - daten können im memory des servers, in der cloud vorgehalten werden, diese informationen werden in der cfg_tablexx vorgehalten
     - nur für unsere ersten Beispiele waren die Daten auf dem Streaming server
  */

  // ICONS ------------------------------------\
  const ic = document.querySelector('#icons'); 
  _["I"]["aI"](_["DATA"]["L_IC_min"],ic);
  // ICONS ------------------------------------/

  // ETL: PYY/PMM aus SID (YYYY-MM-DD) extrahieren
  // (PYM ist schon im File, aber PYY+PMM für GF brauchen wir noch)
  _["DATA"]["einkauf"] = _["DATA"]["einkauf"].map(e => ({
    ...e,
    PYY: (e?.SID||'NN').replace(/(\d{4})-(\d{2})-(\d{2})/,'$1')||'NN',
    PMM: (e?.SID||'NN').replace(/(\d{4})-(\d{2})-(\d{2})/,'$2')||'NN'
  }));

  // Filter-Kopie
  _["DATA"]["fs_einkauf"] = _["DATA"]["einkauf"];

  // Global-Filter auf cfg setzen
  // muss man jetzt noch nicht, wir habe ja noch keine globalen Filter in  
  //_.DATA['cfg_einkauf']['cfg']['GF']['PYY'] = {'f':'eF','k':'PYY'};
  //_.DATA['cfg_einkauf']['cfg']['GF']['PMM'] = {'f':'eF','k':'PMM'};

  // Tabelle registrieren
  _["GT"].push('einkauf');
  _["GX"]['einkauf'] = {};
  _["D"]["sT"]('einkauf', _.DATA['cfg_einkauf']['cfg']);
  _["T"]["rf"]('einkauf');

  // Globale Filter zurücksetzen
  _["T"]["delGF"]();

  window._ = _;
  document.querySelector(':root').style.setProperty('--baseHue', '210');

  /* ---------------------------------------------------- md documentation
  # folgende Funktionen werden genutzt
  
  ```js
  const always_included = ["DATA","GV","GX","GT","fbtnsave"]
  , app_used_functions  = ["D_gD","D_sT","T_rf","T_delGF","I_aI"]
  , used_icons          = ["hw-reload","hw-vertical","hw-chefronleft","hw-chefronright","hw-search","hw-download","hw-sort-up","hw-sort-down"]  
  ```
  */

})();
