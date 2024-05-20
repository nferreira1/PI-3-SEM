/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_BASE_URL: "http://191.233.251.252:8090",
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
