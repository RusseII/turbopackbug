import { withSentryConfig } from '@sentry/nextjs'
import nextBundleAnalyzer from '@next/bundle-analyzer'

const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self' 'unsafe-eval'  va.vercel-scripts.com *.intercomcdn.com *.intercomassets.com widget.intercom.io;
  child-src 'self' *.intercomcdn.com;
  connect-src 'self'  wss://*.intercom.io;
  style-src 'self' 'unsafe-inline'  *.intercomassets.com;
  img-src 'self' *.githubusercontent.com data: blob: ipfs.io upload.wikimedia.org *.intercomcdn.com;
  font-src 'self' data: blob:  *.intercomassets.com;
  worker-src 'self' blob: *.intercom.io;
`

export const withBundleAnalyzer = nextBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname:
          'testdappling-dapplingpreviewscreenshots110b8904-1tamhwwzff80g.s3.amazonaws.com',
        port: '',
        pathname: '/*',
      },
      {
        protocol: 'https',
        hostname:
          'dapplingstack-dapplingpreviewscreenshots110b8904-1d8t9gyox85ym.s3.amazonaws.com',
        port: '',
        pathname: '/*',
      },
      {
        protocol: 'https',
        hostname: 'icons.llama.fi',
        port: '',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/',
        has: [
          {
            type: 'host',
            value: 'monitor.dappling.network',
          },
        ],
        destination: 'https://dappling.network/monitor',
        permanent: false,
      },
      {
        source: '/',
        has: [
          {
            type: 'cookie',
            key: 'next-auth.session-token',
          },
        ],
        missing: [
          {
            type: 'host',
            value: 'monitor.dappling.network',
          },
        ],
        destination: '/projects',
        permanent: false,
      },
      {
        source: '/',
        has: [
          {
            type: 'cookie',
            key: '__Secure-next-auth.session-token',
          },
        ],
        missing: [
          {
            type: 'host',
            value: 'monitor.dappling.network',
          },
        ],
        destination: '/projects',
        permanent: false,
      },
    ]
  },
  async rewrites() {
    return {
      afterFiles: [
        {
          source: '/landing',
          destination: '/',
        },
        {
          source: '/growth/:match*',
          destination: 'https://dappling.network/_vercel/insights/:match*',
        },

        {
          source: '/preview-growth/:match*',
          destination:
            'https://development.dappling.network/_vercel/insights/:match*',
        },
      ],
    }
  },

  headers: async () => {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), geolocation=(), microphone=()',
          },
        ],
      },
    ]
  },
  // octokit core is here to fix this issue https://github.com/octokit/core.js/issues/611
  // antd packages are here to fix https://github.com/vercel/next.js/issues/58817
  transpilePackages: ['@octokit/core', '@ant-design/icons'],
}

export default withBundleAnalyzer(
  withSentryConfig(
    nextConfig,
    {
      // For all available options, see:
      // https://github.com/getsentry/sentry-webpack-plugin#options

      // Suppresses source map uploading logs during build
      silent: true,

      org: 'abg-s1',
      project: 'dappling-frontend',
    },
    {
      // For all available options, see:
      // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

      // Upload a larger set of source maps for prettier stack traces (increases build time)
      widenClientFileUpload: true,

      // Transpiles SDK to be compatible with IE11 (increases bundle size)
      transpileClientSDK: false,

      // Routes browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers (increases server load)
      tunnelRoute: '/monitoring',

      // Hides source maps from generated client bundles
      hideSourceMaps: true,

      // Automatically tree-shake Sentry logger statements to reduce bundle size
      disableLogger: true,
    }
  )
)
