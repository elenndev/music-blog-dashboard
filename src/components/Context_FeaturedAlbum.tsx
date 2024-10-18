import { createContext, ReactNode, useState } from "react";

// Definindo a interface para os dados do álbum
interface Album {
    id: string;
    name: string;
    artists: { name: string }[];
    images: { url: string }[];
}

// Definindo o tipo para o contexto
interface setFeaturedAlbumContext_Type {
    featuredAlbum: Album | null;
    setFeaturedAlbum: (value: Album | null) => void;
}

// Criando o contexto e exportando-o
export const FeaturedAlbumContext = createContext<setFeaturedAlbumContext_Type | undefined>(undefined);

// Exportando o provedor de contexto como um componente separado
export const FeaturedAlbumProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [featuredAlbum, setFeaturedAlbum] = useState<Album | null>(null); // Estado compartilhado

    return (
        <FeaturedAlbumContext.Provider value={{ featuredAlbum, setFeaturedAlbum }}>
            {children}
        </FeaturedAlbumContext.Provider>
    );
};
