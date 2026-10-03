/* ==========================================================================
   APP — ROUTES
   /          Homepage ("Classic warm" design)
   /about     Life in the choir
   /programmes  Current and past programmes
   /concerts  Concerts & tickets
   ========================================================================== */

import { BrowserRouter, Route, Routes } from 'react-router';
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ProgrammesPage } from './pages/ProgrammesPage';
import { ConcertsPage } from './pages/ConcertsPage';
import { NotFoundPage } from './pages/NotFoundPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="programmes" element={<ProgrammesPage />} />
          <Route path="concerts" element={<ConcertsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
