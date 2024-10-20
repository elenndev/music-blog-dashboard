import { createContext, ReactNode, useState } from "react";

// Definindo a interface para os dados do álbum

interface FeaturedAlbum_ContextType {
    featuredAlbumId: String;
    setFeaturedAlbumId: (id: string) => void

}

export const FeaturedAlbumContext= createContext<FeaturedAlbum_ContextType | undefined>(undefined);

export const featuredAlbumProvider: React.FC<{children: ReactNode}> = ({children}) => {
    const [featuredAlbumId, setFeaturedAlbumId] = useState<string>("") 

    return(
        <FeaturedAlbumContext.Provider value={{ featuredAlbumId, setFeaturedAlbumId }}>
        {children}
        </FeaturedAlbumContext.Provider>
    )
}
