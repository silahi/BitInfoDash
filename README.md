![Image description](images/BitInfoDash-logo.png)

BitInfoDash est un tableau de bord interactif et informatif dédié à l'écosystème Bitcoin. Ce tableau de bord dynamique a pour but d’ aider les utilisateurs, qu'ils soient novices ou expérimentés dans le domaine du Bitcoin, à comprendre et à suivre divers aspects du réseau Bitcoin.

## Fonctionnalités clés 

1. **Vue d'ensemble Bitcoin :** Affichera des informations en temps réel telles que le prix actuel du Bitcoin, la capitalisation boursière, le volume d'échange et les variations récentes.

2. **Analyse de la Blockchain :** Comprendra des graphiques interactifs pour visualiser les transactions, les frais de transaction, la répartition du hashrate, et d'autres données de la blockchain Bitcoin.

3. **Suivi des Adresses :** Permettra aux utilisateurs de surveiller les activités de leurs propres adresses Bitcoin ou d'autres adresses d'intérêt, affichant l'historique des transactions et le solde actuel.

4. **Tendances du Marché :** Présentera des graphiques et des indicateurs de tendance pour aider les investisseurs et les traders à prendre des décisions éclairées.

5. **Sécurité du Réseau :** Surveillera et alertera les utilisateurs en cas d'activités suspectes ou de vulnérabilités détectées sur le réseau Bitcoin.

BitInfoDash est en cours de développement et vise à être prêt pour une présentation complète pendant le hackathon. Ce tableau de bord a pour but de contribuer à l'objectif de l'inclusion financière et à la promotion de l'expertise Bitcoin au Sénégal.


# Guide de Configuration et d'Exécution en local

Ce guide va vous aider à configurer et exécuter BitInfoDash localement. Ce tableau de bord interactif dédié à l'écosystème Bitcoin utilise des technologies variées pour offrir une expérience utilisateur complète. Le projet est structuré en une seule branche, avec des dossiers distincts pour le backend et le frontend.

## Technologies Utilisées

### Backend (JHipster, Spring Boot, PostgreSQL)

#### 1. JHipster

[JHipster](https://www.jhipster.tech/) a été choisi comme générateur d'application pour simplifier et accélérer le développement. Il fournit un ensemble complet de fonctionnalités prêtes à l'emploi, y compris l'authentification, l'autorisation, et la gestion de l'API.

#### 2. Spring Boot

[Spring Boot](https://spring.io/projects/spring-boot) est utilisé comme cadre de développement pour le backend. Il offre une structure modulaire pour le développement d'applications Java, ce qui facilite la création d'API REST sécurisées et efficaces.

#### 3. PostgreSQL

[PostgreSQL](https://www.postgresql.org/) est choisi comme système de gestion de base de données en raison de sa stabilité, de sa flexibilité, et de sa compatibilité avec Spring Boot. Il stockera les données nécessaires pour le tableau de bord, notamment les informations sur les transactions, les adresses Bitcoin, etc.

### Frontend (Angular)

#### 1. Angular

[Angular](https://angular.io/) est le framework frontend choisi pour son approche modulaire et sa robustesse. Il offre une structure bien définie pour organiser le code, facilite la création d'interfaces utilisateur réactives, et permet l'utilisation de bibliothèques tierces pour les graphiques interactifs.

## Structure du Projet

Le projet BitInfoDash est organisé en deux dossiers principaux :

1. **backend** : Contient le code source du backend, développé avec JHipster qui repose sur Spring Boot.
   
2. **frontend** : Contient le code source du frontend, développé avec Angular.

3. **docker-compose.yml** : Fichier pour déployer l'application à l'aide de Docker.

4. **scripts** :
    - **install.sh** : Script d'installation pour installer les dépendances du backend et du frontend.
    - **configure.sh** : Script pour configurer la base de données et autres paramètres.
    - **start.sh** : Script pour démarrer l'application localement.

## Guide d'Installation et d'Exécution

### Prérequis

Assurez-vous d'avoir installé les outils suivants sur votre machine :

- [Node.js](https://nodejs.org/)
- [Java Development Kit (JDK)](https://www.oracle.com/java/technologies/javase-downloads.html)
- [PostgreSQL](https://www.postgresql.org/download/)
- [Docker](https://www.docker.com/get-started)

### Étapes d'Installation

1. **Clonez le Référentiel**

    ```bash
    git clone https://github.com/silahi/BitInfoDash.git
    ```

2. **Backend : Installation et Configuration de la Base de Données**

    - Allez dans le dossier `backend`.
    - Exécutez le script d'installation :

        ```bash
        ../scripts/install.sh
        ```

    - Configurez les paramètres de connexion dans `backend/src/main/resources/application-dev.yml`.

3. **Frontend : Installation des Dépendances**

    - Allez dans le dossier `frontend`.
    - Exécutez le script d'installation :

        ```bash
        ../scripts/install.sh
        ```

4. **Configuration Globale**

    - Exécutez le script de configuration pour paramétrer l'application :

        ```bash
        ../scripts/configure.sh
        ```

5. **Backend et Frontend : Exécution avec Docker**

    - Utilisez Docker Compose pour démarrer l'application :

        ```bash
        docker-compose up -d
        ```

    - L'application sera disponible à l'adresse [http://localhost:4200](http://localhost:4200).

6. **Arrêt de l'Application**

    - Pour arrêter l'application, utilisez la commande suivante :

        ```bash
        docker-compose down
        ```

Félicitations ! Vous avez maintenant BitInfoDash en cours d'exécution localement. N'hésitez pas à explorer les fonctionnalités et à contribuer au projet.

---

Ceci conclut le guide d'installation pour BitInfoDash. En cas de problème, consultez la documentation détaillée dans le dossier du projet ou contactez les contributeurs.