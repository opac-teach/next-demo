///////// SPOILER PAS SAFE //////////
// C'est pas safe de faire ça, mais pour le moment on va faire comme ça en dev
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
        port: '',
        pathname: '/**',
      },
    ],
  },
}
// Uniquement en développement probablement systeme d'upload de logo en prod.
export default nextConfig
