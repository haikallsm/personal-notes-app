import { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import useInput from '../hooks/useInput';
import useTranslate from '../hooks/useTranslate';
import { login } from '../utils/network-data';

function LoginPage({ loginSuccess }) {
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');
  const [loading, setLoading] = useState(false);
  const t = useTranslate();

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);

    const { error, data } = await login({ email, password });
    if (!error) {
      loginSuccess(data);
    }

    setLoading(false);
  };

  return (
    <section className="auth-page">
      <div className="auth-card">
        <div className="auth-card__header">
          <h2>{t('login.title')}</h2>
          <p>{t('login.subtitle')}</p>
        </div>

        <form onSubmit={onSubmitHandler} className="auth-form">
          <div className="input-group">
            <label htmlFor="email">{t('input.email')}</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={onEmailChange}
              placeholder={t('placeholder.email')}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">{t('input.password')}</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={onPasswordChange}
              placeholder={t('placeholder.password')}
              required
            />
          </div>

          <button type="submit" className="auth-button" disabled={loading}>
            {loading ? t('loading.processing') : t('login.submit')}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            {t('login.noAccount')}
            <Link to="/register">{t('login.registerLink')}</Link>
          </p>
        </div>
      </div>
    </section>
  );
}

LoginPage.propTypes = {
  loginSuccess: PropTypes.func.isRequired,
};

export default LoginPage;
