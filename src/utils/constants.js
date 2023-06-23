const SERVER_IP = "localhost:3977";

export const ENV = {
    BASE_PATH: `http://${SERVER_IP}`,
    BASE_API: `http://${SERVER_IP}`,
    API_ROUTES: {
        REGISTER: 'auth/register',
        LOGIN: "auth/login",
        REFRESH_ACCESS_TOKEN: 'auth/refresh_access_token',
        USER_ME: "user/me",
        USER: "user/create",
        USERS: "user"
    },
    JWT: {
        ACCESS: "access",
        REFRESH: "refresh"
    }
};