import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { authAPI } from "../services/api";

interface AuthContextType {
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({children}: {children: ReactNode}) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        setIsAuthenticated(!!token);
      }, [isAuthenticated]);

    const login = async (email: string, password: string) => {
        const response = await authAPI.signIn({email, password});
        localStorage.setItem("token", response.data.token);
        setIsAuthenticated(true);
    }

    const logout = () => {
        localStorage.removeItem("token");
        setIsAuthenticated(false);
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if(!context) throw new Error("useAuth must be used within AuthProvider");
    return context;
};



/*
1. localStorage.getItem("token"):
    Retrieves the value associated with the key "token" from localStorage.
    If the key exists, it returns the value as a string.
    If the key doesn't exist, it returns null.
2. !! (Double NOT operator):
    The first ! converts the value to its boolean negation:
    A truthy value (e.g., non-empty string) becomes false.
    A falsy value (null, undefined, 0, false, "", etc.) becomes true.
    The second ! negates the result again, converting it back to a boolean that reflects the original truthiness of the value.
*/

