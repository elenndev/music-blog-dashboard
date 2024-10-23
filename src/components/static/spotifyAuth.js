import axios from 'axios';

const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;
const CLIENT_SECRET = import.meta.env.VITE_CLIENT_SECRET


const getToken = async () => {
    const result = await axios('https://accounts.spotify.com/api/token', {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + btoa(CLIENT_ID + ':' + CLIENT_SECRET)
        },
        data: 'grant_type=client_credentials',
        method: 'POST'
    });
    return result.data.access_token;
}

export default getToken;
