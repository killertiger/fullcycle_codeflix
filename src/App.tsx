import * as React from 'react';
import { Box, ThemeProvider } from '@mui/system'
import { Header } from './components/Header';
import { CssBaseline, Typography, createTheme } from '@mui/material';
import { Layout } from './components/Layout';
import { darkTheme, lightTheme } from './config/theme';
import { Routes, Route, Link } from 'react-router-dom';
import { CategoryList } from './features/categories/ListCategory';
import { CategoryCreate } from './features/categories/CreateCategory';
import { CategoryEdit } from './features/categories/EditCategory';
import { SnackbarProvider, enqueueSnackbar } from 'notistack';
import { ListCastMembers } from './features/cast/ListCastMembers';
import { CreateCastMember } from './features/cast/CreateCastMember';
import { EditCastMember } from './features/cast/EditCastMember';
import { GenreCreate } from './features/genre/GenreCreate';
import { GenreEdit } from './features/genre/GenreEdit';
import { GenreList } from './features/genre/GenreList';
import { VideosList } from './features/videos/VideosList';
import { VideosCreate } from './features/videos/VideosCreate';
import { VideosEdit } from './features/videos/VideosEdit';
import { useState, useEffect } from 'react';

export default function App() {
  const [theme, setTheme] = useState(darkTheme);

  const toggleTheme = () => {
    const currentTheme = theme.palette.mode === "dark" ? lightTheme : darkTheme;
    setTheme(currentTheme);
    localStorage.setItem("theme", currentTheme.palette.mode);
  }

  useEffect(() => {
    const currentTheme = localStorage.getItem("theme");
    if(currentTheme) {
      setTheme(theme.palette.mode === "dark" ? lightTheme : darkTheme);
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SnackbarProvider
        autoHideDuration={2000}
        maxSnack={3}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}>
        <Box component="main" sx={{
          height: '100vh',
          backgroundColor: (theme) => theme.palette.grey[900],
        }}>
          <Header toggleTheme={toggleTheme} theme={theme.palette.mode}/>
          <Layout>
            <h1>Welcome</h1>
            <Routes>
              <Route path="/" element={<CategoryList />} />

              {/* Category */}
              <Route path="/categories" element={<CategoryList />} />
              <Route path="/categories/create" element={<CategoryCreate />} />
              <Route path="/categories/edit/:id" element={<CategoryEdit />} />

              {/* Cast Members */}
              <Route path="/cast-members" element={<ListCastMembers />} />
              <Route path="/cast-members/create" element={<CreateCastMember />} />
              <Route path="/cast-members/edit/:id" element={<EditCastMember />} />

              {/* Genre */}
              <Route path="/genres" element={<GenreList />} />
              <Route path="/genres/create" element={<GenreCreate />} />
              <Route path="/genres/edit/:id" element={<GenreEdit />} />

              {/* Videos */}
              <Route path="/videos" element={<VideosList/>} />
              <Route path="/videos/create" element={<VideosCreate/>} />
              <Route path="/videos/edit/:id" element={<VideosEdit/>} />

              <Route path="*" element={
                <Box sx={{ color: "white" }}>
                  <Typography variant="h1">404</Typography>
                  <Typography variant="h2">Page not found</Typography>
                </Box>
              } />
            </Routes>
          </Layout>
        </Box>
      </SnackbarProvider>
    </ThemeProvider>
  );
}