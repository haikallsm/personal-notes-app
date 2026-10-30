import { useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ThemeContext from '../contexts/ThemeContext';
import LocaleContext from '../contexts/LocaleContext';
import useTranslate from '../hooks/useTranslate';

function Navigation({ authedUser = null, logout }) {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { locale, toggleLocale } = useContext(LocaleContext);
  const t = useTranslate();

  return (
    <header className="navigation-header">
      <h1 className="navigation-header__title">
        <Link to="/">{t('nav.brand')}</Link>
      </h1>

      {authedUser && (
        <nav className="navigation-nav" aria-label={t('nav.brand')}>
          <ul>
            <li>
              <Link to="/">{t('nav.activeNotes')}</Link>
            </li>
            <li>
              <Link to="/archives">{t('nav.archived')}</Link>
            </li>
          </ul>
        </nav>
      )}

      <div className="navigation-actions">
        <button
          type="button"
          onClick={toggleLocale}
          className="btn-toggle"
          aria-label="Ubah bahasa / Change language"
        >
          {locale === 'id' ? 'EN' : 'ID'}
        </button>
        <button
          type="button"
          onClick={toggleTheme}
          className="btn-toggle"
          aria-label={theme === 'dark' ? t('theme.toLight') : t('theme.toDark')}
        >
          {theme === 'dark' ? t('theme.toLight') : t('theme.toDark')}
        </button>
        {authedUser && (
          <button type="button" onClick={logout} className="btn-logout">
            {t('nav.logout')} ({authedUser.name})
          </button>
        )}
      </div>
    </header>
  );
}

Navigation.propTypes = {
  authedUser: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string,
  }),
  logout: PropTypes.func.isRequired,
};

export default Navigation;
