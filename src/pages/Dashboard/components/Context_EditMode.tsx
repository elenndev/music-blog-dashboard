import { createContext, ReactNode, useState } from "react";

interface EditModeContextType{
    onEdit: boolean;
    setEditMode: (value: boolean) => void;
}

export const EditModeContext = createContext<EditModeContextType | undefined>(undefined);

export const EditModeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [onEdit, setOnEdit] = useState(false); // Estado compartilhado

    return (
        <EditModeContext.Provider value={{ onEdit, setEditMode: setOnEdit }}>
            {children}
        </EditModeContext.Provider>
    );
};