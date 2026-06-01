# Changelog — Wivoo Landing Page

> Journal de toutes les livraisons. Mis à jour à chaque fin de phase Code.

---

## Session du 27/05/2026

### ✅ Initialisation du projet
- Création de `CLAUDE.md` — contrat de travail et méthodologie définis
- Création de la structure de dossiers du projet
- Création de `docs/changelog.md` (ce fichier)
- Création de `docs/decisions.md`
- Création de `docs/spec-hero.md` — spec Hero en attente de validation PM

---

## Session du 01/06/2026

### ✅ Landing page complète — `index.html`

**Sections livrées :**

| Section | Statut | Notes |
|---|---|---|
| Navigation | ✅ Livré | Barre fixe avec menus déroulants (Solutions, Contenus, À propos, Carrière) + CTA "Prendre RDV" + menu burger mobile |
| Hero | ✅ Livré | Titre H1, sous-titre, 4 stats (ajustement : "2–3 % des candidats recrutés" remplace "+100 consultants"), double CTA |
| Nos Expertises | ✅ Livré | 4 cartes : Product Management, Product Design, Data & IA, Formation WiAcademy |
| Nos Réalisations (aperçu) | ✅ Livré | Bloc chiffres clés + bouton "Voir toutes nos réalisations" vers `realisations.html` |
| Rejoindre Wivoo | ✅ Livré | Section recrutement avec 3 arguments chiffrés + CTA candidature (mailto) |
| Footer | ✅ Livré | Logo SVG officiel Wivoo, tagline, LinkedIn + Welcome to the Jungle |

**Écarts par rapport à la spec initiale :**
- Police : `Poppins` (utilisée) au lieu de `Inter` (spécifiée dans CLAUDE.md) — à confirmer ou aligner
- 4e stat Hero : "2–3 % des candidats recrutés" au lieu de "+100 consultants experts"

---

### ✅ Page Réalisations — `realisations.html`

**Fonctionnalités livrées :**
- Hero compact (60 vh) avec les mêmes stats que la landing
- Barre de filtres sticky avec pills multi-sélection sur deux axes : **Expertise** (Produit, Data, AI, Design) et **Secteur** (Banque, Retail, Pharma, Beauté, Média, BTP)
- Compteur de résultats en temps réel + bouton "Effacer les filtres"
- Grille 3 colonnes desktop / 2 tablette / 1 mobile avec 8 cards au total

**8 cards cas clients :**

| # | Titre | Expertise | Secteur | Statut |
|---|---|---|---|---|
| 1 | Chatbot GenAI Banque | AI + Data | Banque | ✅ Article disponible |
| 2 | Retail Sportif Européen | Produit + Design | Retail | ✅ Article disponible |
| 3 | E-commerce Pharma Mondial | Produit | Pharma | ✅ Article disponible |
| 4 | Expérience Beauté Magasin | Design | Beauté | ✅ Article disponible |
| 5 | Abonnements Média | Produit + Data | Média | ⏳ Article bientôt |
| 6 | Données Retail | Data | Retail | ⏳ Article bientôt |
| 7 | Scores Prédictifs Retail | AI + Data | Retail | ⏳ Article bientôt |
| 8 | Service Client BTP | Produit + Design | BTP | ⏳ Article bientôt |

**Fonctionnalité "Me notifier" :** formulaire email intégré aux cards "bientôt", avec sélection de profil (Candidat / Entreprise), validation et message de succès. Backend non connecté (console.log pour l'instant).

---

### ✅ 4 Articles détaillés — `articles/`

| Fichier | Sujet | Expertise | Secteur |
|---|---|---|---|
| `chatbot-banque.html` | Refonte chatbot avec GenAI | AI | Banque |
| `retail-sport.html` | Engagement utilisateur retail sportif | Produit + Design | Retail |
| `ecommerce-pharma.html` | Déploiement e-commerce mondial | Produit | Pharma |
| `beaute-magasin.html` | Expérience client en magasin | Design | Beauté |

---

### ✅ Fix — sections articles invisibles

**Problème :** Les sections des articles ne s'affichaient pas — l'animation fade-in n'était pas déclenchée car les éléments n'étaient pas observés par l'IntersectionObserver.

**Solution :** Correction dans `js/main.js` pour que toutes les sections des pages articles soient bien observées au chargement.

---

## État actuel — 01/06/2026

### Ce qui est livré et commité

| Fichier | État |
|---|---|
| `index.html` | ✅ Livré |
| `realisations.html` | ✅ Livré |
| `articles/chatbot-banque.html` | ✅ Livré |
| `articles/retail-sport.html` | ✅ Livré |
| `articles/ecommerce-pharma.html` | ✅ Livré |
| `articles/beaute-magasin.html` | ✅ Livré |
| `css/style.css` | ✅ Livré |
| `css/article.css` | ✅ Livré |
| `js/main.js` | ✅ Livré |
| `js/filters.js` | ✅ Livré |

### Modifications non commitées (à traiter)

Les fichiers suivants ont des modifications en cours non sauvegardées :
`index.html`, `realisations.html`, 4 articles, `css/style.css`, `css/article.css`, `js/filters.js`, `vercel.json`

---

### Points ouverts à traiter

| # | Point | Priorité |
|---|---|---|
| 1 | **Police** : aligner sur `Inter` (spec) ou valider `Poppins` (code actuel) | Décision requise |
| 2 | **Modifications en cours** : identifier et commiter (ou annuler) les changements non sauvegardés | Urgent |
| 3 | **Backend notifications** : connecter le formulaire "Me notifier" à un vrai service d'envoi email | Backlog |
| 4 | **4 articles restants** : rédiger et lier les cards Média, Retail Data, Scores Prédictifs, BTP | Backlog |
