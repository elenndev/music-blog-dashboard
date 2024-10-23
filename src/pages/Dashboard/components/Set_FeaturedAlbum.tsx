import getToken from '../../../components/static/spotifyAuth';
import { useState, useEffect } from 'react';
import { getAlbumById } from '../static/getAlbumById';
import axios from 'axios';

// Tipos dos dados retornados da API
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
    const [query, setQuery] = useState<string>('');  // Pesquisa
    const [albums, setAlbums] = useState<Album[]>([]);  // Resultados da pesquisa
    const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null);  // Álbum selecionado
    const [token, setToken] = useState<string>('');  // Token da API

    const selectAlbum = async (album: Album) => {
        setSelectedAlbum(album);

        try {
            const albumDetails = await getAlbumById(album.id, token);
            console.log('Detalhes do álbum:', albumDetails);
        } catch (error) {
            console.error('Erro ao buscar os detalhes do álbum:', error);
        }
    };

    const setFeaturedAlbum = (albumId: string) =>{
        localStorage.setItem('featuredAlbumId', albumId)
    }

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
        <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '20px' }}>
            <div style={{ width: '30%' }}>
                <h2>Pesquisar álbum</h2>
                <input
                    type="text"
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                    placeholder="Digite o nome do álbum"
                />
            </div>

            <div style={{ width: '30%' }}>
                <h2>Resultados</h2>
                <ul>
                    {albums.map(album => (
                        <li
                            key={album.id}
                            onClick={() => selectAlbum(album)}
                            style={{ cursor: 'pointer', marginBottom: '10px' }}
                        >
                            {album.name} - {album.artists[0].name}
                        </li>
                    ))}
                </ul>
            </div>

            <div style={{ width: '30%' }}>
                <h2>Detalhes do álbum</h2>
                {selectedAlbum ? (
                    <>
                        <div>
                            <img src={selectedAlbum.images[0]?.url} alt="Album cover" style={{ width: '100%' }} />
                            <h3>{selectedAlbum.name}</h3>
                            <p>Artista: {selectedAlbum.artists[0].name}</p>
                        </div>
                        <button type='button' className='btn btn-primary handle_setFeaturedAlbum' onClick={() => setFeaturedAlbum(selectedAlbum.id)}>Definir album</button>
                    </>
                ) : (
                    <p>Selecione um álbum para ver os detalhes</p>
                )}
            </div>
        </div>
    );
};

export default Set_FeaturedAlbum;
