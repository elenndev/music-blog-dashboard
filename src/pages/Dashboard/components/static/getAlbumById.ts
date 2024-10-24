import axios from 'axios';

export const getAlbumById = async (albumId: string, token: string) => {
    try {
        const result = await axios.get(`https://api.spotify.com/v1/albums/${albumId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return result.data;
    } catch (error) {
        console.error('Erro ao buscar o álbum:', error);
        throw error;
    }
};
