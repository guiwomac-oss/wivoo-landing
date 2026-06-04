# CLAUDE.md — Wivoo Landing Page

> Ce fichier est le **contrat de travail** entre le Product Manager et Claude Code.
> Il définit comment on travaille ensemble. À relire au début de chaque session.
> **Mis à jour le 04/06/2026 — reflète l'état réel du projet.**

---

## 1. Vue d'ensemble du projet

| Champ | Détail |
|---|---|
| **Client** | Wivoo — cabinet de conseil en Product Management, AI, Data & Design |
| **Livrable** | Site multi-pages statique déployé sur Vercel |
| **Contact PM** | guido.macaluso@wivoo.fr |
| **Stack** | HTML5 + CSS3 + JavaScript vanilla + Vercel serverless (Node.js ESM) |
| **Déploiement** | Vercel — production : `https://wivoo-showcase-one.vercel.app` |
| **Repo GitHub** | `guiwomac-oss/wivoo-landing` — push sur `main` = déploiement automatique |

---

## 2. Contexte projet & positionnement

### Ce que fait Wivoo

Wivoo est un **cabinet de conseil indépendant** spécialisé sur quatre domaines d'expertise complémentaires :

| Domaine | Ce que Wivoo apporte |
|---|---|
| **Product Management** | Structuration produit, roadmap, discovery, delivery, méthodes agiles |
| **Intelligence Artificielle** | Implémentation IA, LLM, automatisation, prototypes PoC |
| **Data** | Stratégie data, dashboards, gouvernance, analytics |
| **Design** | UX research, design system, prototypage, expérience utilisateur |

### Les deux cibles — ✅ DÉCISION PRISE

| Cible | Qui | Message clé | CTA |
|---|---|---|---|
| **Prospects** | Startups, PME, grands comptes | "Wivoo livre des résultats mesurables" | "Prendre RDV" → wivoo.fr/contact |
| **Candidats** | PM / Data / AI / Design expérimentés | "Des missions ambitieuses, des expertises reconnues" | "Postuler" → Welcome to the Jungle |

Structure retenue : **fil conducteur prospects + section recrutement dédiée** + deux CTAs distincts dans le Hero.

---

## 3. Stack technique

```
wivoo-landing/
├── index.html              → Page d'accueil (Hero, Expertises, Réalisations, Recrutement, Footer)
├── realisations.html       → Page catalogue études de cas + filtres + notifications
├── articles/
│   ├── chatbot-banque.html → Étude de cas IA secteur bancaire
│   ├── retail-sport.html   → Étude de cas engagement retail sportif
│   ├── ecommerce-pharma.html → Étude de cas e-commerce pharmaceutique
│   └── beaute-magasin.html → Étude de cas expérience client beauté
├── api/
│   └── subscribe.js        → Fonction Vercel (Node.js ESM) : inscription Brevo + email confirmation
├── css/
│   ├── style.css           → Mise en forme principale (toutes pages)
│   └── article.css         → Styles spécifiques aux articles (si externalisé)
├── js/
│   ├── main.js             → Interactions globales (menu, scroll, fade-in, dropdowns ARIA)
│   └── filters.js          → Filtres page réalisations (pills expertise + dropdown secteur)
├── images/                 → Logo, photos consultants, illustrations
├── sitemap.xml             → Sitemap pour les moteurs de recherche
├── robots.txt              → Instructions robots (pointe vers sitemap)
├── vercel.json             → Config Vercel (cleanUrls: true, trailingSlash: false)
├── docs/                   → Documentation projet
└── CLAUDE.md               → Ce fichier
```

**Règle d'or :** push sur `main` → déploiement Vercel automatique en ~30 secondes.

---

## 4. Identité visuelle — Charte graphique Wivoo

### Couleurs

