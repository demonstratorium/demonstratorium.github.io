# UTE 39 — Einkaufsliste Mini-App

## 📦 File-Liste

| Datei | Größe | Beschreibung |
|-------|-------|--------------|
| `app_ute39.mjs` | 1 KB | App-Logik, importiert lib.ute39.mjs |
| `cfg_einkauf.json` | 1 KB | Konfiguration: Spalten, Filter, ETL, Views |
| `einkauf.json` | 1 KB | Daten: Einkaufsliste |
| `L_IC_min.json` | 2 KB | Icons (Minimized) |
| `lib.ute39.mjs` | 42 KB | **ONLY_USED Lib** (56 von 207 Funktionen) |
| `main.css` | 8 KB | Stylesheet |
| `h4w_profile_v4.png` | 62 KB | Logo / Favicon |
| `ute39_demo.mp4` | 50 KB | Demo-Video (10s, Bedienungsflow) |
| `index.html` | 2 KB | EntryPoint mit OG-Tags + Impressum-Link |

**Summe: ~166 KB**

---

## 🎯 Features

### Daten & ETL
- **ETL-in-cfg**: Transformation aus SID → PYY, PMM, PYM direkt in der Config
- **6 Spalten**: PID, SID, PYM (JahrMonat), kategorie, betrag, bezeichnung
- **Suchfelder**: bezeichnung, kategorie, SID

### Filter & Views
- **JFilter**: Globale Filter (GP→PYM, GK→kategorie)
- **SFilter**: Volltextsuche über bezeichnung/kategorie/SID
- **Cross-Table GF**: Pivot-Table setzt Filter für alle Tabellen
- **Ansicht**: `show` mit 6 konfigurierbaren Spalten

### Demo-Video Flow
1. Seite laden
2. Klick auf "Einkauf" → Tabelle erscheint
3. Suche "Käse" → gefilterte Ansicht
4. Filter reset → vollständige Liste
5. Tabelle schließen

---

## 📐 Architektur

```
index.html
  ↓
app_ute39.mjs (import lib.ute39.mjs)
  ↓
cfg_einkauf.json (ETL + Views)
einkauf.json (Daten)
L_IC_min.json (Icons)
main.css (Styles)
```

### Lib-Optimierung (OUL v0.9)
- **Original**: libk.mjs = 122 KB, 207 Funktionen
- **Minimiert**: lib.ute39.mjs = 42 KB, 56 Funktionen
- **Ersparnis**: 80 KB (66%)
- **Methode**: ONLY_USED Prozess (App/HTML/CFG scannen → transitiv auflösen)

---

## 🚀 Deployment

Hosted auf GitHub Pages:
```
https://demonstratorium.github.io/ute39/
```

Cache-Strategie: App-spezifische Lib-Namen (`lib.ute39.mjs`) vermeiden Cache-Kollisionen zwischen verschiedenen Apps.

---

## 📝 Version

**v1.0** — 2026-07-22
- Erste vollständige Mini-App mit ONLY_USED Lib
- Demo-Video als Bedienungsanleitung
- ETL-in-cfg Pattern aus ute38 übernommen
