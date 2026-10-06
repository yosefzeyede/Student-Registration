import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import "./Firstname.css";

function Firstname() {
  let [studenttablelist, setstudenttablelist] = useState([]);
  let [searchlist, setsearch] = useState("");

  useEffect(() => {
    fetch("https://student-registration-backend-9miv.onrender.com/search")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setstudenttablelist(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  let searchedname = studenttablelist.filter(
    (student) => student.first_name.toLowerCase() === searchlist.toLowerCase(),
  );

  return (
    <div className="firstname-container">
      <h2>Search Student By Using First Name</h2>
      <div className="search-box">
        <FontAwesomeIcon icon={faMagnifyingGlass} className="search-icon" />
        <input
          type="text"
          placeholder="Search student by first name"
          value={searchlist}
          onChange={(e) => {
            setsearch(e.target.value);
          }}
        />
      </div>

      <div className="table-container">
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
            </tr>
          </thead>

          <tbody>
            {searchedname.map((student) => (
              <tr key={student.student_id}>
                <td>{student.student_id}</td>
                <td>{student.first_name}</td>
                <td>{student.middle_name}</td>
                <td>{student.last_name}</td>
                <td>{student.gender}</td>
                <td>{student.date_of_birth}</td>
                <td>{student.phone}</td>
                <td>{student.address}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Firstname;
