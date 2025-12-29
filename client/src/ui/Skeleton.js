import React from 'react';
import PropTypes from 'prop-types';

const Skeleton = ({ width = '100%', height = '16px', radius = '12px' }) => (
  <span
    className="ui-skeleton"
    style={{ width, height, borderRadius: radius }}
    aria-hidden="true"
  />
);

Skeleton.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
  radius: PropTypes.string
};

export default Skeleton;
