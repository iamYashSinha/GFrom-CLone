import React from 'react';
import './Popup.css'
import FilterNoneIcon from "@material-ui/icons/FilterNone";
import { IconButton } from '@material-ui/core';

const Popup = ({ isOpen, onClose, children, onClick }) => {
  if (!isOpen) return null;

  return (
    <div className="popup">
      <div className="popup__content">
        {children}
        <button className="popup__close-button" onClick={onClose}>
          Close
        </button>
        <IconButton onClick={onClick}>
        <FilterNoneIcon/>
        </IconButton>
      </div>
    </div>
  );
};

export default Popup;