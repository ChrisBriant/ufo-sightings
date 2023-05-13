import axios from 'axios';

console.log('Base URL',process.env.REACT_APP_API_URL );

const conn = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        'Content-Type': 'application/json',
    }
});

export {conn,};