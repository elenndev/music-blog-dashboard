import axios from 'axios';

const CLIENT_ID = '09bddde3131a4301bb15bae18a6807c3';
const CLIENT_SECRET = '2b59d353217c4953987b072c20389737';

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
