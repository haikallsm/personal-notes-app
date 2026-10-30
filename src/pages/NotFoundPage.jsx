import { Link } from 'react-router-dom';
import useTranslate from '../hooks/useTranslate';

function NotFoundPage() {
  const t = useTranslate();

  return (
    <section className="not-found-page">
      <p className="not-found-page__code">404</p>
      <h2 className="not-found-page__title">{t('notFound.title')}</h2>
      <p className="not-found-page__description">{t('notFound.description')}</p>
      <Link to="/" className="button button--primary">
        {t('notFound.back')}
      </Link>
    </section>
  );
}

export default NotFoundPage;
