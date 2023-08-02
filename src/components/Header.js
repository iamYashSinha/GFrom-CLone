import React, { useState } from "react";
import "./Header.css";
import {
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@material-ui/core";
import formimage from "../images/icon.png";
import SearchIcon from "@material-ui/icons/Search";
import AppsIcon from "@material-ui/icons/Apps";
import Avatar from "@material-ui/core/Avatar";
import TemporaryDrawer from "./TemporaryDrawer";

const Header = ({ photoURL, value }) => {
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

  return (
    <div className="header">
      <div className="header_info">
        <TemporaryDrawer />
        <img
          src={formimage}
          style={{ height: "40px", width: "40px" }}
          alt="formicon"
        />
        <div className="info">Forms</div>
      </div>
      <div className="header_right">
        <IconButton>
          <AppsIcon />
        </IconButton>
        <Tooltip title="Open settings">
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            {photoURL && <Avatar src={photoURL} alt={value} />}
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

export default Header;
