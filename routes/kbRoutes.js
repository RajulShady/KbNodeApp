const express = require('express');

const router = express.Router();
const Student = require('../models/student');

const auth = require('../authenticate');

// Authentication Middleware
router.use('/', auth.ensureAuthenticated);

// Add new Student
router.post('/addStudent', (req, res) => {
  if (req.decoded.isAdmin === true) {
    const newStudent = new Student({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      course: req.body.course,
      dob: req.body.dob,
      studentId: req.body.studentId,
    });
    try {
      Student.addStudent(newStudent, (err) => {
        if (err) {
          console.log(err);
          res.json({ success: false, msg: 'Invalid Input' });
        } else {
          res.json({ success: true, msg: 'new user registered' });
        }
      });
    } catch (err) {
      res.json({ message: 'Invalid Phone number' });
    }
  } else {
    res.json({ error: 'Not allowed to access this route.' });
  }
});

// Search new students
router.get('/search', (req, res) => {
  const {
    name, course, email, studentId,
  } = req.query;
  if (name) {
    Student.getStudentByName(name, (err, student) => {
      if (err) {
        res.json({ success: false, msg: 'Unable to find user' });
      } else {
        res.json({ succes: true, msg: 'Got Student', student });
      }
    });
  } else if (course) {
    Student.getStudentByCourse(course, (err) => {
      if (err) {
        res.json({ success: false, msg: 'Unable to find user' });
      } else {
        res.json({ succes: true, msg: 'Got Student' });
      }
    });
  } else if (email) {
    Student.getStudentByEmail(email, (err) => {
      if (err) {
        res.json({ success: false, msg: 'Unable to find user' });
      } else {
        res.json({ succes: true, msg: 'Got Student' });
      }
    });
  } else if (studentId) {
    Student.getStudentBystudentId(studentId, (err) => {
      if (err) {
        res.json({ success: false, msg: 'Unable to find user' });
      } else {
        res.json({ succes: true, msg: 'Got Student' });
      }
    });
  }
});

module.exports = router;
