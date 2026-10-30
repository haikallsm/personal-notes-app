import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useInput from '../hooks/useInput';
import useTranslate from '../hooks/useTranslate';
import { register } from '../utils/network-data';

function RegisterPage() {
  const [name, onNameChange] = useInput('');
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');
  const [confirmPassword, onConfirmPasswordChange] = useInput('');
  const [loading, setLoading] = useState(false);
  const t = useTranslate();
  const navigate = useNavigate();

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      window.alert(t('register.mismatch'));
      return;
    }

    setLoading(true);
    const { error } = await register({ name, email, password });
    setLoading(false);

    if (!error) {
      window.alert(t('register.success'));
      navigate('/login');
    }
  };

  return (
    <section className="auth-page">
      <div className="auth-card">
        <div className="auth-card__header">
          <h2>{t('register.title')}</h2>
          <p>{t('register.subtitle')}</p>
        </div>

        <form onSubmit={onSubmitHandler} className="auth-form">
          <div className="input-group">
            <label htmlFor="name">{t('input.name')}</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={onNameChange}
              placeholder={t('placeholder.name')}
              required
            />
          </div>

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

          <div className="input-group">
            <label htmlFor="confirmPassword">{t('input.confirmPassword')}</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={onConfirmPasswordChange}
              placeholder={t('placeholder.password')}
              required
            />
          </div>

          <button type="submit" className="auth-button" disabled={loading}>
            {loading ? t('loading.processing') : t('register.submit')}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            {t('register.haveAccount')}
            <Link to="/login">{t('register.loginLink')}</Link>
          </p>
        </div>
      </div>
    </section>
  );
}

export default RegisterPage;
