import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [department, setDepartment] = useState('');

  const history = useHistory();

  const getAccess = (e) => {
    e.preventDefault(); // prevent form submission reload

    const accessMap = {
      education: { email: 'admin.edu@gmail.com', password: 'education', route: '/education' },
      health: { email: 'admin.health@gmail.com', password: 'health', route: '/health' },
      service: { email: 'admin.service@gmail.com', password: 'service', route: '/service' },
      general: { email: 'admin@gmail.com', password: 'admin', route: '/aAbBcC' }
    };

    const selectedAccess = accessMap[department];

    if (
      selectedAccess &&
      email === selectedAccess.email &&
      password === selectedAccess.password
    ) {
      window.alert('Login Successful');
      history.push(selectedAccess.route);
    } else {
      window.alert("Invalid credentials or department. Please try again.");
    }
  };

  return (
    <>
      <h1 className="text-center my-1">Admin Login</h1>
      <hr />
      <form onSubmit={getAccess}>
        <div className="form-group text-center jumbotron mx-5">

          <div>
            <label htmlFor="email">Email ID:</label>
            <input
              type="email"
              id="email"
              autoComplete="off"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email ID here"
              className="mx-2"
              required
            />
          </div>

          <br />

          <div>
            <label htmlFor="password">Password:</label>

            <input
              type="password"
              id="password"
              autoComplete="off"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="mx-1"
              required
            />
          </div>

          <br />

          <div>
            <label htmlFor="department">Select Department:</label>
            <select
              id="department"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="mx-2"
              required
            >
              <option value="">-- Choose --</option>
              <option value="general">General Admin</option>
              <option value="education">Education</option>
              <option value="health">Health</option>
              <option value="service">Public Service</option>
            </select>
          </div>

          <br />

          <div className="form-group form-button">
            <input
              type="submit"
              id="signin"
              className="form-submit btn btn-outline-primary"
              value="Log In"
            />
          </div>

        </div>
      </form>
    </>
  );
};

export default AdminLogin;