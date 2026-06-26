/**
 * Shopfloor Library - Tree-Shaken Pay-Per-Use Version
 * ====================================================
 * Auto-generated from dev/lib.mjs by analyzing app.mjs dependencies.
 * Only functions actually used by the application are included.
 *
 * Tree-shaken functions:
 *   _.D.gD          - getData (fetch JSON from file)
 *   _.D.sT          - setTable (configure table metadata)
 *   _.T.rf          - refresh (render table into DOM)
 *   _.T.delGF       - deleteGlobalFilter (clear all filters)
 *   _.T.gF          - getFiltered (get filtered data for a table)
 *   _.T.cF          - checkFilter (test row against filter chain)
 *   _.T.gHT         - getTableHeader (build HTML header from config)
 *   _.T.gBody       - getTableBody (build HTML body from data)
 *   _.T.aE          - addEvents (attach event listeners to table cells)
 *   _.I.aI          - addIcons (inject SVG icons into container)
 *   _.I.aIObj       - addIconsObj (handle object-format icon data)
 *   _.X.fc          - filter compose (apply filter expression to data)
 *   _.X.FX           - Filter expressions (eF, rF, icF, swF, ewF, oF, NrF, tF, NtF, gF, lF, bF, NbF, iF)
 *   _.X.CL           - console.log shortcut
 *   _.X.OK           - Object.keys shortcut
 *   _.X.RE           - RegExp shortcut
 *   _.DATA           - Data store
 *   _.GV             - Group Values (table configuration)
 *   _.GX             - Group Analytics (cached analytics)
 *   _.GT             - Global Tables (registered table names)
 */
'use strict';
const _ = {
  DATA: {},
  GV: {},
  GX: {},
  GT: [],
  X: {
    CL: console.log,
    OK: Object.keys,
    RE: RegExp,
    fc: (e, t) => e.filter(_.X.FX[t.f](t.k)(t.v)),
    FX: {
      eF: e => t => n => n[e].toString() === t.toString(),       // equals
      rF: e => t => n => new _.X.RE(t, "i").test(n[e]),           // regex
      icF: e => t => n => n[e].includes(t),                       // includes
      swF: e => t => n => n[e].startsWith(t),                     // startsWith
      ewF: e => t => n => n[e].endsWith(t),                       // endsWith
      oF: e => t => n => t.reduce((a, c) => a || c === n[e], false), // one of
      NrF: e => t => n => !new _.X.RE(t, "i").test(n[e]),        // not regex
      tF: e => () => t => t[e],                                   // truthy
      NtF: e => () => t => !t[e],                                 // not truthy
      gF: e => t => n => n[e] >= t,                               // greater or equal
      lF: e => t => n => n[e] <= t,                               // less or equal
      bF: e => t => n => n[e] >= t.k && n[e] <= t.g,              // between
      NbF: e => t => n => n[e] <= t.k && n[e] >= t.g,             // not between
      iF: e => t => n => new _.X.RE(t.join("|")).test(n[e])       // includes any
    }
  },
  D: {
    gD: async (e, t) => {
      const n = t ? `${t}/${e}` : `data/${e}`;
      try {
        const a = await fetch(n);
        return await a.json();
      } catch (err) {
        return _.X.CL(`getData error: ${e}`, err), [];
      }
    },
    sT: (e, t) => {
      _.GV[e] = _.GV[e] || {};
      _.GV[e].cfg = t;
      _.GV[e].filters = [];
      _.GV[e].filtered = null;
      return e;
    }
  },
  T: {
    rf: e => {
      const t = _.GV[e];
      if (!t || !_.DATA[e]) return e;
      const n = _.T.gF(e)
        , c = document.querySelector(`#${e}`)
        , r = t.cfg || {}
        , a = _.T.gHT(r)
        , b = _.T.gBody(e, n);
      if (c) {
        c.innerHTML = a + b;
        _.T.aE(c, e);
      }
      return e;
    },
    delGF: e => {
      if (e) {
        _.GV[e] && (_.GV[e].filters = [], _.GV[e].filtered = null);
      } else {
        Object.keys(_.GV).forEach(t => {
          _.GV[t].filters = [];
          _.GV[t].filtered = null;
        });
      }
      return e || true;
    },
    gF: e => {
      const t = _.GV[e];
      if (!t) return _.DATA[e] || [];
      if (t.filtered !== null) return t.filtered;
      if (!t.filters || !t.filters.length) {
        return _.DATA[e] || [];
      }
      return _.DATA[e].filter(n => _.T.cF(n, t.filters));
    },
    cF: (e, t) => t.every(n => _.X.fc([e], n).length > 0),
    gHT: e => {
      const t = e.cols || [];
      if (!t.length) return '';
      const n = `<table><thead><tr>`;
      let c = t.reduce((a, n) => {
        return a + `<th class="${n.cls || ''}" data-f="${n.f}">${n.l || n.f}</th>`;
      }, '');
      return n + c + `</tr></thead>`;
    },
    gBody: (e, t) => {
      const n = _.GV[e] && _.GV[e].cfg ? _.GV[e].cfg.cols : [];
      if (!t || !t.length) return '<tbody><tr><td>No data</td></tr></tbody>';
      const c = t.map(r => {
        if (n.length) {
          return '<tr>' + n.map(a => {
            return `<td class="${a.cls || ''}">${r[a.f] != null ? r[a.f] : ''}</td>`;
          }).join('') + '</tr>';
        }
        return '<tr>' + _.X.OK(r).map(a => `<td>${r[a]}</td>`).join('') + '</tr>';
      }).join('');
      return `<tbody>${c}</tbody></table>`;
    },
    aE: (e, t) => {
      e.querySelectorAll('td[data-f]').forEach(n => {
        n.addEventListener('click', a => {
          const b = a.target.getAttribute('data-f');
          _.X.CL(`Table ${t} field ${b} clicked`);
        });
      });
    }
  },
  I: {
    aI: (e, t) => {
      if (!t || !e) return t;
      const n = e.icons || e;
      if (!Array.isArray(n) && typeof n === 'object') {
        return _.I.aIObj(e, t);
      }
      const c = n.map(a => {
        const b = a.id || a.n || a.name
          , d = a.svg || a.icon || a.path
          , f = a.viewBox || a.vb || '0 0 24 24';
        if (!b || !d) return '';
        return `<symbol id="${b}" viewBox="${f}">${d}</symbol>`;
      }).join('');
      t.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" style="display:none">${c}</svg>`;
      return t;
    },
    aIObj: (e, t) => {
      const n = _.X.OK(e).map(a => ({
        id: a,
        svg: e[a].svg || e[a].path || '',
        viewBox: e[a].viewBox || '0 0 24 24'
      }));
      return _.I.aI(n, t);
    }
  }
};
export { _ };
