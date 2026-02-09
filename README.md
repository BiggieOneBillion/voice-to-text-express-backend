# Voice-Text Backend

A robust Express/Node.js backend for managing books, chapters, notes, and performing audio-to-text transcription. Built with modern architecture, security, and scalability in mind.

![Node.js Version](https://img.shields.io/badge/node->=16.0.0-brightgreen.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)

## Features

- **Secure Authentication**: JWT-based auth with password hashing (bcrypt).
- **RESTful API**: Clean, predictable endpoints for managing user data.
- **Audio Transcription**: Integration with **AssemblyAI** for converting speech to text.
- **Robust Validation**: All inputs are validated using **Joi** schemas.
- **Centralized Error Handling**: Consistent error responses and logging.
- **Security First**: Includes Helmet, Rate Limiting, XSS protection, and NoSQL injection prevention.
- **Documentation**: Swagger UI available at `/api-docs`.

## Quick Start

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/yourusername/voice-text-backend.git
    cd voice-text-backend
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Configure Environment:**
    Create a `.env` file (see [Setup Guide](docs/setup_guide.md) for details).

    ```env
    MONGODB_URI=mongodb://localhost:27017/voice-text-db
    JWT_SECRET=your-secure-secret
    ASSEMBLYAI_API_KEY=your-api-key
    ```

4.  **Run Development Server:**
    ```bash
    npm run dev
    ```

## Documentation

Comprehensive documentation is available in the `docs/` directory:

- [Setup Guide](docs/setup_guide.md): Detailed installation and configuration steps.
- [Architecture & Design](docs/architecture.md): Explanation of the project structure and patterns.
- [API Overview](docs/api_overview.md): Summary of available endpoints.

## Project Structure

```text
src/
├── config/             # DB and Swagger configuration
├── controllers/        # Request handlers (logic-less)
├── middleware/         # Auth, Error handling, Validation
├── models/             # Mongoose schemas
├── routes/             # API route definitions
├── services/           # Business logic (the core of the app)
├── utils/              # Helper classes (ApiError, catchAsync)
├── validations/        # Joi validation schemas
├── app.js              # Express app setup
└── server.js           # Entry point
```

## License

This project is licensed under the MIT License.
# voice-to-text-express-backend
