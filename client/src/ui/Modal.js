import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import Button from './Button';

const Modal = ({ isOpen, onClose, title, children, actions }) => {
  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return ReactDOM.createPortal(
    <div className="ui-modal__backdrop" role="dialog" aria-modal="true">
      <div className="ui-modal">
        <header className="ui-modal__header">
          <div>
            {title && <h3 className="ui-modal__title">{title}</h3>}
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            Close
          </Button>
        </header>
        <div className="ui-modal__body">{children}</div>
        {actions && <footer className="ui-modal__footer">{actions}</footer>}
      </div>
    </div>,
    document.body
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
  actions: PropTypes.node
};

export default Modal;
