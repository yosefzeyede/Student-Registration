const connection = require("./db");

const createTables = [
  `
  CREATE TABLE IF NOT EXISTS students (
    student_id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    middle_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    gender ENUM('Male', 'Female') NOT NULL,
    date_of_birth DATE,
    phone VARCHAR(20),
    address VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
  `,

  `
  CREATE TABLE IF NOT EXISTS classes (
    class_id INT AUTO_INCREMENT PRIMARY KEY,
    class_name VARCHAR(20) NOT NULL UNIQUE
  )
  `,

  `
  CREATE TABLE IF NOT EXISTS sections (
    section_id INT AUTO_INCREMENT PRIMARY KEY,
    class_id INT NOT NULL,
    section_name VARCHAR(20) NOT NULL,

    FOREIGN KEY (class_id)
      REFERENCES classes(class_id)
  )
  `,

  `
  CREATE TABLE IF NOT EXISTS registrations (
    registration_id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT NOT NULL,
    class_id INT NOT NULL,
    section_id INT NOT NULL,
    academic_year VARCHAR(20) NOT NULL,
    registration_date DATE NOT NULL,
    status ENUM('Active', 'Inactive') DEFAULT 'Active',

    FOREIGN KEY (student_id)
      REFERENCES students(student_id),

    FOREIGN KEY (class_id)
      REFERENCES classes(class_id),

    FOREIGN KEY (section_id)
      REFERENCES sections(section_id)
  )
  `,
  `CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'user') NOT NULL DEFAULT 'user',
    full_name VARCHAR(100),
    email VARCHAR(100),
    phone VARCHAR(20),
    profile_image VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`,
];

let completed = 0;

createTables.forEach((sql) => {
  connection.query(sql, (err) => {
    if (err) {
      console.error("Table creation failed:", err.message);
      return;
    }

    completed++;

    console.log(`Table ${completed} created successfully`);

    if (completed === createTables.length) {
      console.log("All tables created successfully!");
      connection.end();
    }
  });
});
