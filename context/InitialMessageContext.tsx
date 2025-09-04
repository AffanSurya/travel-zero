import { createContext } from "react";

export type InitialMessageContextType = {
    initialMessage: string | null;
    setInitialMessage: React.Dispatch<React.SetStateAction<string | null>>;
};

export const InitialMessageContext = createContext<InitialMessageContextType | undefined>(undefined);
