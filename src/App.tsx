import * as React from 'react';
import { Box, ThemeProvider } from '@mui/system'
import { Header } from './components/Header';
import { Typography, createTheme } from '@mui/material';
import { Layout } from './components/Layout';
import { appTheme } from './config/theme';
import { Routes, Route, Link } from 'react-router-dom';
import { CategoryList } from './features/categories/ListCategory';
import { CategoryCreate } from './features/categories/CreateCategory';
import { CategoryEdit } from './features/categories/EditCategory';

export default function App() {
  return (
    <ThemeProvider theme={appTheme}>
      <Box component="main" sx={{
        height: '100vh',
        backgroundColor: (theme) => theme.palette.grey[900],
      }}>
        <Header />
        <Layout>
          <h1>Welcome</h1>
          <Routes>
            <Route path="/" element={<CategoryList />} />
            <Route path="/categories" element={<CategoryList />} />
            <Route path="/categories/create" element={<CategoryCreate />} />
            <Route path="/categories/edit/:id" element={<CategoryEdit />} />
            <Route path="*" element={
              <Box sx={{ color: "white" }}>
                <Typography variant="h1">404</Typography>
                <Typography variant="h2">Page not found</Typography>
              </Box>
            } />
          </Routes>
        </Layout>
      </Box>
    </ThemeProvider>
  );
}