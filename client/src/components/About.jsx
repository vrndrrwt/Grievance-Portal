import React, { useEffect, useState } from 'react';
import phone from '../images/telephone.png';
import email from '../images/email.png';
import address from '../images/address.png';

const About = () => {
  const [userData, setUserData] = useState();

  const callAboutPage = async () => {
    try {
      const res = await fetch("/about", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        credentials: "include"
      });
      const data = await res.json();
      setUserData(data);

      if (!res.status === 200) {
        const error = new Error(res.err);
        throw error;
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    callAboutPage();
  }, []);

  if (userData) {
    return (
      <>
        <div className="mx-4">
          <h1 className='text-center my-2'>My Profile</h1>
          <hr />
          <form method="GET">
            <h3 className="text-uppercase" style={{ "textDecoration": "underline" }}>Personal Information</h3>
            <h2>Name: <span>{userData.name}</span></h2>
            <h3>Address: {userData.address}</h3>
            <br />
            <h3 className="text-uppercase" style={{ "textDecoration": "underline" }}>Contact Information</h3>
            <h4>Phone: {userData.phone}</h4>
            <h4>Email: {userData.email}</h4>
            <br />
            <h3 className="text-uppercase" style={{ "textDecoration": "underline" }}>Grievances</h3>
            <br />
            <table className="table-dark">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Department</th>
                  <th>Grievance</th>
                  <th>Status</th>
                  <th>Feedback</th>
                </tr>
              </thead>
              <tbody>
                {userData.grievances && userData.grievances.length > 0 ? (
                  userData.grievances.map((cval, index) => (
                    <tr key={index}>
                      <td>{cval.date}</td>
                      <td>{cval.dept}</td>
                      <td>{cval.grievance}</td>
                      <td>{cval.status}</td>
                      <td>{cval.feedback}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5">No grievances filed yet.</td>
                  </tr>
                )}
              </tbody>
            </table>
            <br />
          </form>
        </div>
        <div className="contact_info bg-dark text-white">
          <div className="container-fluid">
            <br />
            <div className="row">
              <div className="col-lg-12 row">
                <div className="contact_info_item col-1 abc">
                  <img src={phone} alt="phone" height="50" width="50" />
                </div>
                <div className="contact_info_item col-2 abc">
                  <h6>Phone</h6>
                  <p>+1800 266 1236</p>
                </div>

                <div className="col-1"></div>

                <div className="contact_info_item col-1 abc">
                  <img src={email} alt="email" height="50" width="50" />
                </div>
                <div className="contact_info_item col-3 abc">
                  <h6>Email</h6>
                  <p>filemygrievance@gmail.com</p>
                </div>

                <div className="col-1"></div>
                <div className="contact_info_item col-1 abc">
                  <img src={address} alt="address" height="50" width="50" />
                </div>
                <div className="contact_info_item col-2 abc">
                  <h6>Address</h6>
                  <p>Rajasthan</p>
                </div>

              </div>
            </div>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <p className='maintext'>Unable to load data. Try refreshing or relogging.</p>
      </>
    );
  }
}

export default About;
