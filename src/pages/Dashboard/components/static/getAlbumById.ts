import axios from 'axios';
const SERVER_URL = import.meta.env.VITE_SERVER_URL;

export const getAlbumById = async (token: string) => {
    const albumId = localStorage.getItem('week_album')
    try{
        const response = await axios.get(`https://api.spotify.com/v1/albums/${albumId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log(response.data)
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar o álbum:', error);
        throw error;
    }

};
