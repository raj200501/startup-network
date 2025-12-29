import React from 'react';
import PropTypes from 'prop-types';

export const Tabs = ({ tabs, active, onChange }) => (
  <div className="ui-tabs">
    {tabs.map((tab) => (
      <button
        key={tab.id}
        type="button"
        className={`ui-tabs__tab ${active === tab.id ? 'is-active' : ''}`}
        onClick={() => onChange(tab.id)}
      >
        {tab.label}
      </button>
    ))}
  </div>
);

Tabs.propTypes = {
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired
    })
  ).isRequired,
  active: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};
