/* hiererchie app */
'use strict';
import { _ } from './lib.mjs';
//import T from './rdf.json' assert { type: 'json' };
//console.log('Hier',_.X['JH'](T));
(async () => { document.querySelector(':root').style.setProperty('--baseHue', '340');  //farbliche Coderung der Wartezeit
               //console.log(`----------START PROMISE---CFG`);
               await Promise.all( [ 
                                   'L_IC.json'  //Symbole als json
                                  , 'rdf.json'
                                  ].map( async e => { //console.log(`--lesen CFG ${e} `);
                                                      const t = e.split('.')[0]
                                                      ,     d = await _.D.gD(e);
                                                      _.DATA[ t       ] = d;
                                                     //console.log(`--lesen CFG ${e} ${t} geschrieben `,t);
                                                    }
                                       ) 
                                ); //-Erst cfg lesen 
              //console.log(`----------END PROMISE---CFG`);
              
               //console.log('CFG einlesen',_.DATA['cfg_sammler']['cfg']['tableDir']);                 
               //console.log(`----------START PROMISE---TABLE`);
               await Promise.all( [ 
                                 //   'k1.json' //daten lesen
                                 // , 'k2.json' //daten lesen
                               //   , 'k3.json' //daten lesen
                                  ]
                                  .map( async e => {//console.log(`--lesen 1 Table ${e} `);
                                                    const t = e.split('.')[0]  
                                                    ,      d = await _.D.gD(e,_.DATA['cfg_'+t]['cfg']['tableDir']); //getData ??Problem lesen von cfg ndann erst table
                                                    _.DATA[ t       ] = d;
                                                    if(d?.length||false) { _.DATA['fs_'+ t ] = d;}
                                                    //console.log(`--lesen TABLE ${e} ${t} geschrieben `);
                                                   } ) ); 
                                      
               //console.log(`----------END PROMISE---TABLE`);
               const ic = document.querySelector('#icons'); 
               _.I.aI(_.DATA['L_IC'],ic);
                                    //document.querySelector('#icons').innerHTML=`${_.I.allIcons(_.DATA['L_IC'])}`
                //console.log(`----------END ALL ICONS---`);
/*      
                _.D.sT('grpsum',{header:'Summe Ausfallzeit',subheader:'Arbeitsfolge vs. Verlustart'});//Für Groupsum Vorbereiten
                _.D.sT('bxplt',{header:'BoxPlot',subheader:'SORTE vs. STATUS'});//Für Boxplot Vorbereiten
*/               

                []
                .map(e=>{ _.GT.push(e);   //Tabelle zub Gloabl Table hizufügen, bei Änderungen der Group Values werden die entsp filter angeandt
                          _.GX[e]={};     //Analytics anlegen und leeren
                          _.D.sT(e,_.DATA['cfg_'+e]['cfg']);  //sT setTable main table p 
                          _.T.rf(e);                          //rf refresh
                        });
                      

                window._=_; //die LIB wird nach aussen als EINE Variable gegeben
                
                //Hierarchie Child-Array's bilden
                _.X.OE(_.DATA['rdf']).reduce((t,e)=>{if(t[e[1]['from']])t[e[1]['from']]['@HC']=(t[e[1]['from']]['@HC']||[]).concat(e[0]);return t},_.DATA['rdf'])

                document.querySelector('#info').textContent=`${_['X']['OK'](_['DATA']['rdf']).length} Elemente` ;
                //document.querySelector('#main').textContent=`${_['X']['JS'](_['DATA']['rdf'])}` ;
                document.querySelector(':root').style.setProperty('--baseHue', '210');  //farbliche Codierung der Wartezeit
              })() //Laden der Start-Daten in den Memory
;