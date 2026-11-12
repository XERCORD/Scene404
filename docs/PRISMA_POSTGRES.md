# Configuration Prisma et PostgreSQL

Ce document explique la configuration ajoutée à l'API Scene404, son rôle et la
façon de l'utiliser en développement local.

## Objectif

L'API Express utilise PostgreSQL comme base de données et Prisma ORM comme
client d'accès aux données et outil de migrations. Le client Prisma est partagé
par l'application : les contrôleurs et services peuvent l'importer sans créer
une nouvelle connexion à chaque requête.

## Fichiers et responsabilités

| Fichier | Rôle |
|---|---|
| `apps/server/prisma/schema.prisma` | Décrit les modèles, relations et types PostgreSQL de l'application. |
| `apps/server/prisma.config.ts` | Configure les commandes Prisma CLI, le schéma, le dossier de migrations et l'URL de connexion. |
| `apps/server/src/config/db.js` | Crée et exporte l'instance partagée de `PrismaClient`, avec l'adaptateur PostgreSQL. |
| `apps/server/src/app.js` | Configure Express, CORS et le décodage JSON; expose aussi `GET /api/health`. |
| `apps/server/src/server.js` | Se connecte à PostgreSQL avant d'ouvrir le port HTTP et ferme proprement le serveur et Prisma à l'arrêt. |
| `apps/server/.env.example` | Donne les variables nécessaires et l'URL de connexion au PostgreSQL local. |
| `infra/docker-compose.yml` | Lance PostgreSQL pour le développement local, avec un volume persistant et un contrôle de disponibilité. |
| `.gitignore` | Exclut le client Prisma généré; il est recréé depuis le schéma et les dépendances. |

Prisma ORM 7 place l'URL de base de données dans `prisma.config.ts` et utilise
un adaptateur de pilote pour PostgreSQL. C'est pourquoi la configuration ajoute
`@prisma/adapter-pg` et `@prisma/client`, ainsi que Prisma CLI dans les
dépendances de développement.

## Modèles et relations

Le schéma reprend les entités prévues dans l'architecture Scene404 :

- **User** : nom, adresse e-mail unique, mot de passe, rôle `user` ou `admin`,
  dates de création et de mise à jour.
- **Artist** : nom, description et image facultatives.
- **Event** : titre, description, date, lieu, prix décimal et nombre de places.
  Un événement peut avoir plusieurs artistes; un artiste peut participer à
  plusieurs événements.
- **Ticket** : code unique, date d'achat, utilisateur et événement associés.

Les relations des billets empêchent la suppression d'un utilisateur ou d'un
événement qui possède déjà des billets. Les identifiants sont générés par
Prisma. Le mot de passe est stocké dans un champ prévu à cet effet : il devra
être haché par la logique d'inscription avant d'être enregistré; le schéma ne
hachera jamais lui-même une valeur.

## Démarrage local (PowerShell)

Depuis la racine du dépôt :

```powershell
Copy-Item apps\server\.env.example apps\server\.env
docker compose -f infra\docker-compose.yml up -d db
Set-Location apps\server
npm install
npm run db:generate
npm run db:migrate -- --name init
npm run dev
```

Prisma 7 génère le client en TypeScript. Les scripts Node utilisent donc le
mode natif de suppression des types, et l'API requiert Node.js `22.6.0` ou plus
récent.

Le fichier `.env` contient déjà l'URL correspondant au service PostgreSQL
Compose local. Remplacez `JWT_SECRET` par une valeur aléatoire avant d'ajouter
des fonctionnalités d'authentification. Les identifiants PostgreSQL présents
dans Compose sont réservés au développement et ne doivent pas être réutilisés
en production.

Le serveur attend une connexion réussie à PostgreSQL avant d'écouter sur le
port `5000`. Si la variable `DATABASE_URL` manque ou si PostgreSQL n'est pas
joignable, le démarrage échoue au lieu de lancer une API qui ne peut pas
accéder à ses données.

## Commandes Prisma

À exécuter depuis `apps/server` :

```powershell
# Régénérer le client après une modification du schéma
npm run db:generate

# Créer une migration de développement et l'appliquer à PostgreSQL
npm run db:migrate -- --name nom_de_la_migration

# Ouvrir l'interface d'inspection des données
npm run db:studio
```

Les migrations versionnées dans `prisma/migrations` décrivent les changements
du schéma et permettent de les appliquer de manière reproductible. Évitez de
modifier la base manuellement ou d'utiliser `db push` comme remplacement des
migrations partagées par l'équipe.

## Utiliser Prisma dans l'API

Importez le client partagé dans un contrôleur ou un service :

```js
import { prisma } from "../config/db.js";

const users = await prisma.user.findMany();
```

Les modèles Prisma sont accessibles en minuscules (`prisma.user`,
`prisma.event`, etc.). Fermez les connexions uniquement à l'arrêt du serveur;
ne créez pas de `PrismaClient` à l'intérieur d'un gestionnaire de route.

## Vérification de l'API

Une fois l'API démarrée, cette route de santé répond avec un JSON :

```text
GET http://localhost:5000/api/health
```

Réponse attendue :

```json
{ "status": "ok" }
```

Cette route confirme que le serveur HTTP répond. La connexion PostgreSQL est,
elle, vérifiée au démarrage avant l'ouverture du port.
