import getToken from '../../../components/static/spotifyAuth';
import { useState, useEffect } from 'react';
import axios from 'axios';

export interface Album {
    id: string;
    name: string;
    artists: { name: string }[];
    images: { url: string }[];
    total_tracks: number;
    uri: string;
    release_date: string;
}

const Set_FeaturedAlbum: React.FC = () => {
    const [query, setQuery] = useState<string>('');  
    const [albums, setAlbums] = useState<Album[]>([]);  
    const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null); 
    const [token, setToken] = useState<string>(''); 

    useEffect(() => {
        const authenticate = async () => {
            const _token = await getToken();
            setToken(_token);
        };
        authenticate();
    }, []);

    useEffect(() => {
        const searchAlbum = async () => {
            if (!query) {
                setAlbums([]);
                return;
            }
            try {
                const result = await axios.get(`https://api.spotify.com/v1/search`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    params: {
                        q: query,
                        type: 'album',
                    },
                });
                setAlbums(result.data.albums.items);
            } catch (error) {
                console.error('Erro ao buscar os álbuns:', error);
            }
        };

        const debounceSearch = setTimeout(() => {
            searchAlbum();
        }, 300); 

        return () => clearTimeout(debounceSearch); 
    }, [query, token]); 

    return (
        <div className='featured-album'  style={{ display: 'flex', justifyContent: 'space-around', marginTop: '20px' }}>
            <p className="container-header">Definir o albúm da semana</p>
            <span>
                <div style={{ width: '30%' }}>
                    <h2>Pesquisar álbum</h2>
                    <input
                        type="text"
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                        placeholder="Digite o nome do álbum"
                    />
                </div>
                <div style={{ width: '30%' }} className="search-results">
                    <h2>Resultados</h2>
                    <ul>
                        {albums.map(album => (
                            <li
                                key={album.id}
                                onClick={async () => setSelectedAlbum(album)}
                                style={{ cursor: 'pointer', marginBottom: '10px' }}
                            >
                                {album.name} - {album.artists[0].name}
                            </li>
                        ))}
                    </ul>
                </div>
                <div style={{ width: '30%' }} className="see-album">
                    {selectedAlbum ? (
                        <>
                            <div>
                                <img src={selectedAlbum.images[0]?.url} alt="Album cover" style={{ width: '100%' }} />
                                <h3>{selectedAlbum.name}</h3>
                                <p>Artista: {selectedAlbum.artists[0].name}</p>
                            </div>
                            <button type='button' className='btn btn-primary handle_setFeaturedAlbum' onClick={() => localStorage.setItem('featuredAlbumId',selectedAlbum.id)}>Definir album</button>
                        </>
                    ) : (
                        <p>Selecione um álbum para ver os detalhes</p>
                    )}
                </div>
            </span>
        </div>
    );
};

export default Set_FeaturedAlbum;
