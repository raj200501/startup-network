# Startup Network

Welcome to the **Startup Network** - a social network application designed specifically for startups and venture capitalists. This project is built using Node.js, Express, MongoDB for the backend, and React for the frontend. 
 
## About

Startup Network is a platform that allows startup enthusiasts, entrepreneurs, and professionals to connect, share ideas, and collaborate. Whether you're looking to build your network, find co-founders, or explore startup opportunities, Startup Network provides the tools and community to help you succeed. 

Visit [sunnynightsocial.com](https://sunnynightsocial.com/register) for more details and live demonstrations.

## Features

- **User Authentication**: Secure registration and login using JWT.
- **User Profiles**: Create and update personal profiles with information about your startup journey.
- **Posts**: Share updates, ideas, and news with your network.
- **Comments**: Engage with posts by adding comments.
- **Likes**: Show appreciation for posts by liking them.
- **Responsive Design**: Optimized for both desktop and mobile devices.

## Technologies Used

- **Backend**:
  - Node.js
  - Express
  - MongoDB
  - Mongoose
  - JWT for authentication
  - Bcrypt for password hashing

- **Frontend**:
  - React
  - Redux for state management
  - Axios for HTTP requests
  - React Router for navigation

## Getting Started

### Prerequisites

Make sure you have the following installed on your machine:

- Node.js
- MongoDB
- npm or yarn

## ✅ Verified Quickstart

These steps were verified in this repository:

```bash
# Install backend dependencies
npm install

# Install frontend dependencies
cd client
npm install
cd ..

# Run a backend smoke test (starts an in-memory MongoDB)
npm run smoke
```

To run the full stack locally (requires a running MongoDB instance):

```bash
# from the repo root
cp .env.example .env
npm run dev
```

## Troubleshooting

- **"Configuration property 'mongoURI' is not defined"**
  - Ensure you have either a `.env` file at the repo root (see `.env.example`) or you have `MONGO_URI`/`JWT_SECRET` set in your shell.
- **Client fails with "Missing script: start"**
  - Run `npm install` inside the `client/` folder to ensure the React scripts are available.
- **MongoDB connection errors**
  - Verify MongoDB is running locally at the URI in your `.env` file. The smoke test uses an in-memory MongoDB and does not require a local instance.
- **npm install fails with 403**
  - Ensure your environment allows access to the npm registry or configure your registry/proxy settings.
