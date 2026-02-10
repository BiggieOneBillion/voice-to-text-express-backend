# Setup Guide

## Prerequisites

- [Node.js](https://nodejs.org/) (v16.0.0 or higher recommended)
- [MongoDB](https://www.mongodb.com/) (Service running locally or a connection string)

## Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/yourusername/voice-text-backend.git
    cd voice-text-backend
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # OR
    yarn install
    ```

## Environment Variables

Create a file named `.env` in the root directory. You can copy the `.env.example` file if it exists, or use the template below:

```bash
# General
NODE_ENV=development
PORT=3000

# Database
MONGODB_URI=mongodb://localhost:27017/voice-text-db

# Authentication
# Change this to a secure random string in production!
JWT_SECRET=your-secret-key-change-me

# Third-Party Services
# Required for audio transcription
ASSEMBLYAI_API_KEY=your_assemblyai_api_key
```

## Running the Application

### Development Mode
Runs the server with `nodemon` for hot-reloading.

```bash
npm run dev
```

### Production Mode
1.  Ensure you have set `NODE_ENV=production`.
2.  Start the application normally.

```bash
npm start
```

## Linting & Formatting

(Optional: if you have linting scripts set up)

```bash
npm run lint
```
