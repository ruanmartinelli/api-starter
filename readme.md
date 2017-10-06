# API Starter

<a href="https://standardjs.com"><img src="https://img.shields.io/badge/code_style-standard-brightgreen.svg" alt="Standard - JavaScript Style Guide"></a>
[![Build Status](https://travis-ci.org/ruanmartinelli/api-starter.svg?branch=master)](https://travis-ci.org/ruanmartinelli/api-starter)

> Everyone needs an API these days, right?

### Requirements

* Node.js 7.6.0+
* MySQL

### Dependencies

* [Express](https://github.com/expressjs/express) web framework
* [Knex](http://knexjs.org/) SQL query builder
* [Ava](https://github.com/avajs) for concurrent tests
* [Babel](https://babeljs.io) JS transpiler
* [Firebase](https://github.com/firebase/firebase-js-sdk) Firebase JS SKD
* [Joi](https://github.com/hapijs/joi) schema validator
* [JWT](https://jwt.io/) for stateless authentication

### Folder structure

Folders look like this:

```bash
.
├── /test/                      # Tests
├── /src/                       # Source files
│   ├── /db/                    # Database connection module
│   ├── /util/                  # Reusable modules
|   ├── /script/                # SQL, bash, JS, etc.
|   ├── /job/                   # Recurring jobs
│   └── /app/                   # API modules (i.g. Users, Contacts)
├── .env                        # Env. secrets and credentials 
├── index.js                    # Entry file
├── .babelrc                    # Babel configuration file
└── apidoc.json                 # APIDoc configuration file
```
_Note: some files were omitted for simplicity._

### Get started

1. Clone the repo:

```bash
git clone https://github.com/ruanmartinelli/api-starter.git <NEW_NAME>
cd <NEW_NAME>
```
2. Create a .env file (remember to add your keys)

```bash
mv .env.example .env
```

3. Create the MySQL database:

```bash
npm run create-db
```

4. Run

```bash
npm run dev
```

### npm Scripts

Start the server in Production mode:
```bash
npm start 
```

Start the server in Development mode:
```bash
npm run dev 
```

Show lint errors:
```bash
npm run lint
```

Show lint errors and fix minor issues:
```bash
npm run lint:fix
```

Run AVA tests:
```bash
npm t
```

Run AVA tests in watch mode:
```bash
npm run test:watch
```

Generate API documentation:
```bash
npm run docs
```

### Creating API routes

Say you want to create an Unicorn API :unicorn:

1. Create files:

```bash
mkdir src/app/unicorn && cd src/app/unicorn
touch index.js 

# recommended
touch unicorn-controller.js 
touch unicorn-model.js

# optional
touch unicorn-i18n.js
touch unicorn-middleware.js
```

2. Add the following code to `unicorn/index.js`:

```js
// Note: "app" is the express instance

// Public routes
function initPublic (app) { }

// Private routes (access token is needed)
function initPrivate (app) { }

export default { initPublic, initPrivate }
```

3. Import and init the functions on the app entry file:

```js
import unicornRoutes from './unicorn'

function init (app) {

  // ...

  unicornRoutes.initPublic(app)

  // Everything requires an access token below this middleware
  app.use(authMiddleware)

  unicornRoutes.initPrivate(app)

  // ...
}

export default { init }
```

4. Write some badass, cool-looking tests :eyeglasses:

### Conventions

- Folder and file names are always on singular (eg. `*-controller.js`, `script/` )
- `function x() { }` is better than `const x = () => {}`
- All [Standard](https://standardjs.com) rules

### License

MIT © [Ruan Martinelli](http://ruanmartinelli.com)
