/* Mini-lib — only-used functions for einkaufsapp */
const _ = { DATA     : {}
          , fbtnsave : ()=>``
          , GV       : {}
          , GX       : {}
          , GT       : []
          , X : { version : () =>`info X 0.1 mini`
                , OK : Object.keys
                , OE : Object.entries
                , OV : Object.values
                , OF : Object.fromEntries
                , OA : Object.assign
                , CL : console.log
                , JS : JSON.stringify
                , JP : JSON.parse
                , DN : Date.now
                , CE : (t) => document.createElement(t)
                , CT : (t) => document.createTextNode(t)
                , KV : e => ({k:e[0], v:e[1]})
                }
          , U : { version : () =>`info U 0.1 mini`
                , kv2j : (k,v) => k.split('|').reduce((t,e,i) => { t[e]=v.split('|')[i]; return t; }, {})
                }
          , I : { version : () =>`info I 0.1 mini`
                , gI : (id,icons) => {
                    const ns = 'http://www.w3.org/2000/svg'
                    ,    s = document.createElementNS(ns,'symbol')
                    ,    p = document.createElementNS(ns,'path');
                    s.setAttributeNS(null,'viewBox','0 0 24 24');
                    s.setAttributeNS(null,'id',id);
                    p.setAttributeNS(null,'class','cls-1');
                    p.setAttributeNS(null,'d',icons[id]);
                    s.appendChild(p);
                    return s;
                  }
                , aI : (icons,parent) => _.X.OK(icons).reduce((t,id) => { t.appendChild(_.I.gI(id,icons)); return t; }, parent)
                }
          , M : { version : () =>`info M 0.1 mini`
                , gh : (t,s) => {
                    const h = document.createElement('header')
                    ,    sp = document.createElement('span')
                    ,    cl = document.createElement('span');
                    cl.setAttribute('class','close');
                    cl.addEventListener('click',() => {
                      document.querySelectorAll('.modal')[0].style.display = 'none';
                    });
                    cl.appendChild(document.createTextNode('\u00D7'));
                    sp.appendChild(document.createTextNode(s||''));
                    h.appendChild(document.createTextNode(t||'Modal'));
                    h.appendChild(sp);
                    h.appendChild(cl);
                    return h;
                  }
                , gf : (fields,form) => {
                    fields.reduce((t,f) => {
                      const d = document.createElement('div')
                      ,    l = document.createElement('label')
                      ,    i = document.createElement('input');
                      d.setAttribute('class','form-group');
                      l.appendChild(document.createTextNode(f.l||f[0]));
                      i.setAttribute('type',f.t||'text');
                      i.setAttribute('class','input-control');
                      i.setAttribute('value',f.v||f[1]||'');
                      i.setAttribute('name',f.n||f.l||f[0]);
                      if(f.d) i.setAttribute('list',f.d);
                      d.appendChild(l);
                      d.appendChild(i);
                      form.appendChild(d);
                      return t;
                    }, form);
                    return form;
                  }
                , i2c : (e) => {
                    const t = _.U.kv2j(e.k, e.o)
                    ,    n = document.querySelectorAll('.modal-form')[0]
                    ,    c = document.createElement('div')
                    ,    r = document.createElement('form');
                    n.removeChild(n.children[0]);
                    c.setAttribute('class','modal-steffen');
                    r.setAttribute('id','form');
                    c.appendChild(_.M.gh(e.o.split('|')[0],'Daten erfassen'));
                    c.appendChild(_.M.gf(_.X.OE(t),r));
                    n.appendChild(c);
                    document.querySelectorAll('#formsave')[0].disabled = false;
                    document.querySelectorAll('#formsave')[0].removeEventListener('click', _.fbtnsave);
                    document.querySelectorAll('#formsave')[0].addEventListener('click', _.fbtnsave);
                    document.querySelectorAll('.modal')[0].style.display = 'block';
                  }
                }
          , D : { version : () =>`info D 0.1 mini`
                , gD : async (file, prefix='') => {
                    const r = await fetch(prefix + file);
                    return r.json();
                  }
                }
          };
export { _ };