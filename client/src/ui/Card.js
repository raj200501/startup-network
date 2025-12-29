import React from 'react';
import PropTypes from 'prop-types';

const Card = ({ children, title, subtitle, actions, className = '' }) => (
  <section className={`ui-card ${className}`}>
    {(title || subtitle || actions) && (
      <header className="ui-card__header">
        <div>
          {title && <h3 className="ui-card__title">{title}</h3>}
          {subtitle && <p className="ui-card__subtitle">{subtitle}</p>}
        </div>
        {actions && <div className="ui-card__actions">{actions}</div>}
      </header>
    )}
    <div className="ui-card__body">{children}</div>
  </section>
);

Card.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  actions: PropTypes.node,
  className: PropTypes.string
};

export default Card;
