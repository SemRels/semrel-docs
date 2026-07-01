---
title: Datenschutzerklärung
description: Datenschutzerklärung für semrel.io und registry.semrel.io.
sidebar:
  order: 2
---

Stand: Juni 2026

## 1. Überblick

semrel.io und registry.semrel.io werden vom SemRels Open-Source-Projekt betrieben.
Wir nehmen den Schutz deiner Daten ernst. Diese Seite erläutert, welche Daten erhoben werden, zu welchem Zweck und wie lange sie gespeichert werden.

## 2. Erhobene Daten

### 2.1 Dokumentationsseite (semrel.io)

Die Dokumentationsseite ist eine statisch generierte Seite, die über ein CDN (GitHub Pages / Cloudflare Pages) ausgeliefert wird.

- **Server-Logs:** Der CDN-Anbieter kann Standard-HTTP-Zugriffslogs erfassen (IP-Adresse, Browser, aufgerufene URL, Referrer). Diese Logs werden entsprechend der Richtlinien des Anbieters aufbewahrt und von uns nicht zu Analysezwecken ausgewertet.
- **Keine Cookies** werden von der Dokumentationsseite selbst gesetzt.

### 2.2 Plugin-Registry (registry.semrel.io)

| Daten | Zweck | Aufbewahrung |
|---|---|---|
| Download-Zähler von Plugins | Nutzungsstatistiken in der Registry-UI | Unbegrenzt (nur aggregierte Zähler) |
| Aufruf-Zähler von Plugins | Nutzungsstatistiken in der Registry-UI | Unbegrenzt (nur aggregierte Zähler) |
| Authentifizierungs-Token (Admin) | Zugangskontrolle | Nur für die Sitzungsdauer; nicht serverseitig gespeichert |
| GitHub-OAuth-Login (optional) | Admin-Authentifizierung | GitHub-Handle für Zuordnung gespeichert; auf Anfrage löschbar |

Die Registry setzt **keine** Tracking-Cookies und verwendet **keine** Drittanbieter-Analyse-Tools.

## 3. Cookies

Beim ersten Besuch von registry.semrel.io wird ein Cookie-Banner angezeigt.
Es werden ausschließlich funktionale Session-Cookies für die Admin-Authentifizierung gesetzt.
Keine Werbe- oder Tracking-Cookies werden verwendet.

## 4. Drittanbieter

- **GitHub** — Repository-Hosting und OAuth-Anbieter. Unterliegt den [Datenschutzbestimmungen von GitHub](https://docs.github.com/de/site-policy/privacy-policies/github-privacy-statement).
- **CDN/Hosting-Anbieter** — Kann Zugriffslogs gemäß §2.1 verarbeiten.

## 5. Deine Rechte

Nach geltendem Datenschutzrecht (DSGVO) hast du das Recht auf Auskunft, Berichtigung oder Löschung der von uns gespeicherten personenbezogenen Daten. Bitte wende dich dazu an [hello@semrel.io](mailto:hello@semrel.io).

## 6. Kontakt

Bei datenschutzbezogenen Fragen: [hello@semrel.io](mailto:hello@semrel.io)
