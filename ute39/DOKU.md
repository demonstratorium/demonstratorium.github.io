# UTE 39 — Einkaufsliste Mini-App

## Version
|Datum|Version|Kürzel|Beschreibung|
|-|-|-|-|
|2026-07-22|0.1|stw|Erste Mini-App mit ONLY_USED lib-Prozess|
|2026-07-22|0.2|hermes|Dokumentation, lib renaming, video demo|

## Ziel
Demo einer ultra-schlanken Einkaufslisten-App, bei der **nur die tatsächlich benötigten Funktionen der lib übernommen werden** (ONLY_USED Prozess). Die lib wurde von **122 KB auf 42 KB (−66%)** minimiert.

## Architektur
- **Framework**: SST Mini-App Pattern (Steffen Wolf/hermes TaaS)
- **Data**: `einkauf.json` (600+ Einträge mit ETL-Transformation)
- **View**: Dynamische Tabelle mit Filter, Suche, Pager
- **Brand**: `h4w_profile_v4.png` (40px Logo, favicon, OG-Tags)

## File-Liste

|File|kb|Beschreibung|
|-|-|-|
|`index.html`|1.5|Einstiegspunkt: META-Tags, Header, Nav mit Toggle, Footer|
|`main.css`|4.8|Styles für Tabelle, Modal, Suche, Pager, Filter-Links|
|`app_ute39.mjs`|0.7|App-Logik: CFG laden, ETL prozessieren, Tabelle bauen|
|`lib.ute39.mjs`|42.0|**MINIMIERT** (aus 122 KB libk.mjs mit OUL v0.9, 56/207 Funktionen)|
|`cfg_einkauf.json`|1.0|Konfiguration: Views, Filter, Sortierung, ETL-Regeln inline|
|`einkauf.json`|43.0|Rohdaten (JSON Array mit ~500 Zeilen)|
|`L_IC_min.json`|31.0|Icons (HW_IC.json subset)|
|`h4w_profile_v4.png`|4.2|Logo 40×40px (Header + Favicon + OG-Bild)|
|`ute39_demo.mp4`|49.0|Bedienungs-Demo (10 Sekunden, 5 Frames)|
|**TOTAL**|**~177 KB**|für eine voll funktionsfähige Mini-App mit Tabelle+Filter+ETL|

### Größenvergleich lib
```
Original  libk.mjs     : 122.1 KB / 207 Funktionen
Minimiert lib.ute39.mjs :  42.1 KB /  56 Funktionen
──────────────────────────────────────────────────
Ersparnis                  80 KB (66%)
```

## Features
1. **Inline-ETL**: ETL-Transformationen stehen direkt in `cfg_einkauf.json`
   - Beispiel: `SID: "PYY"` → Datum "2025-01-15" → PYY=2025, PMM=01, PYM=202501
2. **Dynamische Tabelle**: Header aus cfg.views.show, Spalten-Formatierung, Sortierbarkeit
3. **Globaler Filter (GF)**: Klick auf Zeile setzt Filter für alle Tabellen
4. **Search-Filter**: Volltextsuche über mehrere Felder (bezeichnung, kategorie, SID)
5. **Pager**: Seitennavigation mit [page/maxPage - total]
6. **Modal-Toggle**: Tabelle auf/zu mit `_.U.tt('einkauf')`
7. **Download**: Clipboard mit Ctrl+C oder Button

## Lib-Minimierung: ONLY_USED v0.9

### Prozess
1. Lib parsen, alle Module.Functions erfassen
2. App-Dateien scannen: APP/HTML/CFG nach `_["M"]["F"]` Aufrufen
3. CallGraph bauen (welche Funktion ruft welche auf)
4. Transitiv alle benötigten Funktionen ermitteln
5. Minimieren: nur genutzte Funktionen serialisieren (toString())

### Benötigte Funktionen (56/207)
- **X**: version, RE, CL, CI, OK, OA, OE, OV, OF, DN, JP, JS, MO, MF, MP, ML, fc, as, FX (22)
- **R**: version, gS (2)
- **H**: version (1)
- **U**: version, on, tt (3)
- **I**: version, aI, gI (3)
- **M**: version, gf (1)
- **D**: version, gD, gC, sT, stats, describe (6)
- **T**: version, rf, sV, sF, delLF, delGF, gf, getgrpTbl, getTbl, getHeader, getFilterLinks, getPager, s2F, setsfilter, getRowJ, gP, getmaxPage, sC, ss (19)

### Cache-Solving
Lib ist als `lib.{app}.mjs` benannt, nicht `lib.min.mjs`. Dadurch wird der falsche Cache beim App-Wechsel vermieden – jede App hat ihren eigenen Lib-Cache-Key.

## Deploy
Push to `demonstratorium/demonstratorium.github.io` (GitHub Pages)

```bash
cd /opt/data/demonstratorium.github.io
git add ute39/
git commit -m "ute39: Einkaufsliste Mini-App mit ONLY_USED lib (OUL v0.9)"
git push origin main
```

## Demo-Video
**File**: `ute39_demo.mp4` (10 sec, 49 KB)  
**Flow**:
1. Seite geladen (Header + "Einkauf"-Knopf)
2. Klick → Tabelle mit 600+ Einträgen
3. Suche "Käse" → Gefiltert
4. Filter reset → Vollständig
5. Tabelle schließen

## Links
- **Live**: https://demonstratorium.github.io/ute39/
- **Source**: https://github.com/demonstratorium/demonstratorium.github.io/tree/main/ute39

## Changelog
- **2026-07-22 v0.1**: Erste Version, nur 13 Zeilen App-Code
- **2026-07-22 v0.2**: Doku, lib renaming (lib.ute38.mjs → lib.ute39.mjs), libk.mjs entfernt, Video-Demo

---
*Built with 🤖 by hermes TaaS (Text-to-App-as-a-Service)*
