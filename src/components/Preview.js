import React, { useEffect, useState } from "react";
// import './Userform.css'
import Cookies from "js-cookie";
import { Button, TextField, Typography } from "@material-ui/core";
import "./Userform.css";
import arrowBack from "../images/arrowBack.png";
import { useNavigate } from "react-router-dom";
function Preview() {
  const [formInfo, setFormInfo] = useState({
    formName: "",
    formDescription: "",
    questions: [],
  });

  useEffect(() => {
    // Load the cookie value when the component mounts
    const cookie = Cookies.get("draftData");
    if (cookie) {
      // Assuming the cookie is stored as an array, parse it
      const parsedCookie = JSON.parse(cookie);
      setFormInfo(parsedCookie);
    }
  }, []);
  console.log(formInfo);

  const Navigate = useNavigate();
  const handleArrowBack = () => {
    const previousURL = sessionStorage.getItem("currentURL");
    Navigate(`${previousURL}`);
  };

  return (
    <>
      <div>
        <>
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
                                    value={option.optionText}
                                    className="form-check-input"
                                    required={question.required}
                                    style={{
                                      margnLeft: "5px",
                                      marginRight: "5px",
                                    }}
                                  />{" "}
                                  {option.optionText}
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
                      color: "white",
                      backgroundColor: "rgb(236, 121, 26)",
                      marginLeft: "5px",
                    }}
                  >
                    Submit
                  </Button>
                  <Button
                    variant="contained"
                    onClick={handleArrowBack}
                    color="primary"
                    style={{
                      color: "white",
                      backgroundColor: "rgb(236, 121, 26)",
                      marginLeft: "5px",
                    }}
                  >
                    Go Back
                  </Button>
                </div>

                <div className="user_footer"> &#169; Digilytics Forms</div>
              </div>
            </div>
          </div>
        </>
      </div>
    </>
  );
}
export default Preview;
