/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = nextConfig;
module.exports = {
  env: {
    APP_NAME: "NEXTBLOG",
    API_URL: "http://localhost:8080/api",
    API_URL_AUTH: "http://localhost:8080/auth",
    PRODUCTION: false,
  },
};
