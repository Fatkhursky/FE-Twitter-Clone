/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXTAUTH_URL: 'https://tweetclone27.herokuapp.com/',
    NEXT_AUTH_SECRET: 'secret',
    NEXT_PUBLIC_URL_BACKEND: 'http://localhost:8080',
    tes: "tes"
  },
}

module.exports = nextConfig
