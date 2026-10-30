import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function FloatingLink({ to, label, variant = 'primary', title, ariaLabel }) {
  return (
    <Link
      to={to}
      className={`action action--${variant}`}
      title={title}
      aria-label={ariaLabel ?? title}
    >
      {label}
    </Link>
  );
}

FloatingLink.propTypes = {
  to: PropTypes.string.isRequired,
  label: PropTypes.node.isRequired,
  variant: PropTypes.string,
  title: PropTypes.string,
  ariaLabel: PropTypes.string,
};

export default FloatingLink;