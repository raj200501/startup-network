import React from 'react';
import PropTypes from 'prop-types';

const SectionHeader = ({ eyebrow, title, subtitle, action }) => (
  <div className="ui-section-header">
    <div>
      {eyebrow && <span className="ui-section-header__eyebrow">{eyebrow}</span>}
      <h2 className="ui-section-header__title">{title}</h2>
      {subtitle && <p className="ui-section-header__subtitle">{subtitle}</p>}
    </div>
    {action && <div className="ui-section-header__action">{action}</div>}
  </div>
);

SectionHeader.propTypes = {
  eyebrow: PropTypes.string,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  action: PropTypes.node
};

export default SectionHeader;
