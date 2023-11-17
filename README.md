![Image description](./ui-ux/01-%20Maquette-Acceuil.png)

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

3. **docker-compose.yml** : Fichier pour pour la configuration de la base de données PostgreSQL.

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

2. **Allez dans le dossier BitInfoDash**


### Configuration Globale

1. **Option 1 - Utiliser Docker (Recommandé si Docker est installé) :**

    - Assurez-vous d'avoir Docker installé sur votre machine. Si ce n'est pas le cas, vous pouvez le télécharger depuis [le site officiel Docker](https://www.docker.com/get-started).

    - Allez dans le dossier `backend`.

    - Ouvrez le fichier `src/main/resources/application-dev.yml` et assurez-vous que les paramètres de connexion de la base de données sont configurés comme suit :

        ```yaml
        url: jdbc:postgresql://localhost:5432/bitinfodash
        username: bitinfodash
        password: bitinfodash
        ```

    - Revenez à la racine du projet.

    - Exécutez la commande suivante pour démarrer la base de données PostgreSQL avec Docker Compose :

        ```bash
        docker-compose -f src/main/docker/postgresql.yml up -d
        ```

    - La base de données PostgreSQL sera maintenant accessible à l'adresse [jdbc:postgresql://localhost:5432/bitinfodash](jdbc:postgresql://localhost:5432/bitinfodash) avec le nom d'utilisateur `bitinfodash` et le mot de passe `bitinfodash`.

2. **Option 2 - Utiliser une Base de Données PostgreSQL Locale (Sans Docker) :**

    - Si vous avez déjà une base de données PostgreSQL locale, ouvrez le fichier `src/main/resources/application-dev.yml` et mettez à jour les paramètres de connexion en fonction de votre configuration locale.

    - Assurez-vous que la base de données existe et est accessible.

3. Ensuite, suivez les étapes pour démarrer le backend et le frontend selon les sections "Backend : Exécution" et "Frontend : Exécution" de ce guide.

Remarque : Si vous utilisez l'Option 2, assurez-vous que la base de données est configurée correctement avant de démarrer l'application.



  ### Backend : Exécution

1. Allez dans le dossier `backend`.
    
2. Exécutez la commande suivante :

    ```bash
    ./mvnw
    ```

   ou sur Windows :

    ```bash
    mvnw.cmd
    ```

L'application backend sera démarrée et sera accessible à l'adresse [http://localhost:8080](http://localhost:8080).


### Frontend : Exécution

1. Allez dans le dossier `frontend`.

2. Assurez-vous que vous avez [Node.js](https://nodejs.org/) installé sur votre machine.

3. Exécutez la commande suivante pour installer Angular CLI (Command-Line Interface) :

    ```bash
    npm install -g @angular/cli
    ```

   Cette étape nécessite une connexion Internet, car elle téléchargera et installera les packages nécessaires.

4. Une fois l'installation terminée, exécutez la commande suivante pour installer les dépendances du projet :

    ```bash
    npm install
    ```

5. Exécutez la commande suivante pour démarrer l'application Angular :

    ```bash
    ng serve
    ```

L'application frontend sera démarrée et sera accessible à l'adresse [http://localhost:4200](http://localhost:4200).


Félicitations ! Vous avez maintenant BitInfoDash en cours d'exécution localement. N'hésitez pas à explorer les fonctionnalités et à contribuer au projet.

---

Ceci conclut le guide d'installation pour BitInfoDash. En cas de problème, consultez la documentation détaillée dans le dossier du projet ou contactez les contributeurs.