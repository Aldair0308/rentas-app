import React, { createContext, useState, ReactNode } from 'react';
import { lightTheme, darkTheme } from '../theme/Theme';

interface Theme {
    container: object;
    switchContainer: object;
    text: object;
}

interface ThemeProviderProps {
    children: ReactNode;
}

export const ThemeContext = createContext<{ theme: Theme; toggleTheme: () => void } | undefined>(undefined);

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
    const [currentTheme, setCurrentTheme] = useState<Theme>(lightTheme);

    const toggleTheme = () => {
    setCurrentTheme(currentTheme === lightTheme ? darkTheme : lightTheme);
    };

    return (
    <ThemeContext.Provider value={{ theme: currentTheme, toggleTheme }}>
        {children}
    </ThemeContext.Provider>
    );
};
