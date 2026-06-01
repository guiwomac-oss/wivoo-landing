# CLAUDE.md — Wivoo Landing Page

> Ce fichier est le **contrat de travail** entre le Product Manager et Claude Code.
> Il définit comment on travaille ensemble. À relire au début de chaque session.

---

## 1. Vue d'ensemble du projet

| Champ | Détail |
|---|---|
| **Client** | Wivoo — cabinet de conseil en Product Management, AI, Data & Design |
| **Livrable** | Landing page statique (`index.html`) ouverte directement dans le navigateur |
| **Contact PM** | guido.macaluso@wivoo.fr |
| **Stack** | HTML5 + CSS3 + JavaScript vanilla — aucun framework, aucun serveur requis |
| **Déploiement** | Aucun — on ouvre `index.html` dans le navigateur en local |

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

Les missions sont adaptées aux besoins de chaque client — l'interlocuteur et le périmètre varient selon les projets.

---

### Les deux cibles de la landing page

La page doit parler simultanément à **deux audiences distinctes** :

#### 🎯 Cible 1 — Clients prospects & leads
- **Qui :** Toute organisation (startup, PME, grand compte) qui a besoin d'expertise en Product, AI, Data ou Design
- **Besoin :** Trouver un partenaire de confiance, évaluer la crédibilité de Wivoo, être convaincus par des réalisations concrètes
- **Message clé :** "Wivoo livre des résultats mesurables — voici la preuve"
- **Action attendue :** Prendre contact pour discuter d'une mission

#### 🎯 Cible 2 — Candidats potentiels
- **Qui :** Consultants expérimentés ou profils PM/Data/AI/Design qui cherchent à rejoindre un cabinet
- **Besoin :** Comprendre la culture, les types de missions, le niveau d'expertise attendu
- **Message clé :** "Des missions ambitieuses, des expertises reconnues"
- **Action attendue :** Postuler ou envoyer un message de candidature

> **Décision requise (phase Spec) :** comment traiter les deux cibles sur la page — deux CTA distincts, deux sections séparées, ou un fil conducteur clients avec renvoi recrutement ?

---

### Contenu des réalisations — REX & études de cas

- **Format :** Fiches études de cas avec contexte de mission, problématique, solution apportée, KPIs chiffrés
- **Domaines couverts :** Product Management · Intelligence Artificielle · Data · Design
- **Contenu initial :** Exemples fictifs mais réalistes pour poser le format — à remplacer par de vraies missions au fur et à mesure
- **Objectif :** Démontrer la crédibilité de Wivoo par des résultats concrets et mesurables

---

## 3. Stack technique

**HTML5 + CSS3 + JavaScript vanilla**

Pas de framework, pas d'installation, pas de ligne de commande.  
Tu ouvres `index.html` dans ton navigateur et tu vois le résultat immédiatement.

```
Challange Showcase Claude/
├── index.html          → Page principale (unique point d'entrée)
├── css/
│   └── style.css       → Toute la mise en forme visuelle
├── js/
│   └── main.js         → Interactions et animations (menu, scroll…)
├── images/             → Logo, photos, illustrations
├── docs/               → Documentation de chaque étape (voir section 4)
└── CLAUDE.md           → Ce fichier
```

**Règle d'or :** un double-clic sur `index.html` suffit pour voir le site. Rien d'autre à installer.

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

### Typographie (Google Fonts — chargement automatique)
- **Titres :** `Poppins` — poids 700 (bold)
- **Corps de texte :** `Poppins` — poids 400 (regular)
- **Accent / labels :** `Poppins` — poids 600 (semi-bold), lettrage espacé

### Style général
- Sobre & Corporate
- Beaucoup d'espace blanc entre les sections
- Pas d'effets visuels surchargés — sobriété et lisibilité avant tout
- L'accent Pink Flamingo (#FF63FF) est utilisé avec parcimonie pour créer du contraste

---

## 5. Structure de la landing page

### Sections dans l'ordre d'apparition

| # | Section | Contenu | Cible |
|---|---|---|---|
| 1 | **Navigation** | Logo Wivoo + liens d'ancrage vers les sections | Toutes |
| 2 | **Hero** | Accroche principale, sous-titre, double CTA | Toutes |
| 3 | **Nos expertises** | Les 4 domaines : Product · AI · Data · Design | Prospects |
| 4 | **Nos réalisations** | Fiches REX / études de cas avec KPIs par domaine | Prospects |
| 5 | **Rejoindre Wivoo** *(à confirmer)* | Pitch recrutement + CTA candidature | Candidats |
| 6 | **Footer** | Contact email, liens légaux | Toutes |

> **Décision requise (phase Spec) :** valider l'ordre des sections, le contenu de chaque bloc, et la présence/forme de la section recrutement.

---

## 6. Méthodologie de travail

Chaque fonctionnalité ou section suit **4 phases dans l'ordre strict**. Aucune phase ne peut être sautée.

---

