
# api-starter

<a href="https://standardjs.com"><img src="https://img.shields.io/badge/code_style-standard-brightgreen.svg" alt="Standard - JavaScript Style Guide"></a> [![Build Status](https://travis-ci.org/ruanmartinelli/api-starter.svg?branch=master)](https://travis-ci.org/ruanmartinelli/api-starter)

Everyone needs an API these days, right?

### Requirements

This was tested on Node.js v7.9.0 and it uses many ES7 features.

### Dependencies

* [express](https://github.com/expressjs/express) web framework
* [knex](http://knexjs.org/) for fetching data from a database
* [ava](https://github.com/avajs) for concurrent tests
* [nodemailer](https://nodemailer.com/about/) for sending emails

### Folder structure

Folders look like this:

```bash
.
├── /test/                      # unit tests
├── /src/                       # source files
│   ├── /db/                    # sql scripts and database connection
│   ├── /util/                  # helpers
│   └── /app/                   # application modules (i.g. Users, Companies)
├── .env                        # put your keys and secrets here
└── index.js                    # start server
```
#### Notes

* Folders are separated by feature, not type ([like this](http://www.javapractices.com/topic/TopicAction.do?Id=205)). 
* New modules/endpoint handlers should go into the ```app/``` folder.

### Get started

1. Clone the repo:

```bash
git clone https://github.com/ruanmartinelli/simple-api.git <NEW_NAME>
cd <NEW_NAME>
```
2. Create the .env file and put your keys in there

```bash
mv .env.example .env
```

3. Create your database using [this script](https://github.com/ruanmartinelli/simple-api/blob/master/src/db/create.sql)

4. Run

```bash
npm run dev
```

### Creating modules

Suppose your users now have unicorns and you want to create a module for it:

```bash
mkdir src/app/unicorn && cd src/app/unicorn
touch index.js 
touch unicorn-controller.js 
touch unicorn-service.js 
touch unicorn-model.js

# optional
touch unicorn-validation.js
touch unicorn-i18n.js
touch unicorn-middleware.js
```
#### Notes

* Folder and file names are in singular (_*-controller.js_, _*-middleware.js_, etc)
* Create some tests too!

### License

MIT © [Ruan Martinelli](http://ruanmartinelli.com)
