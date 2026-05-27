# Décisions — Wivoo Landing Page

> Journal des décisions structurantes prises pendant le projet, avec leur justification.
> Ce fichier permet de comprendre *pourquoi* les choses sont faites ainsi, pas seulement *comment*.

---

## 27/05/2026 — Stack technique

**Décision :** HTML5 + CSS3 + JavaScript vanilla (pas de framework)  
**Pourquoi :** La landing page doit s'ouvrir directement dans le navigateur avec un double-clic sur `index.html`, sans installation ni serveur. Cette approche est la plus simple, la plus rapide à mettre en œuvre, et ne crée aucune dépendance technique.  
**Alternative écartée :** Next.js / React — trop lourd pour un fichier statique, nécessite Node.js et une ligne de commande.

---

## 27/05/2026 — Charte graphique

**Décision :** Utilisation de la charte graphique Wavestone  
**Couleurs retenues :**
- Persian Blue `#451DC7` — couleur principale
- Tolopea `#17023C` — couleur secondaire (fonds sombres)
- Pink Flamingo `#FF63FF` — accent (CTA, hover, éléments d'attention)

**Pourquoi :** Positionnement sobre & corporate, avec un accent fort pour créer de la hiérarchie visuelle sans surcharger la page.

---

## 27/05/2026 — Sections de la landing page

**Décision :** 2 sections de contenu + navigation + footer
1. Hero / Accroche
2. Nos Réalisations (logos clients + chiffres clés)

**Pourquoi :** Le PM a sélectionné ces deux sections. Une landing page ciblée et concise convertit mieux qu'une page trop chargée.  
**Sections non retenues pour l'instant :** Services, À propos, Témoignages — peuvent être ajoutées en itération 2.

---
