/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_BASE_URL: process.env.NODE_ENV === "production" ? "http://191.233.251.252:8080" : "http://localhost:8080",
    COOKIE_NAME: "SysClubAuthToken"
  },
  images: {
    remotePatterns: [
      {
        hostname: "i.pinimg.com",
        pathname: "**",
      }
    ]
  }
};

export default nextConfig;
