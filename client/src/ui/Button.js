import React from 'react';
import PropTypes from 'prop-types';

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  icon,
  as: Component = 'button',
  ...props
}) => {
  const className = [
    'ui-button',
    `ui-button--${variant}`,
    `ui-button--${size}`,
    fullWidth ? 'ui-button--block' : ''
  ]
    .filter(Boolean)
    .join(' ');

  const componentProps =
    Component === 'button' && !props.type ? { type: 'button' } : {};

  return (
    <Component className={className} {...componentProps} {...props}>
      {icon && <span className="ui-button__icon">{icon}</span>}
      <span className="ui-button__label">{children}</span>
    </Component>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf([
    'primary',
    'secondary',
    'ghost',
    'danger',
    'outline'
  ]),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  fullWidth: PropTypes.bool,
  icon: PropTypes.node,
  as: PropTypes.elementType
};

export default Button;
