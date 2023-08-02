import React, { useEffect, useState } from 'react';
import './Mainbody.css';
import StorageIcon from '@material-ui/icons/Storage';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import FolderOpenIcon from '@material-ui/icons/FolderOpen';
import { IconButton } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import docImage from '../images/recentone.png';
import { useNavigate } from 'react-router-dom';
import { getDatabase, onValue, ref } from 'firebase/database';
import { app } from '../firebase';

function Mainbody() {
  const [data, setData] = useState({});
  useEffect(() => {
    const fetchData = () => {
      const db = getDatabase(app);
      const formRef = ref(db, 'forms');
      try {
        onValue(formRef, (snapshot) => {
          const data = snapshot.val();
          // Ensure data is not null
          if (data !== null) {
            setData(data);
          }
        });
      } catch (err) {
        console.log('Error Fetching the data: ', err.message);
      }
    };
    fetchData();
  }, []);

  const navigate = useNavigate();
  const handleRecentForm = () => {
    // Check if data is not empty
    if (Object.keys(data).length > 0) {
      const keys = Object.keys(data);
      // Sort the keys in descending order (assuming they are timestamps)
      keys.sort((a, b) => new Date(b) - new Date(a));
  
      const mostRecentKey = keys[0]; // Get the most recent key
      const savedUrl = `form/${mostRecentKey}`;
      navigate(savedUrl, '_blank');
      window.location.reload();
    } else {
      alert('No Recent Form!');
    }
  };
  return (
    <div className="mainbody">
      <div className="mainbody_top">
        <div className="mainbody_top_left" style={{ fontSize: '16px', fontWeight: '500' }}>
          Recent forms
        </div>

        <div className="mainbody_top_right">

          <IconButton>
            <StorageIcon style={{ fontSize: '16px', color: 'black' }} />
          </IconButton>

          <IconButton>
            <FolderOpenIcon style={{ fontSize: '16px', color: 'black' }} />
          </IconButton>
        </div>
      </div>
      <div className="mainbody_docs">
        <div className="doc_card">
          <img onClick={handleRecentForm} src={docImage} className="doc_image" alt="" />
          <div className="doc_card_content">
            <div className="doc_content" style={{ fontSize: '12px', color: 'grey' }}>
              <div className="content_left">
                <StorageIcon
                  style={{
                    color: 'white',
                    fontSize: '12px',
                    backgroundColor: '#6E2594',
                    padding: '3px',
                    marginRight: '3px',
                    borderRadius: '2px',
                  }}
                />
              </div>
              <MoreVertIcon style={{ fontSize: '16px', color: 'grey' }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Mainbody;