### Phase 1 — SPEC 📋
**Objectif :** définir précisément ce qu'on va construire avant d'écrire une seule ligne de code.

**Ce que Claude produit :**
- Description de la section en langage naturel
- Contenu exact (textes, images, liens)
- Contraintes éventuelles (couleurs spécifiques, comportement mobile)

**Ce que le PM fait :**
- Relire la spec
- Corriger ou valider en répondant "✅ Validé" ou en précisant les changements

**Document créé :** `docs/spec-[nom-section].md`  
**⛔ On ne passe pas à la phase suivante sans validation écrite du PM.**

---

### Phase 2 — PLAN 🗂️
**Objectif :** décrire précisément ce qui va être codé, fichier par fichier.

**Ce que Claude produit :**
- Liste numérotée des fichiers à créer ou modifier
- Liste des choix techniques et pourquoi
- Chaque point marqué **"Décision requise :"** si le PM doit trancher

**Ce que le PM fait :**
- Valider ou ajuster le plan

**Document créé :** `docs/plan-[nom-section].md`  
**⛔ On ne passe pas à la phase suivante sans validation écrite du PM.**

---

### Phase 3 — VALIDATION 👁️
**Objectif :** vérifier que le code produit correspond à la spec avant de finaliser.

**Ce que Claude fait :**
- Implémente une version préliminaire
- Décrit ce qu'il faut regarder dans le navigateur
- Signale tout écart par rapport à la spec

**Ce que le PM fait :**
- Ouvrir `index.html` dans le navigateur
- Vérifier sur mobile (DevTools → icône téléphone) et sur desktop
- Répondre "✅ Validé" ou lister les corrections

**Document créé :** `docs/validation-[nom-section].md` avec le résultat de la review  
**⛔ On ne finalise pas le code sans validation écrite du PM.**

---

### Phase 4 — CODE ✅
**Objectif :** livrer le code final, propre et documenté.

**Ce que Claude fait :**
- Intègre les corrections de la phase Validation
- Commente le code aux endroits importants (en français)
- Met à jour `docs/changelog.md` avec ce qui a été fait

**Critères de "done" :**
- [ ] La section s'affiche correctement sur desktop (1280px+)
- [ ] La section s'affiche correctement sur mobile (375px) — vérifier via DevTools
- [ ] Les couleurs respectent la charte (#451DC7, #17023C, #FF63FF)
- [ ] Toutes les images ont un texte alternatif (`alt="..."`)
- [ ] Le PM a donné son approbation écrite sur le rendu final

---

## 7. Documentation — dossier `/docs`

**Chaque étape génère un fichier de documentation.** Ces fichiers constituent la mémoire du projet.

```
docs/
├── changelog.md                    → Journal de toutes les modifications (mis à jour à chaque livraison)
├── decisions.md                    → Journal des décisions importantes et pourquoi on les a prises
│
├── brief-editorial.md              → Histoire Wivoo, ton de voix, messages clés, ressenti cible
├── personas.md                     → Profils détaillés des deux cibles (prospect & candidat)
├── contenu-brut.md                 → Tous les textes, chiffres et fiches REX de la page
├── references-visuelles.md         → Sites de référence, principes visuels, ce qu'on évite
│
├── spec-[section].md               → Spec de chaque section (créé en phase Spec)
├── plan-[section].md               → Plan d'implémentation (créé en phase Plan)
└── validation-[section].md         → Résultat de la review PM (créé en phase Validation)
```

**Format type d'un fichier de doc :**
```markdown
# [Spec / Plan / Validation] — [Nom de la section]
**Date :** JJ/MM/AAAA
**Statut :** En attente de validation / ✅ Validé / ❌ À revoir

## Contenu / Décisions / Observations
...

## Validation PM
[ ] En attente  /  [x] Validé le JJ/MM/AAAA  /  Commentaires : ...
```

---

## 8. Règles de communication

Claude doit toujours :

1. **Commencer par l'outcome** — "Ce changement va rendre le bouton plus visible sur mobile" avant d'expliquer comment.
2. **Marquer les décisions** — tout choix qui nécessite l'avis du PM est précédé de **"Décision requise :"**.
3. **Éviter le jargon technique** — traductions obligatoires :
   - "div / balise" → "bloc"
   - "responsive" → "adapté mobile"
   - "commiter" → "sauvegarder une version"
   - "CSS" → "mise en forme visuelle"
   - "attribut alt" → "description de l'image pour l'accessibilité"
4. **Une chose à la fois** — jamais deux sections ou deux changements non liés dans la même livraison.
5. **Toujours donner les instructions de test** — dire exactement où regarder et quoi vérifier dans le navigateur.

---

## 9. Checklist de démarrage de session

Au début de chaque session de travail, Claude doit :

1. Lire ce fichier `CLAUDE.md`
2. Lire `docs/changelog.md` pour savoir où on en est
3. Rappeler au PM la prochaine étape à réaliser
4. Ne jamais reprendre du code en cours sans avoir vérifié le statut de validation de l'étape précédente
