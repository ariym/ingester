# ts-nodemon

Starter boilerplate for typescript projects.

1. Clone

```bash
git clone https://github.com/ariym/base-ts
```

2. Download dependencies

```bash
npm i
```

## Enviroment Variables

> As of **Node v20.6** .env have built in support no longer require the use of dotenv.

1. In order to use a .env file first ensure that at least one exists. (.env, .env.development, .env.production)
1. Then add this to the package.json dev/prod scripts `--env-file=.env` *after* the `node` or `tsx` word respectively.
