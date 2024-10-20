import { createContext, ReactNode, useState } from "react";

interface EditModeContextType{
    onEdit: boolean;
    setEditMode: (value: boolean) => void;
    submittedPost: boolean;
    setOnSubmittedPost: (value: boolean) => void;
}

export const EditModeContext = createContext<EditModeContextType | undefined>(undefined);

export const EditModeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [onEdit, setOnEdit] = useState(false); // Estado compartilhado
    const [submittedPost, setSubmittedPost] = useState(false)

    return (
        <EditModeContext.Provider value={{ onEdit, setEditMode: setOnEdit, submittedPost, setOnSubmittedPost: setSubmittedPost }}>
            {children}
        </EditModeContext.Provider>
    );
};