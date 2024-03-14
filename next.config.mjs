import path from 'path'
import { fileURLToPath } from 'url'
import BundleAnalyzer from '@next/bundle-analyzer'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const withBundleAnalyzer = BundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'src/assets/styles')],
  },
  images: {
    unoptimized: true,
  },
}

// export default nextConfig
export default withBundleAnalyzer(nextConfig)
