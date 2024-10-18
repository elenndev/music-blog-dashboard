import getToken from '../../../components/static/spotifyAuth';
import { useState, useEffect } from 'react';
import axios from 'axios';

// Tipos dos dados retornados da API
interface Album {
    id: string;
    name: string;
    artists: { name: string }[];
    images: { url: string }[];
}

const Set_FeaturedAlbum: React.FC = () => {
    const [query, setQuery] = useState<string>('');  // Pesquisa
    const [albums, setAlbums] = useState<Album[]>([]);  // Resultados da pesquisa
    const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null);  // Álbum selecionado
    const [token, setToken] = useState<string>('');  // Token da API

    useEffect(() => {
        // Autentica o app assim que o componente é montado
        const authenticate = async () => {
            const _token = await getToken();
            setToken(_token);
        };
        authenticate();
    }, []);

    const searchAlbum = async () => {
        if (!query) return;
        try {
            const result = await axios.get(`https://api.spotify.com/v1/search`, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                params: {
                    q: query,
                    type: 'album'
                }
            });
            setAlbums(result.data.albums.items);
        } catch (error) {
            console.error('Erro ao buscar os álbuns:', error);
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '20px' }}>

            {/* Div 1: Barra de pesquisa */}
            <div style={{ width: '30%' }}>
                <h2>Pesquisar álbum</h2>
                <input
                    type="text"
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                    placeholder="Digite o nome do álbum"
                />
                <button onClick={searchAlbum}>Pesquisar</button>
            </div>

            {/* Div 2: Resultados da pesquisa */}
            <div style={{ width: '30%' }}>
                <h2>Resultados</h2>
                <ul>
                    {albums.map((album) => (
                        <li
                            key={album.id}
                            onClick={() => setSelectedAlbum(album)}
                            style={{ cursor: 'pointer', marginBottom: '10px' }}
                        >
                            {album.name} - {album.artists[0].name}
                        </li>
                    ))}
                </ul>
            </div>

            {/* Div 3: Informações do álbum selecionado */}
            <div style={{ width: '30%' }}>
                <h2>Detalhes do álbum</h2>
                {selectedAlbum ? (
                    <div>
                        <img src={selectedAlbum.images[0]?.url} alt="Album cover" style={{ width: '100%' }} />
                        <h3>{selectedAlbum.name}</h3>
                        <p>Artista: {selectedAlbum.artists[0].name}</p>
                    </div>
                ) : (
                    <p>Selecione um álbum para ver os detalhes</p>
                )}
            </div>
        </div>
    );
};

export default Set_FeaturedAlbum;
