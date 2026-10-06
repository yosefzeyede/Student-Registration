import React, { useState } from "react";
import Classsection from "../fetch/Classsection";
import "./Studentregistration.css";
import Firstname from "../fetch/Firstname";
import Footer from "../footer/Footer";
import Updatestudent from "../Update/Updatestudent";
import Delete from "../Delete/Delete";
import Download from "../Download/Download";
import Createuser from "../Createuser/Createuser";

function Studentregistration({ user, setUser }) {
  const [page, setPage] = useState("registration");

  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSection, setSelectedSection] = useState("");

  const [fName, setFName] = useState("");
  const [mName, setMName] = useState("");
  const [lName, setLName] = useState("");
  const [gender, setGender] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [academicYear, setAcademicYear] = useState("");
  const [registrationDate, setRegistrationDate] = useState("");
  const [status, setStatus] = useState("");

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Clear previous messages
    setSuccessMessage("");
    setErrorMessage("");

    // Remove unnecessary spaces
    const firstName = fName.trim();
    const middleName = mName.trim();
    const lastName = lName.trim();
    const studentPhone = phone.trim();
    const studentAddress = address.trim();
    const year = academicYear.trim();

    // Name validation
    const namePattern = /^[A-Za-z]+$/;

    if (!firstName) {
      setErrorMessage("First name is required.");
      return;
    }

    if (!namePattern.test(firstName)) {
      setErrorMessage("First name must contain letters only.");
      return;
    }

    if (!middleName) {
      setErrorMessage("Middle name is required.");
      return;
    }

    if (!namePattern.test(middleName)) {
      setErrorMessage("Middle name must contain letters only.");
      return;
    }

    if (!lastName) {
      setErrorMessage("Last name is required.");
      return;
    }

    if (!namePattern.test(lastName)) {
      setErrorMessage("Last name must contain letters only.");
      return;
    }

    // Gender validation
    if (!gender) {
      setErrorMessage("Please select gender.");
      return;
    }

    // Date of birth validation
    if (!birthDate) {
      setErrorMessage("Date of birth is required.");
      return;
    }

    const today = new Date().toISOString().split("T")[0];

    if (birthDate > today) {
      setErrorMessage("Date of birth cannot be in the future.");
      return;
    }

    // Phone validation
    if (!studentPhone) {
      setErrorMessage("Phone number is required.");
      return;
    }

    const phonePattern = /^(09|07)\d{8}$/;

    if (!phonePattern.test(studentPhone)) {
      setErrorMessage(
        "Please enter a valid Ethiopian phone number. Example: 0912345678",
      );
      return;
    }

    // Address validation
    if (!studentAddress) {
      setErrorMessage("Address is required.");
      return;
    }

    // Class validation
    if (!selectedClass) {
      setErrorMessage("Please select a class.");
      return;
    }

    // Section validation
    if (!selectedSection) {
      setErrorMessage("Please select a section.");
      return;
    }

    // Academic year validation
    if (!year) {
      setErrorMessage("Academic year is required.");
      return;
    }

    if (!/^\d{4}$/.test(year)) {
      setErrorMessage("Academic year must contain 4 digits.");
      return;
    }

    // Registration date validation
    if (!registrationDate) {
      setErrorMessage("Registration date is required.");
      return;
    }

    if (registrationDate > today) {
      setErrorMessage("Registration date cannot be in the future.");
      return;
    }

    // Status validation
    if (!status) {
      setErrorMessage("Please select registration status.");
      return;
    }

    // Data sent to backend
    const data = {
      fName: firstName,
      mName: middleName,
      lName: lastName,
      gender,
      birthDate,
      phone: studentPhone,
      address: studentAddress,
      class_id: selectedClass,
      section_id: selectedSection,
      academic_year: year,
      registration_date: registrationDate,
      status,
    };
    fetch("http://localhost:4000/student", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Registration failed");
        }

        return response.text();
      })
      .then((result) => {
        console.log(result);

        setSuccessMessage("Student registered successfully!");

        // Reset form
        setFName("");
        setMName("");
        setLName("");
        setGender("");
        setBirthDate("");
        setPhone("");
        setAddress("");
        setSelectedClass("");
        setSelectedSection("");
        setAcademicYear("");
        setRegistrationDate("");
        setStatus("");
      })
      .catch((error) => {
        console.log(error);

        setErrorMessage(
          "Registration failed. Please check your information and try again.",
        );
      });
  };

  return (
    <div>
      <div className="top-button">
        <button
          className="back-registration"
          type="button"
          onClick={() => setPage("registration")}
        >
          Back to Registration
        </button>
        <button
          className="update-button"
          type="button"
          onClick={() => setPage("update")}
        >
          Update Student
        </button>

        <button
          className="delete-button"
          type="button"
          onClick={() => setPage("delete")}
        >
          Delete Student
        </button>
        {user.role === "admin" && (
          <button
            className="create-user"
            type="button"
            onClick={() => setPage("create_user")}
          >
            Create user
          </button>
        )}

        <Download />

        <button className="logout" type="button" onClick={() => setUser(null)}>
          Logout
        </button>
      </div>

      {page === "registration" && (
        <div id="registration">
          <form className="registration-form" onSubmit={handleSubmit}>
            <h2>Student Registration</h2>

            {/* Success message */}
            {successMessage && (
              <div className="success-message">{successMessage}</div>
            )}

            {/* Error message */}
            {errorMessage && (
              <div className="error-message">{errorMessage}</div>
            )}

            <div className="form-group">
              <label>First Name:</label>
              <input
                type="text"
                value={fName}
                onChange={(e) => setFName(e.target.value)}
                placeholder="Enter first name"
              />
            </div>

            <div className="form-group">
              <label>Middle Name:</label>
              <input
                type="text"
                value={mName}
                onChange={(e) => setMName(e.target.value)}
                placeholder="Enter middle name"
              />
            </div>

            <div className="form-group">
              <label>Last Name:</label>
              <input
                type="text"
                value={lName}
                onChange={(e) => setLName(e.target.value)}
                placeholder="Enter last name"
              />
            </div>

            <div className="form-group">
              <label>Gender:</label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>

            <div className="form-group">
              <label>Date of Birth:</label>
              <input
                type="date"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Phone:</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="0912345678"
              />
            </div>

            <div className="form-group">
              <label>Address:</label>
              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter student address"
              />
            </div>

            <div className="form-group">
              <label>Academic Year:</label>
              <input
                type="text"
                value={academicYear}
                onChange={(e) => setAcademicYear(e.target.value)}
                placeholder="e.g. 2019"
              />
            </div>

            <div className="form-group">
              <label>Registration Date:</label>
              <input
                type="date"
                value={registrationDate}
                onChange={(e) => setRegistrationDate(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Status:</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="">Select Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>

            <div className="class-section-wrapper">
              <Classsection
                selectedClass={selectedClass}
                setSelectedClass={setSelectedClass}
                selectedSection={selectedSection}
                setSelectedSection={setSelectedSection}
              />
            </div>

            <button type="submit">Register Student</button>
          </form>
        </div>
      )}

      {page === "update" && (
        <div id="update">
          <Updatestudent />
        </div>
      )}

      {page === "delete" && (
        <div id="delete">
          <Delete />
        </div>
      )}
      {page === "create_user" && user.role === "admin" && (
        <div id="create">
          <Createuser />
        </div>
      )}
      <Firstname />

      <Footer />
    </div>
  );
}

export default Studentregistration;
