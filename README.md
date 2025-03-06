# Bankin' - Test Technique

## Description

Ce projet est composé de **deux parties** :

Afin de lancer l'application, vous devrez : 
    
    1 - cloner le repo actuel
    2 - Lancer le premier serveur (voir partie 1)
    3 - Lancer le deuixème serveur (voir partie 2)

---

## 1 - Backend - Serveur Express (Node.js)

### Rôle
- Ce serveur fait le lien entre l’application React et l’API Bankin’.
- Il s’occupe de :
    - L’authentification auprès de l’API Bankin’ (récupération du token).
    - La récupération des comptes de l’utilisateur.
    - Le calcul de la somme totale des soldes (arrondie à la centaine supérieure).
    - Le renvoi d’un JSON simplifié vers le frontend React.

### Démarrage
```bash
cd bankin-express-server
npm install
node index.js
```
Le serveur sera accessible sur :  
`http://localhost:3001`

---

## 2 - Frontend - Application React

### Rôle
- Cette application React :
    - Appelle le serveur Express pour récupérer la liste des comptes.
    - Affiche les comptes dans un tableau avec :
        - Nom du compte.
        - Solde (avec possibilité de masquer/afficher chaque solde).
    - Bonus : Affiche la somme totale colorée :
        - Vert si > 500€
        - Orange entre 0€ et 500€
        - Rouge si < 0€

### Démarrage
```bash
cd bankin-test
npm install
npm start
```
L’application sera accessible sur :  
`http://localhost:3000`

---

## ⚠️ 

Le **serveur Express (backend)** doit être lancé avant l’application React pour que celle-ci puisse récupérer les données correctement.

---