# Public Grievance Redressal Portal

A smart, AI-powered web application that enables citizens to file public grievances efficiently with AI, location details, and direct email notifications to the concerned authority.

## Features

- **Location Detection**  
  Extracts geolocation data via Google Maps API or OpenStreetMap for better issue tracking.

- **Email Notification**  
  Sends detailed complaint emails with attached image, and location to officials using Gmail API.

- **Categorization and Monitoring**  
  AI-based grievance classification (Road, Water, Electricity, etc.) with tracking dashboard for administrators.

- **User Authentication**  
  Sign up and log in to track complaint status and history.

- **Admin Panel**  
  Manage complaints, mark as resolved, communicate with users, and download reports.

## Tech Stack

| Layer | Technologies |
|-------|--------------|
| Frontend | React.js, Tailwind CSS, Axios |
| Backend | Node.js, Express.js |
| AI | Python |
| Database | MongoDB (Optional) |
| APIs |
| Others | JWT Auth, Multer (Image Upload), Nodemailer |

---

## Project Structure

```bash
├── client/                  # Frontend React App
├── server/                  # Backend Node/Express App
├── ai-model/                # Image Captioning Model (Python)
├── .env                     # Environment Variables
├── README.md
````

---

## Setup Instructions

### Prerequisites

* Node.js & npm
* Python 3.x
* MongoDB (if used)

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/public-grievance-redressal-portal.git
cd public-grievance-redressal-portal
```

### 2. Start Backend Server

```bash
cd server
npm install
npm start
```

### 3. Start Frontend App

```bash
cd client
npm install
npm start
```

### 4. Run AI Model

```bash
cd ai-model
python filter_grievances.py
```

---

## Environment Variables (`.env`)

```env
PORT=5000
MONGO_URI=your_mongodb_uri
```

---

## Demo (Optional)

[https://user-images.githubusercontent.com/your\_video\_or\_screenshots\_link.gif](https://user-images.githubusercontent.com/your_video_or_screenshots_link.gif)

---

## Future Enhancements

* Voice-based complaint submission
* Admin analytics dashboard
* SMS notification system
* Multilingual support

---


## Author

**Virendra Singh Rawat**
 [GitHub](https://github.com/vrndrrwt) | [LinkedIn](https://linkedin.com/in/vrndrrwt)

---

## Contact

Have questions or feedback? Email me at: **[virendrasinghrawat028@gmail.com](mailto:virendrasinghrawat028@gmail.com)**