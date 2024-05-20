/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_BASE_URL: "http://localhost:8080",
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
