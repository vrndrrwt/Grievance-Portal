import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const GrievanceStatus = () => {
  const [Array, setArray] = useState([]);
  const [filterSize, setFilterSize] = useState(0);
  const [filterDept, setFilterDept] = useState("All");

  // 🔒 Hardcoded department list
  const departments = [
    "All",
    "Education",
    "Health Ministry",
    "Public Service Provider",
    "Others"
  ];

  const getData = async () => {
    try {
      const res = await fetch("/grievancelist", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        credentials: "include"
      });
      const data = await res.json();
      const arr = getlist(data);
      setArray(arr);

      if (!res.status === 200) {
        const error = new Error(res.err);
        throw error;
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const getlist = (d) => {
    let Gdata = [];
    for (let i = 0; i < d.length; i++) {
      for (let j = 0; j < d[i].grievances.length; j++) {
        Gdata.push(d[i].grievances[j]);
      }
    }
    return Gdata;
  };

  const handleSizeFilterChange = (event) => {
    setFilterSize(Number(event.target.value));
  };

  const handleDeptFilterChange = (event) => {
    setFilterDept(event.target.value);
  };

  const filteredArray = Array.filter(item =>
    item.grievance.length >= filterSize &&
    (filterDept === "All" || item.dept === filterDept)
  );

  return (
    <>
      <div className="mx-4 my-2">
        <label>Filter by minimum grievance size: </label>
        <input
          type="number"
          value={filterSize}
          onChange={handleSizeFilterChange}
          className="mx-2"
        />
        <small>(Length in characters)</small>
      </div>

      <div className="mx-4 my-2">
        <label>Filter by department: </label>
        <select value={filterDept} onChange={handleDeptFilterChange} className="mx-2">
          {departments.map((dept, index) => (
            <option key={index} value={dept}>{dept}</option>
          ))}
        </select>
      </div>

      <table className="Gtable table-dark">
        <thead>
          <tr>
            <th>ID</th>
            <th>Names</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Department</th>
            <th>Grievance</th>
            <th>Status</th>
            <th>Feedback</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {filteredArray.map((cval, index) => (
            <tr key={index}>
              <td>{cval._id}</td>
              <td>{cval.name}</td>
              <td>{cval.email}</td>
              <td>{cval.phone}</td>
              <td>{cval.dept}</td>
              <td>{cval.grievance}</td>
              <td>{cval.status}</td>
              <td>{cval.feedback}</td>
              <td>{cval.date}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <Link to="/aAbBcC/updatedocs" className="btn btn-outline-primary mx-4 mb-1 update">Update Documents</Link>
      <Link to="/login" className="btn btn-outline-warning mx-4 mb-1 update">Logout as Admin</Link>
      <br />
      <br />
      <p className='small mx-4' style={{ fontStyle: "italic" }}>Note: Copy the grievance ID to update.</p>
    </>
  );
};

export default GrievanceStatus;
