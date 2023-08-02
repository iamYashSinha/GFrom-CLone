import React from "react";
import "./Template.css";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { IconButton } from "@material-ui/core";
import UnfoldMoreIcon from "@material-ui/icons/UnfoldMore";
import blank from "../images/blank.png";
import party from "../images/party.png";
import contact from "../images/contact.png";
import uuid from "react-uuid";
import { useNavigate } from "react-router-dom";

function Template() {
  const navigate = useNavigate();
  const createForm = () => {
    const id = uuid();
    navigate("/form/" + id);
  };

  return (
    <div className="template_section">
      <div className="template_top">
        <div className="template_left">
          <span style={{ fontSize: "16px", color: "#202124" }}>
            Start New Form
          </span>
        </div>
        <div className="template_right">
          <div className="gallery_button">
            Template gallery
            <UnfoldMoreIcon />
          </div>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      <div className="template_body">
        <div className="card" onClick={createForm}>
          <img src={blank} className="card_image" alt="" />
          <p className="card_title">Blank</p>
        </div>
        <div className="card">
          <img src={party} className="card_image" alt="" />
          <p className="card_title">Party</p>
        </div>
        <div className="card">
          <img src={contact} className="card_image" alt="" />
          <p className="card_title">Contact</p>
        </div>
      </div>
    </div>
  );
}

export default Template;
