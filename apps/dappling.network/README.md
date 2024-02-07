### Install

If you've installed from the root of the monorepo, you can skip this step.

```bash
pnpm i
```

### Dev

Make sure to link the vercel project, pull the environment, and then dev.

```bash
vercel link
vercel env pull
turbo dev
```

### Database Migrations

When a new attribute is added to our database or we want to change the architecture, a migration might need to be run.

Create a new migration by following the [migration example](./migrations/example.ts), then install bun and run the migration script. This should not be needed unless you are working on a migration.

```bash
npm i -g bun
# Migration must be run from the root to get the environment variables
# Note: this will use the DYNAMO_TABLE set in the .env file
cd ../../
npm run migrate
```

### GitHub

1. get ngrok
2. run ngrok http 3000
3. get https url
4. append /api/github/webhooks
5. update webhook on https://github.com/organizations/alwaysbegrowing/settings/apps/dapplingnetworktestingapp
6. send a test push to the repo
7. re-send the payload in the advanced settings https://github.com/organizations/alwaysbegrowing/settings/apps/dapplingnetworktestingapp/advanced
8. after testing locally, test in staging by going to step 5 with the new URL: <vercel-url>/api/github/webhooks
