# Architecture — Scene404

Site de billetterie de concerts : présentation, événements, artistes, billetterie, authentification et espace admin.

## Vue d'ensemble

```
Scene404/
├── apps/
│   ├── client/          # Front React (Vite)
│   └── server/          # API Node.js + Express
├── infra/
│   ├── docker/          # Dockerfiles client / server
│   ├── nginx/           # Config reverse proxy
│   └── docker-compose.yml
├── docs/
│   └── ARCHITECTURE.md
├── .gitignore
└── README.md
```

Chaque fichier contient un commentaire `// TODO` qui décrit son rôle.

---

## Front — `apps/client`

React (Vite) + **Tailwind CSS** pour le style.

```
client/src/
├── pages/
│   ├── Home.jsx              # Présentation
│   ├── Events.jsx            # Liste des événements
│   ├── EventDetail.jsx       # Détail d'un événement
│   ├── Artists.jsx           # Liste des artistes
│   ├── ArtistDetail.jsx
│   ├── Tickets.jsx           # Billetterie (achat)
│   ├── MyTickets.jsx         # Mes billets
│   ├── Login.jsx
│   ├── Register.jsx
│   ├── NotFound.jsx          # 404
│   └── admin/
│       ├── Dashboard.jsx
│       ├── ManageEvents.jsx
│       ├── ManageArtists.jsx
│       └── ManageTickets.jsx
├── components/
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   ├── EventCard.jsx
│   ├── ArtistCard.jsx
│   ├── ProtectedRoute.jsx    # Accès connecté
│   ├── AdminRoute.jsx        # Accès admin
│   ├── ui/                   # Composants de base réutilisables
│   │   ├── Button.jsx
│   │   ├── Input.jsx
│   │   └── Card.jsx
│   └── admin/
│       ├── AdminSidebar.jsx
│       ├── EventForm.jsx
│       └── ArtistForm.jsx
├── services/                 # Appels à l'API
│   ├── api.js                # Instance axios + token JWT
│   ├── authService.js
│   ├── eventService.js
│   ├── artistService.js
│   ├── ticketService.js
│   └── adminService.js
├── context/
│   └── AuthContext.jsx       # Utilisateur connecté (user, login, logout)
├── assets/                   # Images, logos
├── styles/
│   └── index.css             # Import Tailwind + charte (@theme)
├── App.jsx                   # Routes
└── main.jsx                  # Point d'entrée
```

**Rôle des dossiers**

| Dossier | Rôle |
|---|---|
| `pages/` | Une page = une route du site |
| `components/` | Morceaux d'interface réutilisables |
| `services/` | Toutes les requêtes HTTP vers l'API (aucun `fetch` directement dans les pages) |
| `context/` | État global partagé (utilisateur connecté) |
| `components/ui/` | Briques de base (bouton, input, carte) pour ne pas répéter les classes Tailwind |
| `styles/` | Import de Tailwind + couleurs et polices du site |

**Routes front**

| Chemin | Page | Accès |
|---|---|---|
| `/` | Home | Public |
| `/events` · `/events/:id` | Events · EventDetail | Public |
| `/artists` · `/artists/:id` | Artists · ArtistDetail | Public |
| `/tickets/:eventId` | Tickets | Connecté |
| `/my-tickets` | MyTickets | Connecté |
| `/login` · `/register` | Login · Register | Public |
| `/admin` | Dashboard | Admin |
| `/admin/events` · `/admin/artists` · `/admin/tickets` | Gestion | Admin |

**Style — Tailwind CSS**

- Installation à l'init du client : `npm install tailwindcss @tailwindcss/vite`, puis ajouter le plugin `tailwindcss()` dans `vite.config.js`.
- Les couleurs et polices du site sont définies **une seule fois** dans `styles/index.css` (`@theme`). Pas de couleurs en dur (`#123456`) dans les composants.
- Pas de fichiers `.css` par composant : tout passe par les classes Tailwind.
- Si une même combinaison de classes revient souvent → en faire un composant dans `components/ui/`.

---

## Back — `apps/server`

```
server/src/
├── routes/          # Définition des URLs → appellent les controllers
│   ├── auth.routes.js
│   ├── event.routes.js
│   ├── artist.routes.js
│   ├── ticket.routes.js
│   └── admin.routes.js
├── controllers/     # Logique de chaque route
├── models/          # User, Event, Artist, Ticket
├── middlewares/
│   ├── auth.middleware.js    # Vérifie le JWT → req.user
│   ├── admin.middleware.js   # Vérifie role === "admin"
│   └── error.middleware.js
├── config/
│   └── db.js                 # Connexion BDD
├── scripts/
│   └── seed.js               # Données de test + premier admin
├── app.js                    # Config Express
└── server.js                 # Lancement
```

**Flux d'une requête** : `routes` → `middlewares` (si protégée) → `controllers` → `models` → réponse JSON.

**Routes API**

| Méthode | Route | Accès |
|---|---|---|
| POST | `/api/auth/register` | Public |
| POST | `/api/auth/login` | Public (renvoie un JWT) |
| GET | `/api/events` · `/api/events/:id` | Public |
| GET | `/api/artists` · `/api/artists/:id` | Public |
| POST | `/api/tickets` | Connecté |
| GET | `/api/tickets/me` | Connecté |
| POST/PUT/DELETE | `/api/admin/events` · `/api/admin/events/:id` | Admin |
| POST/PUT/DELETE | `/api/admin/artists` · `/api/admin/artists/:id` | Admin |
| GET | `/api/admin/tickets` | Admin |

**Modèles**

| Modèle | Champs principaux |
|---|---|
| User | name, email, password (hashé), role (`user` / `admin`) |
| Event | titre, description, date, lieu, prix, places dispo, artistes |
| Artist | nom, description, image |
| Ticket | user, event, date d'achat, code |

---

## Authentification

1. L'utilisateur se connecte → l'API renvoie un **JWT**.
2. Le front stocke le token et l'envoie dans `Authorization: Bearer <token>`.
3. `auth.middleware.js` vérifie le token sur les routes protégées.
4. Les routes `/api/admin/*` passent en plus par `admin.middleware.js`.

> Le blocage des pages admin côté React est seulement visuel. La vraie sécurité est côté serveur.

---

## Infra — `infra/` (équipe infra)

| Élément | Rôle |
|---|---|
| `docker/` | Dockerfile du client et du server |
| `nginx/` | Reverse proxy : `/` → client, `/api` → server |
| `docker-compose.yml` | Lance client, server, BDD et nginx ensemble |

Ports par défaut en dev : client `5173`, server `5000`.

---

## Variables d'environnement

Chaque app a un `.env.example`. Copier en `.env` et remplir. **Ne jamais commit de `.env`.**

- `apps/client/.env` : `VITE_API_URL`
- `apps/server/.env` : `PORT`, `DB_URL`, `JWT_SECRET`, `JWT_EXPIRES_IN`, `CLIENT_URL`

---

## À décider en équipe

- [ ] Base de données : MongoDB ou PostgreSQL
- [ ] Répartition des fichiers / fonctionnalités entre les devs
- [ ] Branche de travail commune (`dev`) ou PR directes vers `main`
