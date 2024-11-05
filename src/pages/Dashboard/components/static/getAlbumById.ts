import axios from 'axios';
import supabase from '../../../../components/static/supabaseauth';

export const getAlbumById = async (token: string) => {

    const {data, error} = await supabase.from("blog-saves").select("text_value").eq("info_name", "week_album")
    if (data && data.length > 0){
        try {
            const albumId = data[0].text_value 
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
    
    } else {
        return error
    }

};
