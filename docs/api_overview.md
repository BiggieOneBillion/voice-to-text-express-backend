# API Overview

This application provides a RESTful API for managing users, books, chapters, and notes, as well as an audio transcription service.

## API Documentation

Full Swagger documentation is available at:
- `http://localhost:3000/api-docs` (when running locally)

## Endpoints Summary

### Authentication (`/api/auth`)
- `POST /register`: Create a new account.
- `POST /login`: Log in to an existing account.
- `GET /me`: Retrieve current user profile.

### Books (`/api/books`)
- `POST /`: Create a new book.
- `GET /`: Get all books for the authenticated user.
- `GET /:id`: Get details of a specific book including chapters.
- `DELETE /:id`: Delete a book and its chapters.

### Chapters (`/api/chapters`)
- `POST /`: Create a new chapter within a book.
- `GET /book/:bookId`: Get all chapters for a specific book.
- `PUT /:id`: Update chapter details (e.g., title, type).
- `PUT /:id/content`: Update chapter content specifically.
- `DELETE /:id`: Delete a chapter.

### Notes (`/api/notes`)
- `POST /`: Create a new note.
- `GET /`: Get all user notes.
- `GET /:id`: Get specific note details.
- `PUT /:id`: Update a note.
- `PATCH /:id`: Append content to an existing note.
- `DELETE /:id`: Delete a note.

### Text Conversion (`/api/convert`)
- `POST /transcribe`: Convert uploaded audio to text using AssemblyAI.

## Response Format

Success responses follow a consistent JSON structure:
- **Created (201)**: Returns the created resource.
- **Success (200)**: Returns requested data, or success message.
- **No Content (204)**: For successful deletions.

Error responses include:
```json
{
  "code": 400,
  "message": "Validation Error: \"email\" is required"
}
```
