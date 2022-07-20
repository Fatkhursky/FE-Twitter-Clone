/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_AUTH_URL: 'http://localhost:3000',
    NEXT_AUTH_SECRET: 'secret',
    NEXT_PUBLIC_URL_BACKEND: 'http://localhost:8080',
    tes: "tes"
  },
}

module.exports = nextConfig
