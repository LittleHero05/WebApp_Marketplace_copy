import React from 'react';
import PropTypes from 'prop-types';
import { IconButton, Tooltip } from '@mui/material';
import './CircularButton.css';

const CircularButton = ({ onClick, color, size, icon: Icon, label }) => {
  return (
    <Tooltip title={label} arrow>
      <IconButton
        onClick={onClick}
        color={color}
        size={size}
        className="circular-button"
      >
        <Icon />
      </IconButton>
    </Tooltip>
  );
};

CircularButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  color: PropTypes.oneOf(['default', 'inherit', 'primary', 'secondary', 'error', 'info', 'success', 'warning']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  icon: PropTypes.elementType.isRequired,
  label: PropTypes.string
};

CircularButton.defaultProps = {
  color: 'default',
  size: 'medium',
  label: ''
};

export default CircularButton;