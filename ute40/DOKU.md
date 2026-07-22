# Ute 40 — Logistik Kreuztabellen 2025

## Was ist das?
Eine Mini-App die aus **1000 Lieferungen** (LKW → Kunde) zwei **Kreuztabellen** generiert:
- **Kunde × Monat** — Kosten pro Kunde aufgeschlüsselt nach Januar..Dezember
- **LKW × Monat** — Kosten pro LKW aufgeschlüsselt nach Monat

**Datenvolumen:** 10 LKW, 12 Fahrer, 20 Kunden, 1000 Lieferungen (Januar–Dezember 2025)  
**Kostenformel:** `gewicht × kilometer × tonnenKm` (pro Lieferung individuell aus LKW-Typ)  
**Gesamtumsatz Demo:** ~3,34 Mio €

## Architektur

| Stufe | Was passiert | Funktion |
|---|---|---|
| 1 | 4 JSON-Dateien + Icons laden | `D.gD` (parallel) |
| 2 | Lookup-Namen einfügen (kunde→`kunde_name`, lkw→`lkw_typ`) | map-Iteration |
| 3 | ETL: `PMM` aus datum, `kosten` = g × km × €/t·km | inline im App-Code |
| 4 | 2× Pivot-Berechnung | `X.kreuz(data, {f:[], s:[dim1,dim2], c:[kosten]})` |
| 5 | M01..M12 + SUM pro Zeile formatieren | map-Iteration |
| 6 | 3 Tables rendern | `D.sT` + `T.rf` |

## Besonderheiten
- **Dynamische cfg**: Die Kreuztabellen-cfg wird zur Laufzeit generiert (M01..M12 + SUM)
- **Cache-safe**: `lib.ute40.mjs` — kein Konflikt mit lib anderer Apps beim Browser-Reload
- **63 Funktionen** aus 207 in der Lib (30%) — 65% Speicher gespart
- **Lookup-Namen direkt in den Daten**: kein L.djl-Lookup beim Rendern nötig

## Dateiliste

| Datei | KB | Beschreibung |
|---|---:|---|
| `index.html` | 2 | Startseite, 3 Tabs (Lieferungen, Kunden×Monat, LKW×Monat) |
| `app_ute40.mjs` | 4 | App-Logik: laden, ETL, 2× X.kreuz, cfg generieren |
| `lib.ute40.mjs` | 43 | Minimierter Lib (63 von 207 Funktionen) |
| `main.css` | 8 | Stylesheet (gemeinsam mit ute39) |
| `cfg_lieferungen.json` | 3 | 3 Views: lieferungen, kunde_x, lkw_x |
| `lieferungen.json` | 173 | 1000 Lieferungen |
| `lkws.json` | 1 | 10 LKW mit Typ, Motor, tonnenKm |
| `fahrer.json` | 1 | 12 Fahrer |
| `kunden.json` | 1 | 20 Kunden |
| `L_IC_min.json` | 2 | Icon-Set |
| `h4w_profile_v4.png` | 62 | Logo + Favicon |
| `ute40_demo.mp4` | 56 | Bedien-Video (10 sek) |
| **Summe** | **355** | |

## Navigation
- 📦 **1000** — Klick zeigt 1000 Lieferungen (klassische Tabelle)
- 🎯 **20** — Klick zeigt 20 Kunden × 12 Monate = 240 Zellen
- 🚛 **10** — Klick zeigt 10 LKW × 12 Monate = 120 Zellen

## Live
→ https://demonstratorium.github.io/ute40/

---
Erstellt 2026-07-22 via Hermes Agent · OUL v0.9 · Voice-to-App Pipeline
