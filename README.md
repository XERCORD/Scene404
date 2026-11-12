# Scene404

Site de billetterie de concerts (projet YDAYS — Ynov B3).

## Stack

- **Front** : React (Vite) + Tailwind CSS — `apps/client`
- **Back** : Node.js + Express — `apps/server`
- **Base de données** : PostgreSQL + Prisma ORM — `apps/server/prisma`
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

Configuration Prisma et PostgreSQL : [docs/PRISMA_POSTGRES.md](docs/PRISMA_POSTGRES.md)

## Lancer le projet en local

```powershell
# Depuis la racine du dépôt
Copy-Item apps\server\.env.example apps\server\.env
docker compose -f infra\docker-compose.yml up -d db
Set-Location apps\server
npm install
npm run db:generate
npm run db:migrate -- --name init
npm run dev
```

Dans un autre terminal PowerShell, depuis la racine du dépôt, lancez le front :

```powershell
Copy-Item apps\client\.env.example apps\client\.env
Set-Location apps\client
npm install
npm run dev
```

Le serveur API attend la connexion à PostgreSQL avant d'écouter sur le port
5000. `GET /api/health` fournit une vérification simple de disponibilité.

## Règles Git

- Pas de push direct sur `main`.
- Une branche par fonctionnalité : `feat/auth`, `feat/events`, `fix/navbar`…
- Merge via Pull Request, relue par au moins une personne.
- Messages de commit : `feat: ...`, `fix: ...`, `chore: ...`, `docs: ...`
