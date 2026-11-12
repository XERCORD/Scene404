# Intégration continue (CI)

Le workflow GitHub Actions se trouve dans
`.github/workflows/ci.yml`. Il automatise les vérifications du serveur Scene404
à chaque push et à chaque pull request. Il peut aussi être lancé manuellement
depuis l'onglet **Actions** de GitHub.

## Ce que le workflow vérifie

Chaque exécution utilise un environnement Linux neuf et une base PostgreSQL 17
temporaire. Les identifiants définis dans le workflow sont réservés à cette
base de test éphémère : ils ne donnent pas accès à la base locale ou à une base
de production. La base du workflow est détruite à la fin de l'exécution.

Les étapes s'exécutent dans `apps/server`, dans cet ordre :

1. **Récupérer le dépôt** avec `actions/checkout`.
2. **Configurer Node.js 24** et mettre en cache les paquets npm en s'appuyant
   sur `apps/server/package-lock.json`.
3. **Installer les dépendances** avec `npm ci`. Cette commande installe les
   versions exactes enregistrées dans le fichier de verrouillage.
4. **Générer le client Prisma** avec `npm run db:generate`.
5. **Valider le schéma Prisma** avec `npx prisma validate`.
6. **Appliquer les migrations** avec `npx prisma migrate deploy` sur la base
   temporaire. Cela vérifie que les migrations versionnées peuvent construire
   le schéma de la base.
7. **Lancer les tests** avec `npm test`.

Le test actuel démarre Express sur un port temporaire, appelle
`GET /api/health`, puis vérifie le code HTTP `200` et la réponse
`{ "status": "ok" }`. Il ferme ensuite le serveur de test.

## Lire le résultat sur GitHub

- Une coche verte signifie que toutes les étapes ont réussi.
- Une croix rouge signifie qu'une étape a échoué. Les journaux du workflow
  indiquent la commande en échec et son erreur; les étapes suivantes ne sont
  alors pas exécutées.

Les exécutions apparaissent dans l'onglet **Actions** du dépôt. Le workflow ne
se déclenchera sur GitHub qu'après avoir poussé la branche qui contient
`.github/workflows/ci.yml`. Les permissions du workflow sont limitées à la
lecture du contenu du dépôt; il ne publie pas de paquet et ne déploie pas
l'application.

## Limites actuelles

- Le workflow vérifie uniquement l'API dans `apps/server`. Le client n'a pas
  encore de configuration npm/tests à exécuter.
- Le test HTTP vérifie uniquement la route de santé. Pour chaque nouvelle
  fonctionnalité, ajoutez des tests correspondants.
- La base PostgreSQL de CI est isolée de PostgreSQL local et de toute base
  utilisée par l'équipe.

## Reproduire les vérifications localement

Depuis `apps/server`, avec PostgreSQL démarré et `DATABASE_URL` configurée dans
`.env`, les commandes suivantes reproduisent les étapes principales :

```powershell
npm ci
npm run db:generate
npx prisma validate
npx prisma migrate deploy
npm test
```
