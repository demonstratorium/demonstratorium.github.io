/*
//VERSION 2023-07-21 2023-10-12 (changeColumn)

VERSION 2023-08-21 rolling und signal indikatoren
// the "rolling" one-step-task mean
console.log(M3.toString());
[{p:3},{p:4},{p:2},{p:3},{p:3},{p:8},{p:2},{p:1}].reduce((t,e,i)=>{e['t']=(t?.[i-1]?.['t']||[]).concat(e.p);i>3&&e['t'].shift(),e['m']=e['t'].reduce(M3,0)/4;t.push(e);return t;},[])
// price volume rolling
[{p:3,v:1},{p:4,v:3},{p:2,v:1},{p:3,v:1},{p:3,v:3},{p:8,v:2},{p:2,v:4},{p:1,v:6}]
.reduce((t,e,i)=>{e['t']=(t?.[i-1]?.['t']||[]).concat(e.p*e.v);i>3&&e['t'].shift(),e['m']=e['t'].reduce(M3,0)/4;t.push(e);return t;},[])
---
const M3 = (t,e)=>t+e
const rolling = (l,p,v,m='m',r='r') => (t,e,i) => {e[r]=(t?.[i-1]?.[r]||[]).concat(e[p]*e[v]);i>=l&&e[r].shift(),e[m]=e[r].reduce(M3,0)/l;t.push(e);return t;}
, VMAX30 = (p,v) => rolling(30,p,v,'vmax30')
, VMAX50 = (p,v) => rolling(50,p,v,'vmax50')

d.reduce(rolling(5,'p','v'),[]) , es wird m berechnet

// Version 2023-09-04 filterLinks e[1].v type of string object 
          clipboard
             await navigator.clipboard.writeText(d['fs_'+e.t].reduce((T,E)=>T+X.OV(E).reduce((t,e)=>t+e+c,'')+'\n',''));

---
  Version 2023-11-16 dJSONlookup djl 0 dL1  
  Version 2024-07-03 CLOUD Anbindung Modul C modale FGenster i2c für create Row in Table
  Version 2024-07-04 CLOUD Anbindung Modul C L.X Y.X C.X löschen mit EventBus task
  Version 2024-07-08 Table Read dynamic Icon (aus digital TPN Version), mit title im Icon
  Version 2024-07-19 H und R module aus Hierarchie, dann bullet 
  
  minify the lib https://minify-js.com/

  siehe es2023/node19test/server/js/lib.mjs hier vereinfahung des FX --übertragen

  2024-07-27 Idee mit document.appendChild 2024-09-04 R.FX.iI  

  2025-09-24 lib für PUT DEL UOD mit Chunan APIID angepasst
*/
/**
 * Solves the Hanoi Towers puzzle, for any number of disks. see jsdoc
 *
 * @param {number} disks - How many disks to move
 * @param {string} from - The starting pole's name
 * @param {string} to - The destination pole's name
 * @param {string} extra - The other pole's name
 */
