'use strict';
//import { _ } from './lib.min.mjs'; //die RX passen nicht
import { _ } from './lib.min.mjs';
(async () => { document.querySelector(':root').style.setProperty('--baseHue', '340');  //farbliche Coderung der Wartezeit
   
               //console.log(`----------START PROMISE---CFG`);
               await Promise.all( [ //Config der Tabellen
                                   'L_IC.json'  //Symbole als json
                                  ].map( async e => { //console.log(`--lesen CFG ${e} `);
                                                      const t = e.split('.')[0]
                                                      ,     d = await _.D.gD(e);
                                                      _.DATA[ t       ] = d;
                                                      //console.log(`--lesen CFG ${e} ${t} geschrieben `);
                                                    }
                                       ) 
                                ); //-Erst cfg lesen 
                const ic = document.querySelector('#icons'); 
               _.I.aI(_.DATA['L_IC'],ic);
             window._=_; //die LIB wird nach aussen als EINE Variable gegeben
             _.T.delGF();//alle Filter aus

      document.querySelector(':root').style.setProperty('--baseHue', '210');  //farbliche Codierung der Wratezeit
          
              })() //Laden der Start-Daten in den Memory
;              