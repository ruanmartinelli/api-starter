# api-starter

<a href="https://standardjs.com"><img src="https://img.shields.io/badge/code_style-standard-brightgreen.svg" alt="Standard - JavaScript Style Guide"></a>
[![Build Status](https://travis-ci.org/ruanmartinelli/api-starter.svg?branch=master)](https://travis-ci.org/ruanmartinelli/api-starter)
[![codecov](https://codecov.io/gh/ruanmartinelli/api-starter/branch/master/graph/badge.svg)](https://codecov.io/gh/ruanmartinelli/api-starter) [![Greenkeeper badge](https://badges.greenkeeper.io/ruanmartinelli/api-starter.svg)](https://greenkeeper.io/)
> Everyone needs an API these days, right?

### Requirements

* Node.js 9+
* MySQL

### Dependencies

* [Express](https://github.com/expressjs/express) web framework
* [Knex](http://knexjs.org/) SQL query builder
* [Ava](https://github.com/avajs) for concurrent tests
* [Babel](https://babeljs.io) JS transpiler
* [Joi](https://github.com/hapijs/joi) schema validator
* [JWT](https://jwt.io/) for stateless authentication

### Folder structure

Folders look like this:

```bash
.
├── src
│   ├── api         # API modules (i.g. user, auth, etc.) 
│   ├── db          # Database connection module
│   ├── job         # Recurring jobs
│   ├── middleware  # Express middlewares
│   ├── migration   # Database migrations
│   ├── model       # Application model classes
│   ├── seed        # Database seeds
│   ├── schema      # Schemas
│   ├── script      # Script files (sql, bash, etc.)
│   ├── util        # Resuable modules
│   └── index.js    # Application entry file
└── test            # Test files

```
_Note: some files were omitted for simplicity._

### Get started

1. Clone the repo:

```bash
git clone https://github.com/ruanmartinelli/api-starter.git <NEW_NAME>
cd <NEW_NAME>

# make it yours:
rm -rf .git
git init
```
2. Install dependencies

```bash
yarn install
```

3. Create a .env file (remember to add your keys)

```bash
mv .env.example .env
```

4. Run migrations:

```bash
npm run db:latest
```
_Note: this assumes you have MySQL installed_

5. Run

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

### Conventions

- Folder and file names are always on singular (eg. `user.js`, `script/` )
- `function x() { }` instead of `const x = () => {}`
- All [Standard](https://standardjs.com) rules

### License

MIT © [Ruan Martinelli](http://ruanmartinelli.com)
