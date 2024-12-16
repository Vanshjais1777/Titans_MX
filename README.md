# Skill Sphere

Skill Sphere is an innovative platform designed to connect learners and instructors from diverse fields. Whether you're looking to master a new skill or share your expertise, Skill Sphere provides a seamless interface to learn, teach, and grow in an engaging and supportive environment.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

---

## Features

- **Personalized Learning:** Curated recommendations based on your interests and skill levels.
- **Interactive Dashboard:** Track progress, set goals, and manage your learning journey.
- **Instructor Tools:** Create and manage courses with tools for lesson planning, scheduling, and performance tracking.
- **Live Sessions:** Engage in live video sessions and workshops with instructors.
- **Gamification:** Earn badges and points as you complete courses and milestones.
- **Community Forums:** Discuss topics, share resources, and network with other learners and instructors.

---

## Technologies Used

- **Frontend:** React.js, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JWT, OAuth (Google Login)
- **Real-time Communication:** Socket.IO
- **Hosting:** Vercel (Frontend), Render (Backend), Cloudinary (Media Storage)

---

## Getting Started

Follow the instructions below to set up the project locally.

### Prerequisites

Ensure you have the following installed:

- Node.js (v16+)
- MongoDB (local or cloud instance)
- Git

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/skill-sphere.git
   cd skill-sphere
   ```

2. Install dependencies for both the frontend and backend:

   ```bash
   cd frontend
   npm install
   cd ../backend
   npm install
   ```

3. Configure environment variables:

   Create a `.env` file in the `backend` directory with the following:

   ```env
   PORT=4000
   MONGO_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   CLOUDINARY_NAME=your_cloudinary_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   ```

4. Start the development servers:

   - Backend:
     ```bash
     cd backend
     npm run dev
     ```
   - Frontend:
     ```bash
     cd frontend
     npm run dev
     ```

5. Open your browser and navigate to:
   - Frontend: `http://localhost:5173`
   - Backend API: `http://localhost:4000`

---

## Usage

1. **Sign Up/Login:** Create an account or use Google to log in.
2. **Explore Courses:** Browse the catalog and enroll in courses.
3. **Create Courses:** (For instructors) Add a course with lessons, videos, and quizzes.
4. **Track Progress:** Use the dashboard to monitor learning progress.

---

## Contributing

Contributions are welcome! Follow these steps to contribute:

1. Fork the repository.
2. Create a feature branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add your message here"
   ```
4. Push to the branch:
   ```bash
   git push origin feature-name
   ```
5. Submit a pull request.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Contact

For any queries or feedback, feel free to reach out:

- **Email:** support@skillsphere.com
- **GitHub:** [your-username](https://github.com/your-username)
- **LinkedIn:** [Your Name](https://www.linkedin.com/in/your-linkedin/)

---

Happy Learning and Sharing on Skill Sphere! 🚀
