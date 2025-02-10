# base-ts

Starter boilerplate for typescript projects.

1. Clone

```bash
git clone https://github.com/ariym/base-ts
```

2. Download dependencies

```bash
npm i
```

## Advanced Setup

### `npm run build` on a dir other than /src
[pkgroll instructions for using dir other than /src](https://github.com/privatenumber/pkgroll?tab=readme-ov-file#entry-points) are to add `--src=dirname` flag to pkgroll command in the package.json scripts

### Enviroment Variables

> As of **Node v20.6** added .env file support deprecating the need for dotenv.

1. In order to use a .env file first ensure that at least one exists. (.env, .env.development, .env.production)
1. Then add this to the package.json dev/prod scripts `--env-file=.env` *after* the `node` or `tsx` word respectively.

## TODO

- [ ] replace `npm run setup` with with setup.js that uses cli to ask about setting up .env, .env.production, etc.
