import { StyleSheet } from 'react-native';

export const lightTheme = {
    colors: {
        primary: '#004C99', // Azul marino
        text: '#333333', // Gris oscuro para el texto
        background: '#E3F2FD', // Azul claro para el fondo
        buttonBackground: '#03A9F4', // Azul más brillante para botones o acciones positivas
        buttonText: '#FFFFFF', // Blanco para el texto de los botones
    },
    styles: StyleSheet.create({
        container: {
            borderRadius: 10,
            margin: 8,
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#E3F2FD', // Azul claro
        },
        containerSet: {
            width: "90%",
            height: "90%",
            borderRadius: 10,
            margin: 8,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#B3E5FC', // Azul más claro
        },
        text: {
            fontSize: 18,
            fontWeight: 'bold',
            color: '#004C99', // Azul marino para el texto
        },
        button: {
            padding: 10,
            borderRadius: 5,
            marginTop: 20,
            backgroundColor: '#03A9F4', // Azul brillante para el botón
        },
        buttonText: {
            fontWeight: 'bold',
            color: '#FFFFFF', // Blanco para el texto del botón
        },
    }),
};

export const darkTheme = {
    colors: {
        primary: '#003366', // Azul marino oscuro
        text: '#E0E0E0', // Gris claro para el texto
        background: '#001F3F', // Azul muy oscuro para el fondo
        buttonBackground: '#0056D2', // Azul brillante para botones o acciones positivas
        buttonText: '#FFFFFF', // Blanco para el texto de los botones
    },
    styles: StyleSheet.create({
        container: {
            borderRadius: 10,
            margin: 8,
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#001F3F', // Azul oscuro
        },
        containerSet: {
            width: "90%",
            height: "90%",
            borderRadius: 10,
            margin: 8,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#003366', // Azul marino oscuro
        },
        text: {
            fontSize: 18,
            fontWeight: 'bold',
            color: '#E0E0E0', // Gris claro para el texto
        },
        button: {
            padding: 10,
            borderRadius: 5,
            marginTop: 20,
            backgroundColor: '#0056D2', // Azul brillante para el botón
        },
        buttonText: {
            fontWeight: 'bold',
            color: '#FFFFFF', // Blanco para el texto del botón
        },
    }),
};
