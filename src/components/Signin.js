import React, { useState, useEffect } from "react";
import "./Signin.css";
import { auth, provider } from "../firebase";
import { signInWithPopup } from "firebase/auth";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useParams,
} from "react-router-dom";
import Header from "./Header";
import Template from "./Template";
import Mainbody from "./Mainbody";
import Formheader from "./Formheader";
import Centeredtab from "./Tabs";
import { Button } from "@material-ui/core";
import Question_form from "./Question_form";
import video from "../videos/demo2.mp4";
import Userform from "./Userform";
import Preview from "./Preview";
import Thankyou from "./Thankyou";
import Responses from "./Responses";

function Signin() {
  const [value, setValue] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [name, setName] = useState("");
  const handleClick = () => {
    try {
      signInWithPopup(auth, provider)
        .then((data) => {
          setValue(data.user.email);
          setPhotoURL(data.user.photoURL);
          sessionStorage.setItem("email", data.user.email);
          sessionStorage.setItem("photoURL", data.user.photoURL);
        })
        .catch((error) => {
          // Handle errors from the signInWithPopup function
          console.error("Error signing in with popup:", error);
          // You can add appropriate error handling or show error messages to the user
        });
    } catch (error) {
      // Handle any synchronous errors here (unlikely in this case, as the function is asynchronous)
      console.error("Error occurred:", error);
    }
  };
  useEffect(() => {
    const storedEmail = sessionStorage.getItem("email");
    const storedPhotoURL = sessionStorage.getItem("photoURL");

    if (storedEmail) {
      setValue(storedEmail);
    }

    if (storedPhotoURL) {
      setPhotoURL(storedPhotoURL);
    }
  }, []);
  const { id } = useParams();
  return (
    <>
      <div>
        {/* If user is authenticated then bubble will appear in the window */}
        {value ? (
          <>
            <Router>
              <Routes>
                <Route
                  path="/"
                  element={
                    <>
                      <Header photoURL={photoURL} value={value} />
                      <Template />
                      <Mainbody />
                    </>
                  }
                />

                <Route
                  path="/form/:id"
                  element={
                    <>
                      <Formheader photoURL={photoURL} value={value} />
                      <Centeredtab />
                      <Question_form />
                    </>
                  }
                />

                <Route
                  path="/form/:id/responses"
                  element={
                    <>
                      <Formheader photoURL={photoURL} value={value} />
                      <Centeredtab />
                      <Responses />
                    </>
                  }
                />
                <Route
                  path="/form/:id/userform"
                  element={<Userform name={name} value={value} />}
                />
                <Route path="/form/:id/preview" element={<Preview />} />
                <Route path="/thankyou" element={<Thankyou />} />
              </Routes>
            </Router>
          </>
        ) : (
          <>
            <div className="container">
              <div className="video overlay">
                <video autoPlay loop className="video-background" muted>
                  <source src={video} type="video/mp4" />
                </video>
              </div>
              <div className="content">
                <Button variant="contained" onClick={handleClick}>
                  Sign-In With Google
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Signin;
