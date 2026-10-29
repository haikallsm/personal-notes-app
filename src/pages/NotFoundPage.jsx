import React from 'react';
import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <section className="not-found-page">
      <p className="not-found-page__code">404</p>
      <h2 className="not-found-page__title">Halaman Tidak Ditemukan</h2>
      <p className="not-found-page__description">
        Maaf, halaman yang kamu tuju tidak ada atau sudah dipindahkan.
      </p>
      <Link to="/" className="button button--primary">
        Kembali ke Daftar Catatan
      </Link>
    </section>
  );
}

export default NotFoundPage;