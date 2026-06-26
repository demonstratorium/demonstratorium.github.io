/* irgendwas app 
 2024-07-03
 die app ruft die lib auf und bindet sie ein
 dann werden die config gelesen _.D.gD(e) get Data
 dann werden die adten gelesen _.D.gD(e,Tabledir)
 dann werden die daten zur verfügung gestellt

*/
'use strict';
//import { _ } from './lib.min.mjs'; //die RX passen nicht
import { _ } from './lib.mjs';

(async () => { document.querySelector(':root').style.setProperty('--baseHue', '340');  //farbliche Coderung der Wartezeit
const TABS          = ["rdf","playbook","person","meldung","value","verlust","abwesenheit","planung","ticker","material","status"
                   ,"usecase","callforpapers","callforpart","project","projectdoc"]
   
               //console.log(`----------START PROMISE---CFG`);
               await Promise.all( [ 'forms.json'//Config der Tabellen
                                  , 'L_IC.json'  //Symbole als json
                                  , 'cfg_k1.json' // als Referenz für dynamik
                                  ].map( async e => { //console.log(`--lesen CFG ${e} `);
                                                      const t = e.split('.')[0]
                                                      ,     d = await _.D.gD(e);
                                                      _.DATA[ t       ] = d;
                                                      //console.log(`--lesen CFG ${e} ${t} geschrieben `);
                                                    }
                                       ) 
                                ); //-Erst cfg lesen 
              //console.log(`----------END PROMISE---CFG`);
              
               //console.log('CFG einlesen',_.DATA['cfg_sammler']['cfg']['tableDir']);                 
               //console.log(`----------START PROMISE---TABLE`);

               //console.log(`----------END PROMISE---TABLE`);
               const ic = document.querySelector('#icons'); 
               _.I.aI(_.DATA['L_IC'],ic);
                                    //document.querySelector('#icons').innerHTML=`${_.I.allIcons(_.DATA['L_IC'])}`
                //console.log(`----------END ALL ICONS---`);
/*      
                _.D.sT('grpsum',{header:'Summe Ausfallzeit',subheader:'Arbeitsfolge vs. Verlustart'});//Für Groupsum Vorbereiten
                _.D.sT('bxplt',{header:'BoxPlot',subheader:'SORTE vs. STATUS'});//Für Boxplot Vorbereiten
*/               

_["C"]["APIID" ] = '774uw904s6';
_["C"]["REGION"] = 'eu-north-1';
_["C"]["PUT"   ] = 'ev2dbput';
_["C"]["UPD"   ] = 'ev2dbup';
_["C"]["DEL"   ] = 'ev2dbrm';
_["C"]["TABLEI"] = 'CHUNAN1-config-Table'; //Row In
_["C"]["TABLEC"] = 'CHUNAN1-config-Table'; //Row UpDate
const setForm = (f) =>_["M"]["i2c"](f['form'].reduce((t,e)=>{t['k']+=`|${e.n}`;t['o']+=`|${e.v}`;return t},{k:'PID',o:`${f['title']}`}) )
;_["D"]["sF"] =  (f,F) => {//sF setForm header subheader f ist form f.title f.subtitle 
                                      const ed = document.createElement ('div') //grundgerüst Header p p wird dann dynamisch erzeugt
                                          , ep = document.createElement ('p')
                                          , eh = document.createElement ('header')
                                          , th = document.createTextNode(f.title)//###
                                          , ts = document.createTextNode(f.info)//###
                                          , es = document.createElement ('span')
                                        ; 
                                        //eh.appendChild(_["Y"]["setIcon"](f.icon));
                                        eh.appendChild(th);
                                        ep.appendChild(ts);
                                        ed.setAttribute('class',`box`);
                                        ep.setAttribute('class',`small`);
                                        eh.setAttribute('class','rowflex')//###
                                        ep.addEventListener('click',()=>{F(f);});

                                        ed.appendChild(eh);
                                        ed.appendChild(ep);
                                        document.querySelector('main').appendChild(ed);
                                      };
_['D']['d2del']= table =>{ delete  _["DATA"][`${table}`       ];   
                           delete  _["DATA"][`fs_${table}`    ];   
                           delete  _["DATA"][`cfg_${table}`   ];   
                           _.U.tt(table) ;
                         };  
_['D']['d2mem'] = (table,data,ref='k1')=>{ const KEYS =_["X"]["OK"](data[0]);
                                _["DATA"][   `${table}` ]                          = data;                   // Data in Memory schreiben
                                _["DATA"][`fs_${table}` ]                          = _.DATA[`${table}`]      // Sortier und Filter Kopie
                                _["DATA"][`cfg_${table}`]                          = _.DATA[`cfg_${ref}`]    // cfg_file kopieren IST dAS WIRKLICH EIN KOPIEREN?
                                _["DATA"][`cfg_${table}`]["cfg"  ]["header"      ] = table    
                                _["DATA"][`cfg_${table}`]["cfg"  ]["dbTableName" ] = _["C"]["TABLEI"]        // für update/delete  on Table    für idsearch
                                _["DATA"][`cfg_${table}`]["cfg"  ]["structure"   ] = KEYS                    // structure
                                _["DATA"][`cfg_${table}`]["cfg"  ]["searchfields"] = KEYS                    // searchfields
                                _["DATA"][`cfg_${table}`]["cfg"  ]["sort"        ] = ["dos",KEYS[0],false]   // sorting
                                _["DATA"][`cfg_${table}`]["views"]["show"        ] = KEYS.reduce((t,e,i)=>{t[`p${i}`]={"col":e,"head":e,"style":"","align":"left","media":"th-width-8","sort":true,"colbez":"NV"};return t},{}) 
                                _['GX'][table]                                     = {} //keine globalen Filter
};  

_['D']['d2show']=async table=>{ const data= await fetch(`https://${_["C"]["APIID" ]}.execute-api.${_["C"]["REGION"]}.amazonaws.com/db/${_["C"]["TABLEI"]}/${table}`) // für idsearach//const data= await fetch(`https://9mi8i117f6.execute-api.eu-north-1.amazonaws.com/db/DTPM-config-Table/${table}`) // für idsearach
                       //const data= await fetch(`https://u05pt6bxf3.execute-api.eu-north-1.amazonaws.com/db/MMSB2-config-Table/${table}`) // für demonstratorium
                       , TDATA = await data.json() 
                       ;
                _['D']['d2mem'](table,TDATA);
                _.D.sT(table,_.DATA[`cfg_${table}`]['cfg']); 
                _.T.rf(table);
                _.U.tt(table) 
}
TABS.forEach(e=>_["D"]["sF"](_["DATA"]["forms"][e],setForm));

//(async t=>_['D'['d2show'](t))('Ersatzteil' )
//(async t=>_['D']['d2show'](t))('Person' ) 
//_['D']['d2del']('QEreignisspeicher') 
// Spaltenfunktionalität bspw. BC (BarCode) WF (WorkFlow) BF(BitFlow) vpm (Update plus/minus) i2c Neuer Datensatz X Löschen

                      

                window._=_; //die LIB wird nach aussen als EINE Variable gegeben
                _.T.delGF();//alle Filter aus


                _.fbtnsave= async (event) =>{ document.querySelectorAll('.modal'   )[0].style.display = 'none';}
                
                document.querySelector(':root').style.setProperty('--baseHue', '210');  //farbliche Codierung der Wratezeit
              })() //Laden der Start-Daten in den Memory
;
