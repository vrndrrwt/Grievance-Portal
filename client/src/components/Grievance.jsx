import React, { useEffect, useState } from 'react';
import phone from '../images/telephone.png';
import email from '../images/email.png';
import address from '../images/address.png';

const Grievance = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    dept: "",
    grievance: "",
    latitude: "",
    longitude: "",
  });

  const userContact = async () => {
    try {
      const res = await fetch("/getdata");
      const data = await res.json();
      setUserData((prev) => ({ ...prev, name: data.name, email: data.email, phone: data.phone }));
    } catch (err) {
      console.log(err);
    }
  };

  // AI: Automatically classify department
  const classifyDepartment = async (text) => {
    try {
      const res = await fetch("/classify-grievance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ grievance: text }),
      });
      const data = await res.json();
      if (data?.dept) {
        setUserData((prev) => ({ ...prev, dept: data.dept }));
      }
    } catch (err) {
      console.error("Error classifying grievance:", err);
    }
  };

  useEffect(() => {
    userContact();
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserData((prev) => ({ ...prev, latitude, longitude }));
        },
        (error) => console.error(error)
      );
    } else {
      alert("Geolocation not supported");
    }
  }, []);

  const handleInputs = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));

    if (name === "grievance" && value.length > 20) {
      classifyDepartment(value);
    }
  };

  const fileGrievance = async (event) => {
    event.preventDefault();
    const { name, email, phone, dept, grievance, latitude, longitude } = userData;
    const res = await fetch("/grievance", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, phone, dept, grievance, latitude, longitude }),
    });

    const data = await res.json();
    if (!data) {
      alert("Try to relogin. Your grievance was not filed!");
    } else {
      alert("Grievance Filed Successfully!! We'll inform you when there is a response");
      setUserData((prev) => ({ ...prev, grievance: "" }));
    }
  };

  return (
    <>
      <div className="contact_form mx-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-10 offset-lg-1">
              <div className="contact_form_container py-5">
                <div className="contact_form_title">
                  <h2 className="text-center">File a Grievance</h2>
                </div>

                <form method="POST" className="jumbotron">
                  <div className="contact_form_name d-flex row">
                    <input type="text" className="col-2" name="name" value={userData.name} onChange={handleInputs} placeholder="Your Name" required />
                    <div className="col-1"></div>
                    <input type="email" className="col-4" name="email" value={userData.email} onChange={handleInputs} placeholder="Your Email" required />
                    <div className="col-1"></div>
                    <input type="text" className="col-3" name="phone" value={userData.phone} onChange={handleInputs} placeholder="Your Phone Number" required />
                  </div>
                  <br />
                  <label htmlFor="complaint">Department:</label>
                  <select name="dept" id="complaint" value={userData.dept} onChange={handleInputs}>
                    <option value="">--Select department--</option>
                    <option value="Education">Education</option>
                    <option value="Health Ministry">Health Ministry</option>
                    <option value="Service Provider">Service Provider</option>
                    <option value="Others">Others</option>
                  </select>
                  <br />
                  <div className="contact_form_text">
                    <textarea className="text_field contact_form_message" name="grievance" cols="82" rows="5" placeholder="Your Message Here" onChange={handleInputs} value={userData.grievance}></textarea>
                  </div>
                  <div>
                    <p>Upload Supporting Document Here:</p>
                    <input type="file" name="filename" />
                  </div>
                  <br />
                  <div className="contact_form_button">
                    <button type="submit" className="btn btn-outline-primary" onClick={fileGrievance}>Submit Grievance</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="contact_info bg-dark text-white">
        <div className="container-fluid">
          <br />
          <div className="row">
            <div className="col-lg-12 row">
              <div className="col-1"><img src={phone} alt="phone" height="50" width="50" /></div>
              <div className="col-2"><h6>Phone</h6><p>+1800 266 1236</p></div>
              <div className="col-1"></div>
              <div className="col-1"><img src={email} alt="email" height="50" width="50" /></div>
              <div className="col-3"><h6>Email</h6><p>filemygrievance@gmail.com</p></div>
              <div className="col-1"></div>
              <div className="col-1"><img src={address} alt="address" height="50" width="50" /></div>
              <div className="col-2"><h6>Address</h6><p>Rajasthan</p></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Grievance;
