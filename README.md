# POKER-API-MDS - API REST pour Tables de Poker

## Description

API REST développée dans le cadre d'un cours, permettant la gestion de tables de poker en ligne.  
L'API offre des fonctionnalités pour rejoindre/quitter des tables, démarrer des parties et effectuer des actions de jeu (miser, se coucher, etc.).

## Auteurs

- Chapon Lalie
- Cormier Antoine

## Technologies utilisées

- [NestJS](https://nestjs.com/) v11.0.1 - Framework backend Node.js
- [TypeScript](https://www.typescriptlang.org/) - Langage de programmation
- [SQLite3](https://www.sqlite.org/) v5.7 - Base de données
- [TypeORM](https://typeorm.io/) v0.3.21 - ORM
- [JWT](https://jwt.io/) v11.0.0 - Authentification
- [Swagger](https://swagger.io/) v11.0.6 - Documentation API

## Installation

### Prérequis

- [Node.js](https://nodejs.org/) (v14+)
- [NPM](https://www.npmjs.com/) ou [Yarn](https://yarnpkg.com/)

### Étapes d'installation

```bash
# Cloner le dépôt
git clone https://github.com/votre-repo/poker-api-mds.git

# Accéder au répertoire
cd poker-api-mds

# Installer les dépendances
npm install
```

## Compile et exécution du projet

```bash
# Mode développement
npm run start

# Watch mode
npm run start:dev

# Mode production
npm run start:prod
```

### Accéder à la documentation Swagger

Ouvrir votre navigateur et accéder à : [http://localhost:3000/api](http://localhost:3000/api)

---

## Structure du projet

```
src/
│── auth/                 # Authentification et autorisation
│── tables/               # Gestion des tables de poker
│   │── dto/              # Objets de transfert de données
│   │── tables.controller.ts  # Contrôleur REST
│   │── tables.service.ts     # Logique métier
│── app.module.ts         # Module principal
│── main.ts               # Point d'entrée de l'application
```

---

## API REST - Endpoints

### Tables

- `GET /tables` - Obtenir toutes les tables disponibles (public)
- `GET /tables/:id` - Obtenir les détails d'une table spécifique (public)
- `POST /tables/:id` - Rejoindre ou quitter une table
- `POST /tables/:id/start` - Démarrer une partie
- `POST /tables/:id/action` - Effectuer une action de jeu

📌 _Pour une documentation complète des endpoints, consultez la documentation Swagger sur `/api`._

---

## Exécuter les tests

```bash
# Tests unitaires
npm run test

# Tests e2e
npm run test:e2e

# Couverture des tests
npm run test:cov
```

---

## Licence

Ce projet est développé dans le cadre d'un cours et **n'est pas** sous licence open source.

---

## Remarque

Ce projet est uniquement destiné à des fins éducatives et démonstratives pour illustrer l'application des principes REST dans le développement d'une API pour un jeu de poker.
