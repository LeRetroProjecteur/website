# Le Rétro Projecteur [website](https://leretroprojecteur.com/)

## Introduction
This is the source code of the website [Le Rétro Projecteur](https://leretroprojecteur.com/).

### Preview de la branch main
[https://retroprojecteur.fly.dev](https://retroprojecteur.fly.dev/)

### Développement local

#### First installation
* Installer [node.js](https://nodejs.org/en/) et [pnpm](https://pnpm.io/installation#using-corepack)
* (optionnel) Créer un fichier .env.local et y insérer la clef Firebase au format suivant : `FIREBASE_API_KEY=<clef-firebase>`
* `$ pnpm install`

#### Each time
* `$ pnpm run dev`
* http://localhost:3000/ dans Chrome / Firefox
* `$ pnpm run build` (to check that the website builds correctly)
