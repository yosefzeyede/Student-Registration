const connection = require("./db");
const sql = `
  INSERT INTO classes (class_name)
  VALUES ?
`;

const values = [
  ["Grade 1"],
  ["Grade 2"],
  ["Grade 3"],
  ["Grade 4"],
  ["Grade 5"],
  ["Grade 6"],
  ["Grade 7"],
  ["Grade 8"],
  ["Grade 9"],
  ["Grade 10"],
  ["Grade 11"],
  ["Grade 12"],
];

connection.query(sql, [values], (err) => {
  if (err) {
    console.error("Classes insertion failed:", err.message);
    return;
  }

  console.log("Grade 1 to Grade 12 inserted successfully!");

  connection.end();
});
