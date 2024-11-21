import axios from 'axios';

export const getAlbumById = async (token: string) => {
    const albumId = localStorage.getItem('week_album')
    try{
        const response = await axios.get(`https://api.spotify.com/v1/albums/${albumId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar o álbum:', error);
        throw error;
    }

};
