import * as React from 'react';
import { Box, ThemeProvider } from '@mui/system'
import { Header } from './components/Header';
import { Typography, createTheme } from '@mui/material';
import { Layout } from './components/Layout';
import { appTheme } from './config/theme';
import { Routes, Route, Link } from 'react-router-dom';


const Home = () => {
  return (
    <div>
      <Typography variant="h1">Home</Typography>
      <Link to="/about">About</Link>
    </div>
  )
}

const About = () => {
  return (
    <div>
      <Typography variant="h1">About</Typography>
      <Link to="/">Home</Link>
    </div>
  )
}

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
            <Route path="/" element={<Home />} />
            <Route path='/about' element={<About />} />
          </Routes>
        </Layout>
      </Box>
    </ThemeProvider>
  );
}