const express = require('express');
const { PythonShell } = require('python-shell');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const User = require('./model/userSchema');
const Router = require('./router/auth');

const app = express();
dotenv.config({ path: './config.env' });

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(Router);

// AI-related route
app.post('/ai-filter-grievances', (req, res) => {
  const grievances = req.body.grievances;

  // Call Python script to process grievances
  const options = {
    args: [JSON.stringify(grievances)],  // Pass grievances as a JSON string
  };

  PythonShell.run('filter_grievances.py', options, (err, result) => {
    if (err) {
      console.error("Error running Python script:", err);
      res.status(500).send("Internal Server Error");
      return;
    }

    // Parse the result returned by the Python script
    const filteredGrievances = JSON.parse(result[0]);
    res.json(filteredGrievances);
  });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
