import { useEffect, useState } from 'react';
import getToken from '../../../components/static/spotifyAuth';
import { getAlbumById } from '../../Dashboard/static/getAlbumById';
import { Album } from '../../Dashboard/components/Set_FeaturedAlbum';

//midia
import discoIcon from './img/disco-png.png'
const albumSize = '65%'

const FeaturedAlbum: React.FC = () => {
    const [token, setToken] = useState<string>("");
    const [featuredAlbum, setFeaturedAlbum] = useState<Album | null>(null);

    const id = localStorage.getItem("featuredAlbumId");

    // Função para buscar o token de autenticação
    const authenticate = async () => {
        const _token = await getToken();
        setToken(_token);
    };

    // Função para buscar o álbum usando o ID e o token
    const fetchAlbum = async (id: string, token: string) => {
        try {
            const getAlbum = await getAlbumById(id, token);
            console.log('album: ', getAlbum);
            setFeaturedAlbum(getAlbum);
        } catch (error) {
            console.log('erro ao pegar álbum: ', error);
        }
    };

    // useEffect para autenticação
    useEffect(() => {
        authenticate();
    }, []); // Executa apenas ao carregar a página

    // useEffect para buscar o álbum depois que o token estiver disponível
    useEffect(() => {
        if (token && id) {
            fetchAlbum(id, token); // Busca o álbum assim que o token estiver disponível
        }
    }, [token, id]); // Executa sempre que o token ou o ID mudar

    return (
        <div className="container album_week">
            <p className='container-header'>Detalhes do álbum</p>
            {featuredAlbum ? (
                <>
                    <span className='album-cover-area'>
                        <img src={featuredAlbum.images[0]?.url} alt="Album cover" className='album-cover' style={{ width: albumSize }} />
                        <img src={discoIcon} className='album-disco' alt="Disco" style={{ width: albumSize }} />
                    </span>
                    <span className='album-info'>
                        <p className='album-name'>{featuredAlbum.name}</p>
                        <p className='album-artist'>{featuredAlbum.artists[0].name}</p>
                        <p className='album-total_tracks'>{featuredAlbum.total_tracks} faixas</p>
                        <a href={featuredAlbum.uri}><img className="social-icons" src="/Spotify.svg"></img></a>
                    </span>
                </>               
            ) : (
                <p>Selecione um álbum para ver os detalhes</p>
            )}
        </div>
    );
}

export default FeaturedAlbum;