// minimizer https://minify-js.com/
// mit Icnludes _.X.combine(_.DATA.mat,{f:[{f:'icF',k:'SPEZ',v:'Sicherheitsschalter'}],s:['SPEZ','LP','SINV']}) 
const _ = { DATA     : {}
          , fbtnsave : ()=>``//--placeholder for Modal Button
          , GV       : {}//-- Global Values
          , GX       : {}//-- analytics in filtered tables
          , GT       : []//-- Tables that global values uses as filter
                        //Das wird dann in der app mit windows.document überschribene..malschauen obdas klappt
          //, D        : {createElement:{},createTextNode:{},appendChild:{},removeChild:{},addEventListener:{},removeEventListener:{}}  
          , X : { /** A module. Steffens AnalyticModul 
                   * @module X
                  */
                  version  : () =>`info X 1.01 analytics and document`
                , RE       : RegExp
                , CL       : console.log
                , CI       : console.info
                , OK       : Object.keys
                , OA       : Object.assign
                , OE       : Object.entries
                , OV       : Object.values
                , OF       : Object.fromEntries  
                , DN       : Date.now
                , JP       : JSON.parse
                , JS       : JSON.stringify 
                // ----------------------------------------------------------- \ Wie können diese Elemente eingebunden werden????
               /*
                , CE       : _.D.createElement
                , CT       : _.D.createTextNode
                , AC       : _.D.appendChild
                , RC       : _.D.removeChild
                , EL       : _.D.addEventListener
                , RL       : _.D.removeEventListener
               */
                // ----------------------------------------------------------- / Wie können diese Elemente eingebunden werden????
                , MM       : a=>a.reduce((t,e)=>{if(e>t.max)t.max=e;if(e<t.min)t.min=e;return t},{min:Number.MAX_VALUE,max:-Number.MAX_VALUE})
                , MO       : a=>a.reduce((c,a)=>{return c[a]={},c},{})
                , MF       : Math.floor
                , MP       : Math.pow  
                , ML       : Math.log10 
                , KV       : e=>{return{k:e[0],v:e[1]}}
                , fc       : (c,a)=>c.filter(_.X.FX[a.f](a.k)(a.v))
                , as       : c=>a=>c.reduce((b,d)=>{return b[d]=a[d],b},{})
                , FX       : { eF  :d=>a=>b=>b[d].toString()===a.toString()
                             , rF  :d=>a=>b=>new _.X.RE(a,'i').test(b[d])

                             , icF :d=>a=>b=>b[d].includes(a)     //true wenn enthalten
                             , swF :d=>a=>b=>b[d].startsWith(a)   //true startsWith Filter wenn enthalten 2023-07-25
                             , ewF :d=>a=>b=>b[d].endsWith(a)     //true endsWith Filter wenn enthalten 2023-07-25
                            
                             , oF  :d=>a=>b=>a.reduce((f,e)=>f||e===b[d],false) //OR Filter
                             , NrF :d=>a=>b=>!new _.X.RE(a,'i').test(b[d])
                             , tF  :c=>()=>a=>a[c]
                             , NtF :c=>()=>a=>!a[c]
                             , gF  :d=>a=>b=>b[d]>=a
                             , lF  :d=>a=>b=>b[d]<=a
                             , bF  :d=>a=>b=>b[d]>=a.k&&b[d]<=a.g //between Filter
                             , NbF :d=>a=>b=>b[d]<=a.k&&b[d]>=a.g
                             , iF  :d=>b=>c=>new _.X.RE(b.join('|')).test(c[d])//??? ich weiss nicht mehr WO und WARUM
                             }
                , buzZ       : (i,l=7)=>_.X.OE(i.reduce((A,B)=>{return B.split(/\W/).filter(e=>e.length>l).map(e=>e.toLowerCase()).reduce((T,E)=>{return T[E]=(T[E]||0)+1,T},A),A},{})).map(_.X.KV).sort((a,b)=>b.v-a.v).slice(0,50) 
                , KZ         : l=>e=>{return{k:e[0],v:_.X.buzZ(e[1],l)}}
                , rs         : v=>{if (typeof v ==='string') return parseFloat(v.replace(/,/,'.'));if (typeof v ==='number') return v;return 0;}
                , bxpl       : c=>{const b=c.map(b=>_.X.rs(b)).sort((a,b)=>a-b),l=b.length,s=b.reduce((t,e)=>t+(e||0),0),m=s/l,v=b.reduce((t,e)=>t+(e-m)*(e-m),0)/l;return{min:b[0],q1:b[parseInt(0.25*l)],q5:b[parseInt(0.5*l)],mean:m,q7:b[parseInt(0.75*l)],max:b[l-1],s:s,l:l,v:v,d:Math.sqrt(v)}}
                , KB         : e=>{return{k:e[0],v:_.X.bxpl(e[1])}} //parseFloat(E[e.col].replace(/,/,"."))||0):E[e.col
                , U          : (a,e)=>a.reduce((T,E)=>T+'_'+e[E],'') 
                , alb        : (A,e,f=1,g=1)=>(T,E)=>{T[_.X.U(A,E)]= T[_.X.U(A,E)]||[];T[_.X.U(A,E)].push(E[f]||0) ;return T}            
                , alx        : (A,e,f=1,g=1)=>(T,E)=>{T[_.X.U(A,E)]=(T[_.X.U(A,E)]||0)+(E[f]??1)*(E[g]??1);return T}                    // 2023-01-18 wenn element 0 zählt es nicht aus || wird ??
                , aly        : (f,g=1,b=1)=>(c,d)=>{return _.X.OK(f).forEach(e=>{c[e][d[e]]=(c[e][d[e]]||0)+(d[g]??1)*(d[b]??1)}),c}
                , mfs        : x=>d=>a=>x.reduce((b,c)=>b||new _.X.RE(d.replace(/([*()\]])/g,'\$1'),'i').test(a[c].replace(/[()<>;]/g,'').replace(/([./-])/g,'\$1')),!1)
                , mfms       : c=>(d,a)=>d.filter(_.X.mfs(c)(a))
                // ------------------------------------------------------------------------------------------------------- Analytics Algorithmen
                , describe   : (d,e) =>d.reduce(_.X.aly(_.X.MO(e.s)),_.X.MO(e.s))                                   // --- describe columns unique sum
                , fdescr     : (d,e) =>e.f.reduce(_.X.fc,d).reduce(_.X.aly(_.X.MO(e.s)),_.X.MO(e.s))                // --- filtered describe columns unique sum
                , combine    : (d,e) =>e.f.reduce(_.X.fc,d).map(_.X.as(e.s))                                        // --- combine filter und columns
                , grpsum     : (d,e) =>_.X.OE(e.f.reduce(_.X.fc,d).reduce(_.X.alx(e.s,{},e.c),{})).map(_.X.KV)      // --- grpsum  summe columns over structure ONE-Pass
                , search     : (d,e) =>e.v.split(' ').reduce(_.X.mfms(e.c),e.f.reduce(_.X.fc,d).map(_.X.as(e.s)))
                
                , newsearch  : (d,e) => e["s"].split(' ').reduce( _.X.mfms(e["k"]),e["f"].reduce(_.X.fc,d)).map(_.X.as(e["i"].concat(e["k"]).concat(e["e"])))
                
                , cwrdCld    : (d,e) =>_.X.OE(e.f.reduce(_.X.fc,d).reduce(_.X.alb(e.s,{},e.c),{})).map(_.X.KZ(e.l)) // --- cwrd BuZZCloud Words values over structure
                ,  bxPlt     : (d,e) =>e.s.reduce((a,c)=>{return a[c]=_.X.bxpl(d.map(b=>b[c])),a},{})               // wie describe stats over columns
                , cbxPlt     : (d,e) =>_.X.OE(e.f.reduce(_.X.fc,d).reduce(_.X.alb(e.s,{},e.c),{})).map(_.X.KB)      // --- column statistics over structure
                
  /*NEU*/       , kreuz      : (d,e) => { const RKEY = e.s.join(',')||'DIM1,DIM2' // Dimensions Werte des doppelFilters werden als globale Filter "verarbeitet"
                                        , GSV        = _["X"]["grpsum"]( d, e) // e={f:[],s:dims,c:vs})
                                        , COLS       = [...new Set(GSV.map(e=>e.k.split("_")[1]))]
                                        , ROWS       = [...new Set(GSV.map(e=>e.k.split("_")[2]))]
                                        , KVJ        = GSV.reduce((t,e)=>{t[e.k]=e.v;return t},{})
                                        ; return ROWS
                                                 .map(e=>COLS.reduce((T,E)=>{T[`${E}`]=KVJ[`_${E}_${e}`]||0;return T}, {[RKEY]:e})) //die DimensionsKombination steht im ersten Key
                                        }
/*NEU getSaldo*/,gS          : (d,k) => _["X"]["OE"]( d.reduce((t,e)=>{if(!t[e[ k[0] ]])t[e[k[0]]]={saldo:0,elements:[]};if(!t[e[k[1]]])t[e[k[1]]]={saldo:0,elements:[]};t[e[k[0]]]["saldo"]-=e.saldo;t[e[k[1]]]["saldo"]+=e.saldo; return t;},{})).map(e=>{ return { "konto": e[0], "saldo":e[1]["saldo"]}} ) 
                
                , idsearch   : (d,e) =>{ // ------------------------------------------------------------SEARCH PRE-PROCESSING -------
                  const K = e["s"].toLowerCase()       //searchvalue
                  ,     B = {}
                  ,     D = e["f"].reduce(_.X.fc,d).map((E,i)=>{E['NEWID']='K'+i.toString();return E;})
                  ;
                  B[K]=[];//Searchvalue als
                  const O = [...K]
                            .filter(e=>e!==" ")
                            .reduce((t,e,i,a)=>{if(i>1)t[a[i-2]+a[i-1]+e]=[];return t},B); //Bilden der Dreier-Gruppen
                  const   // ------------------------------------------------------------SEARCH -----------------------
                           C = _.X.OE(D.reduce((t,f,i,a)=>{_.X.OK(O).reduce((T,E)=>{if ( e["k"].reduce((c,b)=>c+f[b],'').toLowerCase().includes(E) ) T[E].push(a[i]['NEWID']);return T},t);return t}, O)).reduce((t,f)=>{f[1].reduce((T,E)=>{T[E]=(T[E]||0)+1;return T},t);return t;},{})//Such-Algorihmus

                         // ------------------------------------------------------------SEARCH POST-PROCESSING -------
                  //_.X.CL(  'Länge der Suchgruppen'                         , _.X.OK(O).length
                 //        , 'hat die Searchstring Treffer'                  , _.X.OE(O).reduce((t,e)=>{t[e[0]]=e[1].length;return t},{})[K] //TrefferproFragment, hat die Hauptgruppe  Treffer
                 //        , 'wieviele Suchgruppen sind belegt'              , _.X.OV(O).map(e=>e.length).filter(e=>e>0).length); //Suchgruppen
                 const   J = _.X.OE(C).map(e=>{return {k:e[0],v:e[1]}})

                       , V = _.X.OE(O).reduce((t,e)=>{t[e[0]]=e[1].length;return t},{}) //Treffer pro Fragment Element
                       , T = V[K] //hat die searchgruppe treffer
                       , G = _.X.OV(O).map(e=>e.length).filter(e=>e>0).length/_.X.OK(O).length//Belegungsrate der Suchgruppen

                       , M = Math.max.apply(null,J.map(e=>e.v))
                       , L = J.map(e=>{e.a=(e.v/M).toFixed(3);return e}).reduce((t,e)=>{t[e.k]=e.a;return t},{}) //LOOKUP für TreffZahl
                       , S = J.filter(E=>E.v>=M*e["r"])
                             .map(e=>e.k)
                       ;
                       return _.X['cb'](D.map(E=>{E["TZ"]=L[E["NEWID"]]*G.toFixed(2);return E}),{f:[{f:"oF",k:"NEWID",v:S}],s:["TZ"/*,"NEWID"*/].concat(e["i"]).concat(e["k"]).concat(e["e"])}).sort((a,b)=>b.TZ-a.TZ)
                      }
                }
                , R : { version : ()=>`info R 0.2 rdf builder interpreter 2024-09-04`
                  , C : i => t => { const SPLIT = i.split(' ');
                                  if (SPLIT.length === 3 && SPLIT[1] === 'contains'){
                                  const L0 = SPLIT[0]
                                  ,     L2 = SPLIT[2];
                                  t          = t||{};
                                  t[L2]      = t[L2]||{};
                                  _.X.OA(t[L2],JSON.parse(`{"from":"${L0}"}`));
                                  //t['C']=(t['C']||[]).concat({name:L2,childname:L0});
                                }   
                                return t;
                                  }
                  , A : i => t => { const SPLIT = i.split(' ');
                                          if (SPLIT.length === 4 && (SPLIT[1] === 'hat' || SPLIT[1] === 'has' )){ 
                                            const L0 = SPLIT[0], L2 = SPLIT[2]        ,     L3 = SPLIT[3];
                                          t          = t||{}; t[L0]      = t[L0]||{};
                                          _.X.OA(t[L0],_.X.JP(`{"${L2}":"${L3}"}`));
                                        }   
                                        return t;
                                        }
                  //Builder aus text wird rdf json unter nutzung vorhandender Interpreter
                  , B :(x,a=["C","A"])=>{const r=x.reduce((t,e)=>{a.forEach(E=>t=_.R[E](e)(t));return t;},{});
                                         return _.X.OE(r).reduce((t,e)=>{if(t[e[1]['from']])t[e[1]['from']]['@HC']=(t[e[1]['from']]['@HC']||[]).concat(e[0]);return t},r) 
                                        }    
                      //RKV ermittelt die Keys und Values eines RDF-Lookups 
                      ,RKV   : r =>_.X['OE'](_.X['describe'](_.X['OV'](r),{s:[...new Set(_.X['OV'](r).reduce((t,e)=>{t=_.X['OK'](e).concat(t);return t;},[]))]})).reduce((t,e)=>{delete e[1].undefined;t[e[0]]=e[1];return t;},{})    
                      //FKV Filter in R nach Key value siehe Filter wie in X --NUN für RDF, danndie Frage der FilterKaskade???? regexp etc
                      , FX :{ eI   : (r,k,v ) =>_.X['OE'](r).reduce((t,e)=>{if(e[0]===v                             )                                     t[e[0]]=e[1];return t;},{})  // test _.R.mf(_.DATA.rdf,[{"f":"eI","v":"max"}])
                            , oI   : (r,k,v ) =>_.X['OE'](r).reduce((t,e)=>{if(v.reduce((x,y)=>x||e[0]===y,false)   )                                     t[e[0]]=e[1];return t;},{})  // test _.R.mf(_.DATA.rdf,[{"f":"oI","v":['max',"fritz"]}])
                            , rI   : (r,k,v ) =>_.X['OE'](r).reduce((t,e)=>{if(new _.X.RE(v,'i').test(e[0])         )                                     t[e[0]]=e[1];return t;},{})  // test _.R.mf(_.DATA.rdf,[{"f":"rI","v":"fr"}]) 
                            , iI   : (r,k,v ) =>_.X['OE'](r).reduce((t,e)=>{if(e[0].includes(v)                     )                                     t[e[0]]=e[1];return t;},{})  // test _.R.mf(_.DATA.rdf,[{"f":"iI","v":"an"}]) .DATA.rdf,1,"d:c")   
                        
                            , KeV  : (r,k,v ) =>_.X['OE'](r).reduce((t,e)=>{if(_.X['OE'](e[1]).filter(E=>E[0]===k&&E[1]===v                     )?.length)t[e[0]]=e[1];return t;},{})  
                            , KiV  : (r,k,v ) =>_.X['OE'](r).reduce((t,e)=>{if(_.X['OE'](e[1]).filter(E=>E[0]===k&&E[1].includes(v)             )?.length)t[e[0]]=e[1];return t;},{})  
                            , KgV  : (r,k,v ) =>_.X['OE'](r).reduce((t,e)=>{if(_.X['OE'](e[1]).filter(E=>E[0]===k&&E[1]>=v                      )?.length)t[e[0]]=e[1];return t;},{})  
                            , KlV  : (r,k,v ) =>_.X['OE'](r).reduce((t,e)=>{if(_.X['OE'](e[1]).filter(E=>E[0]===k&&E[1]<=v                      )?.length)t[e[0]]=e[1];return t;},{})  //_.R.mf(_.DATA.rdf,[{"f":"KlV","k":"eier","v":"3"}]) 
                            , KbV  : (r,k,v ) =>_.X['OE'](r).reduce((t,e)=>{if(_.X['OE'](e[1]).filter(E=>E[0]===k&&E[1]>=v[0]&&E[1]<=v[1]       )?.length)t[e[0]]=e[1];return t;},{})  //_.R.mf(_.DATA.rdf,[{"f":"KbV","k":"eier","v":["1","5"]}]) 
                            , KrV  : (r,k,v ) =>_.X['OE'](r).reduce((t,e)=>{if(_.X['OE'](e[1]).filter(E=>E[0]===k&&new _.X.RE(v,'i').test(E[1]) )?.length)t[e[0]]=e[1];return t;},{})  
                            , KoV  : (r,k,v ) =>_.X['OE'](r).reduce((t,e)=>{if(_.X['OE'](e[1]).filter(E=>E[0]===k&&v.reduce((x,y)=>x||E[1]===y,false) )?.length)t[e[0]]=e[1];return t;},{})  //_.R.mf(_.DATA.rdf,[{"f":"KoV","k":"company","v":["one","two"]}]) 
                           
                            , eV   : (r,k,v ) =>_.X['OE'](r).reduce((t,e)=>{if(_.X['OE'](e[1]).filter(E=>          E[1]===v                     )?.length)t[e[0]]=e[1];return t;},{})  //_.R.mf(_.DATA.rdf,[{"f":"eV","v":"one"}]) 
                            , iV   : (r,k,v ) =>_.X['OE'](r).reduce((t,e)=>{if(_.X['OE'](e[1]).filter(E=>          E[1].includes(v)             )?.length)t[e[0]]=e[1];return t;},{})  
                            , rV   : (r,k,v ) =>_.X['OE'](r).reduce((t,e)=>{if(_.X['OE'](e[1]).filter(E=>          new _.X.RE(v,'i').test(E[1]) )?.length)t[e[0]]=e[1];return t;},{})  
                    
                            , eK   : (r,k,v ) =>_.X['OE'](r).reduce((t,e)=>{if(_.X['OE'](e[1]).filter(E=>E[0]===v                               )?.length)t[e[0]]=e[1];return t;},{})  //_.R.mf(_.DATA.rdf,[{"f":"eK","v":"company"}])
                            , rK   : (r,k,v ) =>_.X['OE'](r).reduce((t,e)=>{if(_.X['OE'](e[1]).filter(E=>new _.X.RE(v,'i').test(E[0])           )?.length)t[e[0]]=e[1];return t;},{})  //_.R.mf(_.DATA.rdf,[{"f":"rK","v":"iz"}]) 
                            , iK   : (r,k,v ) =>_.X['OE'](r).reduce((t,e)=>{if(_.X['OE'](e[1]).filter(E=>E[0].includes(v)                       )?.length)t[e[0]]=e[1];return t;},{})  //_.R.mf(_.DATA.rdf,[{"f":"iK","v":"any"}]) 
                            , oK   : (r,k,v ) =>_.X['OE'](r).reduce((t,e)=>{if(_.X['OE'](e[1]).filter(E=>v.reduce((x,y)=>x||E[0]===y,false)     )?.length)t[e[0]]=e[1];return t;},{})  //_.R.mf(_.DATA.rdf,[{"f":"oK","v":["einser","bizeps"]}])
                            }
                      ,mf    : (r,j)=>j.reduce((t,e)=>_.R['FX'][e.f](t,e.k,e.v),r)    //Filter-Kaskade auf Basis der RDF Filter  _.R.mf(_.DATA.rdf,[{"f":"eV","k":"Type","v":"Schnittstelle"}])
                      ,J2R   : (j,p)=>j.reduce((t,e)=>{t[e[p.id]]=e; return t;},{}) /*  JSON to RDF ein Arrayof JSON in ein RDF txt umwandeln oder gleich in ein RDF Lookup WAS IST BESSER ???? */
                      ,b4RKV : (r,k,v,i='info',c='textContent',f='KeV') =>{ // Button For rdf Key Value Filter _.R.b4RKV(r=_.DATA['rdf'],k=e[0],v=E,i='rdfinfo',c='value',f='FKV')
                                                    const msp = document.createElement('span');
                                                    msp.setAttribute('class','oneofn'); // span anlegen
                                                    msp.addEventListener('click',()=>{ document.querySelector(`#${i}`)[c]= _.X['JS'](_.R['FX'][f](r,k,v));});
                                                    msp.appendChild(document.createTextNode(`${k}-${v}-Filter`));
                                                    return msp;  
                      }            
                  }       
            , H : { version : ()=>`info H 0.3 hierachy utility 2024-07-21`
     // ----------------------------------------------Hierarchie RDF Part-------
                  , P  : (F,p,M='from',r) => { if ( F[p] && F[p][M] ) _.H.P( F, F[p][M], M,(r||p)+'/'+F[p][M] );
                  else _.X.CL(r); }     
                  , LO : S => _.X['OE'](S).filter(e=>e[1].from).reduce((t,e)=>{t[e[0]]=e[1].from;return t;},{})              //2024-09-08 funktioniert bei ner mehrfachhir nicht mehr
                  , LP : (S,N)=>{let p=N,w=S[N];while (!!w){p+='/'+w;w=S[w]};return p} //LookupHierarchie
                  , JH : S=>_.X.OE(_.H.LO(S)).reduce((t,e)=>{t.push({e:e[0],r:_.H.LP(_.H.LO(S),e[0]).split('/').reverse().join('|')});return t; },[]) //HierachiePfade ist dann X['JH'](T['A']) 
                  , HF : (h,k,o)=>h.filter(e=>e.r.includes(k)).filter(e=>e.r.split('|').length===o)//Hierarchie-Filter-Ebene
                  , MH :      h=>                           h.filter(e=>e.r.split('|').length===2).reduce((t,e)=>{t[e.r.split('|')[0]]=(t[e.r.split('|')[0]]||[]).concat(e.r.split('|')[1]);return t;},{})
                  , DE : (pe,e)=>{pe.removeChild(e)} //Element aus seinem Gefüge entfernen   
                  , AE : (rt,tx,id='id1',DATA,level=0)=>{ //append Element div (id) span textnode an root element
                    const dv = document.createElement('div')
                    ,spa = document.createElement('span')
                   // ,spd = document.createElement('span')
                    ,tna = document.createTextNode(new Array(level).fill('\u2026').join('')+' '+tx) //DATA[tx]?.['@HC']  2026 hellip ....
                   // ,tnd = document.createTextNode((!!Array.from(document.querySelector('#'+id)?.children||[]).filter(e=>e.nodeName==='DIV').length )?'(d)':'') //Delete TextNode wenn parents vorhanden sindDATA[tx]?.['@HC']
                   // ,tnd = document.createTextNode(' [ d ]') //Delete TextNode wenn parents vorhanden sindDATA[tx]?.['@HC']
                    ;
                    dv.setAttribute('id',id);
                    spa.appendChild(tna);
                    spa.addEventListener('click',e=>{ //console.log(tx,id,DATA?.[tx]?.['@HC']||0);
                                                     (DATA?.[tx]?.['@HC']||[]).forEach((e,i)=>_.H['AE'](document.querySelector('#'+id),e,id+i,DATA,level+1))
                                                   });
                    spa.addEventListener('mouseover',e=>{ //console.log('MOUSEOVER',_.DATA.rdf[e.target.firstChild.data.split(' ')[1]]);
                                                          document.querySelector('#rdfinfo').value=_.X.JS(_.DATA.rdf[e.target.firstChild.data.split(' ')[1]]);
                                                  });
                    dv.appendChild(spa);
                    if ((DATA?.[tx]?.['@HC']||[]).length)  // NUR wenn TextNode vorhanden ist
                      { spa.setAttribute('data-counter',(DATA?.[tx]?.['@HC']||[]).length);//2024-07-19 css bullet
                        const spd = _.Y.setIcon('hw-reload','icon','nur löschen, wenn aufgeklappt')//document.createElement('span')
                        //,tnd = document.createTextNode(' [ d ]')
                        //,tnd = _.Y.setIcon('vw-plus')//document.createTextNode(' [ d ]')
                        
                        ;
                        spd.addEventListener('click',e=>{ Array.from(e.target.parentNode.children).filter(e=>e.nodeName==='DIV')
                                                .map(e=>e.id)
                                                .forEach(x=>_.H['DE'](document.querySelector('#'+e.target.parentNode.id),document.querySelector('#'+x)))
                    
                                              });
                        //spd.appendChild(tnd);        
                        dv.appendChild(spd);                                
                      }
                     rt.appendChild(dv);
                      }
                    }                      
          , U : { version : ()=>`info U 0.2 utility`
                , n2ne    : (v,l=1) => Number(v/_.X.MP(10,_.X.MF(_.X.ML(v)))).toFixed(l)+'e'+_.X.MF(_.X.ML(v))  // Darstellung Grosser Zahlen 75643 => 7.5E5
                , kv2j    : (k,v) => k.reduce((t,e,i) => {t[e]=v[i];return t; } ,{})
                , j2fro   : (j,s) => {const L=sd[s].reduce((t,e)=>{t[e.col]=e.head;return t},{});return X.OE(j).reduce((t,e)=>t+'<div class=form-group><label>'+L[e[0]]+'</label><input readonly class=input-control name="'+e[0]+'" value="'+e[1]+'" type=text ></input></div>','')}
    

                , j2Dj    : j  => _.X.OE(j).reduce((T,E)=>{T[E[0]]={S:E[1]};return T},{}) // für AWS dynamoDB umwandlung marshalling
                , Dj2j    : d  => _.X.OE(d).reduce((T,E)=>{T[E[0]]=E[1]['S'];return T},{}) // für AWS dynamoDB umwandlung marshalling
                , m2x     : async (m,j,u='../api/multiform') =>  { const r = await fetch ( u//'../dyndb'
                                                                                         , { method : m//'POST'|'PUT'
                                                                                           , body   : JSON.stringify(j)
                                                                                           }
                                                                                         );
                                                                   return r;
                                                                 }
                , on : (t,v=false,c='oneofn') => { document.querySelectorAll (`span[class~="${t}"]`    ).forEach      (e=>e.setAttribute('class', t + ` ${c}`));              // alles aus
                                                    if (v) document.querySelector    (`span[data="${t}-${v}"]` ).setAttribute (                  'class', t + ` ${c} ${c}active`);  // eventuell EINS an
                                                  }           
                , tt : e => { if (document.querySelector('#md'+e).style.display==='block') {document.querySelector('#md'+e).style.display='none';} else {document.querySelector('#md'+e).style.display='block'}}                                                                      
                }      
                /**
                 * I Part of library - I Icons
                 * 
                 */
          , I : { version  : () =>`info X 0.1 Icons`
                , getIcon  :  (n,i) => `<symbol id='${n}' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><path class='cls-1' d='${i[n]}'/></symbol>`
                , gI       :  (n,i) =>{ //Fassung mit cretaeElement
                                        const sy = document.createElementNS('http://www.w3.org/2000/svg','symbol')
                                        ,     pt = document.createElementNS('http://www.w3.org/2000/svg','path')
                                        ;
                                        sy.setAttributeNS(null,'viewBox','0 0 24 24');
                                        sy.setAttributeNS(null,'id',n);
                                        pt.setAttributeNS(null,'class','cls-1');
                                        pt.setAttributeNS(null,'d'    ,i[n]   );
                                        
                                        sy.appendChild(pt);
                                        return sy;
                                      }
                , aI       : (i,e) => _.X.OK(i).reduce((T,E)=>{T.appendChild(_.I.gI(E,i));return T;},e)                      
                , allIcons :  i => _.X.OK(i).reduce((T,E)=>T+_.I.getIcon(E,i),'')              
                } // icon als LookUp
                /**
                 * M Part of Library M Modal Dialogs
                 * @uses
                 */
         , M  : { version : ()=>`info M 0.2 modal (ohne innerHTML) 2023-07-26 überarbeitet`
         /**
          * fB formBox Darstellung aus formular.json - verschieden Formularse, die modal ausgeführt wrden können
          * formulat title subtilte form
          * form l label v value n name t type wie text date etc div flex-box
          * @param {Array} a Array der String 
          * @param {Object} m MAiN object
          * @param {String} f Key im DATA 'formular' object
          * @return {Object} m Die Boxen werden auf Main übertragen
          */
         ,fB : (a,m,f='formular')=>{a.reduce((t,e)=>{ const dv = document.createElement('div'    )
                                ,     hd = document.createElement('header' )
                                ,     di = document.createElement('div'    )
                                ;
                                dv.addEventListener('click', () => { _.M.sM( _.DATA[f][e].title
                                                                            , _.DATA[f][e].subtitle  
                                                                            , _.DATA[f][e].form  
                                                                            )
                                                                    }
                                                    );
                                dv.setAttribute('class','flex-box');
                                di.setAttribute('class','info'    );
                                hd.appendChild(document.createTextNode(_.DATA[f][e].title    || 'Header'    ));
                                di.appendChild(document.createTextNode(_.DATA[f][e].subtitle || 'substart'  ));
                                dv.appendChild(hd);
                                dv.appendChild(di);
                                
                                                    
                                t.appendChild(dv);
                                return t;
                                },m);} 
         ,gE :(e)=>{//get FormElement ein einnzelnes label inputFeld generieren dv e[0] label e[1] value e.l für label e.v value e.t type das sind die elemente aus dem Vorrat des Forms text mit list
          const dv = document.createElement('div'   )
          ,     lb = document.createElement('label' )
          ,     ip = document.createElement('input' )
          ;
          dv.setAttribute('class'   ,'form-group'       );
          lb.appendChild(document.createTextNode(e?.l|| e[0]) );
          if(!(e?.v||false)) ip.setAttribute('readonly', 'readonly'  );//UNterschied zwischen dtpm formular Info und boxview formular
          ip.setAttribute('type'    , e?.t||'text'      );
          if(!(e?.d||false))ip.setAttribute('list'    , e?.d||'media'      );
          ip.setAttribute('class'   ,'input-control'    );
          ip.setAttribute('value'   , e?.v||e[1]        );
          ip.setAttribute('name'    , e?.l||e[0]        );

          dv.appendChild(lb);
          dv.appendChild(ip);
          return dv;
        },gfd:(j,f)=>{ //get Form fo detail 2024-07-09 es funzzt
         
         j.reduce((t, e)=> { //<div class="form-group"><label>'+e[0]+'</label><input readonly type="text" class="input-control"   value="'+e[1]+'"></input></div>
         const dv = document.createElement('div'   )
         ,     lb = document.createElement('label' )
         ,     ip = document.createElement('input' )
         ,     ln = document.createElement('a')
         ;
         dv.setAttribute('class', 'form-group');
         lb.appendChild(document.createTextNode(_.X.OK(e).join('|')) );
         ip.setAttribute('readonly', 'readonly');//UNterschied zwischen dtpm formular Info und boxview formular
         ip.setAttribute('type', 'text');
         ip.setAttribute('class', 'input-control');
         ip.setAttribute('value', _.X.OV(e).join('|'));
         ln.setAttribute('href', _.X.OV(e)[3]);//[3] ist link
         ln.appendChild( _.Y.setIcon('hw-link','icon','Dokument mit Rechtsklick in neuem Tab öffnen'));//document.createTextNode('Link'));//SpäterIcon
         
         dv.appendChild(lb);
         dv.appendChild(ip);
         dv.appendChild(ln);
         t.appendChild(dv);

       return t;},f); //Aufbau des Formulars
       return f;} 
         ,gf1: (j,f)=>_.M.gf(j,f,false)   //weil SpaltenChange nicht mehr funktionierte                  
         ,gf : (j,f,roattr=true) => { //get Form
                              j.reduce((t,e)=> { //<div class="form-group"><label>'+e[0]+'</label><input readonly type="text" class="input-control"   value="'+e[1]+'"></input></div>
                              const dv = document.createElement('div'   )
                              ,     lb = document.createElement('label' )
                              ,     ip = document.createElement('input' )
                              ;
                              dv.setAttribute('class'   ,'form-group'       );
                              lb.appendChild(document.createTextNode(e?.l|| e[0]) );
                              if(roattr) ip.setAttribute('readonly', 'readonly'  );//UNterschied zwischen dtpm formular Info und boxview formular
                             // if(!(e?.v||false)) ip.setAttribute('readonly', 'readonly'  );//UNterschied zwischen dtpm formular Info und boxview formular
                              if((e.l==='media')||false)ip.setAttribute('list'    , 'media'      ); // 2023-11-10 So können Listen erfasst werden --siehe bzd.html dort datalist media
                              if((e.l==='style')||false)ip.setAttribute('list'    , 'style'      ); // 2023-11-20 So können Listen erfasst werden --siehe bzd.html dort datalist media
                              ip.setAttribute('type'    , e?.t||'text'      );
                              ip.setAttribute('class'   ,'input-control'    );
                              ip.setAttribute('value'   , e?.v||e[1]        );
                              ip.setAttribute('name'    , e?.l||e[0]        );

                              dv.appendChild(lb);
                              dv.appendChild(ip);
                              t.appendChild(dv);

                            return t;},f); //Aufbau des Formulars
                            return f; 
                        }
         ,gh : (t,s) =>{ //get Header von Modal
                         const
                           hd = document.createElement('header'         )
                         , sm = document.createElement('span'           )
                         , sr = document.createElement('span'           )
                         , tl = document.createTextNode(t||'MODAL-Form ')
                         , tm = document.createTextNode(s||'intern'     ) 
                         ;
                         sr.setAttribute('class','close');
                         sr.addEventListener('click',()=>{ document.querySelectorAll('.modal'   )[0].style.display = 'none';
                                                           document.querySelectorAll('#formsave')[0].disabled      = false;
                                                         });
                         sr.appendChild(document.createTextNode('X'));// &times; wird nicht aufgelöst
                         sm.appendChild(tm);

                         hd.appendChild(tl);
                         hd.appendChild(sm);
                         hd.appendChild(sr);
                         return hd;
         } 
         ,d2m:(e,v,t=0)=>{ // Modal mit inner HTML
          //console.log(' d2m Detail 2 ModalForm ', e);
          const mf = document.querySelectorAll('.modal-form'    )[0]
          ,      dv = document.createElement('div'    )
          ,      fm = document.createElement('form'   )
          ;
          mf.removeChild(mf.children[0]); //altes Modal entfernen und durch dv neu ersetzten

          dv.setAttribute('class', 'modal-steffen');
          dv.appendChild(_.M['gh' ]( 'd2m Modal', `${e.length} Einträge für id ${v} [${t} ms]`               )); // get Header
          dv.appendChild(_.M['gfd'](e, fm, true )); // form zur Wiederverwendung ausgelagert true readonly

          mf.appendChild(dv);//neues Modal Form
          document.querySelectorAll('#formsave'      )[0].disabled=true;
          document.querySelectorAll('.modal'         )[0].style.display = 'block';
        }              
         ,i2m: (e)=>{ // Modal ohne inner HTMl
          //console.log(' i2m');
                    const jf =  _.U.kv2j( e.k.split('|'), e.o.split('|') )
                    , mf = document.querySelectorAll('.modal-form'    )[0]
                    , dv = document.createElement('div'    ) //damit das modale fenster mit einem befehl removed un neu aufgebaut werden kann
                    , fm = document.createElement('form'   )
                    ;
                    mf.removeChild(mf.children[0]); //altes Modal entfernen und durch dv neu ersetzten
                
                    dv.setAttribute('class','modal-steffen');
                    
                    dv.appendChild( _.M.gh( 'i2m Modal','aktuelle Zeile'               ) ); // get Header
                    dv.appendChild( _.M.gf(_.X.OE(jf), fm,true ) ); // form zur Wiederverwendung ausgelagert true readonly

                    mf.appendChild(dv);//neues Modal Form 
                    document.querySelectorAll('#formsave'      )[0].disabled=true;
                    document.querySelectorAll('.modal'         )[0].style.display = 'block';
         }
         ,i2c: (e)=>{ // Modal ohne inner HTMl
          //console.log(' i2c',e);
          const jf =  _.U.kv2j( e.k.split('|'), e.o.split('|') )
          , mf = document.querySelectorAll('.modal-form'    )[0]
          , dv = document.createElement('div'    ) //damit das modale fenster mit einem befehl removed un neu aufgebaut werden kann
          , fm = document.createElement('form'   )
          ;
          mf.removeChild(mf.children[0]); //altes Modal entfernen und durch dv neu ersetzten
      
          dv.setAttribute('class','modal-steffen');
          fm.setAttribute('id','form');
          fm.setAttribute('datatable',e.a||'NN');//NEU 2026-07-09 über FormAttribute den Data Table name mit-"schleifen"
          
          dv.appendChild( _.M.gh( 'i2c Modal',`Form for Table ${e.a}`               ) ); // get Header
          dv.appendChild( _.M.gf(_.X.OE(jf), fm,false ) ); // form zur Wiederverwendung ausgelagert false verändern nicht readonly

          mf.appendChild(dv);//neues Modal Form 
          document.querySelectorAll('#formsave'      )[0].disabled=false;
          
          document.querySelectorAll('#formsave'      )[0].removeEventListener('click', _.fbtnsave);
          //dosomething with ftbsa
         // _.fbtnsave = await _.M[bt](t,true,c,v,p); // AWS false onPremise true //jetzt mehr möglichkeiten c sapshift v view p position
                           
          _.fbtnsave= async (event) =>{ //HIER könnte man die Möglichkeiten sihe bt bt 1 nutzen!!!ÜBERDENKENNNNNNN 2024-07-05
            try{// der TRY ist wichtig, damit Modal beendet werden kann
              const fd    = new FormData( document.querySelectorAll('#form'      )[0])              //machine date time step
              ,     fj    = Object.fromEntries([...fd.entries()])
              ,     tn    = document.querySelectorAll('#form'      )[0].getAttribute('datatable')||'NN' // über event wieder den tablename auslesen
              ;
              //console.log('fbtnSAVE t',t,s,TABLEI,TABLEC,APIID,REGION,TASK);//alle Werte vorhanden
             
              // fj['PID'] = 'PROJECTE';
              fj['_time'] = Date.now().toString();
              if (!fj['SID']) fj['SID'  ] = Date.now().toString(35); // damit kann zwischen update und insert unterschieden werden
              //fj['SID'  ] = Date.now().toString(35);

              // console.time('MX');
              console.log('FBTSAVE in i2c j',fj,_.U.j2Dj( fj ),tn);
              const ct=performance.now()
              , r = await _.C.m2eda ( _.U.j2Dj( fj ),tn) // 2026-07-09 tablename mitsenden, um ev. local abzuspeichern als _DATA.table.push(new row)
              ;
              //console.timeEnd('MX');
              console.log('RESPONSE ',r);//ev fehler
              document.querySelector('#info').textContent=`for ID :${r?.Entries[0]?.EventId||'NN'} in ${parseInt(performance.now()-ct)} ms `;
              }catch (e){console.error('ERROR MODAL',e)}

                                        document.querySelectorAll('.modal'   )[0].style.display = 'none';
          
          
          }
          document.querySelectorAll('#formsave'      )[0].addEventListener('click', _.fbtnsave);
          document.querySelectorAll('.modal'         )[0].style.display = 'block';
}
/*
           , _oldi2m     : e=>{  const jf =  _.U.kv2j( e.k.split('|'), e.o.split('|') )
                                ;
                                //console.log(`--- M.i2m --- ${_.X.JS(jf)} -- -- ${_.X.OE(jf).reduce((t,e)=>{return t+'<div class="form-group"><label>'+e[0]+'</label><input readonly type="text" class="input-control"   value="'+e[1]+'"></input></div>';},'')} --- ---`);
                                document.querySelectorAll('.modal'         )[0].style.display='none';
                                document.querySelectorAll('#formsave'      )[0].removeEventListener('click',_.fbtnsave);
                                document.querySelectorAll('#formsave'      )[0].disabled=true;
                               // document.querySelectorAll('.modal-form'    )[0].innerHTML = `<header>${p[e.t].header}<span class=close onclick="document.querySelectorAll('.modal'         )[0].style.display='none';document.querySelectorAll('.modal'         )[0].style.display='block'">&times;</span></header><form id=form>${U.j2fro( jf , e.t )}</form>`;
                               document.querySelectorAll('.modal-form'    )[0].innerHTML = `<div><header>MODAL-FORM<span class=close onclick="document.querySelectorAll('.modal')[0].style.display='none';document.querySelectorAll('#formsave')[0].disabled=false;">&times;</span></header><form id=form>${_.X.OE(jf).reduce((t,e)=>{return t+'<div class="form-group"><label>'+e[0]+'</label><input readonly type="text" class="input-control"   value="'+e[1]+'"></input></div>';},'')}</form></div>`;
                               document.querySelectorAll('.modal'         )[0].style.display = 'block';
                              }
            */
           // bt liest das Form aus und transformiert zu JSON als "fbtnsave" wird von sM
           , bt :  (t,p=true) => async event => { document.querySelectorAll('#formsave'      )[0].disabled=true;//DAMIT NUR EINMAL GEDRÜCKT WERDEN KANN
                                      const fd    = new FormData( document.querySelectorAll('#form'      )[0])              //machine date time step
                                      ,     fj    = _.X.OF([...fd.entries()])
                                      ;
                                      fj['_type'] = t;
                                      fj['_time'] = Date.now().toString();
                                      fj['_id'  ] = Date.now().toString(35);
                                      await _.U.m2x ( 'POST' , { TableName : 'dtpm-xsammler'
                                                                , Item      : p?fj:_.U.j2Dj(fj)
                                                                },p?'../api/multiform':'../multiform' );// für onpremise
                                                                    //   },'../multiform' );// für AWS
                                      document.querySelectorAll('.modal'      )[0].style.display='none';
                                      document.querySelectorAll('#formsave'   )[0].disabled=false;
                             }     
           ,bt1 :      (t,ap,c,v,p) => async event => {
            document.querySelectorAll('#formsave'      )[0].disabled=true;

            _.X.CL('ALTERNATIVE BT function ',t,c,v,p);
            const fd    = new FormData( document.querySelectorAll('#form'      )[0])              //machine date time step
            ,     fj    = _.X.OF([...fd.entries()])
            ;
            _.X.CL('Nach OK FORM ',fj);
            _.DATA['cfg_'+c]['views'][v][p]['style' ]=fj['style'];
            _.DATA['cfg_'+c]['views'][v][p]['head'  ]=fj['head' ];
            _.DATA['cfg_'+c]['views'][v][p]['media' ]=fj['media'];
            _.DATA['cfg_'+c]['views'][v][p]['col'   ]=fj['col'  ];
            _.T.rf(c); 


            document.querySelectorAll('.modal'      )[0].style.display='none';
            document.querySelectorAll('#formsave'   )[0].disabled=false;

           }   //cC Change Column   2023-10-12 2024-04-07 gf1 eingeführt
          ,cC : (title,subtitle,cfg,view,pos)=>_.M.sM(title
                                         ,subtitle
                                         ,['col','head','style','media'].reduce((T,e)=>{const E=_.DATA['cfg_'+cfg]['views'][view][pos];T.push({l:e,n:e,v:E?.[e]||' '});return T;},[])
                                         ,'gf1','bt1',cfg,view,pos)
                      
                             // 2023-10-11 neue Möglichkeit mit bt gf
           ,sM : async(t,s,l,gf='gf',bt='bt',c='sapshift',v='show',p='pl') =>{ //setModal OHNE innerHTML (t title s subtitle l form [{l:, n: ,v: ,t:},..]) label name vale type (date email password etc..)
            _.X.CL('SM SetModal ',t,s,l,gf,bt);
                             const fm = document.createElement('form'   )
                             ,     dv = document.createElement('div'    ) //damit das modale fenster mit einem befehl removed un neu aufgebaut werden kann
                             ,     mf = document.querySelectorAll('.modal-form'    )[0]
                             ;
                             mf.removeChild(mf.children[0]);
                             fm.setAttribute('id','form');
                    
                             dv.appendChild( _.M.gh( t        , s  ) ); // get Header
                             dv.appendChild( _.M[gf]( l        , fm ) ); // form zur Wiederverwendung ausgelagert ---jetztmeht möflichkeietn
                             mf.appendChild(dv);                        // neues Modal Form 

                             document.querySelectorAll('#formsave'      )[0].removeEventListener('click',_.fbtnsave);
                             _.fbtnsave = await _.M[bt](t,true,c,v,p); // AWS false onPremise true //jetzt mehr möglichkeiten c sapshift v view p position
                             document.querySelectorAll('#formsave'      )[0].addEventListener   ('click',_.fbtnsave);
                             document.querySelectorAll('.modal'         )[0].style.display = 'block';

                           }   /*                
                  , setModal : (t,s,l)=>{ const f=JSON.parse(l);
                                        document.querySelectorAll('.modal-form'    )[0].innerHTML = `<div><header>${t}<span class=info>${s}</span><span class=close onclick="document.querySelectorAll('.modal')[0].style.display='none'">&times;</span></header><form id=form>`
                                          + f.reduce((t,e)=>t+`<div class="form-group"><label>${e.l}</label><input type="${e.t?e.t:'text'}" class="input-control"  name="${e.n}"  value="${e.v}" placeholder="${e.v}"></input></div>`,'')
                                          +'</form></div>';
                                        document.querySelectorAll('#formsave'      )[0].removeEventListener('click',_.fbtnsave);
                                        _.fbtnsave  = async event => { document.querySelectorAll('#formsave'      )[0].disabled=true;//DAMIT NUR EINMAL GEDRÜCKT WERDEN KANN
                                                                    const fd    = new FormData( document.querySelectorAll('#form'      )[0])              //machine date time step
                                                                    ,     fj    = _.X.OF([...fd.entries()])
                                                                    ;
                                                                    fj['_type'] = t;
                                                                    fj['_time'] = Date.now().toString();
                                                                    fj['_id'  ] = Date.now().toString(35);
                                                                    await _.U.m2x ( 'POST' , { TableName : 'dtpm-xsammler'
                                                                                            , Item      : fj//_.U.j2Dj(fj)
                                                                                            },'../api/multiform' );// für onpremise
                                                                                         //   },'../multiform' );// für AWS
                                                                    document.querySelectorAll('.modal'      )[0].style.display='none';
                                                                    document.querySelectorAll('#formsave'   )[0].disabled=false;
                                                                  }
                                         document.querySelectorAll('#formsave'      )[0].addEventListener('click',_.fbtnsave);
                                         document.querySelectorAll('.modal'         )[0].style.display = 'block';
                                              }*/
                }
   ,Y:{version: ()=> `version 0.1 Y Barcode and so on..`
      ,bitFlow   : i => { const dv = document.createElement('div');
                          //Number(i).toString(2).split('')
                          new Array(8-Number(i).toString(2).split('').length).fill("0").concat(Number(i).toString(2).split('')) 
                          .reduce((t,e)=>{ const dt=document.createElement('span');
                                                        dt.setAttribute('class',`b${e}`);   
                                                        t.appendChild(dt);         
                                                        return t;},dv);
                                                        return dv;
                        }
      ,workFlow   : i => { const dv = document.createElement('div'),I=i % 7;
                        [1,2,3,4,5,6].reduce((t,e)=>{ const dt=document.createElement('span');
                                                    dt.setAttribute('class',(I===e)?'b2':'bl');   
                                                    t.appendChild(dt);         
                                                    return t;},dv);
                                                    return dv;
                      }
       ,meter   : i => { const dv = document.createElement('meter');
                                   dv.setAttribute('value',parseInt(i));   
                                   dv.setAttribute('max',15);   
                                                 
                                                    return dv;
                      }  
       ,barmeterspan   : (i,x=12) => { const dv = document.createElement('span');
                                dv.setAttribute('class',`barmeter`);   
        dv.setAttribute('style',`width:${i/x*5}rem`);//max 12 rem   
                                      
                                             
                                                    return dv;
                      }          
          ,longFlow   : i => { const dv = document.createElement('div'),I=i % 7;
                        [1,2,3,4,5,6].reduce((t,e)=>{ const dt=document.createElement('span');
                                                    dt.setAttribute('class',(e<=I)?'b2':'bl');   
                                                    t.appendChild(dt);         
                                                    return t;},dv);
                                                    return dv;
                      }
      ,heightFlow   : i => { const dv = document.createElement('div');
                      i.toString().split('').reduce((t,e)=>{ const dt=document.createElement('span');
                                                  dt.setAttribute('class',`h${e}`);   
                                                  t.appendChild(dt);         
                                                  return t;},dv);
                                                  return dv;
                  }
      ,heightFlow2   : i => { const dv = document.createElement('span');/* 2024-07-15 Überarbeitung mit sparkline */
                              dv.setAttribute('class','sparkline'); 
                              //i
                              //'1.0,0.9,0.2,0.6,1.0,0.7,0.7,0.6,0.3,0.4,0.5,0.8.4' //12 Monatswerte
                              i.split(',').reduce((t,e)=>{ const dt=document.createElement('span');
                                                dt.setAttribute('class',`sparkbox`); 
                                                dt.setAttribute('style',`padding-bottom:${e}rem`);   
                                                dt.setAttribute('title',`${e} Wert`);   
                                                t.appendChild(dt);         
                                                return t;},dv);
                                                return dv;
                }             
       ,heightFlow3   : i => { const dv = document.createElement('span');/* 2024-07-15 Überarbeitung mit sparkline */
                              dv.setAttribute('class','sparkline'); 
                              //i
                              //'1.0,0.9,0.2,0.6,1.0,0.7,0.7,0.6,0.3,0.4,0.5,0.8.4' //12 Monatswerte
                              i.split(',').reduce((t,e,i)=>{ const dp=document.createElement('span')
                                                          ,dpp=document.createElement('span')
                                                          ,db=document.createElement('span');
                                                           db.setAttribute('class',`pbox`);   
                                                           dp.setAttribute('class',`prd`);   
                                                           dp.setAttribute('style',`padding-top:${1.1-e}rem`);   
                                                           dp.setAttribute('title',`P${i} \n${1.1-e} P-Wert`);   
                                                          dpp.setAttribute('class',`pprd`);   
                                                          dpp.setAttribute('style',`padding-top:${1.0-e}rem`);   
                                                          dpp.setAttribute('title',`VP${i} \n${1-e} VP-Wert`);   
                                                          db.appendChild(dp );
                                                          db.appendChild(dpp);
                                                           t.appendChild(db );                                                
                                                          return t;},dv);
                                                          return dv;
                }             
     ,setIcon :( i='vw-search',g='s-icon',t='no title') =>{ const xmlns="http://www.w3.org/2000/svg"
                                     ,     sv = document.createElementNS(xmlns,'svg')
                                     ,     tl = document.createElementNS(xmlns,'title')
                                     ,     us = document.createElementNS(xmlns,'use');
                                     sv.setAttributeNS(null,'class',g);
                                     us.setAttributeNS("http://www.w3.org/1999/xlink", "href",`#${i}`);
                                     tl.appendChild(document.createTextNode(t));
                                     sv.appendChild(us);sv.appendChild(tl);
                                     return sv;
                                }
     ,i2m : (v,c,i,a,m='vw-user-comment',k,o)=>{ const sv = _.Y.setIcon(m,'s-icon',`Datensatz ${i} im Modal Fenster anzeigen`); //aktuell NIchct sehr elegant, funzt aber
                                     sv.addEventListener('click',()=>{ _.M.i2m({k:k,o:o});
                                                                       //console.log(`Y.i2m v${v} a ${a} c${c} klick modal`)
                                                                     });
                                     return sv;         
                                   }   
      ,r2d : (v,c,i,a,m='vw-visualcheck',k,o)=>{ const sv = _.Y.setIcon(m,'s-icon','Detail Datensatz anlegen'); // i2c icon to create RowProject Details - wer legt die STructurefeste?
                                              sv.addEventListener('click',()=>{ _.M.i2c({k:`PID|SID|D|WAS|WER|Link`,o:`${o.split('|')[2]}||2024-MM-JJ|was|wer|doc_link_url`});//ROW to detail aus id
                                                                                //console.log(`Y.i2m v${v} a ${a} c${c} klick modal`)
                                                                              });
                                              return sv;         
                                          }   
        ,i2d : (v,c,i,a,m='vw-visualcheck',k,o)=>{ const sv = _.Y.setIcon('vw-chat','s-icon','Info Detail Datensatz anlegen'); // i2c icon to create RowProject Details - wer legt die STructurefeste?
          sv.addEventListener('click',async ()=>{ //console.log('DETAILS anzeigen ',v, c,);
                                             const s=performance.now()
                                             ,d = await _.C.scanDB(_.C.TABLEC,{"KeyConditionExpression":"PID = :pid","ExpressionAttributeValues":{":pid":{"S":v}}})
                                             ; 
                                             //console.log('DETAILS anzeigen ',d);
                                             _.M.d2m(d,v,parseInt(performance.now()-s)) ;                                           //_.M.i2c({k:`PID|SID|D|WAS|WER|Link`,o:`${o.split('|')[2]}||2024-MM-JJ|was|wer|doc_link_url`});//ROW to detail aus id
                                            //console.log(`Y.i2m v${v} a ${a} c${c} klick modal`)
                                          });
          return sv;         
      }   
  ,i2c : (v,c,i,a,m='vw-visualcheck',k,o)=>{ const sv = _.Y.setIcon(m,'s-icon','mit SID= leer wird ein neuer Datensatz angelegt, sonst die Felder geupdated'); // i2c icon to create Row row to detail k PID|SID|D|WAS PID wird idd
                                              sv.addEventListener('click',()=>{ _.M.i2c({k:k,o:o, a:a});// a Tablename
                                                                                //console.log(`Y.i2c v ${v} a ${a} c ${c} k ${k} o ${o} klick modal`)
                                                                              });
                                              return sv;         
                                          }   
   ,del : (v,c,i,a,m='vw-delete',k,o)=>{ const sv = _.Y.setIcon(m,'s-icon','Datensatz löschen'); // i2c icon to create Row
                                            sv.addEventListener('click',()=>{ _.C.del({k:k,o:o},a);//a Tabellenname mitgeben
                                                                              //console.log(`Y.i2m v${v} a ${a} c${c} klick modal`)
                                                                            });
                                            return sv;         
                                        }   
    ,upd : (v,c,i,a,m='vw-user',k,o)=>{ //console.log('UPD',v,c,i,a,m);
                                      const sv = _.Y.setIcon(m); // i2c icon to create Row
                                      sv.addEventListener('click',()=>{ _.C.upd({k:k,o:o,v:v,t:a,c:c});//c column v value a table in cfg+t
                                                                        //console.log(`Y.i2m v${v} a ${a} c${c} klick modal`)
                                                                      });
                                      return sv;         
                                      }  
    ,up : (v,c,i,a,m='vw-user',k,o,d=1)=>{ //console.log('UPD',v,c,i,a,m);
                                        const sv = _.Y.setIcon(m); // i2c icon to create Row
                                        sv.addEventListener('click',()=>{ _.C.upd({k:k,o:o,v:(parseInt(v)+d).toString(),t:a,c:c});//c column v value a table in cfg+t
                                                                          //console.log(`Y.i2m v${v} a ${a} c${c} klick modal`)
                                                                        });
                                        return sv;         
                                        }  
        ,iud:(v,c,i,a,m='vw-user',k,o)=>{//drei icons in einer spalte}
                                      const sv = document.createElement('span')
                                      ;
                                      sv.appendChild( _.Y.i2m(v,c,i,a,'vw-user-comment',k,o) );
                                      sv.appendChild( _.Y.i2c(v,c,i,a,'vw-visualcheck' ,k,o) );
                                      sv.appendChild( _.Y.del(v,c,i,a,'vw-delete'      ,k,o) );
                                      sv.appendChild( _.Y.r2d(v,c,i,a,'vw-plus'        ,k,o) );//detail

                                      return sv;
                                     }        
        ,ufc:(v,c,i,a )=>{//uf filter mit icon für Detail drei icons in einer spalte}
                                      const sv = document.createElement('span')
                                      ;
                                      sv.appendChild( _.Y.i2d(v,c,i,a) );
                                      sv.appendChild( _.Y.uf(v,c,i,a) );
                                      return sv;
                                     }        
     ,vpm:(v,c,i,a,m='vw-user',k,o)=>{//drei icons in einer spalte
                                        const sv = document.createElement('span')
                                        ;
                                        sv.appendChild( _.Y.up(v,c,i,a,'vw-arrow-back',k,o,-1) );
                                        //sv.appendChild( document.createTextNode(` [ `) );
                                        sv.appendChild(_.Y.uf(v, c, i, a));
                                        //sv.appendChild( document.createTextNode(` ] `) );
                                        sv.appendChild( _.Y.up(v,c,i,a,'vw-arrow-forward'      ,k,o,1) );

                                        return hsv;
      } ,srT:(tname)=>{const sv = _.Y.setIcon('hw-reload'); 
        sv.addEventListener('click',()=>{ _.C.scnTblRfr(tname);
          //console.log(`Y.i2m v${v} a ${a} c${c} klick modal`)
        });
return sv;  

      }                                   
   ,gF : (v)=>{ const sv = _.Y.setIcon('vw-filter'); //aktuell NIchct sehr elegant, funzt aber
      sv.addEventListener('click',()=>{ _.T.setGF('GT',v);
                                        //console.log(`Y.i2m v${v} a ${a} c${c} klick modal`)
                                      });
      return sv;         
    }                                           
     , uf : (v,c,i,a )=>{ const e = document.createElement ('span');
                                   e.setAttribute('class','u-filter');
                          e.addEventListener('click',()=>{ //console.log(`v${v} a${a} c${c} klick modal`);
                                                           _.T.sF(a,{f:'eF',k:c,v:v},'L'+c);
                                                         });
                          e.appendChild(document.createTextNode(` ${v} `))
                          return e;         

     } 
     , ne : v =>{ const e = document.createElement ('span');
                  e.setAttribute('title',`Zahl\n${v}`);
                  e.appendChild(document.createTextNode(v?_.U.n2ne(v,3):''))
                  return e;         
                }
     , dGf : (v,c,i,a,k,o,m )=>{ const e = document.createElement ('span') //doubleFilter //Durch-Reichen des MInMax
                               ,   vmm = parseInt(10*(v-m?.min||0)/(m?.max||1-m?.min||0))
                               ;//console.log(m,vmm);
                                   e.setAttribute('class',`u-filter bszn${vmm||1}`);
                                   e.setAttribute('title',`SUM\n${v||0}`);
                          e.addEventListener('click',()=>{ console.log(`_.Y.dGF v ${v} a ${a} i ${i} m ${m} c ${c} k ${k} o ${o} klick modal`); 
                                                          //v 4 a zbmkreuz i NOID m null c Y2003 k PYY,PMM|Y2025|Y2024|Y2002|NN|Y2008|Y2015|Y2019|Y2014|Y2021|Y2023|Y2003|Y2016|Y2020|Y2022|Y2018|Y2013|Y2017|Y2011|Y2006|Y2012|Y2007|Y2009|Y2005|Y2010|Y2004 o M08|0|87|3|0|5|16|36|17|15|42|4|63|24|44|48|16|22|7|0|19|1|1|0|1|3 klick modal
                                                           /*
                                                            _.T.s2F(a
                                                                  , {f:'eF',k:k.split('|')[1],v:c}
                                                                  ,'L'+k.split('|')[1]
                                                                  , {f:'eF',k:k.split('|')[0],v:o.split('|')[0]}
                                                                  ,'L'+k.split('|')[0]
                                                           
                                                           );*/
                                                            const 
                                                              GDIM1  = k.split('|')[0].split(',')[0]
                                                            , GDIM2  = k.split('|')[0].split(',')[1]
                                                            , VALUE1 = c
                                                            , VALUE2 = o.split('|')[0]
                                                            ; 
                                                            _.T.setGF(GDIM1,VALUE1);
                                                            _.T.setGF(GDIM2,VALUE2);
                                                         });
//                          e.appendChild(document.createTextNode(v||''))
//                          e.appendChild(document.createTextNode(v?Number(v/Math.pow(10,Math.floor(Math.log10(v)))).toFixed(1)+'E'+Math.floor(Math.log10(v)) :'')) // ##2023-08-30 Grosse Zahlen im GrpSum besser darstellen
                          e.appendChild(document.createTextNode(v?_.U.n2ne(v):'')) // ##2023-08-30 Grosse Zahlen im GrpSum besser darstellen
                          return e;         

     } 
     , df : (v,c,i,a,k,o,m )=>{ const e = document.createElement ('span') //doubleFilter durch GlobalFilter 2026-07-11 //Durch-Reichen des MInMax
                               ,   vmm = parseInt(10*(v-m?.min||0)/(m?.max||1-m?.min||0))
                               ;//console.log(m,vmm);
                                   e.setAttribute('class',`u-filter bszn${vmm||1}`);
                                   e.setAttribute('title',`SUM\n${v||0}`);
                          e.addEventListener('click',()=>{ console.log(`v ${v} a ${a} i ${i} m ${m} c ${c} k ${k} o ${o} klick modal`); 
                                                           //v 31 a slei c GIA kprodukt|schicht|GIA|GTB|EBA|GIB|GTA|EBB k337 600 010 TG||31|56|15|45|43|13 klick modal
                                                           //v 27 a zbmkreuz c Y2023 kprodukt|schicht|GIA|GTB|EBA|GIB|GTA|EBB k337 600 010 TG||31|56|15|45|43|13 klick modal
// v 1 a zbmkreuz i NOID m null c Y2003 k RKEY|Y2025|Y2024|Y2002|NN|Y2008|Y2015|Y2019|Y2014|Y2021|Y2023|Y2003|Y2016|Y2020|Y2022|Y2018|Y2013|Y2017|Y2011|Y2006|Y2012|Y2007|Y2009|Y2005|Y2010|Y2004 o M06|0|72|0|0|0|35|18|23|19|46|1|38|15|25|32|14|44|4|3|9|2|1|2|1|0 klick modal 
                                                           _.T.s2F(a
                                                                  , {f:'eF',k:k.split('|')[1],v:c}
                                                                  ,'L'+k.split('|')[1]
                                                                  , {f:'eF',k:k.split('|')[0],v:o.split('|')[0]}
                                                                  ,'L'+k.split('|')[0]
                                                           
                                                           );
                                                         });
//                          e.appendChild(document.createTextNode(v||''))
//                          e.appendChild(document.createTextNode(v?Number(v/Math.pow(10,Math.floor(Math.log10(v)))).toFixed(1)+'E'+Math.floor(Math.log10(v)) :'')) // ##2023-08-30 Grosse Zahlen im GrpSum besser darstellen
                          e.appendChild(document.createTextNode(v?_.U.n2ne(v):'')) // ##2023-08-30 Grosse Zahlen im GrpSum besser darstellen
                          return e;         

     } 
     ,lxf : (v,c,i,a,x=8)  => { const m= document.createElement ('span')
                        , r       = document.createElement ('span') //left x chars to filter 2700-207-000010-0005 bspw. AF auswählen aus TPL
                        , l       = document.createElement ('span')
                        , vl      = v.slice(0,x)
                        , vr      = v.slice(x)
                        ;
                        l.setAttribute('class','u-filter');
                        l.addEventListener('click',()=>{ _.T.sF(a,{f:'swF',k:c,v:vl},'L'+c);});
                        l.appendChild(document.createTextNode(vl));
                       
                        r.appendChild(document.createTextNode(vr));
                        m.appendChild(l);
                        m.appendChild(r);

                        return m;
     }                                             
     ,rxf : (v,c,i,a,x=8)  => { const m= document.createElement ('span')
                        , r       = document.createElement ('span') //left x chars to filter 2700-207-000010-0005 bspw. AF auswählen aus TPL
                        , l       = document.createElement ('span')
                        , vl      = v.slice(0,-x)
                        , vr      = v.slice(-x)
                        ;
                        r.setAttribute('class','u-filter');
                        r.addEventListener('click',()=>{ _.T.sF(a,{f:'ewF',k:c,v:vr},'L'+c);});
                        r.appendChild(document.createTextNode(vr));
                        
                        l.appendChild(document.createTextNode(vl));
                        m.appendChild(l);
                        m.appendChild(r);

                        return m;
}                                             

     ,svgBarCode : i => { const  _vbc = ( valuetobarcode ) => {
                                      const _valuecode = valuetobarcode || '11223344',
                                      _char_to_code	= '0123456789ABCDEFGH*-',
                                      _code39 = [
                                      'bwbWBwBwb',	//0
                                      'BwbWbwbwB',	//1
                                      'bwBWbwbwB',	//2
                                      'BwBWbwbwb',	//3
                                      'bwbWBwbwB',	//4
                                      'BwbWBwbwb',	//5
                                      'bwBWBwbwb',	//6
                                      'bwbWbwBwB',	//7
                                      'BwbWbwBwb',	//8
                                      'bwBWbwBwb',	//9
                                      'BwbwbWbwB',	//A
                                      'bwBwbWbwB',	//B
                                      'BwBwbWbwb',	//C
                                      'bwbwBWbwB',	//D
                                      'BwbwBWbwb',	//E
                                      'bwBwBWbwb',	//F
                                      'bwbwbWBwB',	//G
                                      'BwbwbWBwb',	//H
                                      'bWbwBwBwb',	//*
                                      'bWbwbwBwB'		//-
                                      ];//console.log( input +' FilterCODE   ' + _valuecode);
                                      return _valuecode.split('').map(  e => _code39[ _char_to_code.indexOf(e) ] + 't' ).join('');
                                    };
                const sp = document.createElement('span')
                ,    bce = c => { const bs = document.createElement('span');bs.setAttribute('class',c);return bs;}
                ;_vbc( '*' + i + '*' ).split('').reduce((t,e)=>{t.appendChild(bce('bcode-'+e));return sp;},sp);
                return sp;
              }
    }
                
          , L : { version : () =>`ìnfo T 0.1 layout` //_.T.next('mat')
                , "D"     : v  => document.createTextNode(`${new Date(parseInt(v)).toISOString().slice(0,16)}`) //Datum im Format "2024-07-15T12:45"
                , "BC"    : v  => _.Y.svgBarCode(v) //das geht nicht mit TextBnOde stw ### 2023 --LÖsung erfolgt 2023-07-10  _.DATA.cfg_mat.mat.views.show[0].style="BC" 
                , "WF"    : v  => _.Y.workFlow(v) //das geht nicht mit TextBnOde stw ### 2023 --LÖsung erfolgt 2023-07-10  _.DATA.cfg_mat.mat.views.show[0].style="BC" 
                , "HF"    : v  => _.Y.heightFlow(v) //das geht nicht mit TextBnOde stw ### 2023 --LÖsung erfolgt 2023-07-10  _.DATA.cfg_mat.mat.views.show[0].style="BC" 
                , "HF2"   : v  => _.Y.heightFlow2(v) //das geht nicht mit TextBnOde stw ### 2023 --LÖsung erfolgt 2023-07-10  _.DATA.cfg_mat.mat.views.show[0].style="BC" 
                , "HF3"   : v  => _.Y.heightFlow3(v) //prd vs pprd das geht nicht mit TextBnOde stw ### 2023 --LÖsung erfolgt 2023-07-10  _.DATA.cfg_mat.mat.views.show[0].style="BC" 
                , "BF"    : v  => _.Y.bitFlow(v) //das geht nicht mit TextBnOde stw ### 2023 --LÖsung erfolgt 2023-07-10  _.DATA.cfg_mat.mat.views.show[0].style="BC" 
                , "LF"    : v  => _.Y.longFlow(v) //das geht nicht mit TextBnOde stw ### 2023 --LÖsung erfolgt 2023-07-10  _.DATA.cfg_mat.mat.views.show[0].style="BC" 
                , "IC"    : v  => _.Y.setIcon('vw-search') //das geht nicht mit TextBnOde stw ### 2023 --LÖsung erfolgt 2023-07-10  _.DATA.cfg_mat.mat.views.show[0].style="BC" 
                , "IC1"   : v  => _.Y.setIcon('vw-user-comment') //das geht nicht mit TextBnOde stw ### 2023 --LÖsung erfolgt 2023-07-10  _.DATA.cfg_mat.mat.views.show[0].style="BC" 
                , "m"     : v  => _.Y.barmeterspan(v) //das geht nicht mit TextBnOde stw ### 2023 --LÖsung erfolgt 2023-07-10  _.DATA.cfg_mat.mat.views.show[0].style="BC" 
                , "xb"    : v  => document.createTextNode(`xb ${v}`)
                , "yb"    : v  => document.createTextNode(`yb ${v}`)
                , "ab"    : v  => document.createTextNode(`zb ${v}`)
                , "bb"    : v  => document.createTextNode(`bb ${v}`)
                , "cb"    : v  => document.createTextNode(`cb ${v}`)
                , "nn"    : v  => document.createTextNode(`${v||''}`)
                //, "df"    : v  => => _.Y.uf (v,c,i,a  ) //document.createTextNode(`${v||'df'}`)
                , "m5"    : v  => document.createTextNode(`${v%5}`)
                , "DRL"   : (v,c,i)  => document.createTextNode(`${_.DATA.L_TPMAUFG?.[i]?.[c]||i}`) // buld dynamic Lookup over i=rEfID dynamic LookUp c=column over REF
                , "i2m"   : (v,c,i,a ,k,o) => _.Y.i2m(v,c,i,a,'vw-user-comment',k,o)//document.createTextNode(`${v}.${c}.${i}`)//aus Zeileninhalt wir ModalFenster des Dtaensatzes al readOnly 
                , "i2c"   : (v,c,i,a ,k,o) => _.Y.i2c(v,c,i,a,'vw-visualcheck',k,o)//document.createTextNode(`${v}.${c}.${i}`)//aus Zeileninhalt wir ModalFenster des Dtaensatzes al readOnly 
                , "uf"    : (v,c,i,a     ) => _.Y.uf (v,c,i,a  ) //spaltenFilter al la clickvwie
                , "ufc"   : (v,c,i,a     ) => _.Y.ufc (v,c,i,a  ) //spaltenFilter mit DetailAnzeige
                , "df"    : (v,c,i,a,k,o,m ) => _.Y.df (v,c,i,a,k,o,m  ) //doppelfilter für groupdusm
                , "dGf"   : (v,c,i,a,k,o,m ) => _.Y.dGf(v,c,i,a,k,o,m  ) //doppelfilter als Globale Filter ausführen, Idee 2026-07-05
                , "gF"    : (v,c,i,a,k,o,m ) => _.Y.gF (v,c,i,a,k,o,m  ) //globalFilter _.T.setGF('GT',value)
               
                , "dl"    : (v,c,i,a)  => document.createTextNode(`${_.DATA[ _.DATA['cfg_'+a]['cfg']['dlookup' ]    ]?.[v]||v}`) //document.createTextNode(`${_.DATA.L_TA?.[v]||v}|c:${c}|a:${a}`) //dynamischer Lookup hier TP --TBBEZ
                , "dj0"   : (v,c,i,a)  => document.createTextNode(`${_.DATA[ _.DATA['cfg_'+a]['cfg']['djlookup'][0] ]?.[v]?.[ _.DATA['cfg_'+a]['cfg']['djlookup'][1] ]||v}`) // siehe cfg_xx.cfg.djlookup document.createTextNode(`${_.DATA.L_TA?.[v]||v}|c:${c}|a:${a}`) //dynamischer Lookup hier TP --TBBEZ
                , "dj1"   : (v,c,i,a)  => document.createTextNode(`${_.DATA[ _.DATA['cfg_'+a]['cfg']['djlookup'][0] ]?.[v]?.[ _.DATA['cfg_'+a]['cfg']['djlookup'][2] ]||v}`) // document.createTextNode(`${_.DATA.L_TA?.[v]||v}|c:${c}|a:${a}`) //dynamischer Lookup hier TP --TBBEZ
                
                , "djl0"  : (v,c,i,a)  => document.createTextNode(`${_.DATA[ _.DATA['cfg_'+a]['cfg']['djlookup'][0] ]?.[v][_.DATA['cfg_'+a]['cfg']['djlookup'][1][0]]||'NV'}`) //2023-11-16document.createTextNode(`${_.DATA.L_TA?.[v]||v}|c:${c}|a:${a}`) //dynamischer Lookup hier TP --TBBEZ
                , "djl1"  : (v,c,i,a)  => document.createTextNode(`${_.DATA[ _.DATA['cfg_'+a]['cfg']['djlookup'][0] ]?.[v][_.DATA['cfg_'+a]['cfg']['djlookup'][1][1]]||'NV'}`) //2023-11-16document.createTextNode(`${_.DATA.L_TA?.[v]||v}|c:${c}|a:${a}`) //dynamischer Lookup hier TP --TBBEZ
                , "djl2"  : (v,c,i,a)  => document.createTextNode(`${_.DATA[ _.DATA['cfg_'+a]['cfg']['djlookup'][0] ]?.[v][_.DATA['cfg_'+a]['cfg']['djlookup'][1][2]]||'NV'}`) //2023-11-16document.createTextNode(`${_.DATA.L_TA?.[v]||v}|c:${c}|a:${a}`) //dynamischer Lookup hier TP --TBBEZ
                , "djl3"  : (v,c,i,a)  => document.createTextNode(`${_.DATA[ _.DATA['cfg_'+a]['cfg']['djlookup'][0] ]?.[v][_.DATA['cfg_'+a]['cfg']['djlookup'][1][3]]||'NV'}`) //2023-11-16document.createTextNode(`${_.DATA.L_TA?.[v]||v}|c:${c}|a:${a}`) //dynamischer Lookup hier TP --TBBEZ
                , "djl4"  : (v,c,i,a)  => document.createTextNode(`${_.DATA[ _.DATA['cfg_'+a]['cfg']['djlookup'][0] ]?.[v][_.DATA['cfg_'+a]['cfg']['djlookup'][1][4]]||'NV'}`) //2023-11-16document.createTextNode(`${_.DATA.L_TA?.[v]||v}|c:${c}|a:${a}`) //dynamischer Lookup hier TP --TBBEZ
                , "djl5"  : (v,c,i,a)  => document.createTextNode(`${_.DATA[ _.DATA['cfg_'+a]['cfg']['djlookup'][0] ]?.[v][_.DATA['cfg_'+a]['cfg']['djlookup'][1][5]]||'NV'}`) //2023-11-16document.createTextNode(`${_.DATA.L_TA?.[v]||v}|c:${c}|a:${a}`) //dynamischer Lookup hier TP --TBBEZ
                , "ne"    : v => _.Y.ne (v) //number to number e --für sehr grosse zahlen bzw. viele nachkommastellen
                , "sf"    : (v,c,i,a     ) => document.createTextNode(`${v}`) //spaltenFilter al la clickvwie
                , "l8f"   : (v,c,i,a     ) => _.Y.lxf(v,c,i,a,8) //spaltenFilter al la clickvwie
                , "l5f"   : (v,c,i,a     ) => _.Y.lxf(v,c,i,a,5) //spaltenFilter al la clickvwie
                , "r3f"   : (v,c,i,a     ) => _.Y.rxf(v,c,i,a,3) //spaltenFilter al la clickvwie
                , "r5"    : v => document.createTextNode(`${v.split(-5)}`)
                , "X"    : (v,c,i,a ,k,o) => _.Y.del(v,c,i,a,'hw-delete',k,o)//(v,i,t,n,I,A,ut)=>`<a href="javascript:_.U.del('${A._id}','${ut}','${A.TP||'XTP'}')" title="Datensatz löschen"><svg class=s-icon><use xlink:href="#vw-delete" /></svg></a>`
                , "U"    : (v,c,i,a ,k,o) => _.Y.upd(v,c,i,a,'hw-pencil',k,o)//(v,i,t,n,I,A,ut)=>`<a href="javascript:_.U.del('${A._id}','${ut}','${A.TP||'XTP'}')" title="Datensatz löschen"><svg class=s-icon><use xlink:href="#vw-delete" /></svg></a>`
                , "up1"  : (v,c,i,a ,k,o) => _.Y.up(v,c,i,a,'hw-arrow-forward',k,o,1)//(v,i,t,n,I,A,ut)=>`<a href="javascript:_.U.del('${A._id}','${ut}','${A.TP||'XTP'}')" title="Datensatz löschen"><svg class=s-icon><use xlink:href="#vw-delete" /></svg></a>`
                , "um1"  : (v,c,i,a ,k,o) => _.Y.up(v,c,i,a,'hw-arrow-back',k,o,-1)//(v,i,t,n,I,A,ut)=>`<a href="javascript:_.U.del('${A._id}','${ut}','${A.TP||'XTP'}')" title="Datensatz löschen"><svg class=s-icon><use xlink:href="#vw-delete" /></svg></a>`
/*Info Update Delete*/,"iud" : (v,c,i,a,k,o)=> _.Y.iud(v,c,i,a,'hw-delete',k,o)
,"vpm" : (v,c,i,a,k,o)=> _.Y.vpm(v,c,i,a,'hw-delete',k,o)//Value plus 1 minus 1 für workflows in
                //   , "modal" : (v,c,i,a )=>document.createTextNode(`${v}.${c}.${i}.${a}`)//aus Zeileninhalt wir ModalFenster des Dtaensatzes al readOnly 
                //_.M.i2m({t:'${t}',o:'${_.X.OV(A).join('|')}',k:'${_.X.OK(A).join('|')}'})
 
// /* 2024-07-02*/, "t2f"   : (v,i,t,n,I,A)=>`<a href="javascript:_.D.t2f({t:'${t}',n:'${n}',_id:'${A._id}',o:'${_.X.OV(A).join('|')}',k:'${_.X.OK(A).join('|')}',v:'${v}'});" title="New Row in the same table using Form"><svg class=s-icon><use xlink:href="#vw-form" /></svg></a>`

              }      
          , T : { version : () =>`ìnfo T 0.3 table 2024-07-12 [getPage getTbl refresh] private ACHTUNG sort für edgebrowser -JETZT PASST ES `
                , dos     : (i,j=false) => (b,a) => (j)?parseFloat(a[i]||0)-parseFloat(b[i]||0):a[i].localeCompare(b[i])//a[i]>b[i] // DOW-SORTER 2018-04-24 Z->A
                , uos     : (i,j=false) => (a,b) => (j)?parseFloat(a[i]||0)-parseFloat(b[i]||0):a[i].localeCompare(b[i])//a[i]>b[i] //  UP-SORTER A->Z

             , getRowJ  : (a,j,c={},m) => { const tr = document.createElement('tr');
                                       _.X.OK(c).reduce((t,e)=>{ const td = document.createElement('td')
                                                                 , tt     = _.L[c[e]?.style||'nn'](j[c[e].col] // v value
                                                                                                  ,c[e]?.col   // wie heisst die COL, die ersetzt ggf. werden soll 
                                                                                                  ,j['refid']||'NOID' //für das Lookup dynamisch ??is noch blöd ??ß  
                                                                                                  , a
                                                                                                  ,_.X.OK(j).join('|') // keys als string
                                                                                                  ,_.X.OV(j).join('|') // values as string
                                                                                                  ,m
                                                                                                  //,spaäter Lookup übergeben
                                                                                                  );//normal ein TextNode oder eine KOmbination
                                                                 td.dataset.col = c[e]?.col;
                                                                 td.dataset.id  = j['_id']||'NOID'; //auch nin anderen Spalten wird die ID im Dataset mitgegeben
                                                                 td.setAttribute('style',`text-align:${c[e]?.align||'center'}`);
                                                                 td.setAttribute('class',c[e]?.media||'');
                                                                 td.appendChild(tt);
                                                                 t.appendChild(td);
                                                                 return t;
                                                                },tr);
                                      return tr;
                                    }
            , getCC : (a,j,c,e,t='c')=>{//console.log('get CC for ColumnChange',a,j,c,e);
                                    const elem = document.createElement('span');
                                    elem.addEventListener('click',()=>{_.M.cC('Spalte','Breite bzw Funktion ändern',a,'show',e);}); 
                                    elem.appendChild( document.createTextNode(t));
                                   return elem;
          }                        
           , getXHeader:(a,j,c={})=> { const tr = document.createElement('tr');
                                        _.X.OK(c).reduce( (t,e) => { const th = document.createElement('th');
                                                                     th.setAttribute('class','x');
                                                                    //console.log(`XHeader for table ${a} column ${c[e]?.col} style:${c[e]?.style} describe:${Boolean(_.GX[a]['describe'])} stats:${Boolean(_.GX[a]['stats'])}`);
                                                                    /* WARUM geht das elegante nicht????
                                                                    switch (true){
                                                                      case (c[e]?.style==='uf'&&_.GX[a]['describe']) :console.log('ufdescr'); th.appendChild( _.D.describe(a,c[e]?.col)   ); break;
                                                                      case (c[e]?.style==='sf'&&_.GX[a]['stats'   ]) :console.log('sfstats'); th.appendChild( _.D.stats   (a,c[e]?.col)   ); break;
                                                                      default                                        :console.log('default'); th.appendChild( document.createTextNode('') );
                                                                    }
                                                                    */
                                                                    ///*
                                                                          if (c[e]?.style==='uf'&&_.GX[a]['describe']) th.appendChild(_.D.describe(a,c[e]?.col));
                                                                    else  if (c[e]?.style==='sf'&&_.GX[a]['stats'   ]) th.appendChild(_.D.stats   (a,c[e]?.col)); 
                                                                    else                                               th.appendChild(document.createTextNode(''));
                                                                    //else                                               th.appendChild(_.T.getCC(a,j,c,e));
                                                                    //*/ 
                                                                    t.appendChild(th);
                                                                   return t;
                                                                   }, tr );
                                        return tr;
                                      }    
     , getHeader:(a,j,c={})=> { const tr = document.createElement('tr');
                                        _.X.OK(c).reduce( (t,e) => { const th = document.createElement('th')
                                        , su = document.createElement('span')
                                        , sd = document.createElement('span')
                                                                   , tt     = document.createTextNode(c[e]?.head.slice(0,10)||'NV')

                                                                   ;
                                                                   th.setAttribute('class','c '+c[e]?.media||'');
                                                                   th.setAttribute('title',c[e]?.colbez||'N');
                                                                   if (c[e]?.sort){
                                                                    su.setAttribute('class','sorter');
                                                                    sd.setAttribute('class','sorter');
                                                                    su.appendChild(_.Y.setIcon('hw-sort-up'));
                                                                    sd.appendChild(_.Y.setIcon('hw-sort-down'));
                                                                    su.addEventListener('click',()=>{_.T.sC(a,c[e]?.col,'uos',c[e]?.nsort||false);/*console.log(`uso ${c[e]?.col} ${c[e]?.nsort||false}`)*/});
                                                                    sd.addEventListener('click',()=>{_.T.sC(a,c[e]?.col,'dos',c[e]?.nsort||false);/*console.log(`dso ${c[e]?.col} ${c[e]?.nsort||false}`)*/});
                                                                    th.appendChild(su);
                                                                    //th.appendChild(tt); //mit CHangeColumn ersetzten
                                                                    th.appendChild(_.T.getCC(a,j,c,e,c[e]?.head.slice(0,10)||'NV'));//getCC ColumnChange Funktionalität
                                                                    th.appendChild(sd);
                                                                    } else th.appendChild(tt);
                                                                   t.appendChild(th);
                                                                   return t;
                                                                   }, tr );
                                        return tr;
                                      }    
             , getFilterLinks: (a)=> { const fl = document.createElement('span');  //clickable Filter
                                        fl.setAttribute('class','small');
                                        _.X.OE(_.DATA['cfg_'+a]['cfg']['jfilter'])
                                        .reduce((t,e)=>{ const k =document.createElement('span');
                                                         k.setAttribute('class','u-filter');
                                                         k.addEventListener('click',()=>{_.T.dF(a,e[0],'jfilter');/*console.log(`deleteFilter ${a} ${e[0]}`)*/}) 
                                                         k.appendChild(document.createTextNode( ((typeof e[1].v ==='string')?e[1].v.slice(-4):e[1].v.g.slice(-4)) + ' '  //2023-09-04 der betweenFilter!!! v.g !!!! was beim OderFilter???
                                                          ///*e[0].slice(0,4) + ':' + */e[1].v.slice(-4) 
                                                          ));
                                                         t.appendChild(k);
                                                         return t;
                                                       },fl);
                                        _.X.OE(_.DATA['cfg_'+a]['cfg']['sfilter'])
                                        .reduce((t,e)=>{ const k =document.createElement('span');
                                                        k.setAttribute('class','u-filter');
                                                      k.addEventListener('click',()=>{_.T.dF(a,e[0],'sfilter');/*console.log(`deleteFilter ${a} ${e[0]}` )*/ }) 
                                                        k.appendChild(document.createTextNode(/*e[0].slice(0,4) + ':' +*/ e[1].slice(0,5) + ' '));
                                                        t.appendChild(k);
                                                        return t;
                                                      },fl);               
                                        return fl;
                                      }  
              , getPager : (a) =>{ /**
                                   * Pager firstPage previousPage progressbar nextPage lastPage [page/maxPage length]
                                   * @param {string} a String zugriff auf CFG
                                   * @return {element} span element span    
                                   */ 
                                  const pg = document.createElement('span')
                                  , fp    =  _.Y.setIcon("hw-vertical"     ) 
                                  , lp    =  _.Y.setIcon("hw-vertical"     ) 
                                  , np    =  _.Y.setIcon("hw-chevronright" ) 
                                  , pp    =  _.Y.setIcon("hw-chevronleft"  ) 
                                  , pr    = document.createElement('progress')
                                  , fs    = document.createElement('span') 
                                  ; 
                                  // --- progress SLIDER -----------------
                                  pr.setAttribute('max'    ,_.DATA['cfg_'+a]['cfg']['maxPage']);
                                  pr.setAttribute('value'  ,_.DATA['cfg_'+a]['cfg']['page']);
                                  
                                  // Pager Listener      
                                  fp.addEventListener('click',()=>{ _.T.gP(a, 0                                 ,false);_.DATA['cfg_'+a]['cfg']['startstop']=false; });
                                  np.addEventListener('click',()=>{ _.T.gP(a, 1                                 ,true );_.DATA['cfg_'+a]['cfg']['startstop']=false; });
                                  pp.addEventListener('click',()=>{ _.T.gP(a,-1                                 ,true );_.DATA['cfg_'+a]['cfg']['startstop']=false; });
                                  lp.addEventListener('click',()=>{ _.T.gP(a, _.DATA['cfg_'+a]['cfg']['maxPage'],false);_.DATA['cfg_'+a]['cfg']['startstop']=false; });
                                  
                                  //---progress listener
                                  pr.addEventListener('click',()=>{     _.DATA['cfg_'+a]['cfg']['startstop']=!_.DATA['cfg_'+a]['cfg']['startstop'];
                                                                    if (_.DATA['cfg_'+a]['cfg']['startstop']) _.T.ss(a); 
                                                                  //  console.log(`TAB ${a} startstop ${_.DATA['cfg_'+a][a]['cfg']['startstop']} ${_.DATA['cfg_'+a][a]['cfg']['page']} ${_.DATA['cfg_'+a][a]['cfg']['maxPage']}`);
                                                                  });
                                  // [page/maxPage lenght]
                                  fs.setAttribute('class','small');
                                  fs.appendChild(document.createTextNode(` [ ${_.DATA['cfg_'+a]['cfg']['page']}/${_.DATA['cfg_'+a]['cfg']['maxPage']} - ${ _.DATA['fs_'+a].length} ]`));
                                      
                                  pg.appendChild(fp);   // firstPage
                                  pg.appendChild(pp);   // previousPage
                                  pg.appendChild(pr);   // progressbar
                                  pg.appendChild(np);   // nextPage   
                                  pg.appendChild(lp);   // lastPage   
                                  pg.appendChild(fs);   // [page/maxPage lenght]
                                        
                                   return pg;     
                                  }                                                                  
              , getTbl   : (a,p,s,m=null) => { const d = document.createElement ('div'  )// unterhalb von p mm übergeben von minmax
                                        , dp     = document.createElement   ('div'  )// rowflex für Aufnahme der div left und div right
                                        , dl     = document.createElement   ('div'  )// div left pager sorte filter
                                        , dr     = document.createElement   ('div'  )// div right searcher
                                        , t      = document.createElement   ('table')
                                        , h      = document.createElement   ('thead')
                                        , b      = document.createElement   ('tbody')
                                      
                                        , sr    = document.createElement('span') 
                                        , cb    = document.createElement('span')  //clipboard span 
                                        , is    = document.createElement('input') //SearchElement

                                        , pg    = _.T.getPager      (a) 
                                        , fl    = _.T.getFilterLinks(a) 
                                       
                                       ;
                                        dp.setAttribute('class','rowflex');
                                        sr.setAttribute('class','small');
                                        
                                        // --- Search INPUT
                                        is.setAttribute('type','text');
                                        is.setAttribute('placeholder','Search');
                                        is.addEventListener('change',e=>{ //console.log(`SEARCH ${a} ${_.DATA['cfg_'+a]['cfg']['searchfields'].join('|')} ${e.target.value}`);
                                                                          _.T.setsfilter(a,e.target.value,'S'+e.target.value.slice(0,3));
                                                                         });
                                        // Table aufbauen                                 
                                        t.setAttribute('class','table-bordered');
                                        h.appendChild(_.T.getXHeader(a,p[0],s) ); //BalkenHeader Describe and so on
                                        h.appendChild(_.T.getHeader (a,p[0],s) );
                                        p.reduce((x,e)=>{ x.appendChild( _.T.getRowJ(a,e,s,m) );return x;},b);//Damit wird tableBody aus Daten p erzeugt
                                        t.appendChild(h);
                                        t.appendChild(b);

                                        // Sort State
                                        sr.appendChild(document.createTextNode(' ' + _.DATA['cfg_'+a]['cfg']['sort'].slice(0,2).join('|') + ' '));
                                       
                                        cb.addEventListener('click',async e=>{await _.D.gC(a);});
                                        cb.appendChild(_.Y.setIcon("hw-download","icon iconhover"));
                                        dr.appendChild(cb);

                                        dr.appendChild(_.Y.setIcon("hw-search","icon"));
                                        dr.appendChild(is);
                                        
                                        dl.appendChild(pg); // |< -- >| [page/maxPage length]
                                        dl.appendChild(sr); //sort
                                        dl.appendChild(fl); //Filter Links
                                        
                                        dp.appendChild(dl); //linke infoseite
                                        dp.appendChild(dr); //rechte infoseite

                                        d.appendChild(dp); //info Zeile
                                        d.appendChild(t);  //table
                                        return d;
                                      }
              ,rf : t  => {  document.querySelector('#'+t).removeChild(document.querySelector('#'+t).childNodes[0]); //rf refresh Table
                                             const cfg = _.DATA['cfg_'+t]['cfg'];
                                            //console.log('REFRESH',t,_.DATA?.['fs_'+t]||[]);
                                            if ( _.DATA['fs_'+t].length ){
                                            document.querySelector('#'+t)
                                            .appendChild( _.T.getTbl( t,_.DATA['fs_'+t]
                                                                     .sort  ( _.T[_.DATA['cfg_'+t]['cfg']['sort'][0]](_.DATA['cfg_'+t]['cfg']['sort'][1],_.DATA['cfg_'+t]['cfg']['sort'][2]))
                                                                     .slice ( cfg.page*cfg.pageSize,(cfg.page+1)*(cfg.pageSize))
                                                                     .map   ( _.X.as(_.DATA['cfg_'+t]['cfg']['structure']))
                                                              , _.DATA['cfg_'+t]['views'][ _.DATA['cfg_'+t]['cfg']['view'] ]));}
                                            else { document.querySelector('#'+t).appendChild(document.createTextNode('no data - try to reset filter'))}                  
                                          }   
              ,gP: (t,i=1,ic=true)=> { // PAGING relative (ic=true,page+=i) absolute (ic=false,page=i)
                                            const cfg = _.DATA['cfg_'+t]['cfg'];
                                            cfg.page=(ic)?cfg.page+i:i;//absoluteRelative
                                            _.DATA['cfg_'+t]['cfg'].page=cfg.page;     
                                            _.T.rf(t);
                                          } 
              , getmaxPage : t => {_.DATA['cfg_'+t]['cfg']['startstop']=false;
                                   _.DATA['cfg_'+t]['cfg']['maxPage'  ]=parseInt(_.DATA['fs_'+t].length/_.DATA['cfg_'+t]['cfg']['pageSize']); 
                                   _.T.gP(t,0,false);//page Zurücksetten
                                  }                          
              , setGF:     (k,v)=>{_.GV[k]=v;
                                   _.GT.forEach(e=>{const f =  _.DATA['cfg_'+e]['cfg']['GF']?.[k]; if(f){ f.v=v;_.DATA['cfg_'+e]['cfg']['jfilter'][k]=f;_.T.aF(e)} } )
                                  }                    
              , delGF:     (e)=>{ if (e) delete _.GV[e]; else _.GV={}; //2023-09-04 es werden alle Filter gelöscht, aber eigentlich sollte nur er Filter gelöschtwerden,
                                 _.GT.forEach(x=>{ if (e) delete _.DATA['cfg_'+x]['cfg']['jfilter'][e]; else _.DATA['cfg_'+x]['cfg']['jfilter']={};
                                                   _.DATA['cfg_'+x]['cfg']['sfilter']={};
                                                   _.T.aF(x)
                                                 }  )
                                   }  
             , sV: (t,v='show') =>   _.DATA['cfg_'+t]['cfg']['view']=v             //setView..??structure???             
             , s2F: (t,f1,fn1='f1',f2,fn2='f2') => { _.DATA['cfg_'+t]['cfg']['jfilter'][fn1]=f1;//f1 filter setzten sF setFilter
                                                     _.DATA['cfg_'+t]['cfg']['jfilter'][fn2]=f2;//f2 /
                                              _.T.aF(t) //doppelfilter für grupsum auswahel x-Y
                                            }  
                      
             , sF: (t,f,fn='f1') => { _.DATA['cfg_'+t]['cfg']['jfilter'][fn]=f;//f1 filter setzten sF setFilter
                                              _.T.aF(t)
                                            }  
               , setsfilter:(t,v,fn) => { _.DATA['cfg_'+t]['cfg']['sfilter'][fn]=v;
                                          //console.log(`setsfilter ${t} ${v} ${fn}`)
                                          _.T.aF(t);
                                        }                    
              , dF:(t,fn,ft='jfilter')=>{ delete( _.DATA['cfg_'+t]['cfg'][ft][fn]); //dF deleteFiler
                                                    _.T.aF(t);
                                                  }                     
              /*, resetfilter:(t)=>{ _.DATA['fs_'+t] = _.DATA[t]; 
                                   _.DATA['cfg_'+t]['cfg']['jfilter']={};
                                   _.DATA['cfg_'+t]['cfg']['sfilter']={};
                                   _.T.getmaxPage(t);
                                 }     */ 
              , aF: t=> {_.DATA['fs_' +t] = _.X.OV( _.DATA['cfg_'+t]['cfg']['sfilter']).reduce((x,e)=>{return _.X['search'](x,{f:[],v:e,s:_.DATA['cfg_'+t]['cfg']['structure'],c:_.DATA['cfg_'+t]['cfg']['searchfields']});
                                    },_.X.OV(_.DATA['cfg_'+t]['cfg']['jfilter']).reduce(_.X.fc,_.DATA[t]));
                                    //---Analytics-Part -here (steffen's Hintergrund Analytics-----)
                                    if(_.DATA['cfg_'+t]['cfg']['summary'])_.GX[t]['describe']=_.X['describe'](_.DATA['fs_' +t],{s:_.DATA['cfg_'+t]['cfg']['summary']});                                
                                    if(_.DATA['cfg_'+t]['cfg']['stats'  ])_.GX[t]['stats'   ]=_.X['bxPlt'   ](_.DATA['fs_' +t],{s:_.DATA['cfg_'+t]['cfg']['stats'  ]});    //2023-07-28                            
                                    if(_.DATA['cfg_'+t]['cfg']['grpsum' ])_.GX[t]['grpsum'  ]=_.X['grpsum'  ](_.DATA['fs_' +t],   _.DATA['cfg_'+t]['cfg']['grpsum' ] );    //2023-08-01      
                                    if(_.DATA['cfg_'+t]['cfg']['bxplt'  ])_.GX[t]['bxplt'   ]=_.X['cbxPlt'  ](_.DATA['fs_' +t],   _.DATA['cfg_'+t]['cfg']['bxplt'  ] );    //2023-08-28                            
                                    _.T.getmaxPage(t);
                                   }                  
              , sC:(t,c='_id',du='dos',n=false) => { _.DATA['cfg_'+t]['cfg']['sort']=[du,c,n];    //sc SortCol
                                                     _.DATA['cfg_'+t]['cfg']['startstop']=false;
                                                     _.T.gP(t,0,false);//getPage --page Zurücksetzen
                                                   } 
              , ss:(e)=>{ if(_.DATA['cfg_'+e]['cfg']['startstop'] && _.DATA['cfg_'+e].cfg.page < _.DATA['cfg_'+e].cfg.maxPage||0){_.T.gP(e);setTimeout(()=>_.T.ss(e),300)} }                                                                                                                                           
            }       // _.DATA.L_TPMDONE['0pp68shdj2700-206-000105'] auf Daten uas LookuP zugreuufen
          , D : { version : () =>`info D 0.2 data`
                , gC : async (e,c='\t')=> { document.querySelector(':root').style.setProperty('--baseHue', '310'); 
                                            await navigator.clipboard.writeText(_.DATA['fs_'+e].reduce((T,E)=>T+_.X.OV(E).reduce((t,e)=>t+e+c,'')+'\n',''));
                                            document.querySelector(':root').style.setProperty('--baseHue', '210'); 
                                          }
                , gD : async (e,p='') =>  { // gD getDate //hier wird NUR aus dem webverzeichnis gelesen /web/slei.deflate
                                     const 
                                           //t = e.split('.')[0] //was hat das t ui tun???
                                           d = await fetch(p+e)
                                        ,  j = await d.json() 
                                        ; return j;
                                        }
                ,describe:(a='slei',c='schicht')=>{//console.log(`describe `);//document.querySelector('#info').appendChild(_.D.describe('slei','produkt'))
                       const A = _.X.OE(_.GX[a]['describe'][c]).map(_.X.KV).sort((a,b)=>b.v-a.v).slice(0,5) //Top 5 colValues
                       ,MAX =Math.max.apply(null,A.map(e=>e.v))//100
                       ,dv = document.createElement('div')
                       ;
                       //console.log(`describe ${MAX} ${A.map(e=>e.k+' '+e.v).join(',')}`);
                       dv.setAttribute('class','describe');
                       A.reduce((t,e)=>{const s=document.createElement('span');
                                        s.addEventListener('click',()=>_.T.sF(a,{f:'eF',k:c,v:e.k},c));
                                        s.setAttribute('title',e.k+' '+e.v);
                                        s.setAttribute('class',`w${parseInt(9*e.v/MAX)}`);
                                        t.appendChild(s);return t;},dv);
                       return dv;
              }  
                //  ,describe: e =>{ //console.log('DESCRIBE',e);
                //return `<svg width=60 height=30 viewBox="0 0 70 40" xmlns:xlink="http://www.w3.org/1999/xlink">
                //${Object.entries(a[e.n]['describe'][e.col]).map(E=>{return {k:E[0].toString()||'NV',v:parseInt(E[1]||0)}}).sort((a,b)=>b.v-a.v).slice(0,5).reduce((T,E,I,A)=>T+`<a href="javascript:T.xff({t:'${e.t}',n:'${e.n}',k:'${e.col}',v:'${E.k}'})" ><rect class=describe-${I} x=0 y=${I*8} height=6 width=${8+E.v/A[0].v*60}><title>k: ${E.k} | v: ${E.v}</title></rect></a>`,'')}
              // </svg>`
//              ,stats : e =>{const J=X['boxplot'](d['fs_'+e.t].map(E=>{E['I'+e.col]=(typeof E[e.col] ==='string')?(parseFloat(E[e.col].replace(/,/,"."))||0):E[e.col];return E;}),{structure:['I'+e.col]})['I'+e.col];return `<span class=info>&Sigma; ${J.s.toFixed(1)}<br/>[${J.min},${J.max}]</span>`;}//X['boxplot'](d.fs_mabestat,{"structure":["ME"]})
                    
                ,stats:(a='slei',c)=>{ const dv = document.createElement('div');
                                     dv.setAttribute('class','stats');
                                     ['l','min','mean','max','s','v'].reduce((t,e)=>{const s=document.createElement('div');s.setAttribute('class','small')
                                        s.appendChild(document.createTextNode(e + ': ' + _.GX[a]['stats'][c][e].toFixed(0)));
                                        t.appendChild(s);return t;},dv);
                                    return dv;
                                  }                        

                ,buzz:()=>``          
            //    , getftable : (t,k,v) => { return `<div id=${'md'+t}><header table><span>${new RegExp(/dynamo/).test(p[t].tableDir)?`<a href="javascript:D.getfdata('`+t+`',true,'`+k+`','`+v+`')"><svg class=s-icon><use xlink:href="#vw-filter" /></svg></a>`:''} ${p[t].header}</span><span class=small>${p[t].subheader||'n.v.'}</span></header><p id=${t}></p></div>`} //<span
                , sT  :   (e,c={}) => {//sT setTable
                                      const ed = document.createElement ('div') //grundgerüst Header p p wird dann dynamisch erzeugt
                                          , ep = document.createElement ('p')
                                          , eh = document.createElement ('header')
                                          , et = document.createElement ('span')
                                          , es = document.createElement ('span')
                                          , dr = document.createElement ('div')//###
                                          , dp = document.createElement ('div')//###
                                          , t1 = document.createTextNode('tbl platzhalter')
                                          , t2 = document.createTextNode('')//###
                                          , t3 = document.createTextNode('')//###
                                          , ee = document.createElement('span') //###
                                          , tt = document.createTextNode(c?.header||'Title')
                                          , ti = document.createElement('span')
                                          , ts = document.createTextNode(' - internal - ' + c?.subheader||'subTitle')
                                        ; 
                                        dr.setAttribute('class','rowflex')//###
                                        eh.setAttribute('table',``);
                                        es.setAttribute('class',`small`);
                                        ed.setAttribute('style',`display:none`);
                                        ed.setAttribute('id',`md${e}`);
                                        ep.setAttribute('id',`${e}`)
                                        ti.appendChild(_.Y.srT(c?.tableName||'projekte'));
                                        ee.appendChild(t2); //###
                                        et.appendChild(ti); //ICon für scan 2024-07-09
                                        et.appendChild(tt);
                                        es.appendChild(ts);
                                        
                                        dr.appendChild(et);
                                        dr.appendChild(ee);
                                        dr.appendChild(t3) 
                                        
                                        eh.appendChild(dr);  //tt ts zu header
                                        eh.appendChild(es);
                                        dp.appendChild(t1);
                                        ep.appendChild(dp);

                                        ed.appendChild(eh);
                                        ed.appendChild(ep);
                                        document.querySelector('main').appendChild(ed);
                                      }
            //,, c2l : c =>{ aside.innerHTML=X['combine'](d.machine,{"filter":[{"f":"rF","k":"_id","v":"2700-"+c+"\\d{2}$"}],"structure":["_id","A"]}).sort((a,b)=>a._id>b._id).reduce((T,E)=>T+`<div class=info><a href="javascript:D.l2a('${E._id.slice(5,9)}');T.xgt('${E._id}',0);">${E.A.slice(0,15)}</a></div>`,'')                          
     ,d2a : ()  =>{ const as= document.querySelector('#aside') // remove KST AF Arbeitsfolgen darstellen
                    , ed = document.createElement ('div');
                    as.removeChild(as.children[0]);   
                    ed.appendChild(document.createTextNode('...'));    
                    as.appendChild(ed);    
                  }
     ,k2a : (m,k) =>{ const as= document.querySelector('#aside') // KST AF Arbeitsfolgen darstellen somit können auc AF'a su VUS oder anderen tabellen verarbeitet werden
                , ed = document.createElement ('div')
                , gf = structuredClone(_.DATA['cfg_'+m]['cfg']['k2a']) ||{} // vorhandene GrundFilter für combine
                , id = _.DATA['cfg_'+m]['cfg']['k2aid'  ]
                , dt = _.DATA['cfg_'+m]['cfg']['k2adata']
                , dk = _.DATA['cfg_'+m]['cfg']['k2akst' ]
                ; 
                gf.f.unshift({f:"rF","k":dk,v:k});//Filter um varaiablen Tei ergänzen WARUM HIER REFERENz und nicht dy--lösung structureClone()
                const   L = _.X['combine'](_.DATA[m],gf).sort(_.T['uos'](id));
                as.removeChild(as.children[0]);    
                L//{f:[{f:"rF","k":"K",v:k},{f:"rF","k":"_id",v:"2700-\\d{3}-?\\d{0,6}$"}],s:["_id","A"]}).sort(_.T['uos']('_id'))//.slice(0,5)
                .reduce((t,e)=>{ const d=document.createElement('div'),s=document.createElement('span');
                                 s.setAttribute('class','GA oneofntp widthx');     
                                 s.setAttribute('data',`GA-${e[dt]}`);
                                 s.addEventListener('click',()=>{ _.U.on('GA',e[dt],'oneofntp');
                                                                  _.T.setGF('GA',e[id]); // .slice(5)2700-206-000010 206-000010
                                                                });
                                 s.appendChild(document.createTextNode( e[dt].slice(0,20) ));
                                 d.appendChild(s)
                                 t.appendChild(d);    
                                 return t;                                 
                               },ed);
                as.appendChild(ed);     
                if(L[0]||false){_.U.on('GA',L[0][dt],'oneofntp');//erstes Element anzeigen
                _.T.setGF('GA',L[0][id]);//erstes Element filtern  WARUM das SLICE????
                              }
              }
      ,grpsum : m =>{ const gs = document.querySelector('#grpsum') //coole idee : dynamische Tabelle und dynamische cfg struktur
                      , K      = _.GX[m].grpsum.map(e=>{e.k.split('_').reduce((T,E,I)=>{T['D'+I]=E;return T},e);e.v=parseFloat(Number(e.v).toFixed(1));return e;})  //Dimensionen separieren für X-Y PLot
                      , D1     = [... new Set(K.map(e=>e.D1))] //hier AF's
                      , D2     = [... new Set(K.map(e=>e.D2))] //hier VA's
                      , MM     = _.X.MM(_.GX[m].grpsum.map(e=>e.v)) // MInMax der Werte--> .bszn0 BissantzNumbers wie das durchschleifen??
                      , d0     = _.DATA['cfg_'+m].cfg.grpsum.s[0] //wird 0.Position in der Tabelle
                      , d1     = _.DATA['cfg_'+m].cfg.grpsum.s[1] //wird 1.Position in der Tabelle
                     // , cfg    = [d0,d1].concat(D2).map((e,i)=>{const d={};d.col=e,d.head=e;d.style='df';return d;})//testen mit nn dan df doppelfilter
                      , cfg    = [d0,d1].concat(D2).reduce((t,e,i)=>{const d={};d.col=e,d.head=e;d.style='df';t['p'+i]=d;return t;},{})//testen mit nn dan df doppelfilter
                      , tab    = D1.map(e=>K.filter(x=>x.D1===e).reduce((T,E)=>{T[E.D2]=E.v;return T;},{[d0]:e,[d1]:''})) // triggi {[key]:}
                      ;
                      cfg['p0'].style='nn';//MultiFilter gsmf groupsum multifilter --- diese nicht df , doppelFilter XY
                      cfg['p1'].style='nn';//MultiFilter gsmf groupsum multifilter --- diese nicht df
                      gs.removeChild(gs.children[0]);    
                      gs.appendChild( _.T.getTbl( m,tab,cfg,MM));
                     }  
      ,bxplt : m=>{ const gs = document.querySelector('#bxplt') 
                    , K      = _.GX[m].bxplt.map(e=>{e.k.split('_').reduce((T,E,I)=>{T['D'+I]=E;return T},e);e.vv=parseFloat(Number(e.v.v).toFixed(1));return e;})  //Dimensionen separieren für X-Y PLot
                    , D1     = [... new Set(K.map(e=>e.D1))] //hier AF's
                    , D2     = [... new Set(K.map(e=>e.D2))] //hier VA's
                    , MM     = _.X.MM(_.GX[m].bxplt.map(e=>e.vv)) // MInMax der Werte--> .bszn0 BissantzNumbers wie das durchschleifen??
                    , d0     = _.DATA['cfg_'+m].cfg.bxplt.s[0] //wird 0.Position in der Tabelle
                    , d1     = _.DATA['cfg_'+m].cfg.bxplt.s[1] //wird 1.Position in der Tabelle
                   // , cfg    = [d0,d1].concat(D2).map((e,i)=>{const d={};d.col=e,d.head=e;d.style='df';return d;})//testen mit nn dan df doppelfilter
                    , cfg    = [d0,d1].concat(D2).reduce((t,e,i)=>{const d={};d.col=e,d.head=e;d.style='df';t['p'+i]=d;return t;},{})//testen mit nn dan df doppelfilter
                    , tab    = D1.map(e=>K.filter(x=>x.D1===e).reduce((T,E)=>{T[E.D2]=E.vv;return T;},{[d0]:e,[d1]:''})) // triggi {[key]:}
             
                    ;
                    cfg['p0'].style='nn';//MultiFilter gsmf groupsum multifilter --- diese nicht df , doppelFilter XY
                    cfg['p1'].style='nn';//MultiFilter gsmf groupsum multifilter --- diese nicht df
                    gs.removeChild(gs.children[0]);    
                    gs.appendChild( _.T.getTbl( m,tab,cfg,MM));

      }                     
  }  
  , C:{ version : ()=> `version 0.2 C Anbindung Cloud 2024-07-06..`,'info':'die KEYS APIID, REGION definieren die aws eventbridge, PUT UPD DEL sind stepfunction TABLEI dynamodb'
      , APIID   : 'XX' 
      , REGION  : 'XX' 
      , PUT     : 'XX'
      , UPD     : 'XX'
      , DEL     : 'XX'
      , TABLEI  : 'XX'
      , TABLEC  : 'XX'
      , CLOUD   : false
      , m2eda   : async (d,detail=_.C.TABLEC,source=_.C.PUT) => { // jetzt haben wir in detail mglw. den tableNamen der in der stepfunction auf die richtige table geroutet wird
                  if ( _["C"]["CLOUD"] ){
                  const res =await fetch (`https://${_.C.APIID}.execute-api.${_.C.REGION}.amazonaws.com/${source}/${detail}`
                                         , { method : 'POST'
                                           , body   : JSON.stringify(d) //hier muesste die dynamoDB Struktur generert werden
                                           }
                                          );
                                 return await res.json()           ; //für del und aupdate gibt es eine EvendBridge ID, für scanDB wird eine Tabelle zurückgegeben
                  } else{ _["DATA"][detail].push(_["U"]["Dj2j"](d));//der push hat leider die dynDBStruktur, die ist also zu früh gesetzt, dann eben so AWS DB to JSON Table
                          _["T"]["aF"](detail);
                          return {"Entries":[{"EventId":"NO_CLOUD"}]}
                        };                 
                  }
       , del    : async (d,t)=>{ //console.log('_.C.X ',d)   ;
                            const OO =    _.U.kv2j(d.k.split('|'),d.o.split('|'))
                            , {PID,SID} = _.U.j2Dj(OO)
                            , m = {"batch":[{"Key":{PID:PID,SID:SID},"TableName":_.DATA['cfg_'+t]['cfg']['dbTableName']}]}
                            ;
                            //console.log('_.C.X ',t,d,m)   ;//keine INfo über Tabelehname
                            await _.C.m2eda(m,_["C"]["DEL"   ]||'task4','CERA-DEL');
                            // AKTUALISIEREN
                            _.DATA[t]=_.DATA[t].filter(e=>!(e.PID===OO.PID && e.SID===OO.SID));//Daten aktualisieren 
                            _.DATA['fs_'+t]=_.DATA[t];
                            _.U.on('STRUS');
                            _.T.delGF();
                            /*
                            fetch('https://APIID.execute-api.REGION.amazonaws.com/task4/deleteSW-CERA'
                    ,{method:'POST',body:"{\"batch\":[{\"Key\":{\"PID\":{\"S\":\"ySA\"},\"SID\":{\"S\":\"yS112\"}},\"TableName\":\"SW-CERA-I9-cera-ingest-Table\"}]}"})
                    .then(console.log).catch(console.log)
                            */
                   }     
       , upd    : async d =>{//2025-09-24
                          const OO =    _.U.kv2j(d.k.split('|'), d.o.split('|'))
                          , {PID,SID} = _.U.j2Dj(OO)
                          //, m = {"batch":[{"Key":{PID:PID,SID:SID},"update":`Set ${d.c}=:val`,"valueString":{":val":{"S":`${d.v}`}},"TableName":_.C.TABLEC}]}
                          , m = {"batch":[{"Key":{PID:PID,SID:SID},"Expression":`Set #key=:val`,"Keys":{"#key":`${d.c}`},"Values":{":val":{"S":`${d.v}`}},"TableName":_.C.TABLEC}]}
                          ;
                          await _.C.m2eda(m, _["C"]["UPD"   ]||'task5', 'CERA-UPD');
                          //console.log('UPD',d,_.DATA[d.t].length,_.DATA[d.t].filter(e=>e.PID===PID && e.SID===SID).length);
                          _.DATA[d.t].filter(e=>e.PID===OO.PID && e.SID===OO.SID)[0][d.c]=d.v;//Daten aktualisieren 
                          _.T.rf(d.t); 
        /*fetch('https://APIID.execute-api.REGION.amazonaws.com//task5/updateSW-CERA'
          ,{method:'POST',body:"{\"batch\":[{\"Key\":{\"PID\":{\"S\":\"xSA\"},\"SID\":{\"S\":\"xS112\"}},\"valueString\":{\":val\":{\"S\":\"4\"}},\"update\":\"Set val=:val\",\"TableName\":\"SW-CERA-I9-cera-ingest-Table\"}]}"})
          .then(console.log).catch(console.log)
          */
     }
      , scanDB: async (table,d) =>{ /*const res =await fetch (`https://${_.C.APIID}.execute-api.${_.C.REGION}.amazonaws.com/dynamo/${table}`
                                                         , { method : 'POST' , body   : JSON.stringify(d)          }
                                                          )
                                     , dj = await res.json();  
                                     */
                                    const res = await _.C.m2eda(d,'dynamo',table); 
                                    return res.map(_.U.Dj2j);           
                                  }
       ,scnTblRfr: async (tname)=>{ //{"KeyConditionExpression":"PID = :pid","ExpressionAttributeValues":{":pid":{"S":"Projekte"}}}
                                      const data = await _.C.scanDB(_.DATA['cfg_'+tname]['cfg']['dbTableName'],{"KeyConditionExpression":`${_.DATA['cfg_'+tname]['cfg']['ReadKeys'][0]} = :pid`,"ExpressionAttributeValues":{":pid":{"S":_.DATA['cfg_'+tname]['cfg']['ReadExpressions'][0]}}});
                                           _.DATA[tname]=data;
                                           _.U.on('STRUS');
                                           _.T.delGF();
                                          }
        }}
;
export { _ }
//_.X['combine'](_.DATA.machine,{f:[{f:"eF","k":"K",v:k},{f:"swF","k":"_id",v:"2700-206"}],s:["_id","A"]}).sort(_.T['uos']('_id')) 
//_.X['combine'](_.DATA.machine,{f:[{f:"eF","k":"K",v:k},{f:"rF","k":"_id",v:"2700-\\d{3}-?\\d{0,6}$"}],s:["_id","A"]}).sort(_.T['dos']('_id')) 
