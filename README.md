# Le Rétro Projecteur website

## Introduction

This is the source code of the website [Le Rétro Projecteur](https://leretroprojecteur.com/).

### Preview of the main branch

[https://leretroprojecteur.fly.dev](https://leretroprojecteur.fly.dev/)

## Local development

### First installation

- Clone repository
- Install [brew](https://linux.how2shout.com/how-to-install-brew-ubuntu-20-04-lts-linux/)
- Install [node.js](https://nodejs.org/en/) et [pnpm](https://pnpm.io/installation#using-corepack)
- Navigate to repo directory
- Run `$ pnpm install`
- Install [prettier](https://prettier.io/docs/en/install.html)

### To spin up a local host

- Navigate to repo directory
- Run `$ pnpm run dev`
- Open [http://localhost:3000/](http://localhost:3000/) in your web browser

### To contribute changes

- Create new branch
- Make changes
- Check there is no warning with `$ pnpm run dev`
- Run `$ pnpm exec prettier . --write`
- Run `$ pnpm lint`
- Run `$ pnpm run build` (to check that the website builds correctly)
- Push changes
