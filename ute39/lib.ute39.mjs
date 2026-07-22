// ONLY_USED Lib – OUL v0.9
// 122.1 KB → 57/207 Funktionen

const _ = {
  DATA     : {}
  , fbtnsave : ()=>``
  , GV       : {}
  , GX       : {}
  , GT       : []
  , X : {
          version : () =>`info X 1.01 analytics and document`
          , RE : RegExp
          , CL : console.log
          , CI : console.info
          , OK : Object.keys
          , OA : Object.assign
          , OE : Object.entries
          , OV : Object.values
          , OF : Object.fromEntries
          , DN : Date.now
          , JP : JSON.parse
          , JS : JSON.stringify
          , MO : a=>a.reduce((c,a)=>{return c[a]={},c},{})
          , MF : Math.floor
          , MP : Math.pow
          , ML : Math.log10
          , fc : (c,a)=>c.filter(_.X.FX[a.f](a.k)(a.v))
          , as : c=>a=>c.reduce((b,d)=>{return b[d]=a[d],b},{})
          , FX : {
            eF: d=>a=>b=>b[d].toString()===a.toString(),
            rF: d=>a=>b=>new _.X.RE(a,'i').test(b[d]),
            icF: d=>a=>b=>b[d].includes(a),
            swF: d=>a=>b=>b[d].startsWith(a),
            ewF: d=>a=>b=>b[d].endsWith(a),
            oF: d=>a=>b=>a.reduce((f,e)=>f||e===b[d],false),
            NrF: d=>a=>b=>!new _.X.RE(a,'i').test(b[d]),
            tF: c=>()=>a=>a[c],
            NtF: c=>()=>a=>!a[c],
            gF: d=>a=>b=>b[d]>=a,
            lF: d=>a=>b=>b[d]<=a,
            bF: d=>a=>b=>b[d]>=a.k&&b[d]<=a.g,
            NbF: d=>a=>b=>b[d]<=a.k&&b[d]>=a.g,
            iF: d=>b=>c=>new _.X.RE(b.join('|')).test(c[d])
          }
          , aly : (f,g=1,b=1)=>(c,d)=>{return _.X.OK(f).forEach(e=>{c[e][d[e]]=(c[e][d[e]]||0)+(d[g]??1)*(d[b]??1)}),c}
          , mfs : x=>d=>a=>x.reduce((b,c)=>b||new _.X.RE(d.replace(/([*()\]])/g,'\$1'),'i').test(a[c].replace(/[()<>;]/g,'').replace(/([./-])/g,'\$1')),!1)
          , mfms : c=>(d,a)=>d.filter(_.X.mfs(c)(a))
          , describe : (d,e) =>d.reduce(_.X.aly(_.X.MO(e.s)),_.X.MO(e.s))
          , search : (d,e) =>e.v.split(' ').reduce(_.X.mfms(e.c),e.f.reduce(_.X.fc,d).map(_.X.as(e.s)))
          }
  , U : {
          version : ()=>`info U 0.2 utility`
          , on : (t,v=false,c='oneofn') => { document.querySelectorAll (`span[class~="${t}"]`    ).forEach      (e=>e.setAttribute('class', t + ` ${c}`));              // alles aus
                                                              if (v) document.querySelector    (`span[data="${t}-${v}"]` ).setAttribute (                  'class', t + ` ${c} ${c}active`);  // eventuell EINS an
                                                            }
          , tt : e => { if (document.querySelector('#md'+e).style.display==='block') {document.querySelector('#md'+e).style.display='none';} else {document.querySelector('#md'+e).style.display='block'}}
          }
  , I : {
          version : () =>`info X 0.1 Icons`
          , gI : (n,i) =>{ //Fassung mit cretaeElement
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
          , aI : (i,e) => _.X.OK(i).reduce((T,E)=>{T.appendChild(_.I.gI(E,i));return T;},e)
          }
  , M : {
          version : ()=>`info M 0.2 modal (ohne innerHTML) 2023-07-26 überarbeitet`
          , gh : (t,s) =>{ //get Header von Modal
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
          , cC : (title,subtitle,cfg,view,pos)=>_.M.sM(title
                                                   ,subtitle
                                                   ,['col','head','style','media'].reduce((T,e)=>{const E=_.DATA['cfg_'+cfg]['views'][view][pos];T.push({l:e,n:e,v:E?.[e]||' '});return T;},[])
                                                   ,'gf1','bt1',cfg,view,pos)
          , sM : async(t,s,l,gf='gf',bt='bt',c='sapshift',v='show',p='pl') =>{ //setModal OHNE innerHTML (t title s subtitle l form [{l:, n: ,v: ,t:},..]) label name vale type (date email password etc..)
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
          
                                     }
          }
  , Y : {
          version : ()=> `version 0.1 Y Barcode and so on..`
          , setIcon : ( i='vw-search',g='s-icon',t='no title') =>{ const xmlns="http://www.w3.org/2000/svg"
                                               ,     sv = document.createElementNS(xmlns,'svg')
                                               ,     tl = document.createElementNS(xmlns,'title')
                                               ,     us = document.createElementNS(xmlns,'use');
                                               sv.setAttributeNS(null,'class',g);
                                               us.setAttributeNS("http://www.w3.org/1999/xlink", "href",`#${i}`);
                                               tl.appendChild(document.createTextNode(t));
                                               sv.appendChild(us);sv.appendChild(tl);
                                               return sv;
                                          }
          , srT : (tname)=>{const sv = _.Y.setIcon('vw-reload'); 
                  sv.addEventListener('click',()=>{ _.C.scnTblRfr(tname);
                    //console.log(`Y.i2m v${v} a ${a} c${c} klick modal`)
                  });
          return sv;  
          
                }
          }
  , L : {
          version : () =>`ìnfo T 0.1 layout`
          , nn : v  => document.createTextNode(`${v||''}`)
          }
  , T : {
          version : () =>`ìnfo T 0.3 table 2024-07-12 [getPage getTbl refresh] private ACHTUNG sort für edgebrowser -JETZT PASST ES `
          , dos : (i,j=false) => (b,a) => (j)?parseFloat(a[i]||0)-parseFloat(b[i]||0):a[i].localeCompare(b[i])
          , getRowJ : (a,j,c={},m) => { const tr = document.createElement('tr');
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
          , getXHeader : (a,j,c={})=> { const tr = document.createElement('tr');
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
          , getHeader : (a,j,c={})=> { const tr = document.createElement('tr');
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
                                                                              su.appendChild(_.Y.setIcon('vw-sort-up'));
                                                                              sd.appendChild(_.Y.setIcon('vw-sort-down'));
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
          , getFilterLinks : (a)=> { const fl = document.createElement('span');  //clickable Filter
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
                                            , fp    =  _.Y.setIcon("vw-vertical"     ) 
                                            , lp    =  _.Y.setIcon("vw-vertical"     ) 
                                            , np    =  _.Y.setIcon("vw-chevronright" ) 
                                            , pp    =  _.Y.setIcon("vw-chevronleft"  ) 
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
          , getTbl : (a,p,s,m=null) => { const d = document.createElement ('div'  )// unterhalb von p mm übergeben von minmax
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
                                                  cb.appendChild(_.Y.setIcon("vw-download","icon iconhover"));
                                                  dr.appendChild(cb);
          
                                                  dr.appendChild(_.Y.setIcon("vw-search","icon"));
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
          , rf : t  => {  document.querySelector('#'+t).removeChild(document.querySelector('#'+t).childNodes[0]); //rf refresh Table
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
          , gP : (t,i=1,ic=true)=> { // PAGING relative (ic=true,page+=i) absolute (ic=false,page=i)
                                                      const cfg = _.DATA['cfg_'+t]['cfg'];
                                                      cfg.page=(ic)?cfg.page+i:i;//absoluteRelative
                                                      _.DATA['cfg_'+t]['cfg'].page=cfg.page;     
                                                      _.T.rf(t);
                                                    }
          , getmaxPage : t => {_.DATA['cfg_'+t]['cfg']['startstop']=false;
                                             _.DATA['cfg_'+t]['cfg']['maxPage'  ]=parseInt(_.DATA['fs_'+t].length/_.DATA['cfg_'+t]['cfg']['pageSize']); 
                                             _.T.gP(t,0,false);//page Zurücksetten
                                            }
          , delGF : (e)=>{ if (e) delete _.GV[e]; else _.GV={}; //2023-09-04 es werden alle Filter gelöscht, aber eigentlich sollte nur er Filter gelöschtwerden,
                                           _.GT.forEach(x=>{ if (e) delete _.DATA['cfg_'+x]['cfg']['jfilter'][e]; else _.DATA['cfg_'+x]['cfg']['jfilter']={};
                                                             _.DATA['cfg_'+x]['cfg']['sfilter']={};
                                                             _.T.aF(x)
                                                           }  )
                                             }
          , sF : (t,f,fn='f1') => { _.DATA['cfg_'+t]['cfg']['jfilter'][fn]=f;//f1 filter setzten sF setFilter
                                                        _.T.aF(t)
                                                      }
          , setsfilter : (t,v,fn) => { _.DATA['cfg_'+t]['cfg']['sfilter'][fn]=v;
                                                    //console.log(`setsfilter ${t} ${v} ${fn}`)
                                                    _.T.aF(t);
                                                  }
          , dF : (t,fn,ft='jfilter')=>{ delete( _.DATA['cfg_'+t]['cfg'][ft][fn]); //dF deleteFiler
                                                              _.T.aF(t);
                                                            }
          , aF : t=> {_.DATA['fs_' +t] = _.X.OV( _.DATA['cfg_'+t]['cfg']['sfilter']).reduce((x,e)=>{return _.X['search'](x,{f:[],v:e,s:_.DATA['cfg_'+t]['cfg']['structure'],c:_.DATA['cfg_'+t]['cfg']['searchfields']});
                                              },_.X.OV(_.DATA['cfg_'+t]['cfg']['jfilter']).reduce(_.X.fc,_.DATA[t]));
                                              //---Analytics-Part -here (steffen's Hintergrund Analytics-----)
                                              if(_.DATA['cfg_'+t]['cfg']['summary'])_.GX[t]['describe']=_.X['describe'](_.DATA['fs_' +t],{s:_.DATA['cfg_'+t]['cfg']['summary']});                                
                                              if(_.DATA['cfg_'+t]['cfg']['stats'  ])_.GX[t]['stats'   ]=_.X['bxPlt'   ](_.DATA['fs_' +t],{s:_.DATA['cfg_'+t]['cfg']['stats'  ]});    //2023-07-28                            
                                              if(_.DATA['cfg_'+t]['cfg']['grpsum' ])_.GX[t]['grpsum'  ]=_.X['grpsum'  ](_.DATA['fs_' +t],   _.DATA['cfg_'+t]['cfg']['grpsum' ] );    //2023-08-01      
                                              if(_.DATA['cfg_'+t]['cfg']['bxplt'  ])_.GX[t]['bxplt'   ]=_.X['cbxPlt'  ](_.DATA['fs_' +t],   _.DATA['cfg_'+t]['cfg']['bxplt'  ] );    //2023-08-28                            
                                              _.T.getmaxPage(t);
                                             }
          , sC : (t,c='_id',du='dos',n=false) => { _.DATA['cfg_'+t]['cfg']['sort']=[du,c,n];    //sc SortCol
                                                               _.DATA['cfg_'+t]['cfg']['startstop']=false;
                                                               _.T.gP(t,0,false);//getPage --page Zurücksetzen
                                                             }
          , ss : (e)=>{ if(_.DATA['cfg_'+e]['cfg']['startstop'] && _.DATA['cfg_'+e].cfg.page < _.DATA['cfg_'+e].cfg.maxPage||0){_.T.gP(e);setTimeout(()=>_.T.ss(e),300)} }
          }
  , D : {
          version : () =>`info D 0.2 data`
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
          , describe : (a='slei',c='schicht')=>{//console.log(`describe `);//document.querySelector('#info').appendChild(_.D.describe('slei','produkt'))
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
          , stats : (a='slei',c)=>{ const dv = document.createElement('div');
                                               dv.setAttribute('class','stats');
                                               ['l','min','mean','max','s','v'].reduce((t,e)=>{const s=document.createElement('div');s.setAttribute('class','small')
                                                  s.appendChild(document.createTextNode(e + ': ' + _.GX[a]['stats'][c][e].toFixed(0)));
                                                  t.appendChild(s);return t;},dv);
                                              return dv;
                                            }
          , sT : (e,c={}) => {//sT setTable
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
          }
  , C : {
          version : ()=> `version 0.2 C Anbindung Cloud 2024-07-06..`
          , APIID : "XX"
          , REGION : "XX"
          , PUT : "XX"
          , UPD : "XX"
          , DEL : "XX"
          , TABLEI : "XX"
          , TABLEC : "XX"
          , m2eda : async (d,source=_.C.PUT,detail=_.C.TABLEC) => { 
                            const res =await fetch (`https://${_.C.APIID}.execute-api.${_.C.REGION}.amazonaws.com/${source}/${detail}`
                                                   , { method : 'POST'
                                                     , body   : JSON.stringify(d)
                                                     }
                                                    );
                                           return await res.json()           ; //für del und aupdate gibt es eine EvendBridge ID, für scanDB wird eine Tabelle zurückgegeben
                            }
          , scanDB : async (table,d) =>{ /*const res =await fetch (`https://${_.C.APIID}.execute-api.${_.C.REGION}.amazonaws.com/dynamo/${table}`
                                                                   , { method : 'POST' , body   : JSON.stringify(d)          }
                                                                    )
                                               , dj = await res.json();  
                                               */
                                              const res = await _.C.m2eda(d,'dynamo',table); 
                                              return res.map(_.U.Dj2j);           
                                            }
          , scnTblRfr : async (tname)=>{ //{"KeyConditionExpression":"PID = :pid","ExpressionAttributeValues":{":pid":{"S":"Projekte"}}}
                                                const data = await _.C.scanDB(_.DATA['cfg_'+tname]['cfg']['dbTableName'],{"KeyConditionExpression":`${_.DATA['cfg_'+tname]['cfg']['ReadKeys'][0]} = :pid`,"ExpressionAttributeValues":{":pid":{"S":_.DATA['cfg_'+tname]['cfg']['ReadExpressions'][0]}}});
                                                     _.DATA[tname]=data;
                                                     _.U.on('STRUS');
                                                     _.T.delGF();
                                                    }
          }
};

export { _ };
