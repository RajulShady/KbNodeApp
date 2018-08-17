
const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const {
  User, addUser, getUserByEmail, comparePassword,
} = require('./models/user');
const jwt = require('jsonwebtoken');
const database = require('./config/database');

const kbRoutes = require('./routes/kbRoutes');
const config = require('./config/database');

// DatabaseConnection
mongoose.connect(config.database);

// On Connection
mongoose.connection.on('connected', () => {
  console.log(`Connected to database ${config.database}`);
});

// On Error
mongoose.connection.on('error', (err) => {
  console.log(`Database error: ${err}`);
});


// MiddleWares
app.use(bodyParser.urlencoded({
  extended: 'true',
}));
app.use(bodyParser.json());
app.use(bodyParser.json({
  type: 'application/vnd.api+json',
}));


app.use(cors());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'DELETE, PUT');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Routes

app.use('/user', kbRoutes);
app.get('/status', (req, res) => {
  res.json({ message: 'heya' });
});

app.post('/signup', (req, res) => {
  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    role: req.body.role,
  });

  addUser(newUser, (err) => {
    if (err) {
      res.json({ success: false, msg: 'Failed to register user' });
    } else {
      res.json({ success: true, msg: 'User Registered' });
    }
  });
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;

  getUserByEmail(email, (err, user) => {
    if (err) throw err;
    if (!user) {
      res.json({ success: false, msg: 'User not found' });
    }

    comparePassword(password, user.password, (error, isMatch) => {
      if (error) throw error;
      if (isMatch) {
        const payload = {
          email: user.email,
          role: user.role,
        };
        const token = jwt.sign(payload, database.secret, {
          expiresIn: '12h',
        });


        res.json({
          success: true,
          token,
        });
      } else {
        res.json({ success: false, msg: 'Wrong password' });
      }
    });
  });
});

// server listening at port 8080
app.listen(database.port);
