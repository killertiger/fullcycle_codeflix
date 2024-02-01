import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import { Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import { CreateCastMember } from './features/cast/CreateCastMember';
import { EditCastMember } from './features/cast/EditCastMember';
import { ListCastMembers } from './features/cast/ListCastMembers';
import { CategoryCreate } from './features/categories/CreateCategory';
import { CategoryEdit } from './features/categories/EditCategory';
import { CategoryList } from './features/categories/ListCategory';
import { GenreCreate } from './features/genre/GenreCreate';
import { GenreEdit } from './features/genre/GenreEdit';
import { GenreList } from './features/genre/GenreList';
import { VideosCreate } from './features/videos/VideosCreate';
import { VideosEdit } from './features/videos/VideosEdit';
import { VideosList } from './features/videos/VideosList';
import { useAppTheme } from './hooks/useAppTheme';
import { UploadList } from './features/UploadList/UploadList';

export default function App() {
  const [currentTheme, toggleCurrentTheme] = useAppTheme();

  return (
    <Layout>
      <UploadList
        uploads={[
          { name: "upload 1", progress: 10 },
          { name: "upload 2", progress: 20 },
          { name: "upload 3", progress: 30 },
          { name: "upload 4", progress: 40 },
        ]}
      />
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
        <Route path="/videos" element={<VideosList />} />
        <Route path="/videos/create" element={<VideosCreate />} />
        <Route path="/videos/edit/:id" element={<VideosEdit />} />

        <Route path="*" element={
          <Box sx={{ color: "white" }}>
            <Typography variant="h1">404</Typography>
            <Typography variant="h2">Page not found</Typography>
          </Box>
        } />
      </Routes>
    </Layout>
  );
}