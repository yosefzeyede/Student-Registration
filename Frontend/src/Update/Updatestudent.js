import React, { useState } from "react";
import Classsection from "../fetch/Classsection";
import "./update.css";
import "../Css/Bothcss.css";
function Updatestudent() {
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSection, setSelectedSection] = useState("");

  const [student_id, setstudentid] = useState("");
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

    // Remove unnecessary
    const studentids = student_id.trim();
    const firstName = fName.trim();
    const middleName = mName.trim();
    const lastName = lName.trim();
    const studentPhone = phone.trim();
    const studentAddress = address.trim();
    const year = academicYear.trim();

    // Name validation
    const namePattern = /^[A-Za-z]+$/;
    if (!studentids) {
      setErrorMessage("student id is required.");
      return;
    }
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
      setErrorMessage("MiddshowUpdatele name must contain letters only.");
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
      student_id: studentids,
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
    fetch("https://student-registration-backend-9miv.onrender.com/update", {
      method: "PUT",
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
        setstudentid("");
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
      <form className="update-form" onSubmit={handleSubmit}>
        <h2>Update student Information using id</h2>

        {/* Success message */}
        {successMessage && (
          <div className="success-message">{successMessage}</div>
        )}

        {/* Error message */}
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <div className="form-group">
          {" "}
          <label>Student ID</label>{" "}
          <input
            type="text"
            placeholder="Enter Student ID"
            value={student_id}
            onChange={(e) => {
              setstudentid(e.target.value);
            }}
            required
          />{" "}
        </div>

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
          <select value={gender} onChange={(e) => setGender(e.target.value)}>
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
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
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

        <button id="update-button" type="submit">
          Update Student
        </button>
      </form>
    </div>
  );
}

export default Updatestudent;
