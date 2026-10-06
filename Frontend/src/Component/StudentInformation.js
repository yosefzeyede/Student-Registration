import React, { useEffect, useState } from "react";

function StudentInformation() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetch("https://student-registration-backend-9miv.onrender.com/information")
      .then((response) => response.json())
      .then((data) => {
        setStudents(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <h2>Student Information</h2>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Middle Name</th>
            <th>Last Name</th>
            <th>Gender</th>
            <th>Date of Birth</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Academic Year</th>
            <th>Registration Date</th>
            <th>Status</th>
            <th>Section</th>
            <th>Class</th>
          </tr>
        </thead>

        <tbody>
          {students.map((student) => (
            <tr key={student.student_id}>
              <td>{student.student_id}</td>
              <td>{student.first_name}</td>
              <td>{student.middle_name}</td>
              <td>{student.last_name}</td>
              <td>{student.gender}</td>
              <td>{student.date_of_birth}</td>
              <td>{student.phone}</td>
              <td>{student.address}</td>
              <td>{student.academic_year}</td>
              <td>{student.registration_date}</td>
              <td>{student.status}</td>
              <td>{student.section_name}</td>
              <td>{student.class_name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StudentInformation;
