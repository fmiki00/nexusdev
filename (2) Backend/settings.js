const settings =
{
    SV_HOST: "127.0.0.1",
    SV_PORT: 3000,

    SV_CORS:
    {
        origin: "http://localhost:5173",
        credentials: true
    },
    
    DB_HOST: "127.0.0.1",
    DB_PORT: 3306,
    DB_USER: "root",
    DB_PASSWORD: "",
    DB_DATABASE: "nexusdev"
}

module.exports = settings;