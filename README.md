### Preview de la branch main
https://retroprojecteur.vercel.app/

### Développement local
* Installer [node.js](https://nodejs.org/en/) et [pnpm](https://pnpm.io/installation#using-corepack)
* Créer un fichier .env.local et y insérer la clef Firebase au format suivant : `FIREBASE_API_KEY=<clef-firebase>`
* `$ pnpm install`
* `$ pnpm run dev`
* http://localhost:3000/ dans Chrome / Firefox

### VSCode + extensions
* Extensions eslint et prettier
* Config pour auto-formattage :
```
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```


### Page principale
- [x] Barre de recherche de films (header)
- [x] Calendrier
- [x] Filtres quartier / texte
- [x] Filtre heure
- [x] Coups de coeur

### Autres pages
- [x] Coups de coeur
- [x] Chroniques
- [x] Page détails
- [x] Newsletter
