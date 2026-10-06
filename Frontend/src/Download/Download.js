import React, { useState } from "react";
import * as XLSX from "xlsx";
import "./download.css";
function Download() {
  const [download, setdownload] = useState("");
  function downloadExcel() {
    fetch("https://student-registration-backend-9miv.onrender.com/information")
      .then((response) => response.json())
      .then((data) => {
        const worksheet = XLSX.utils.json_to_sheet(data);

        const workbook = XLSX.utils.book_new();

        XLSX.utils.book_append_sheet(workbook, worksheet, "Students");

        XLSX.writeFile(workbook, "Student-Information.xlsx");
      })
      .catch((error) => {
        console.log("Download error:", error);
        setdownload("Download error:", error);
        alert(download);
      });
  }

  return (
    <div>
      <button className="download-button" type="button" onClick={downloadExcel}>
        Download
      </button>
    </div>
  );
}

export default Download;
