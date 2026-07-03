import type { ReactNode } from 'react';
import {
    createContext,
    useContext,
    useState,
    useCallback,
    useMemo,
} from 'react';

interface AuthContextType {
    isAuthenticated: boolean;
    isAdmin: boolean;
    login: (role: 'admin' | 'user') => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        return localStorage.getItem('isAuthenticated') === 'true';
    });

    const [isAdmin, setIsAdmin] = useState(() => {
        return localStorage.getItem('userRole') === 'admin';
    });

    const login = useCallback((role: 'admin' | 'user') => {
        setIsAuthenticated(true);
        setIsAdmin(role === 'admin');
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('userRole', role);
    }, []);

    const logout = useCallback(() => {
        setIsAuthenticated(false);
        setIsAdmin(false);
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('userRole');
    }, []);

    const value = useMemo(
        () => ({
            isAuthenticated,
            isAdmin,
            login,
            logout,
        }),
        [isAuthenticated, isAdmin, login, logout]
    );

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);

    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }

    return context;
}