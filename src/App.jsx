import { useState, useEffect, useMemo, useCallback } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Navigation from './components/Navigation';
import HomePage from './pages/HomePage';
import ArchivePage from './pages/ArchivePage';
import DetailPage from './pages/DetailPage';
import AddNotePage from './pages/AddNotePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import NotFoundPage from './pages/NotFoundPage';
import Loading from './components/Loadingtemp';
import ThemeContext from './contexts/ThemeContext';
import LocaleContext from './contexts/LocaleContext';
import { getAccessToken, putAccessToken, getUserLogged } from './utils/network-data';

function App() {
  const [authedUser, setAuthedUser] = useState(null);
  const [initializing, setInitializing] = useState(true);
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');
  const [locale, setLocale] = useState(() => localStorage.getItem('locale') || 'id');
  const navigate = useNavigate();

  const toggleTheme = useCallback(() => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', newTheme);
      return newTheme;
    });
  }, []);

  const toggleLocale = useCallback(() => {
    setLocale((prevLocale) => {
      const newLocale = prevLocale === 'id' ? 'en' : 'id';
      localStorage.setItem('locale', newLocale);
      return newLocale;
    });
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    async function fetchUser() {
      if (getAccessToken()) {
        const { error, data } = await getUserLogged();
        setAuthedUser(error ? null : data);
      }
      setInitializing(false);
    }

    fetchUser();
  }, []);

  const onLoginSuccess = useCallback(async ({ accessToken }) => {
    putAccessToken(accessToken);
    const { error, data } = await getUserLogged();

    if (!error) {
      setAuthedUser(data);
      navigate('/');
    }
  }, [navigate]);

  const onLogout = useCallback(() => {
    setAuthedUser(null);
    putAccessToken('');
    navigate('/login');
  }, [navigate]);

  const themeContextValue = useMemo(
    () => ({ theme, toggleTheme }),
    [theme, toggleTheme],
  );
  const localeContextValue = useMemo(
    () => ({ locale, toggleLocale }),
    [locale, toggleLocale],
  );

  if (initializing) {
    return <Loading />;
  }

  return (
    <ThemeContext.Provider value={themeContextValue}>
      <LocaleContext.Provider value={localeContextValue}>
        <div className="app-container" data-theme={theme}>
          <Navigation authedUser={authedUser} logout={onLogout} />
          <main>
            {authedUser === null ? (
              <Routes>
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/login" element={<LoginPage loginSuccess={onLoginSuccess} />} />
                <Route path="/*" element={<LoginPage loginSuccess={onLoginSuccess} />} />
              </Routes>
            ) : (
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/archives" element={<ArchivePage />} />
                <Route path="/notes/new" element={<AddNotePage />} />
                <Route path="/notes/:id" element={<DetailPage />} />
                <Route path="/login" element={<Navigate to="/" replace />} />
                <Route path="/register" element={<Navigate to="/" replace />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            )}
          </main>
        </div>
      </LocaleContext.Provider>
    </ThemeContext.Provider>
  );
}

export default App;
