# Node.js TypeScript Express Boilerplate

## Acknowledgements

Thanks in part to:

- [Getting Started on Heroku with Node.js](https://devcenter.heroku.com/articles/getting-started-with-nodejs)
- [Seans-TypeScript-NodeJS-CRUD-REST-API-Boilerplate](https://github.com/Sean-Bradley/Seans-TypeScript-NodeJS-CRUD-REST-API-Boilerplate)
- [Express ES2017 REST API Boilerplate](https://github.dev/danielfsousa/express-rest-boilerplate)
- [Node Postgres](https://node-postgres.com/)
- [Postgres migrate](https://www.npmjs.com/package/node-pg-migrate)
- [Postgres migrate](https://salsita.github.io/node-pg-migrate)

## Pick a DB

```bash
brew tap mongodb/brew
brew install mongodb-community
```

```bash
brew install postgres
brew services start postgresql
brew services start postgres
```

Now you should put your DB connection string to DATABASE_URL environment variable and run npm run migrate up.

```bash
psql postgres

\c boilerplate

CREATE DATABASE boilerplate;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
```

```bash
DATABASE_URL=postgres://`{whoami}`:test@localhost:5432/boilerplate yarn run migrate up
```

Create a new migration.
From [here](https://salsita.github.io/node-pg-migrate/#/)

```bash
yarn run migrate create customer table init
```

## Things to do

- move migrations to .ts, and use data models
- tie data models to swagger defs
- add auth for customers
- password table for customers
- [swagger-jsdoc](https://www.npmjs.com/package/swagger-jsdoc)
