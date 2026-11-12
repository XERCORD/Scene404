# Scene404

Site de billetterie de concerts (projet YDAYS — Ynov B3).

## Stack

- **Front** : React (Vite) + Tailwind CSS — `apps/client`
- **Back** : Node.js + Express — `apps/server`
- **Base de données** : à définir (MongoDB ou PostgreSQL)
- **Infra** : Docker + Nginx — `infra/`

## Structure

```
Scene404/
├── apps/
│   ├── client/   # Front React
│   └── server/   # API Express
├── infra/        # Docker, Nginx (équipe infra)
└── docs/         # Documentation (ARCHITECTURE.md)
```

Détail complet : [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)

## Lancer le projet en local

> À compléter une fois les projets initialisés.

```bash
# Back
cd apps/server
cp .env.example .env   # puis remplir les valeurs
npm install
npm run dev

# Front
cd apps/client
cp .env.example .env
npm install
npm run dev
```

## Règles Git

- Pas de push direct sur `main`.
- Une branche par fonctionnalité : `feat/auth`, `feat/events`, `fix/navbar`…
- Merge via Pull Request, relue par au moins une personne.
- Messages de commit : `feat: ...`, `fix: ...`, `chore: ...`, `docs: ...`
