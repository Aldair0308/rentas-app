import { useContext } from 'react';
import { ThemeContext } from './ThemeProvider';

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme debe ser utilizado dentro de un ThemeProvider');
    }
    return context;
};
