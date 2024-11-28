import axios from 'axios';
const SERVER_URL = import.meta.env.VITE_SERVER_URL;

export const getAlbumById = async (token: string) => {
    // primeiro pegar o id do album no spotify que esta salvo no banco de dados
    const response = await axios.get(`${SERVER_URL}/fast-infos`,{
        params: {info_name: "week_album"}
    })


    // faz a requisicao pra api do spotify buscando o id do album
    if (response.data){
        try {
            const albumId = response.data.text_value 
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
    
    }

};