| Rôle | Nom | Code hex | Usage |
|---|---|---|---|
| **Principale** | Persian Blue | `#451DC7` | Titres, fond hero, boutons primaires |
| **Secondaire** | Tolopea | `#17023C` | Fond foncé, nav, footer |
| **Accent** | Pink Flamingo | `#FF63FF` | CTA, highlights, hover, éléments d'attention |
| **Neutre clair** | Blanc | `#FFFFFF` | Fond de sections, texte sur fond foncé |
| **Neutre texte** | Gris foncé | `#1A1A2E` | Corps de texte sur fond clair |

### Typographie
- **Titres :** `Poppins` — poids 700 (bold)
- **Corps de texte :** `Poppins` — poids 400 (regular)
- **Accent / labels :** `Poppins` — poids 600 (semi-bold)

### Style général
- Sobre & Corporate, beaucoup d'espace blanc, sobriété avant tout
- L'accent Pink Flamingo est utilisé avec parcimonie

---

## 5. Structure pages — ✅ VALIDÉE

### index.html
| # | Section | Statut |
|---|---|---|
| 1 | Navigation sticky | ✅ Livré |
| 2 | Hero — accroche + stats + 2 CTAs | ✅ Livré |
| 3 | Nos expertises — 4 domaines | ✅ Livré |
| 4 | Nos réalisations — aperçu + lien | ✅ Livré |
| 5 | Rejoindre Wivoo — recrutement | ✅ Livré |
| 6 | Footer — contact + réseaux sociaux | ✅ Livré |

