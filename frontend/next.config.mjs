/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        API_BASE_URL: "http://localhost:8080",
        COOKIE_NAME: "SysClubAuthToken"
    }
};

export default nextConfig;
