# Samurai Train Services

## Introduction

Samurai Train Services is a comprehensive backend system designed to manage train operations in Bangladesh. It features advanced user management with role-based access control (RBAC), secure password protection using hashing, and efficient train scheduling and route optimization.

The system supports real-time updates, integrates with digital wallets for seamless transactions, and provides a scalable, modular architecture for future enhancements. Initially I developed it for the Code Samurai 2024 Preliminary Round, it has since been expanded with additional functionalities to meet real-world needs and ensure robust performance and security.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)

## Features

- **User Management:**
  - Create users and secure login and role-based access control using Passport.js, ensuring only authorized personnel can access sensitive functionalities.
  - Wallet integration with balance management.
- **Station Management:**
  - Implemented functionalities to manage stations, including locations(latitude & longitude), facilities,and associated train services, to ensure accurate routing and scheduling.
- **Train Management:**
  - Developed a robust system to manage trains, their schedules, routes, and availability across all relevant platforms.
- **Ticket Booking:**
  - Search and book tickets between stations.
  - Wallet integration for seamless payment processing.
- **Optimal Route Planning:**
  - Calculate and suggest the most efficient routes between stations.
- **Security:**

  - Enhanced security features including session management, hashed passwords, and rate limiting to protect against brute-force attacks.

- **Performance:**
  - Utilizes asynchronous programming to handle I/O operations without blocking the event loop
  - Enabled gzip compression to reduce the size of HTTP responses and improve load times.
  - Optimized database queries to fetch only the necessary data and avoid unnecessary computations.

## ER Diagram

![ER Diagram](https://i.ibb.co/mCwnQyC/ERD.png)

## Technologies

- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Containerization:** Docker
- **Version Control:** Git, GitHub
- **Deployment:** To be hosted on a server (e.g., AWS, Heroku, etc.)

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`PORT`

`MONGO_URI`

`DB_NAME`

`ADMIN_EMAIL`

## Installation

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/yourusername/samurai-train-backend.git
   cd samurai-train-backend
   ```

2. **Install Dependencies**:
   Make sure you have Node.js and npm installed. Then run:

   ```bash
   npm install
   ```

3. **Run the Application**:
   Start the development server:
   ```bash
   npm start
   ```
4. **Docker Setup**:
   Build and run the Docker container:
   ```bash
   docker-compose up --build
   ```

## API Endpoints

#### Get all stations

```http
  GET /api/stations
```

## Roadmap

- Modular, Fully following MVC Pattern

- Add more integrations

- Build Frontend

- End to end testing

## Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are greatly appreciated.

- Fork the Project
- Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
- Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
- Push to the Branch (`git push origin feature/AmazingFeature`)
- Open a Pull Request!

## License

[MIT](https://choosealicense.com/licenses/mit/)

## 🔗 Links

[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/)
