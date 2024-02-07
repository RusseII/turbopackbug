declare namespace NodeJS {
  export interface ProcessEnv {
    DYNAMO_TABLE: string
    ALLOWED_API_KEY: string
    APP_ID: string
    AWS_KEY_ID: string
    AWS_SECRET_ACCESS_KEY: string
    CLIENT_ID: string
    CLIENT_SECRET: string
    CODE_BUILD_PROJECT_ID: string
    ETHERSCAN_API_KEY: string
    INTERCOM_ACCESS_TOKEN: string
    INTERCOM_APP_ID: string
    LOG_LEVEL: string
    METADATA_BASE_URL: string
    NAMESTONE_API_KEY: string
    NEXTAUTH_SECRET: string
    NX_DAEMON: string
    OPENAI_API_KEY: string
    PRIVATE_KEY: string
    SENTRY_IGNORE_API_RESOLUTION_ERROR: string
    TURBO_REMOTE_ONLY: string
    TURBO_RUN_SUMMARY: string
    VERCEL_ENV: string
    VERCEL_GIT_COMMIT_AUTHOR_LOGIN: string
    VERCEL_GIT_COMMIT_AUTHOR_NAME: string
    VERCEL_GIT_COMMIT_MESSAGE: string
    VERCEL_GIT_COMMIT_REF: string
    VERCEL_GIT_COMMIT_SHA: string
    VERCEL_GIT_PREVIOUS_SHA: string
    VERCEL_GIT_PROVIDER: string
    VERCEL_GIT_PULL_REQUEST_ID: string
    VERCEL_GIT_REPO_ID: string
    VERCEL_GIT_REPO_OWNER: string
    VERCEL_GIT_REPO_SLUG: string
    VERCEL_URL: string
    WEBHOOK_PROXY_URL: string
    WEBHOOK_SECRET: string
  }
}
