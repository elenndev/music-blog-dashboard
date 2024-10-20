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
}

const Set_FeaturedAlbum: React.FC = () => {
    const [query, setQuery] = useState<string>('');  // Pesquisa
    const [albums, setAlbums] = useState<Album[]>([]);  // Resultados da pesquisa
    const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null);  // Álbum selecionado
    const [token, setToken] = useState<string>('');  // Token da API

    // Função para selecionar o álbum e salvar no localStorage
    const selectAlbum = async (album: Album) => {
        setSelectedAlbum(album);
        localStorage.setItem('featuredAlbumId', album.id);

        // Buscar informações adicionais do álbum com base no ID
        try {
            const albumDetails = await getAlbumById(album.id, token);
            console.log('Detalhes do álbum:', albumDetails);
        } catch (error) {
            console.error('Erro ao buscar os detalhes do álbum:', error);
        }
    };

    useEffect(() => {
        // Autentica o app assim que o componente é montado
        const authenticate = async () => {
            const _token = await getToken();
            setToken(_token);
        };
        authenticate();
    }, []);

    useEffect(() => {
        // Executa a busca assim que a query mudar
        const searchAlbum = async () => {
            if (!query) {
                setAlbums([]); // Limpa resultados se a busca estiver vazia
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
        }, 300); // Atraso de 300ms para debouncing

        return () => clearTimeout(debounceSearch); // Limpa o timeout se a query mudar antes do tempo expirar
    }, [query, token]); // Adicione 'token' para garantir que ele esteja atualizado

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
            </div>

            {/* Div 2: Resultados da pesquisa */}
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
