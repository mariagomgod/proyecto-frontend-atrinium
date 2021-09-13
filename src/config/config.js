const HOST = process.env.REACT_APP_BACKEND_HOST || "http://localhost";
const PORT = process.env.REACT_APP_BACKEND_PORT || "8000";
const BASE_API_URL = HOST + ":" + PORT + "/api/v1";

export {
    BASE_API_URL
}