# Architecture & Design

This application uses a robust **Controller-Service** architecture to separate concerns, improve maintainability, and facilitate scaling. The codebase is broken down into modular layers, each with specific responsibilities.

## Architectural Layers

### 1. **Routes (API Layer)**
- **Purpose**: Defines API endpoints and URL structure.
- **Responsibility**: Routes requests to specific controller functions.
- **Features**: Includes middleware for authentication (`auth`), validation (`validate`), and rate limiting.
- **Location**: `src/routes/`

### 2. **Controllers (Request Handling Logic)**
- **Purpose**: Acts as the interface between the HTTP request and the business logic.
- **Responsibility**:
  - Validates request structure.
  - Calls relevant services.
  - Formats and sends HTTP responses.
  - Uses `catchAsync` to handle async errors without tedious try-catch blocks.
- **Location**: `src/controllers/`

### 3. **Services (Business Logic)**
- **Purpose**: Contains the core logic of the application.
- **Responsibility**:
  - Handles complex business rules.
  - Interacts with the data layer (Mongoose models).
  - Performs data transformations.
  - Throws custom `ApiError` for business-logic failures.
- **Location**: `src/services/`

### 4. **Middleware (Cross-Cutting Concerns)**
- **Purpose**: Handles tasks that apply to many endpoints.
- **Key Middlewares**:
  - `auth`: Verify JWT tokens.
  - `validate`: Check request body against Joi schemas.
  - `error`: Catch all errors and format them consistently.
  - Security middlewares (`helmet`, `cors`, `xss-clean`, `mongo-sanitize`) are applied globally.

## Error Handling Strategy

Errors are handled centrally to ensure consistent API responses.

- **`ApiError` Class**: Used to explicitly throw errors with specific HTTP status codes.
- **Global Error Handler**: Catches all errors, converts them to `ApiError` format, logs them (in development), and sends a clean JSON response.
- **Response Format**:
  ```json
  {
    "code": 404,
    "message": "Resource not found",
    "stack": "..." // Only in development
  }
  ```

## Security Measures

- **JWT Authentication**: Secure token-based auth for protected routes.
- **Helmet**: Adds security headers.
- **Rate Limiting**: Limits requests per IP to prevent abuse.
- **Data Sanitization**: Prevents NoSQL injection and XSS attacks.
- **CORS**: Configurable cross-origin resource sharing.

## Validation

Input validation is handled using **Joi**. Each route has a corresponding `validation.js` file defining schemas for:
- Request parameters (`params`)
- Query strings (`query`)
- Request body (`body`)

Requests failing validation return a **400 Bad Request** automatically.
