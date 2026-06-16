import type { NextConfig } from 'next'

const defaultApiUrl = 'https://stork-helpers-api.onrender.com/api'

function getApiHostname(): string {
  try {
    return new URL(process.env.NEXT_PUBLIC_API_URL || defaultApiUrl).hostname
  } catch {
    return new URL(defaultApiUrl).hostname
  }
}

const apiHostname = getApiHostname()

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ftp.goit.study',
      },
      {
        protocol: 'https',
        hostname: apiHostname,
      },
      {
        protocol: 'https',
        hostname: '**.onrender.com',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },
}

export default nextConfig
