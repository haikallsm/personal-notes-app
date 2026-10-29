import React from 'react';
import { Link } from 'react-router-dom';

function FloatingLink({ to, label, variant = 'primary' }) {
  return (
    <Link to={to} className={`action action--${variant}`}>
      {label}
    </Link>
  );
}

export default FloatingLink;