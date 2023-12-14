# Le Rétro Projecteur website

## Introduction
This is the source code of the website [Le Rétro Projecteur](https://leretroprojecteur.com/).

### Preview of the main branch
[https://retroprojecteur.fly.dev](https://retroprojecteur.fly.dev/)

## Local development

### First installation
* Clone repository
* Install [node.js](https://nodejs.org/en/) et [pnpm](https://pnpm.io/installation#using-corepack)
* Navigate to repo directory
* (optional) Créer un fichier .env.local et y insérer la clef Firebase au format suivant : `FIREBASE_API_KEY=<clef-firebase>`
* Run `$ pnpm install`

### To spin up a local host
* Navigate to repo directory
* Run `$ pnpm run dev`
* Open [http://localhost:3000/](http://localhost:3000/) in your web browser

### To contribute changes
* Create new branch
* Make changes
* Run `$ pnpm run build` (to check that the website builds correctly)
* `$ pnpm lint`
* Push changes
