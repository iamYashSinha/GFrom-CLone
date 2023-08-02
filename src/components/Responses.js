import { getDatabase, onValue, ref } from "firebase/database";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { app } from "../firebase";
import { Button, Divider, List, ListItemText } from "@material-ui/core";
function Responses() {
  const responseStyle = {
    backgroundColor: "#F4F4F9",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };
  const backStyle = {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "white",
    alignItems: "center",
    margin: "10px",
    borderRadius: "8px",
    width: "30%",
  };
  const listStyle = {};
  const liStyle = {
    padding: "10px 15px",
    fontSize: "16px",
  };
  const [responses, setResponses] = useState([]); // State variable to store the responses
  const { id } = useParams(); // Use the useParams hook to get the dynamic ID from the URL

  const convertToCSV = (data) => {
    if (!data) {
      return "";
    }

    const csvRows = [];

    // Get the maximum number of questions and responses among all users
    let maxResponses = 0;
    for (const username in data) {
      if (data.hasOwnProperty(username)) {
        const user = data[username];
        maxResponses = Math.max(maxResponses, user.responses.length);
      }
    }

    // Create headers dynamically based on the maximum number of questions and responses
    const headers = ["Username"];
    // for (let i = 1; i <= maxQuestions; i++) {
    //   headers.push(`Question ${i}`);
    // }
    for (let i = 1; i <= maxResponses; i++) {
      headers.push(`Response ${i}`);
    }
    headers.push("Email");
    csvRows.push(headers.join(","));

    // Rows
    for (const username in data) {
      if (data.hasOwnProperty(username)) {
        const user = data[username];
        const row = [username, ...user.responses, user.value];
        csvRows.push(row.join(","));
      }
    }

    return csvRows.join("\n");
  };

  const handleDownload = () => {
    const csvContent = convertToCSV(responses);
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${id}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  useEffect(() => {
    // Firebase configuration

    // Initialize Firebase

    const fetchData = async () => {
      // Create a reference to the specific formRef in the Realtime Database
      const db = getDatabase(app);
      const formRef = ref(db, `responses/${id}`);
      try {
        // Fetch data from the Realtime Database
        onValue(formRef, (snapshot) => {
          const data = snapshot.val();
          setResponses(data);
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
  console.log(responses);
  return (
    <div>
      {responses ? (
        <>
          <div style={responseStyle}>
            <div style={backStyle}>
              {Object.keys(responses).map((key) => (
                <>
                  <div key={key} style={listStyle}>
                    <List style={liStyle}>
                      {" "}
                      <ListItemText primary={responses[key].value} />
                    </List>

                    <Divider />
                  </div>
                </>
              ))}
            </div>
            <div className="user_form_submit">
              <Button
                variant="contained"
                color="primary"
                style={{ color: "white", backgroundColor: "rgb(236, 121, 26)" }}
                onClick={handleDownload}
              >
                Download Responses
              </Button>
            </div>
          </div>
        </>
      ) : (
        <p>No responses</p>
      )}
    </div>
  );
}

export default Responses;
