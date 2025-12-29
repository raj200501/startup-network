import React from 'react';
import PropTypes from 'prop-types';

const Badge = ({ children, variant = 'neutral' }) => (
  <span className={`ui-badge ui-badge--${variant}`}>{children}</span>
);

Badge.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf([
    'neutral',
    'success',
    'warning',
    'danger',
    'info'
  ])
};

export default Badge;
