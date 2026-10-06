import React, { useState, useEffect } from "react";
import "../Css/Bothcss.css";
function Classsection(props) {
  let { selectedClass, setSelectedClass, selectedSection, setSelectedSection } =
    props;
  let [sectionlist, setsection] = useState([]);
  let [classlist, setClass] = useState([]);

  useEffect(() => {
    fetch("https://student-registration-backend-9miv.onrender.com/section")
      .then((response) => response.json())
      .then((data) => {
        setsection(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    fetch("https://student-registration-backend-9miv.onrender.com/class")
      .then((response) => response.json())
      .then((data) => {
        setClass(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const filteredSections = sectionlist.filter(
    (item) => item.class_id === Number(selectedClass),
  );

  return (
    <div className="class-section">
      <div className="form-group">
        <label>Class</label>

        <select
          value={selectedClass}
          onChange={(e) => {
            setSelectedClass(e.target.value);
            setSelectedSection("");
          }}
        >
          <option value="">Select Class</option>

          {classlist.map((item) => (
            <option key={item.class_id} value={item.class_id}>
              {item.class_name}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>Section</label>

        <select
          value={selectedSection}
          onChange={(e) => setSelectedSection(e.target.value)}
          disabled={!selectedClass}
        >
          <option value="">Select Section</option>

          {filteredSections.map((item) => (
            <option key={item.section_id} value={item.section_id}>
              {item.section_name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default Classsection;
