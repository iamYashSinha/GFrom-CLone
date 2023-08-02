import React, { useState } from "react";
import "./Formheader.css";
import formImage from "../images/icon.png";
import { IoMdFolderOpen } from "react-icons/io";
import { FiStar, FiSettings } from "react-icons/fi";
import {
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@material-ui/core";
import ColorLensIcon from "@material-ui/icons/ColorLens";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import { IoMdEye } from "react-icons/io";
import { Link, useParams, useNavigate } from "react-router-dom";

const Formheader = ({ photoURL, value }) => {
  const { id } = useParams();
  const [anchorElUser, setAnchorElUser] = useState(null);
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const logout = () => {
    sessionStorage.clear();
    window.location.reload();
  };
  const Navigate = useNavigate();
  const handleIconClick = () => {
    Navigate('/');
  }
  return (
    <div className="form_header">
      <div className="form_header_left">
        <img onClick={handleIconClick} src={formImage} alt="" style={{ height: "45px", width: "40px", cursor: "pointer" }} />
        <input type="text" placeholder="Untitled form" className="form_name" />
        <IoMdFolderOpen
          className="form_header_icon"
          style={{ marginRight: "10px" }}
        ></IoMdFolderOpen>
        <FiStar className="form_header_icon" style={{ marginRight: "10px" }} />
      </div>
      <div className="form_header_right">
        <Link to={`/form/${id}/preview`}>
          <IconButton>
            <IoMdEye className="form_header_icon" />
          </IconButton>
        </Link>
        <IconButton>
          <MoreVertIcon className="form_header_icon" />
        </IconButton>

        <Tooltip title="Open settings">
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            {photoURL && (
              <Avatar
                src={photoURL}
                style={{ width: "30px", height: "30px" }}
                alt={value}
              />
            )}
          </IconButton>
        </Tooltip>

        <Menu
          sx={{ mt: "45px" }}
          id="menu-appbar"
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
          <MenuItem onClick={handleCloseUserMenu}>
            <Typography textAlign="center" onClick={logout}>
              Logout
            </Typography>
          </MenuItem>
        </Menu>
      </div>
    </div>
  );
};

export default Formheader;
