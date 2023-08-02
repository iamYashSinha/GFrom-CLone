import React, { useEffect, useState } from "react";
import { Button, Snackbar, TextField, Typography } from "@material-ui/core";
import "./Userform.css";
import { getDatabase, ref, onValue } from "firebase/database";
import { app } from "../firebase";
import { useParams } from "react-router-dom";
import firebase from "../Db/firebaseInit";
import { useNavigate } from "react-router-dom";
import share from "../images/share-alt-solid-24.png";
import Popup from "./Popup";
import MuiAlert from "@mui/material/Alert";
import SnackBar from "./SnackBar";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
function Userform({ value }) {
  const { id } = useParams(); // Use the useParams hook to get the dynamic ID from the URL
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  const [formInfo, setFormInfo] = useState({
    formName: "",
    formDescription: "",
    questions: [],
  });
  const [responses, setResponses] = useState([]); // State variable to store the responses

  const handleInputChange = (event, index) => {
    const { name, value } = event.target;
    setResponses((prevResponses) => ({ ...prevResponses, [name]: value }));
  };
  const ques = formInfo.questions;
  const getInitials = (email) => {
    const parts = email.split("@");
    if (parts.length === 2) {
      const [username, domain] = parts;
      const usernameParts = username.split(".");
      return usernameParts.map((part) => part).join("");
    }
    return "";
  };
  const navigate = useNavigate();
  const saveResponsesToFirebase = async () => {
    // Save responses to Firebase Realtime Database
    // Ensure you have initialized Firebase in your project before calling this function
    // Construct the data object to save to Firebase
    const formData = {
      value,
      responses,
      ques,
      // Include any other data you want to save
    };

    // Get a reference to the Firebase database
    const dbRef = firebase.database().ref();
    const initials = getInitials(value);
    try {
      await dbRef.child(`responses/${id}/${initials}`).set(formData);
      setText("Form is submitted Successfully");
      setOpen(true);
      await new Promise((resolve) => setTimeout(resolve, 2000));

      navigate("/thankyou");
    } catch (error) {
      console.error("Error saving form data:", error);
      setOpen(true);
    }
  };

  // Clean up any subscriptions or listeners when the component unmounts
  // Add id to the dependency array to re-fetch data when the ID changes
  useEffect(() => {
    // Firebase configuration
    // Initialize Firebase
    const fetchData = async () => {
      // Create a reference to the specific formRef in the Realtime Database
      const db = getDatabase(app);
      const formRef = ref(db, `forms/${id}`);
      console.log(formRef);
      try {
        // Fetch data from the Realtime Database
        onValue(formRef, (snapshot) => {
          const data = snapshot.val();
          setFormInfo(data);
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    return () => {
      // Unsubscribe from the Firebase listener
    };
  }, [id]);
  // Render the form data once it's fetched
  const [isPopupOpen, setPopupOpen] = useState(false);

  const togglePopup = () => {
    setPopupOpen(!isPopupOpen);
  };

  const handlePopup = () => {
    togglePopup();
  };

  const handleCopy = () => {
    const textField = document.createElement("textarea");
    textField.innerText = url;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand("copy");
    document.body.removeChild(textField);
    setOpen(true);
  };

  const url = window.location.href;
  return (
    <div>
      <SnackBar open={open} handleClose={handleClose} text={text} />
      <img
        onClick={handlePopup}
        src={share}
        alt="shareButton"
        style={{
          display: "flex",
          position: "absolute",
          top: "6%",
          right: "30%",
          cursor: "pointer",
          backgroundColor: "#F4F4F9",
        }}
      />
      {formInfo ? (
        <>
          <div className="container">
            {isPopupOpen && (
              <Popup
                isOpen={isPopupOpen}
                onClose={togglePopup}
                onClick={handleCopy}
              >
                {/* Content inside the Popup */}
                <h2>Please share the form!</h2>
                <p>
                  {" "}
                  <a href="" target="_blank">
                    {url}
                  </a>
                </p>
              </Popup>
            )}
          </div>
          <div className="submit">
            <div className="user_form">
              <div className="user_form_section">
                <div className="user_title_section">
                  <Typography style={{ fontSize: "26px" }}>
                    {formInfo.formName}
                  </Typography>
                  <Typography style={{ fontSize: "15px" }}>
                    {formInfo.formDescription}
                  </Typography>
                </div>
                {formInfo.questions.map((question, index) => (
                  <div className="user_form_questions">
                    <Typography
                      style={{
                        fontSize: "15px",
                        fontWeight: "400",
                        letterSpacing: ".1px",
                        lineHeight: "24px",
                        paddingBottom: "8px",
                      }}
                    >
                      {index + 1}. {question.questionText}
                    </Typography>

                    {/* Render options if available */}
                    {question.options.map((option, optionIndex) => (
                      <div style={{ marginBottom: "5px" }}>
                        <div style={{ display: "flex" }}>
                          <div className="form-check">
                            {question.questionType !== "radio" ? (
                              question.questionType !== "text" ? (
                                <label>
                                  <input
                                    type={question.questionType}
                                    name={index}
                                    value={option.optionText}
                                    className="form-check-input"
                                    required={question.required}
                                    onChange={(event) =>
                                      handleInputChange(event, index)
                                    }
                                    style={{
                                      margnLeft: "5px",
                                      marginRight: "5px",
                                    }}
                                  />{" "}
                                  {option.optionText}
                                </label>
                              ) : (
                                <label>
                                  <TextField
                                    type={question.questionType}
                                    name={index}
                                    className="form-check-input"
                                    required={question.required}
                                    onChange={(event) =>
                                      handleInputChange(event, index)
                                    }
                                    style={{
                                      marginLeft: "5px",
                                      marginRight: "5px",
                                    }}
                                  />
                                </label>
                              )
                            ) : (
                              <label>
                                <input
                                  type={question.questionType}
                                  name={index}
                                  value={option.optionText}
                                  className="form-check-input"
                                  required={question.required}
                                  onChange={(event) =>
                                    handleInputChange(event, index)
                                  }
                                  style={{
                                    margnLeft: "5px",
                                    marginRight: "5px",
                                  }}
                                />
                                {option.optionText}
                              </label>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
                <div className="user_form_submit">
                  <Button
                    variant="contained"
                    color="primary"
                    style={{
                      fontSize: "14px",
                      color: "white",
                      backgroundColor: "rgb(103, 58, 183)",
                    }}
                    onClick={saveResponsesToFirebase}
                  >
                    Submit
                  </Button>
                </div>

                <div className="user_footer">Surwhey Forms</div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
export default Userform;
