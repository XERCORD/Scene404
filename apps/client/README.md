# Scene404 — client

Front React (Vite) + Tailwind CSS. Site vitrine de l'événement : Accueil, Artistes,
Équipe 404, Billetterie, Contact.

## Développement

```powershell
Copy-Item .env.example .env
npm install
npm run dev
```

## Contenu du site (Directus)

Les textes et images modifiables (infos de l'événement, artistes, équipe, tarifs, FAQ)
sont lus depuis Directus via `VITE_DIRECTUS_URL` (`src/services/contentService.js`).

- Variable vide ou Directus injoignable : le site affiche le contenu d'exemple de `src/data/`.
- Mise en place de Directus et de ses collections : voir `infra/directus/setup.mjs`.

## Déploiement (équipe infra)

- Build : `npm ci && npm run build` → fichiers statiques dans `dist/`.
- Les variables `VITE_*` sont lues **au moment du build**, pas au démarrage du conteneur.
- Le site utilise le routage côté navigateur : toute URL inconnue du serveur doit renvoyer
  `index.html` (Nginx : `try_files $uri $uri/ /index.html;`).
- Directus doit autoriser l'origine du site en CORS (`CORS_ORIGIN`).
