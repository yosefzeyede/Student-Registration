const connection = require("./db");

const sql = `
  INSERT INTO sections (class_id, section_name)
  VALUES ?
`;

const values = [];

for (let classId = 1; classId <= 12; classId++) {
  values.push([classId, "A"]);
  values.push([classId, "B"]);
  values.push([classId, "C"]);
  values.push([classId, "D"]);
  values.push([classId, "E"]);
  values.push([classId, "F"]);
  values.push([classId, "G"]);
}
console.log(values);
connection.query(sql, [values], (err) => {
  if (err) {
    console.error("Sections insertion failed:", err.message);
    return;
  }

  console.log("Sections A, B, C ,D,E,F,G inserted successfully!");

  connection.end();
});
