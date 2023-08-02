import React, { useState, useEffect } from 'react';
import Footer from './Footer';
import landing from '../images/landing.jpg';

function Thankyou() {
  const imageURLFromSession = sessionStorage.getItem('photoURL');
  const getEmail = sessionStorage.getItem('email');

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column', // Change to column layout on smaller screens
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px', // Add some padding to the container
  };

  const imageStyle = {
    marginTop: '20px',
    width: '150px',
    height: '150px',
    borderRadius: '50%',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    marginBottom: '20px', // Move the image down a bit
  };

  const spanStyle = {
    fontSize: '18px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    borderRight: '2px solid #000',
    animation: 'typing 1s steps(40) infinite',
    textAlign: 'center', // Center the text on smaller screens
  };

  const landingImageStyle = {
    width: '70%', // Adjust the width as needed for responsiveness
    maxWidth: '870px', // Add maximum width to prevent image overflow
    height: 'auto', // Maintain aspect ratio
    marginTop: '89px', // Adjust the spacing between the text and image
  };

  // Move emailText outside the useEffect hook
  const emailText = `Thank you for your response, <b>${getEmail}</b>!`;

  const [isTypingFinished, setIsTypingFinished] = useState(false);
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      setDisplayText(emailText.slice(0, currentIndex));
      currentIndex++;
      if (currentIndex > emailText.length) {
        setIsTypingFinished(true);
        clearInterval(interval);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [emailText]);

  return (
    <div style={containerStyle}>
      <img src={imageURLFromSession} alt="User Avatar" style={imageStyle} />
      <span style={spanStyle}>
        {isTypingFinished ? (
          // Use the emailText variable directly here
          <span dangerouslySetInnerHTML={{ __html: emailText }} />
        ) : (
          <span dangerouslySetInnerHTML={{ __html: displayText }} />
        )}
      </span>
      <img style={landingImageStyle} src={landing} alt="Landing" />
      <Footer />
    </div>
  );
}

export default Thankyou;
