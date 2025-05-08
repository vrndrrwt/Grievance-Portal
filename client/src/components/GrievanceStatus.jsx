import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const GrievanceStatus = () => {
  const [grievances, setGrievances] = useState([]);
  const [filterSize, setFilterSize] = useState(0);
  const [filterDept, setFilterDept] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getListFromNested = (data) => {
    return data.flatMap(item => item.grievances || []);
  };

  const fetchGrievances = async () => {
    try {
      const res = await fetch("/grievancelist", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        credentials: "include"
      });

      if (!res.ok) {
        throw new Error("Failed to fetch grievances.");
      }

      const data = await res.json();
      const allGrievances = getListFromNested(data);
      setGrievances(allGrievances);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGrievances();
  }, []);

  const handleSizeFilterChange = (e) => {
    setFilterSize(Number(e.target.value));
  };

  const handleDeptFilterChange = (e) => {
    setFilterDept(e.target.value);
  };

  // AI-like categorization based on grievance length
  const categorizeByLength = (textLength) => {
    if (textLength < 50) return "Short";
    else if (textLength < 150) return "Medium";
    else return "Long";
  };

  const filteredArray = grievances.filter(item =>
    item.grievance.length >= filterSize &&
    (filterDept === "All" || item.dept === filterDept)
  );

  if (loading) return <p className="mx-4 my-2">Loading grievances...</p>;
  if (error) return <p className="mx-4 my-2 text-danger">Error: {error}</p>;

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
          <option value="All">All</option>
          <option value="Education">Education</option>
          <option value="Health Ministry">Health Ministry</option>
          <option value="Service Provider">Service Provider</option>
          <option value="Others">Others</option>
        </select>
      </div>

      <div className="table-responsive mx-4">
        <table className="table table-dark table-bordered table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Names</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Department</th>
              <th>Grievance</th>
              <th>Length Category</th>
              <th>Status</th>
              <th>Feedback</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredArray.length === 0 ? (
              <tr>
                <td colSpan="10" className="text-center">No grievances found.</td>
              </tr>
            ) : (
              filteredArray.map((cval, index) => (
                <tr key={index}>
                  <td>{cval._id}</td>
                  <td>{cval.name}</td>
                  <td>{cval.email}</td>
                  <td>{cval.phone}</td>
                  <td>{cval.dept}</td>
                  <td>{cval.grievance}</td>
                  <td>{categorizeByLength(cval.grievance.length)}</td>
                  <td>{cval.status}</td>
                  <td>{cval.feedback}</td>
                  <td>{cval.date}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="mx-4">
        <Link to="/aAbBcC/updatedocs" className="btn btn-outline-primary me-2">Update Documents</Link>
        <Link to="/login" className="btn btn-outline-warning">Logout as Admin</Link>
      </div>

      <p className='small mx-4 mt-3' style={{ fontStyle: "italic" }}>
        Note: Copy the grievance ID to update.
      </p>
    </>
  );
};

export default GrievanceStatus;
