import * as React from 'react';
import Button from '@mui/material/Button';
import { Box, ThemeProvider } from '@mui/system'
import { Header } from './components/Header';
import { createTheme } from '@mui/material';
import { Layout } from './components/Layout';

const theme = createTheme({});

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Box component="main" sx={{
        height: '100vh',
        // backgroundColor: '#000',
      }}>
        <Header />
        <Layout>
          <h1>Hello World!</h1>
        </Layout>
      </Box>
    </ThemeProvider>
  );
}