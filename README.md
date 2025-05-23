# NextJS Memecoin App

Ce projet est un exercice pour apprendre à utiliser React avec NextJS tout en intégrant Prisma comme ORM pour établir une connexion à une base de données PostgreSQL. Il inclut des fonctionnalités telles que des composants côté serveur, des actions côté serveur et une gestion optimisée de l'environnement.

---

## Table des matières

1. [Prérequis](#prérequis)
2. [Configuration](#configuration)
3. [Démarrage](#démarrage)

---

## Prérequis

Avant de démarrer, assurez-vous d'avoir installé les outils suivants :

- **Node.js** (version LTS recommandée)
- **npm** (ou un gestionnaire de packages équivalent)
- **PostgreSQL** (ou autre base de données compatible avec Prisma)

---

## Configuration

### Variables d'environnement `.env`

Dupliquer le fichier `.env.example` et renommez-le en `.env`. Ajoutez les valeurs nécessaires dans ce fichier en fonction de votre environnement. Voici les variables principales :

- **`DATABASE_URL`** : Lien de connexion à votre base de données PostgreSQL (ou autre).
- **`JWT_SECRET`** : Clé secrète utilisée pour signer les tokens JWT.
- **`MDP_LOGIN`** : Mot de passe utilisée pour le login

**Exemple de fichier `.env` :**

```env
DATABASE_URL="postgresql://postgres:admin@localhost:5432/mydb?schema=public"
JWT_SECRET="votreclésecrète"
MDP_LOGIN="mdp"
```
---
## Démarrage

### Installer les dépendances

Exécutez la commande suivante pour installer toutes les dépendances du projet :

```bash
npm install
```

### Configurer Prisma

Après avoir configuré vos variables d'environnement, exécutez la commande suivante pour créer le client Prisma et appliquer les migrations à la base de données :

```bash
npx prisma migrate dev
```

### Lancer l'application en mode développement

Pour démarrer l’application avec un rechargement dynamique (mode développement) :

```bash
npm run dev
```

### Compiler pour production

Pour préparer l’application pour la mise en production :

```bash
npm run build
```

---

