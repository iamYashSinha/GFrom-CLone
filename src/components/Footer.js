// Footer.js
import React from 'react';

function Footer() {
  const date = new Date();
  const footerStyle = {
    background: 'black',
    color: 'white',
    padding: '10px',
    textAlign: 'center',
    position: 'fixed',
    left: '0',
    bottom: '0',
    width: '100%',
    
  };
  const link = {
    textDecoration: 'none',
    color: 'white',
  }

  return (
    <footer style={footerStyle}>
      &copy; {date.getFullYear()}  <a style={link} href='https://ovautocd.web.app/' target='_blank' rel='noopener noreferrer'>Digilytics Systems LLP</a>
    </footer>
  );
}

export default Footer;
