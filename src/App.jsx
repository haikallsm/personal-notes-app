import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import Navigation from './components/Navigation';
import HomePage from './pages/HomePage';
import ArchivePage from './pages/ArchivePage';
import DetailPage from './pages/DetailPage';
import AddNotePage from './pages/AddNotePage';
import EditNotePage from './pages/EditNotePage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <Link to="/" className="app-header__brand">
          <span className="app-header__logo" aria-hidden="true">
            &#128221;
          </span>
          <span>Aplikasi Catatan Pribadi</span>
        </Link>

        <Navigation />

        <Link to="/notes/new" className="button button--primary app-header__cta">
          + Catatan Baru
        </Link>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/archived" element={<ArchivePage />} />
          <Route path="/notes/new" element={<AddNotePage />} />
          <Route path="/notes/:id" element={<DetailPage />} />
          <Route path="/notes/:id/edit" element={<EditNotePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      <footer className="app-footer">
        <p>Dibuat dengan React &amp; React Router &mdash; data lokal di memori modul.</p>
      </footer>
    </div>
  );
}

export default App;