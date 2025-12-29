import React from 'react';
import PropTypes from 'prop-types';
import Button from './Button';

const Drawer = ({ isOpen, title, onClose, children }) => (
  <div className={`ui-drawer ${isOpen ? 'is-open' : ''}`}>
    <div className="ui-drawer__overlay" onClick={onClose} aria-hidden="true" />
    <aside className="ui-drawer__panel">
      <header className="ui-drawer__header">
        <h3 className="ui-drawer__title">{title}</h3>
        <Button variant="ghost" size="sm" onClick={onClose}>
          Close
        </Button>
      </header>
      <div className="ui-drawer__body">{children}</div>
    </aside>
  </div>
);

Drawer.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired
};

export default Drawer;
