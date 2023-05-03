## Description

Simple [Nestjs](https://github.com/nestjs/nest) rest api with mongodb in docker

---

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

---

## Environment variables

-   `MONGO_LOGIN` - mongo login
-   `MONGO_PASSWORD` - mongo password
-   `MONGO_HOST` - mongo host
-   `MONGO_PORT` - mongo port
-   `MONGO_AUTHDATABASE` - mongo database name
-   `JWT_SECRET` - secret for JWT token
