import React from 'react';
import PropTypes from 'prop-types';

const StatCard = ({ label, value, trend, note }) => (
  <div className="stat-card">
    <div className="stat-card__header">
      <span className="stat-card__label">{label}</span>
      <span className={`stat-card__trend stat-card__trend--${trend}`}>
        {trend === 'up' ? '▲' : trend === 'down' ? '▼' : '■'}
      </span>
    </div>
    <div className="stat-card__value">{value}</div>
    <p className="stat-card__note">{note}</p>
  </div>
);

StatCard.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  trend: PropTypes.oneOf(['up', 'down', 'flat']).isRequired,
  note: PropTypes.string.isRequired
};

export default StatCard;
