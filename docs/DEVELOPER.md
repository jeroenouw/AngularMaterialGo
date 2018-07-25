# DEVELOPER

## Quick start

First clone this repo: `git clone https://github.com/jeroenouw/AngularMaterialGo.git`.  
Change directory to this project  
Run `npm install` to install all the dependencies.  
Run `npm start` to run this project (Angular client, Golang blockchain and api).
Client side: navigate to `http://localhost:4200/` to see Angular. The app will automatically reload if you change any of the source files.  
Server side: navigate to `http://localhost:3000/` to see the Golang blockchain and to `http://localhost:4000/` to see the Golang api.  
  
## Development

Following npm scripts are available in `package.json`:  

```json

  "scripts": {
    "ng": "ng",
    "client": "ng serve",
    "start": "./serve-all.sh",
    "test": "ng test",
    "pree2e": "webdriver-manager update --standalone false --gecko false",
    "e2e": "ng e2e",
    "lint": "ng lint",
    "dist": "ng build",
    "prod": "ng build --prod",
    "prod:hashless": "ng build --prod --output-hashing none",
    "prod:src": "ng build --prod --sourcemaps",
    "compodoc:g": "compodoc -p src/tsconfig.app.json",
    "compodoc:s": "compodoc -p src/tsconfig.app.json --serve",
    "compodoc:w": "compodoc -p src/tsconfig.app.json --serve --watch"
  },
```

Golang files can be found in `./server` directory.
  
To build the development environment, run `npm run dist`.

## Production

To build the production environment, run `npm run prod`.  
To build the production environment without hashing in the files, run `npm run prod:hashless`. This will give packages without a hash.  
To build the production environment with reduced file size, run `npm run prod:opt` (Takes extra time to build with build optimizer).  
