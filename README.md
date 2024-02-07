# dAppling Monorepo

The home of our Frontend, AWS stack, and shared types.

### Apps and Packages

Apps

- `dappling.network`: Our [Next.js](https://nextjs.org/) frontend app. This includes the API routes for database calls and auth.
- `aws`: Our [AWS CDK](https://aws.amazon.com/cdk/) stack. This includes all of our AWS resources and infrastructure.

Packages

- `shared-types`: Shared types between our frontend and AWS stack.
- `tsconfig`: `tsconfig.json`s used throughout the monorepo

[TypeScript](https://www.typescriptlang.org/) is preferred where possible for all apps and packages.

### Utilities

This Turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

### Install

[PNPM](https://pnpm.io/) is the package manager used, so you will need to install it globally:

```bash
npm install -g pnpm
```

and then install the dependencies:

```bash
pnpm i
```

### dAppling.network

see the [README](./apps/dappling.network/README.md) for more information

### AWS

see the [README](./packages/aws/README.md) for more information
