const express = require('express');

const router = express.Router();
const Student = require('../models/student');
const { admin } = require('./roles');

const auth = require('../authenticate');
const permission = require('../permission');

// Authentication Middleware
router.use('/', auth.ensureAuthenticated);

// Add new Student
router.post('/addStudent', permission(admin), (req, res) => {
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
});

// Search new students
router.get('/search', (req, res) => {
  const { search } = req.query;
  console.log(search);
  Student.searchStudent(search, (err, student) => {
    console.log(student);
    if (err) {
      res.json({ success: false, msg: 'Unable to search student' });
    } else {
      res.json({ succes: true, msg: 'Got Student', student });
    }
  });
  // const {
  //   name, course, email, studentId,
  // } = req.query;
  // if (name) {
  //   Student.getStudentByName(name, (err, student) => {
  //     if (err) {
  //       res.json({ success: false, msg: 'Unable to find user' });
  //     } else {
  //       res.json({ succes: true, msg: 'Got Student', student });
  //     }
  //   });
  // } else if (course) {
  //   Student.getStudentByCourse(course, (err) => {
  //     if (err) {
  //       res.json({ success: false, msg: 'Unable to find user' });
  //     } else {
  //       res.json({ succes: true, msg: 'Got Student' });
  //     }
  //   });
  // } else if (email) {
  //   Student.getStudentByEmail(email, (err) => {
  //     if (err) {
  //       res.json({ success: false, msg: 'Unable to find user' });
  //     } else {
  //       res.json({ succes: true, msg: 'Got Student' });
  //     }
  //   });
  // } else if (studentId) {
  //   Student.getStudentBystudentId(studentId, (err) => {
  //     if (err) {
  //       res.json({ success: false, msg: 'Unable to find user' });
  //     } else {
  //       res.json({ succes: true, msg: 'Got Student' });
  //     }
  //   });
  // }
});

module.exports = router;
