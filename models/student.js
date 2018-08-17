const mongoose = require('mongoose');
const { isEmail } = require('validator');

const StudentSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [isEmail, 'invalid email'],
  },
  phone: {
    type: Number,
    required: true,
    unique: true,
  },
  studentId: {
    type: String,
    required: true,
    unique: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  course: {
    type: String,
    required: true,
  },
});

StudentSchema.index({ '$**': 'text' }); // Indexing for text based search

const Student = mongoose.model('StudentData', StudentSchema);
module.exports = Student;

module.exports.getStudentBystudentId = (studentid, callback) => {
  const query = { studentid };
  Student.findOne(query, callback);
};

module.exports.getStudentByName = (name, callback) => {
  const query = { name };
  Student.findOne(query, callback);
};

module.exports.getStudentByEmail = (email, callback) => {
  const query = { email };
  Student.findOne(query, callback);
};

module.exports.getStudentByCourse = (course, callback) => {
  const query = { course };
  Student.findOne(query, callback);
};

module.exports.searchStudent = (search, callback) => {
  Student.find({ $text: { $search: search } }, callback);
};

module.exports.addStudent = (newStudent, callback) => {
  const phoneno = /^\d{10}$/;
  const { phone } = newStudent;
  if (!String(phone).match(phoneno)) {
    throw new Error('Invalid Phone Number');
  }
  newStudent.save(callback);
};

