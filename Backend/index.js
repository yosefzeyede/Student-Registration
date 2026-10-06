const express = require("express");
const connection = require("./db");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/profile/");
  },

  filename: (req, file, cb) => {
    const extension = path.extname(file.originalname);

    const uniqueName =
      Date.now() + "-" + Math.round(Math.random() * 1e9) + extension;

    cb(null, uniqueName);
  },
});

const upload = multer({
  storage: storage,

  limits: {
    fileSize: 2 * 1024 * 1024, // 2 MB
  },

  fileFilter: (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "image/webp"];

    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Only JPG, PNG, and WEBP images are allowed"));
    }
  },
});

app.post(
  "/upload-profile/:user_id",
  upload.single("profile_image"),
  (req, res) => {
    const user_id = req.params.user_id;

    // Check if image was selected
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please select an image",
      });
    }

    // New image path
    const imagePath = `/uploads/profile/${req.file.filename}`;

    // Get old profile image
    const getOldImageSql = `
      SELECT profile_image
      FROM users
      WHERE user_id = ?
    `;

    connection.query(getOldImageSql, [user_id], (err, rows) => {
      if (err) {
        console.log(err);

        // Delete newly uploaded image
        fs.unlink(
          path.join(__dirname, "uploads/profile", req.file.filename),
          () => {},
        );

        return res.status(500).json({
          success: false,
          message: "Database error",
        });
      }

      // Check user exists
      if (rows.length === 0) {
        fs.unlink(
          path.join(__dirname, "uploads/profile", req.file.filename),
          () => {},
        );

        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      const oldImage = rows[0].profile_image;

      // Update database
      const updateSql = `
          UPDATE users
          SET profile_image = ?
          WHERE user_id = ?
        `;

      connection.query(updateSql, [imagePath, user_id], (err, result) => {
        if (err) {
          console.log(err);

          // Delete newly uploaded image if DB update fails
          fs.unlink(
            path.join(__dirname, "uploads/profile", req.file.filename),
            () => {},
          );

          return res.status(500).json({
            success: false,
            message: "Database update failed",
          });
        }

        // Delete old image
        if (oldImage) {
          const oldImagePath = path.join(
            __dirname,
            oldImage.replace(/^\/uploads\//, "uploads/"),
          );

          fs.unlink(oldImagePath, (err) => {
            if (err && err.code !== "ENOENT") {
              console.log("Could not delete old image:", err);
            }
          });
        }

        res.json({
          success: true,
          message: "Profile image uploaded successfully",
          image: imagePath,
        });
      });
    });
  },
);
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({
        success: false,
        message: "Image must be less than 2 MB",
      });
    }
  }

  if (err) {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }

  next();
});
app.get("/", (req, res) => {
  res.send("Student Registration API is running");
});

app.post("/student", (req, res) => {
  let { fName, mName, lName, gender, birthDate, phone, address } = req.body;

  const studentinsertion = `insert into students(first_name,middle_name,
    last_name,gender,date_of_birth,phone,address) values(?,?,?,?,?,?,?)`;

  connection.query(
    studentinsertion,
    [fName, mName, lName, gender, birthDate, phone, address],
    (err, result) => {
      if (err) {
        console.log(err);
        return;
      }
      let id = result.insertId;
      let { class_id, section_id, academic_year, registration_date, status } =
        req.body;

      let registrationinsertion = `insert into registrations
  (student_id ,
   class_id,
   section_id,
    academic_year,
    registration_date,
    status)
    values(?,?,?,?,?,?)`;
      connection.query(
        registrationinsertion,
        [id, class_id, section_id, academic_year, registration_date, status],
        (err) => {
          if (err) {
            console.log("Registration Error:", err);
            return res.status(500).send("Registration failed");
          }
          res.end("registration table succesfully inserted");
        },
      );
    },
  );
});
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  // 1. Check input
  if (!username || !password) {
    return res.status(400).json({
      success: false,
      message: "Username and password are required",
    });
  }

  // 2. Find user
  const sql = `
  SELECT 
    user_id,
    username,
    password,
    role,
    full_name,
    email,
    phone,
    profile_image
  FROM users
  WHERE username = ?
`;

  connection.query(sql, [username], (err, result) => {
    if (err) {
      console.error(err);

      return res.status(500).json({
        success: false,
        message: "Database error",
      });
    }

    // 3. User doesn't exist
    if (result.length === 0) {
      return res.status(401).json({
        success: false,
        message: "Invalid username or password",
      });
    }

    const user = result[0];

    // 4. Check password
    if (password !== user.password) {
      return res.status(401).json({
        success: false,
        message: "Invalid username or password",
      });
    }

    // 5. Login successful
    res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        user_id: user.user_id,
        username: user.username,
        role: user.role,
        full_name: user.full_name,
        email: user.email,
        phone: user.phone,
        profile_image: user.profile_image,
      },
    });
  });
});
app.post("/create-users", (req, res) => {
  const { username, password, role } = req.body;

  if (!username || !password || !role) {
    return res.status(400).json({
      success: false,
      message: "Username, password and role are required",
    });
  }

  const sql = `
    INSERT INTO users (username, password, role)
    VALUES (?, ?, ?)
  `;

  connection.query(sql, [username, password, role], (err, result) => {
    if (err) {
      console.error(err);

      return res.status(500).json({
        success: false,
        message: "Database error",
      });
    }

    res.status(201).json({
      success: true,
      message: "User created successfully",
      user_id: result.insertId,
    });
  });
});

