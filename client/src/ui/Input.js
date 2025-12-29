import React from 'react';
import PropTypes from 'prop-types';

const Input = ({
  label,
  helper,
  error,
  type = 'text',
  className = '',
  ...props
}) => (
  <label className={`ui-input ${className}`}>
    {label && <span className="ui-input__label">{label}</span>}
    <input className="ui-input__field" type={type} {...props} />
    {(helper || error) && (
      <span className={`ui-input__helper ${error ? 'is-error' : ''}`}>
        {error || helper}
      </span>
    )}
  </label>
);

Input.propTypes = {
  label: PropTypes.string,
  helper: PropTypes.string,
  error: PropTypes.string,
  type: PropTypes.string,
  className: PropTypes.string
};

export default Input;
