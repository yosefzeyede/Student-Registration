import React, { useState } from "react";
import "./delete.css";

function Delete() {
  const [student_id, setstudentid] = useState("");

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Clear previous messages
    setSuccessMessage("");
    setErrorMessage("");

    const studentids = student_id.trim();

    // Check empty
    if (!studentids) {
      setErrorMessage("Student ID is required.");
      return;
    }

    // Check numbers only
    if (!/^\d+$/.test(studentids)) {
      setErrorMessage("Student ID must contain numbers only.");
      return;
    }

    const data = {
      student_id: studentids,
    };

    fetch("http://localhost:4000/delete", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          return response.text().then((message) => {
            throw new Error(message);
          });
        }

        return response.text();
      })
      .then((result) => {
        console.log(result);

        setSuccessMessage("Student deleted successfully!");

        // Clear input
        setstudentid("");
      })
      .catch((error) => {
        console.log(error);

        setErrorMessage(error.message || "Student deletion failed.");
      });
  };

  return (
    <div>
      <div>
        <form className="update-form" onSubmit={handleSubmit}>
          <h2>Delete Student</h2>
          <h4 className="description">Delete student by using student id</h4>
          {successMessage && (
            <div className="success-message">{successMessage}</div>
          )}

          {errorMessage && <div className="error-message">{errorMessage}</div>}

          <div className="form-group">
            <label>Student ID</label>

            <input
              type="text"
              placeholder="Enter Student ID"
              value={student_id}
              onChange={(e) => {
                setstudentid(e.target.value);
              }}
            />
          </div>

          <button type="submit">Delete Student</button>
        </form>
      </div>
    </div>
  );
}

export default Delete;
