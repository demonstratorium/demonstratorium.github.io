/**
 * Shopfloor Dev Library - Full Development Version
 * ================================================
 * Contains ALL functions: X (analytics), D (data), T (table), I (icons), F (filter)
 * This is the complete unminified reference library.
 * The PAY-PER-USE version (lib.mjs) is tree-shaken from this file.
 *
 * Steffen's style: functional, minimal, no dependencies.
 * Single namespace export: _
 */
'use strict';

const _ = {
  // Global state
  DATA: {},        // Data store: loaded tables cached here
  fbtnsave: () => "",  // Button save callback (overridden at runtime)
  GV: {},          // Group Values - current grouping configuration
  GX: {},          // Group Analytics - cached analytics per table
  GT: [],          // Global Tables - registered table names

  // ============================================================
  // X - Analytics Module
  // ============================================================
  X: {
    version: () => "info X 0.5 analytics",

    // Native API shortcuts (avoid direct global access)
    RE: RegExp,
    CL: console.log,
    CI: console.info,
    OK: Object.keys,
    OA: Object.assign,
    OE: Object.entries,
    OV: Object.values,
    OF: Object.fromEntries,
    DN: Date.now,
    JP: JSON.parse,
    JS: JSON.stringify,
    CE: document.createElement,
    CT: document.createTextNode,
    AC: document.appendChild,
    RC: document.removeChild,
    EL: document.addEventListener,
    RL: document.removeEventListener,

    // Math helpers
    MM: e => e.reduce(
      (a, t) => (t > a.max && (a.max = t), t < a.min && (a.min = t), a),
      { min: Number.MAX_VALUE, max: -Number.MAX_VALUE }
    ),
    MO: e => e.reduce((a, t) => (a[t] = {}, a), {}),
    MF: Math.floor,
    MP: Math.pow,
    ML: Math.log10,

    // Key-Value pair constructor
    KV: e => ({ k: e[0], v: e[1] }),

    // Filter compose: fc(data, filterObj) returns filtered data
    fc: (e, t) => e.filter(_.X.FX[t.f](t.k)(t.v)),

    // Pick specific keys from object
    as: e => t => e.reduce((a, n) => (a[n] = t[n], a), {}),

    // ============================================================
    // FX - Filter Expressions
    // Each returns a curried function: key => value => row => boolean
    // ============================================================
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
    },

    // Buzzword analysis: extracts top keywords from text field
    buzZ: (e, t = 7) => _.X.OE(
      e.reduce((a, n) => (
        n.split(/\W/).filter(s => s.length > t)
          .map(s => s.toLowerCase())
          .reduce((b, s) => (b[s] = (b[s] || 0) + 1, b), a), a
      ), {})
    ).map(_.X.KV).sort((a, b) => b.v - a.v).slice(0, 50),

    // Keyed buzzword result
    KZ: e => t => ({ k: t[0], v: _.X.buzZ(t[1], e) }),

    // Robust string-to-number parser
    rs: e => "string" == typeof e ? parseFloat(e.replace(/,/, ".")) : "number" == typeof e ? e : 0,

    // Boxplot statistics: returns {min, q1, median, mean, q3, max, sum, n, variance, stddev}
    bxpl: e => {
      const t = e.map(r => _.X.rs(r)).sort((a, b) => a - b),
        n = t.length,
        c = t.reduce((a, b) => a + (b || 0), 0),
        r = c / n,
        d = t.reduce((a, b) => a + (b - r) * (b - r), 0) / n;
      return {
        min: t[0],
        q1: t[parseInt(.25 * n)],
        q5: t[parseInt(.5 * n)],
        mean: r,
        q7: t[parseInt(.75 * n)],
        max: t[n - 1],
        s: c,
        l: n,
        v: d,
        d: Math.sqrt(d)
      };
    },

    // Keyed boxplot result
    KB: e => ({ k: e[0], v: _.X.bxpl(e[1]) }),

    // Group-by key builder: creates composite key from array of field names
    U: (e, t) => e.reduce((a, n) => a + "_" + t[n], ""),

    // Array group builder: groups array items by composite key, collects values
    alb: (e, t, n = 1, c = 1) => (t, c) => (
      t[_.X.U(e, c)] = t[_.X.U(e, c)] || [],
      t[_.X.U(e, c)].push(c[n] || 0),
      t
    ),

    // Array group with external accumulator
    alx: (e, t, n = 1, c = 1) => (t, r) => (
      t[_.X.U(e, r)] = t[_.X.U(e, r)] || [],
      t[_.X.U(e, r)].push(r[n] || 0),
      t
    ),

    // Group Sum: aggregates data by keys, computes sum per group
    // groupSum(data, groupFields, valueField, tableKey)
    GS: (e, t, n, c) => {
      const r = {};
      return (
        e.forEach(a => {
          const b = t.reduce((d, f) => (d.push(a[f]), d), []);
          r[b = "_".join(b)] = r[b] || [];
          r[b].push(a[n] || 0);
        }),
        _.X.OE(r).map(([d, f]) => ({ k: d, v: f.reduce((g, h) => g + h, 0) }))
      );
    },

    // Group Sum with boxplot: groups data then computes boxplot per group
    GSX: (e, t, n) => _.X.OE(
      e.reduce(_.X.alb(t, n), {})
    ).map(_.X.KB),

    // Group Sum with buzzword: groups data then extracts buzzwords per group
    GSB: (e, t, n) => _.X.OE(
      e.reduce(_.X.alb(t, n, 0), {})
    ).map(_.X.KZ(7)),

    // Frequency count: counts occurrences of each unique value in a field
    FC: (e, t) => _.X.OE(
      e.reduce((a, n) => (a[n[t]] = (a[n[t]] || 0) + 1, a), {})
    ).map(_.X.KV).sort((a, b) => b.v - a.v),

    // Cross-tabulation: pivot table
    CT: (e, t, n, c) => {
      const r = {};
      return (
        e.forEach(a => {
          const b = a[t];
          r[b] = r[b] || {};
          r[b][a[n]] = (r[b][a[n]] || 0) + (c ? a[c] : 1);
        }),
        r
      );
    },

    // Distinct values for a field
    DV: (e, t) => _.X.OK(
      e.reduce((a, n) => (a[n[t]] = 1, a), {})
    ),

    // Min-Max range for a field
    MMF: (e, t) => {
      const a = _.X.MM(e.map(n => n[t]));
      return { min: a.min, max: a.max };
    },

    // Sum of a field
    SF: (e, t) => e.reduce((a, n) => a + (_.X.rs(n[t]) || 0), 0),

    // Average of a field
    AF: (e, t) => {
      const a = e.reduce((b, n) => b + (_.X.rs(n[t]) || 0), 0);
      return e.length ? a / e.length : 0;
    },

    // Count records
    CN: e => e.length,

    // Unique count of field values
    UC: (e, t) => _.X.OK(e.reduce((a, n) => (a[n[t]] = 1, a), {})).length,

    // Sort data by field
    SORT: (e, t, n = 'asc') => [...e].sort((a, b) => {
      const c = a[t], d = b[t];
      return n === 'asc' ? (c > d ? 1 : -1) : (c < d ? 1 : -1);
    }),

    // Limit results
    LIM: (e, t) => e.slice(0, t),

    // Field extraction
    FO: e => t => e.map(n => n[t]),

    // Field-of-fields (pick multiple)
    FOF: e => t => e.map(n => _.X.as(t)(n)),

    // Histogram binning
    HIST: (e, t, n = 10) => {
      const a = e.map(r => _.X.rs(r[t])).filter(r => !isNaN(r));
      if (!a.length) return [];
      const b = _.X.MM(a);
      const c = (b.max - b.min) / n;
      const d = {};
      for (let i = 0; i < n; i++) {
        const k = `${b.min + i * c}`;
        d[k] = 0;
      }
      a.forEach(r => {
        let i = _.X.MF((r - b.min) / c);
        if (i >= n) i = n - 1;
        const k = `${b.min + i * c}`;
        d[k] = (d[k] || 0) + 1;
      });
      return _.X.OE(d).map(_.X.KV);
    }
  },

  // ============================================================
  // D - Data Module
  // ============================================================
  D: {
    // getData: fetch JSON data from file
    // getData(filename, tableDir?) - loads and parses JSON
    gD: async (e, t) => {
      const n = t ? `${t}/${e}` : `data/${e}`;
      try {
        const a = await fetch(n);
        return await a.json();
      } catch (err) {
        return _.X.CL(`getData error: ${e}`, err), [];
      }
    },

    // setTable: configure a table with metadata
    // setTable(tableName, config) - stores table configuration
    sT: (e, t) => {
      _.GV[e] = _.GV[e] || {};
      _.GV[e].cfg = t;
      _.GV[e].filters = [];
      _.GV[e].filtered = null;
      return e;
    },

    // deleteTable: remove a table configuration
    dT: e => {
      delete _.GV[e];
      delete _.GX[e];
      delete _.DATA[e];
      delete _.DATA['fs_' + e];
      _.GT = _.GT.filter(t => t !== e);
      return e;
    },

    // saveData: persist data back to server (placeholder)
    sD: async (e, t) => {
      try {
        const n = await fetch('/api/save', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: _.X.JS(t)
        });
        return await n.json();
      } catch (err) {
        return _.X.CL('saveData error:', err), { ok: false };
      }
    },

    // clearAll: reset all data
    cA: () => {
      Object.keys(_.DATA).forEach(e => delete _.DATA[e]);
      Object.keys(_.GV).forEach(e => delete _.GV[e]);
      Object.keys(_.GX).forEach(e => delete _.GX[e]);
      _.GT = [];
    }
  },

  // ============================================================
  // T - Table Module
  // ============================================================
  T: {
    // refresh: render a table with current data and config
    // refresh(tableName) - renders the table into DOM
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

    // deleteGlobalFilter: clear all filters for a table
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

    // getFiltered: get filtered data for a table
    gF: e => {
      const t = _.GV[e];
      if (!t) return _.DATA[e] || [];
      if (t.filtered !== null) return t.filtered;
      if (!t.filters || !t.filters.length) {
        return _.DATA[e] || [];
      }
      return _.DATA[e].filter(n => _.T.cF(n, t.filters));
    },

    // checkFilter: test a row against filter chain
    cF: (e, t) => t.every(n => _.X.fc([e], n).length > 0),

    // getTableHeader: build HTML header from config
    gHT: e => {
      const t = e.cols || [];
      if (!t.length) return '';
      const n = `<table><thead><tr>`;
      let c = t.reduce((a, n) => {
        return a + `<th class="${n.cls || ''}" data-f="${n.f}">${n.l || n.f}</th>`;
      }, '');
      return n + c + `</tr></thead>`;
    },

    // getTableBody: build HTML body from data
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

    // addEvents: attach event listeners to table cells
    aE: (e, t) => {
      e.querySelectorAll('td[data-f]').forEach(n => {
        n.addEventListener('click', a => {
          const b = a.target.getAttribute('data-f');
          _.X.CL(`Table ${t} field ${b} clicked`);
        });
      });
    },

    // sortTable: sort table data by column
    srt: (e, t, n = 'asc') => {
      const c = _.GV[e];
      if (!c || !_.DATA[e]) return e;
      _.DATA[e] = _.X.SORT(_.DATA[e], t, n);
      _.GV[e].filtered = null;
      return _.T.rf(e);
    },

    // applyFilter: add a filter to a table
    aF: (e, t) => {
      const n = _.GV[e];
      if (!n) return e;
      n.filters.push(t);
      n.filtered = null;
      return _.T.rf(e);
    },

    // removeFilter: remove a filter by index
    rF: (e, t) => {
      const n = _.GV[e];
      if (!n || !n.filters[t]) return e;
      n.filters.splice(t, 1);
      n.filtered = null;
      return _.T.rf(e);
    }
  },

  // ============================================================
  // I - Icons Module
  // ============================================================
  I: {
    // addIcons: inject SVG icons into a container
    // addIcons(iconData, container) - renders SVG symbols
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

    // addIconsObj: handle object-format icon data
    aIObj: (e, t) => {
      const n = _.X.OK(e).map(a => ({
        id: a,
        svg: e[a].svg || e[a].path || '',
        viewBox: e[a].viewBox || '0 0 24 24'
      }));
      return _.I.aI(n, t);
    },

    // getIcon: get a single icon by name
    gI: e => `<svg class="s-icon"><use xlink:href="#${e}" /></svg>`,

    // allIcons: render all icons as HTML (legacy)
    allIcons: e => {
      const t = e.icons || e;
      if (!Array.isArray(t)) return '';
      return t.map(a => {
        const b = a.id || a.n;
        return `<svg class="s-icon"><use xlink:href="#${b}" /></svg>`;
      }).join('');
    }
  },

  // ============================================================
  // F - Filter Module
  // ============================================================
  F: {
    // apply: apply a filter expression to data
    // apply(data, filterObj) - single filter
    apply: (e, t) => _.X.fc(e, t),

    // applyChain: apply multiple filters (AND logic)
    // applyChain(data, filterArray) - chained filters
    applyChain: (e, t) => t.reduce((a, n) => _.X.fc(a, n), e),

    // applyOR: apply multiple filters (OR logic)
    applyOR: (e, t) => {
      const n = new Set();
      t.forEach(a => {
        _.X.fc(e, a).forEach(b => n.add(b));
      });
      return [...n];
    },

    // makeFilter: create a filter expression object
    // makeFilter(field, type, value) => {f: type, k: field, v: value}
    make: (e, t, n) => ({ f: t, k: e, v: n }),

    // makeRange: create a range filter
    makeRange: (e, t, n) => ({ f: 'bF', k: e, v: { k: t, g: n } }),

    // makeNotRange: create a not-in-range filter
    makeNotRange: (e, t, n) => ({ f: 'NbF', k: e, v: { k: t, g: n } }),

    // makeOneOf: create an "one of" filter
    makeOneOf: (e, t) => ({ f: 'oF', k: e, v: t }),

    // makeRegex: create a regex filter
    makeRegex: (e, t) => ({ f: 'rF', k: e, v: t }),

    // makeContains: create an includes filter
    makeContains: (e, t) => ({ f: 'icF', k: e, v: t }),

    // makeGT: greater than filter
    makeGT: (e, t) => ({ f: 'gF', k: e, v: t }),

    // makeLT: less than filter
    makeLT: (e, t) => ({ f: 'lF', k: e, v: t }),

    // combineAND: combine filters with AND
    combineAND: e => e,

    // combineOR: combine filters with OR (returns array)
    combineOR: e => [e]
  }
};

export { _ };
