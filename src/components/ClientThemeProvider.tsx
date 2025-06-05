'use client';

import React from 'react';
import { ThemeProvider } from 'styled-components';
import { theme } from '../styles/GlobalStyles';

interface ClientThemeProviderProps {
  children: React.ReactNode;
}

const ClientThemeProvider: React.FC<ClientThemeProviderProps> = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
  );
};

export default ClientThemeProvider;
