import axios from "axios";

const HTTP = axios.create({
    baseURL: `${process.env.BASE_URL}`,
    timeout: 5000,
    headers: {
        'Content-Type': "application/json"
    }
});

export default HTTP;