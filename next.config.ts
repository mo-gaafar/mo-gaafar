import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'gist.github.com' },
      { protocol: 'https', hostname: 'images.credly.com' },
      { protocol: 'https', hostname: 'www.certmetrics.com' },
    ],
  },
  eslint: {
    // Linting is run separately; don't fail the production build on it.
    ignoreDuringBuilds: true,
  },
  webpack: (webpackConfig) => {
    webpackConfig.resolve.extensionAlias = {
      '.cjs': ['.cts', '.cjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    }
    return webpackConfig
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
