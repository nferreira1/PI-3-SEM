/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        API_BASE_URL: "http://localhost:8080",
        COOKIE_NAME: "SysClubAuthToken",
        JWT_SECRET: "1bba15653f35eb3a72b8c1f25bbc727a044079f71d38cc67d9c7b2f11e8b198bde1872d12fbac9cecaac103794f13651"
    }

};

export default nextConfig;