app.get("/information", (req, res) => {
  const information = `
    SELECT
      students.student_id,
      students.first_name,
      students.middle_name,
      students.last_name,
      students.gender,
      students.date_of_birth,
      students.phone,
      students.address,
      students.created_at,
      registrations.academic_year,
      registrations.registration_date,
      registrations.status,
      sections.section_name,
      classes.class_name

    FROM students

    JOIN registrations
      ON registrations.student_id = students.student_id

    JOIN sections
      ON registrations.section_id = sections.section_id

    JOIN classes
      ON registrations.class_id = classes.class_id
  `;

  connection.query(information, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        message: "Fetch error",
      });
    }

    res.json(result);
  });
});
app.get("/class", (req, res) => {
  const classlist = `
    SELECT * FROM classes
    ORDER BY class_id ASC
  `;
  connection.query(classlist, (err, result) => {
    if (err) {
      console.log(err);
      return;
    }
    res.json(result);
  });
});
app.get("/section", (req, res) => {
  let sectionlist = `select * from sections
  order by section_id asc`;
  connection.query(sectionlist, (err, result) => {
    if (err) {
      console.log(err);
      return;
    }
    res.json(result);
  });
});
app.get("/search", (req, res) => {
  const sql = `
    SELECT *
    FROM students
  `;

  connection.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Database error");
    }

    res.json(result);
  });
});
app.put("/update", (req, res) => {
  let {
    student_id,
    fName,
    mName,
    lName,
    gender,
    birthDate,
    phone,
    address,
    class_id,
    section_id,
    academic_year,
    registration_date,
    status,
  } = req.body;

  // Update students table
  const updateStudent = `
    UPDATE students
    SET first_name = ?,
        middle_name = ?,
        last_name = ?,
        gender = ?,
        date_of_birth = ?,
        phone = ?,
        address = ?
    WHERE student_id = ?
  `;

  connection.query(
    updateStudent,
    [fName, mName, lName, gender, birthDate, phone, address, student_id],
    (err, result) => {
      if (err) {
        console.log("Student update error:", err);
        return res.status(500).send("Student update failed");
      }

      if (result.affectedRows === 0) {
        return res.status(404).send("Student ID not found");
      }

      // Update registrations table
      const updateRegistration = `
        UPDATE registrations
        SET class_id = ?,
            section_id = ?,
            academic_year = ?,
            registration_date = ?,
            status = ?
        WHERE student_id = ?
      `;

      connection.query(
        updateRegistration,
        [
          class_id,
          section_id,
          academic_year,
          registration_date,
          status,
          student_id,
        ],
        (err, result) => {
          if (err) {
            console.log("Registration update error:", err);
            return res.status(500).send("Registration update failed");
          }

          if (result.affectedRows === 0) {
            return res
              .status(404)
              .send("Student updated, but registration not found");
          }

          res.send("Student information updated successfully");
        },
      );
    },
  );
});
app.delete("/delete", (req, res) => {
  const { student_id } = req.body;

  // Check empty
  if (!student_id) {
    return res.status(400).send("Student ID is required");
  }

  // Check numbers only
  if (!/^\d+$/.test(student_id)) {
    return res.status(400).send("Student ID must contain numbers only");
  }

  const deleteRegistration = `
    DELETE FROM registrations
    WHERE student_id = ?
  `;

  connection.query(
    deleteRegistration,
    [student_id],
    (err, registrationResult) => {
      if (err) {
        console.log("Registration delete error:", err);
        return res.status(500).send("Registration delete failed");
      }

      const deleteStudent = `
        DELETE FROM students
        WHERE student_id = ?
      `;

      connection.query(deleteStudent, [student_id], (err, studentResult) => {
        if (err) {
          console.log("Student delete error:", err);
          return res.status(500).send("Student delete failed");
        }

        if (studentResult.affectedRows === 0) {
          return res.status(404).send("Student not found");
        }

        res.send("Student deleted successfully");
      });
    },
  );
});
app.listen(4000, () => {
  console.log("Server running on port http://localhost:4000");
});
