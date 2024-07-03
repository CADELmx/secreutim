import axios from "axios";
import { getCookie } from "cookies-next";

export const saxios = axios.create({
    baseURL: process.env.API_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getCookie('token')}`,
    }
})