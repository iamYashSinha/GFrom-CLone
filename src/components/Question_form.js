import React, { useState, useEffect } from "react";
import CropOriginalIcon from "@material-ui/icons/CropOriginal";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import ShortTextIcon from "@material-ui/icons/ShortText";
import SubjectIcon from "@material-ui/icons/Subject";
import FilterNoneIcon from "@material-ui/icons/FilterNone";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import CloseIcon from "@material-ui/icons/Close";
import Select from "@material-ui/core/Select";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Button from "@material-ui/core/Button";
import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Accordion from "@material-ui/core/Accordion";
import { IconButton } from "@material-ui/core";
import { BsTrash } from "react-icons/bs";
import { BsFileText } from "react-icons/bs";
import { FcRightUp } from "react-icons/fc";
import "./Question_form.css";
import MenuItem from "@material-ui/core/MenuItem";
import Switch from "@material-ui/core/Switch";
import Cookies from "js-cookie";
import { useNavigate, useParams } from "react-router-dom";
import firebase from "../Db/firebaseInit";
import SnackBar from "./SnackBar";

function Question_form() {
  const navigate = useNavigate();
  const [text, setText] = useState("");
  const [open, setOpen] = useState(false);
  const [color, setColor] = useState("success");
  const [isDraft, setIsDraft] = useState(false);
  const { id } = useParams();
  const [questions, setQuestions] = useState([
    {
      questionText: "",
      questionType: "radio",
      options: [
        { optionText: "" },
        { optionText: "" },
        { optionText: "" },
        { optionText: "" },
      ],
      answer: false,
      answerKey: "",
      points: 0,
      open: true,
      required: false,
    },
  ]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const [draftData, setDraftData] = useState(null);
  const [formName, setFormName] = useState("");
  const [formDescription, setFormDescription] = useState("");
  //extract the unique id from the url
  const uuid = window.location.pathname.split("/form/")[1];
  useEffect(() => {
    // Check if there is any draft data in cookies and load it
    const savedDraft = Cookies.get("draftData");
    if (savedDraft) {
      setDraftData(JSON.parse(savedDraft));
    }
  }, []);
  //saving url to build recent form feature
  useEffect(() => {
    // Save the current URL in localStorage when the component mounts
    const currentURL = window.location.pathname;
    sessionStorage.setItem("currentURL", currentURL);
  }, []);

  useEffect(() => {
    // Reflect saved responses in the form
    if (draftData) {
      setQuestions(draftData.questions);
      setFormName(draftData.formName);
      setFormDescription(draftData.formDescription);
    }
  }, [draftData]);
  const url = window.location.href;
  function handleSaveAsDraft() {
    setIsDraft(true);
    const currentDraft = {
      formName,
      formDescription,
      questions,
      url,
    };
    setDraftData(currentDraft);

    // Save the draft data in cookies : {path: `/form/${uuid}`}
    Cookies.set(
      "draftData",
      JSON.stringify(currentDraft),
      { path: `/form/${uuid}` },
      { expires: 7 }
    );
    setColor("success");
    setText("Draft is saved!!!");
    setOpen(true);
  }

  //should save form to the firestore database
  const handleSendForm = async () => {
    // Construct the data object to save to Firebase
    const formData = {
      formName,
      formDescription,
      questions,
      // Include any other data you want to save
    };

    // Get a reference to the Firebase database
    const dbRef = firebase.database().ref();

    // Save the form data with the unique ID as the document name
    try {
      await dbRef.child(`forms/${id}`).set(formData);
      setColor("success");
      setOpen(true);
      setText("Form is Published");
      // Show the Snackbar

      // Wait for a short time before navigating to the next page
      // Adjust the delay time according to your Snackbar's autoHideDuration
      await new Promise((resolve) => setTimeout(resolve, 2000));
      navigate(`/form/${id}/userform`);
    } catch (error) {
      console.error("Error saving form data:", error);
      setColor("error");
      setText("Form is unable to published!!");
      setOpen(true);
    }
  };
  //current path of the cookie
  function changeQuestion(text, i) {
    var newQuestion = [...questions];
    newQuestion[i].questionText = text;
    setQuestions(newQuestion);
    console.log(newQuestion);
  }
  function addQuestionType(i, type) {
    let qs = [...questions];
    console.log(type);
    qs[i].questionType = type;
    setQuestions(qs);
  }
  function changeOptionValue(text, i, j) {
    var optionsQuestion = [...questions];
    optionsQuestion[i].options[j].optionText = text;
    setQuestions(optionsQuestion);
    console.log(optionsQuestion);
  }
  function removeOption(i, j) {
    var RemoveOptionQuestion = [...questions];
    if (RemoveOptionQuestion[i].options.length > 1) {
      RemoveOptionQuestion[i].options.splice(j, 1);
      setQuestions(RemoveOptionQuestion);
      console.log(i + "___" + j);
    }
  }
  function addOption(i) {
    var optionsOfQuestion = [...questions];
    if (optionsOfQuestion[i].options.length < 5) {
      optionsOfQuestion[i].options.push({
        optionText: "Option " + (optionsOfQuestion[i].options.length + 1),
      });
      setQuestions(optionsOfQuestion);
    } else {
      console.log("Max 5 options");
    }
  }
  function copyQuestion(i) {
    // expandCloseAll()
    console.log(questions);
    let qs = [...questions];
    var newQuestion = qs[i];
    setQuestions([...questions, newQuestion]);
  }
  function deleteQuestion(i) {
    let qs = [...questions];
    if (questions.length > 1) {
      qs.splice(i, 1);
    }
    setQuestions(qs);
  }
  function requiredQuestion(i) {
    var reqQuestion = [...questions];
    reqQuestion[i].required = !reqQuestion[i].required;
    console.log(reqQuestion[i].required + " " + 1);
    setQuestions(reqQuestion);
  }
  function addMoreQuestionField() {
    setQuestions([
      ...questions,
      {
        questionText: "Question",
        questionType: "radio",
        options: [{ optionText: "Option 1" }],
        open: true,
        required: false,
      },
    ]);
  }
  function setOptionAnswer(ans, qno) {
    var Questions = [...questions];
    Questions[qno].answerKey = ans;
    setQuestions(Questions);
    console.log(qno + " " + ans);
  }
  function setOptionPoints(points, qno) {
    var Questions = [...questions];
    Questions[qno].points = points;
    setQuestions(Questions);

    console.log(qno + " " + points);
  }
  function doneAnswer(i) {
    var answerOfQuestion = [...questions];
    answerOfQuestion[i].answer = !answerOfQuestion[i].answer;
    setQuestions(answerOfQuestion);
    console.log();
  }

  function addAnswer(i) {
    var answerOfQuestion = [...questions];
    answerOfQuestion[i].answer = !answerOfQuestion[i].answer;
    setQuestions(answerOfQuestion);
  }

  function questionUI() {
    return questions.map((ques, i) => (
      <Accordion
        expanded={questions[i].open}
        className={questions[i].open ? "add_border" : ""}
      >
        <AccordionSummary
          aria-controls="panel1a-content"
          id="panel1a-header"
          elevation={1}
          style={{ width: "100%" }}
        ></AccordionSummary>
        <div className="question_boxes">
          {!questions[i].answer ? (
            <AccordionDetails className="add_question">
              <div className="add_question_top">
                <input
                  type="text"
                  className="question"
                  placeholder="Question"
                  value={ques.questionText}
                  onChange={(e) => {
                    changeQuestion(e.target.value, i);
                  }}
                />
                <input
                  type="file"
                  style={{ display: "none" }}
                  id="file"
                  accept=".jpg,.jpeg,.png,.gif,.pdf,.doc,.docx,.txt"
                  // onChange={(e) => setImg(e.target.files[0])}
                />
                {/* Image for Attachment and code for selecting images */}
                <label htmlFor="file">
                  <CropOriginalIcon
                    style={{
                      color: "#5f6368",
                      fontSize: 28,
                      cursor: "pointer",
                    }}
                  />{" "}
                </label>
                <Select
                  className="select"
                  style={{ color: "#5f6368", fontSize: "13px" }}
                >
                  <MenuItem
                    id="text"
                    value="Text"
                    onClick={() => addQuestionType(i, "text")}
                  >
                    <SubjectIcon style={{ marginRight: "10px" }} />
                    Paragraph
                  </MenuItem>
                  <MenuItem
                    id="checkbox"
                    value="Checkbox"
                    onClick={() => addQuestionType(i, "checkbox")}
                  >
                    <CheckBoxIcon
                      style={{ marginRight: "10px", color: "#70757a" }}
                      checked
                    />
                    CheckBoxes
                  </MenuItem>
                  <MenuItem
                    id="radio"
                    value="Radio"
                    onClick={() => addQuestionType(i, "radio")}
                  >
                    <Radio
                      style={{ marginRight: "10px", color: "#70757a" }}
                      checked
                    />{" "}
                    Multiple Choice
                  </MenuItem>
                </Select>
              </div>
              {ques.options.map((op, j) => (
                <div className="add_question_body" key={j}>
                  {ques.questionType !== "text" ? (
                    <input
                      type={ques.questionType}
                      style={{ marginRight: "10px" }}
                    />
                  ) : (
                    <ShortTextIcon style={{ marginRight: "10px" }} />
                  )}
                  <div>
                    <input
                      type="text"
                      className="text_input"
                      placeholder="option"
                      value={ques.options[j].optionText}
                      onChange={(e) => changeOptionValue(e.target.value, i, j)}
                    />
                  </div>
                  {/* <CropOriginalIcon style={{ color: "#5f6368" }} /> */}

                  <IconButton
                    aria-label="delete"
                    onClick={() => {
                      removeOption(i, j);
                    }}
                  >
                    <CloseIcon />
                  </IconButton>
                </div>
              ))}
              {ques.options.length < 5 ? (
                <div className="add_question_body">
                  <FormControlLabel
                    disabled
                    control={
                      ques.questionType !== "text" ? (
                        <input
                          type={ques.questionType}
                          color="primary"
                          inputProps={{ "aria-label": "secondary checkbox" }}
                          style={{ marginLeft: "10px", marginRight: "10px" }}
                          disabled
                        />
                      ) : (
                        <ShortTextIcon style={{ marginRight: "10px" }} />
                      )
                    }
                    label={
                      <div>
                        <input
                          type="text"
                          className="text_input"
                          style={{ fontSize: "13px", width: "60px" }}
                          placeholder="Add other"
                        />
                        <Button
                          size="small"
                          onClick={() => addOption(i)}
                          style={{
                            textTransform: "none",
                            color: "#4285f4",
                            fontSize: "13px",
                            fontWeight: "600",
                          }}
                        >
                          Add Option
                        </Button>
                      </div>
                    }
                  />
                </div>
              ) : (
                ""
              )}
              <div className="add_footer">
                <div className="add_question_bottom_left">
                  <Button
                    size="small"
                    style={{
                      textTransform: "none",
                      color: "#4285f4",
                      fontSize: "13px",
                      fontWeight: "600",
                    }}
                    onClick={() => addAnswer(i)}
                  >
                    <FcRightUp
                      style={{
                        border: "2px solid #4285f4",
                        padding: "2px",
                        marginRight: "8px",
                      }}
                    />
                    Answer Key
                  </Button>
                </div>
                <div className="add_question_bottom">
                  <IconButton aria-label="copy" onClick={() => copyQuestion(i)}>
                    <FilterNoneIcon />
                  </IconButton>
                  <IconButton
                    aria-label="delete"
                    onClick={() => deleteQuestion(i)}
                  >
                    <BsTrash />
                  </IconButton>
                  <span style={{ color: "#5f6368", fontSize: "13px" }}>
                    Required
                  </span>
                  <Switch
                    name="checkedA"
                    color="primary"
                    onClick={() => requiredQuestion(i)}
                    checked={questions[i].required}
                  />
                </div>
              </div>
            </AccordionDetails>
          ) : (
            <AccordionDetails className="add_question">
              <div className="top_header">Choose Correct Answer</div>
              <div className="add_question_top">
                <input
                  type="text"
                  className="question"
                  placeholder="Question"
                  value={ques.questionText}
                  disabled
                />
                <input
                  type="number"
                  className="points"
                  min="0"
                  step="1"
                  placeholder="0"
                  onChange={(e) => setOptionPoints(e.target.value, i)}
                />
              </div>
              {ques.options.map((op, j) => (
                <div
                  className="add_question_body"
                  key={j}
                  style={{
                    marginBottom: "10px",
                    marginTop: "5px",
                    marginLeft: "8px",
                  }}
                >
                  <div key={j}>
                    <div className="" style={{ display: "flex" }}>
                      <div className="form-check">
                        <label
                          style={{ fontSize: "13px" }}
                          onClick={(e) =>
                            setOptionAnswer(ques.options[j].optionText, i)
                          }
                        >
                          {ques.questionType !== "text" ? (
                            <input
                              type={ques.questionType}
                              name={ques.questionText}
                              value="option3"
                              className="form-check-input"
                              required={ques.required}
                              style={{
                                marginRight: "10px ",
                                marginBottom: "10px",
                                marginTop: "5px",
                              }}
                            />
                          ) : (
                            <ShortTextIcon style={{ marginRight: "10px" }} />
                          )}
                          {ques.options[j].optionText}
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              <div className="add_question_body">
                <Button
                  size="small"
                  style={{
                    textTransform: "none",
                    color: "#4285f4",
                    fontSize: "13px",
                    fontWeight: "600",
                  }}
                >
                  <BsFileText
                    style={{ fontSize: "20px", marginRight: "8px" }}
                  />
                  Add answer feedback
                </Button>
              </div>
              <div className="add_question_bottom">
                <Button
                  style={{
                    textTransform: "none",
                    color: "4285f4",
                    fontSize: "12px",
                    marginTop: "12px",
                    fontWeight: "600",
                  }}
                  variant="outlined"
                  color="primary"
                  onClick={() => doneAnswer(i)}
                >
                  Done
                </Button>
              </div>
            </AccordionDetails>
          )}
          {!ques.answer ? (
            <div className="question_edit">
              <AddCircleOutlineIcon
                className="edit"
                onClick={addMoreQuestionField}
              />
            </div>
          ) : (
            ""
          )}
        </div>
      </Accordion>
    ));
  }
  return (
    <div>
      <SnackBar
        open={open}
        handleClose={handleClose}
        text={text}
        color={color}
      />
      <div className="question_form">
        <br />
        <div className="section">
          <div className="question_title_section">
            <div className="question_form_top">
              <input
                type="text"
                placeholder="Untitled document"
                style={{ color: "black" }}
                className="question_form_top_name"
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
              />
              <input
                type="text"
                placeholder="Form Description"
                className="question_form_top_desc"
                value={formDescription}
                onChange={(e) => setFormDescription(e.target.value)}
              />
            </div>
          </div>
          {questionUI()}
          <Button
            onClick={handleSaveAsDraft}
            variant="contained"
            style={{ color: "white", backgroundColor: "rgb(103, 58, 183)" }}
          >
            Save as draft
          </Button>
          <Button
            variant="contained"
            onClick={handleSendForm}
            style={{
              color: "white",
              backgroundColor: "rgb(103, 58, 183)",
              marginLeft: "5px",
            }}
          >
            Send
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Question_form;