### realisations.html
- Filtres : pills Expertise (Tous / Produit / Data / AI / Design) + dropdown Secteur
- 4 études de cas disponibles + 4 "bientôt disponible" avec panneau de notification
- Notification : qualification Candidat/Entreprise → email → inscription Brevo liste #3
- Persistance notification : `localStorage` (clé par titre d'article)

### articles/ — Template Hero ustwo-inspired
- Image plein largueur avec overlay texte (tags, titre, client, rôle consultant)
- Stepper de navigation entre sections (Expert / Approche / Résultats / Livrables)
- Section KPI chiffrés + citations client + articles liés
- Menu sticky allégé (titre seul + dots navigation)

---

## 6. Intégrations externes — ✅ CONFIGURÉES

### Brevo (emailing)
| Élément | Valeur |
|---|---|
| API Key | Stockée dans Vercel env `BREVO_API_KEY` (jamais dans le code) |
| Liste contacts | ID `3` (env `BREVO_LIST_ID`) |
| Expéditeur | guido.macaluso@wivoo.fr (env `BREVO_SENDER_EMAIL`) |
| Attributs contacts | `PROFIL` (candidat/entreprise) + `ARTICLE_INTERESSE` |
| Statut SPF/DKIM | ⚠️ Non configuré (DNS chez OVH, accès en attente) — emails peuvent aller en spam |

### Welcome to the Jungle
- Lien candidature : `https://www.welcometothejungle.com/fr/companies/wivoo/jobs`
- Utilisé sur : Hero (CTA "Rejoindre l'équipe"), section Rejoindre, tous boutons "Postuler"

### Réseaux sociaux (footer)
- LinkedIn : `https://www.linkedin.com/company/wivoo/`
- Welcome to the Jungle : `https://www.welcometothejungle.com/fr/companies/wivoo`

---

## 7. SEO — ✅ IMPLÉMENTÉ (04/06/2026)

| Élément | Statut |
|---|---|
| Titles uniques ~55 chars | ✅ 6 pages |
| Meta descriptions uniques 140-155 chars | ✅ 6 pages |
| Canonical URLs (sans .html, clean URLs) | ✅ 6 pages |
| Open Graph + Twitter Card | ✅ 6 pages |
| JSON-LD Organization | ✅ index.html |
| JSON-LD Article + BreadcrumbList | ✅ 4 articles |
| JSON-LD CollectionPage + BreadcrumbList | ✅ realisations.html |
| sitemap.xml | ✅ Créé |
| robots.txt | ✅ Créé |
| Image OG | ⚠️ À créer : `images/og-wivoo.png` (1200×630px) |

---

## 8. Accessibilité — ✅ IMPLÉMENTÉE (WCAG 2.1 AA)

- Skip link "Passer au contenu principal" sur toutes les pages
- `id="main-content"` sur les sections principales
- `:focus-visible` CSS 2.5px violet
- `aria-expanded` / `aria-haspopup` sur les dropdowns nav
- `aria-hidden="true"` sur les icônes décoratives
- `aria-label` sur les liens et inputs de formulaire
- `.sr-only` pour le texte destiné aux lecteurs d'écran
- Touch targets minimum 44px (steppers, filtres)

---

## 9. Skills disponibles (Claude Code)

Les skills sont dans `~/.claude/skills/` et disponibles via la commande `/[nom-skill]` :

| Skill | Usage |
|---|---|
| `marketing-tagging-plan` | Créer un plan de taggage analytics (KPIs, événements GA4/Segment) |
| `seo-expert` | Auditer et optimiser le SEO on-page d'une page ou du site |

---

## 10. Méthodologie de travail

Chaque fonctionnalité ou section suit **4 phases dans l'ordre strict**.

### Phase 1 — SPEC 📋
Définir précisément ce qu'on va construire.
- Claude produit : description, contenu exact, contraintes
- PM valide en répondant "✅ Validé"
- **⛔ Pas de code sans validation écrite.**

### Phase 2 — PLAN 🗂️
Décrire ce qui va être codé, fichier par fichier.
- Claude liste les fichiers à modifier + choix techniques
- **⛔ Pas de code sans validation écrite.**

### Phase 3 — VALIDATION 👁️
Vérifier avant de finaliser.
- Claude implémente + décrit quoi regarder dans le navigateur
- PM vérifie desktop (1280px+) + mobile (375px via DevTools)
- **⛔ Pas de finalisation sans validation écrite.**

### Phase 4 — CODE ✅
Livrer propre.
- Intègre les corrections, met à jour `docs/changelog.md`

**Critères de "done" :**
- [ ] Affichage correct desktop (1280px+) et mobile (375px)
- [ ] Couleurs conformes à la charte (#451DC7, #17023C, #FF63FF)
- [ ] Toutes les images avec description pour l'accessibilité
- [ ] Validation écrite du PM

---

## 11. Règles de communication

1. **Commencer par l'outcome** — l'impact avant le comment.
2. **Marquer les décisions** — **"Décision requise :"** quand le PM doit trancher.
3. **Éviter le jargon** : "balise" → "bloc", "responsive" → "adapté mobile", "CSS" → "mise en forme visuelle".
4. **Une chose à la fois** — pas deux sujets dans la même livraison.
5. **Toujours donner les instructions de test.**

---

## 12. Checklist de démarrage de session

1. Lire ce fichier `CLAUDE.md`
2. Lire `docs/changelog.md` pour savoir où on en est
3. Rappeler au PM la prochaine étape
4. Vérifier le statut de validation de l'étape précédente avant de reprendre du code

---

## 13. Prochaines étapes identifiées

| Priorité | Tâche | Notes |
|---|---|---|
| P1 | Créer `images/og-wivoo.png` (1200×630px) | Image de partage social, absente — liens OG cassés |
| P1 | SPF/DKIM Brevo | DNS chez OVH — emails en spam. À activer quand accès OVH disponible |
| P2 | Remplacer les 4 articles fictifs par de vraies missions | Contenu réel + vrais KPIs |
| P2 | Créer les 4 articles "bientôt disponible" (Média, Data Retail, Scores prédictifs, BTP) | |
| P2 | Implémenter le plan de taggage analytics | Skill `marketing-tagging-plan` disponible |
| P3 | Attributs Brevo `PROFIL` + `ARTICLE_INTERESSE` | À créer manuellement dans Brevo → Contacts → Attributs |
