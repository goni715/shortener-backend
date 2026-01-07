# Shortener Express API

A production-ready URL Shortener API built with **Express.js**, **MongoDB**, **TypeScript**, and the **MVC (Model-View-Controller)** architectural pattern. This API allows users to register, authenticate, and manage shortened URLs with comprehensive error handling and validation.


## Demo

- **Live URL:** https://shortener-backend-goni.vercel.app
- **GitHub Repository:** https://github.com/goni715/shortener-backend
- **Postman Documentation:** https://documenter.getpostman.com/view/17161589/2sBXVeFCAb

## 🌟 Features

- **User Authentication** - Register, verify email via OTP, and login with JWT tokens
- **URL Shortening** - Convert long URLs into short, shareable links with unique codes
- **URL Management** - Create, retrieve, and delete shortened URLs
- **Visit Tracking** - Track the number of times each shortened URL is accessed
- **Email Verification** - OTP-based email verification during registration
- **Error Handling** - Comprehensive global error handling with custom error classes
- **Input Validation** - Zod schema validation for all API requests
- **Middleware Support** - Auth middleware, error handling, and request validation

## 📁 Project Structure

```
src/
├── config/
│   └── index.ts                    # Environment variables configuration
├── constants/
│   ├── url.constant.ts            # URL-related constants
│   └── user.constant.ts           # User-related constants
├── controllers/
│   ├── auth.controller.ts         # Authentication request handlers
│   └── url.controller.ts          # URL shortening request handlers
├── errors/
│   └── CustomError.ts             # Custom error class
├── interfaces/
│   ├── auth.interface.ts          # Auth data types
│   ├── url.interface.ts           # URL data types
│   └── user.interface.ts          # User data types
├── middlewares/
│   ├── AuthMiddleware.ts          # JWT authentication middleware
│   ├── globalErrorHandler.ts      # Global error handling middleware
│   ├── notFound.ts                # 404 handler middleware
│   └── validationMiddleware.ts    # Zod validation middleware
├── models/
│   ├── url.model.ts               # URL MongoDB schema
│   └── user.model.ts              # User MongoDB schema
├── routes/
│   ├── auth.routes.ts             # Authentication routes
│   └── url.routes.ts              # URL shortening routes
├── services/
│   ├── auth/
│   │   ├── LoginUserService.ts    # Login business logic
│   │   ├── RegisterUserService.ts # Registration business logic
│   │   └── VerifyEmailService.ts  # Email verification logic
│   └── url/
│       ├── CreateShortUrlService.ts      # Create short URL logic
│       ├── DeleteUrlService.ts           # Delete URL logic
│       ├── GetUrlsService.ts             # Retrieve URLs logic
│       └── RedirectUrlService.ts         # URL redirect logic
├── utils/
│   ├── asyncHandler.ts            # Async error handling wrapper
│   ├── checkPassword.ts           # Password verification utility
│   ├── dbConnect.ts               # Database connection utility
│   └── ...more              # Additional utilities
├── validation/
│   ├── auth.validation.ts         # Auth Zod schemas
│   └── url.validation.ts          # URL Zod schemas
├── app.ts                         # Express app configuration
└── server.ts                      # Server entry point
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v24 or higher)
- **yarn** or npm package manager
- **MongoDB** (local or cloud instance)

### Installation

1. **Clone the repository:**

```bash
git clone https://github.com/goni715/shortener-backend
cd shortener-backend
```

2. **Install dependencies:**

```bash
yarn install
```

3. **Create a `.env` file** in the project root:

```env
NODE_ENV=development
PORT=9090

# MongoDB connection string
DATABASE_URL=mongodb_connection_string_here

# Password hashing
BCRYPT_SALT_ROUNDS=your_salt_number

# Frontend base URL
SHORT_BASE_URL=https://shortener-goni.vercel.app --your front-end url

# JWT configuration
JWT_ACCESS_SECRET=your_access_token_secret
JWT_REFRESH_SECRET=your_refresh_token_secret
JWT_ACCESS_EXPIRES_IN=access_expires_time
JWT_REFRESH_EXPIRES_IN=refresh_expires_time

# SMTP email configuration
SMTP_USERNAME=your_email_address
SMTP_PASSWORD=your_email_app_password
SMTP_FROM=sender_email_address
```

4. **Start the development server:**

```bash
yarn run dev
```

The server will run on `http://localhost:9090`

5. **Build for production:**
   ```bash
   yarn run build
   yarn start
   ```


```

## 📦 Dependencies

```json
{
  "bcryptjs": "^3.0.3", // Password hashing
  "body-parser": "^2.2.1", // Request body parsing
  "cors": "^2.8.5", // Cross-Origin Resource Sharing
  "dotenv": "^17.2.3", // Environment variables
  "express": "^5.2.1", // Web framework
  "jsonwebtoken": "^9.0.2", // JWT authentication
  "mongoose": "^9.0.2", // MongoDB ODM
  "nodemailer": "^7.0.9", // Email service
  "zod": "^3.24.2" // Schema validation
}
```

 **Postman Env**:
```env
base_url=hhttp://localhost:9090/api/v1
#or
base_url=https://shortener-backend-goni.vercel.app/api/v1
UserToken=accessToken_here

```

## 🔌 API Endpoints

### Authentication Routes

#### 1. Register User

- **Endpoint:** `POST /api/auth/register-user`
- **Request Body:**

```json
{
  "fullName": "Osman Goni",
  "email": "gonidev715@gmail.com",
  "password": "123456" // Minimum 6 characters
}
```

- **Response:**

```json
{
  "success": true,
  "message": "Please check your email to verify",
  "data": null
}
```

#### 2. Verify Email

- **Endpoint:** `POST /api/auth/verify-email`
- **Request Body:**

```json
{
  "email": "gonidev715@gmail.com",
  "otp": "184888"
}
```

- **Response:**

```json
{
  "success": true,
  "message": "Your account is verified successfully",
  "data": null
}
```

#### 3. Login User

- **Endpoint:** `POST /api/auth/login-user`
- **Request Body:**

```json
{
  "email": "gonidev715@gmail.com",
  "password": "123456"
}
```

- **Response:**

```json
{
  "success": true,
  "message": "Login Success",
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OTVjMDY4YTliYTI2ZmFhYzlmNjNjNjEiLCJmdWxsTmFtZSI6Ik9zbWFuIEdvbmkiLCJlbWFpbCI6ImdvbmlkZXY3MTVAZ21haWwuY29tIiwicm9sZSI6InVzZXIiLCJpYXQiOjE3Njc4MDU3ODAsImV4cCI6MTc2ODQxMDU4MH0.V6HIUf3IK91WZXrAIdZDie0J9m9-03mrT-Ib5-r2JrA"
  }
}
```

### URL Shortening Routes

#### 4. Create Short URL

- **Endpoint:** `POST /api/url/create-short-url`
- **Headers:** `Authorization: <accessToken>`
- **Request Body:**

```json
{
  "originalUrl": "https://www.cricbuzz.com/cricket-news/137172/not-at-the-cost-of-national-humiliation-bangladesh-press-for-venue-shift"
}
```

- **Response:**

```json
{
  "success": true,
  "message": "Short url is created successfully",
  "data": {
    "userId": "695c068a9ba26faac9f63c61",
    "originalUrl": "https://www.cricbuzz.com/cricket-news/137172/not-at-the-cost-of-national-humiliation-bangladesh-press-for-venue-shift",
    "shortCode": "0my54r",
    "shortUrl": "https://shortener-goni.vercel.app/0my54r",
    "visits": 0,
    "_id": "695e926876169a1efb2b6fe8",
    "createdAt": "2026-01-07T17:05:44.646Z",
    "updatedAt": "2026-01-07T17:05:44.646Z"
  }
}
```

#### 5. Get All URLs

- **Endpoint:** `GET /api/url/get-urls`
- **Headers:** `Authorization: <accessToken>`
- **Query Parameters:**
  - `page` (optional, default: 1)
  - `limit` (optional, default: 10)
- **Response:**

```json
{
  "success": true,
  "message": "Urls are retrieved successfully",
  "meta": {
    "page": 1,
    "limit": 10,
    "totalPages": 1,
    "total": 5
  },
  "data": [
    {
      "_id": "695e926876169a1efb2b6fe8",
      "originalUrl": "https://www.cricbuzz.com/cricket-news/137172/not-at-the-cost-of-national-humiliation-bangladesh-press-for-venue-shift",
      "shortCode": "0my54r",
      "shortUrl": "https://shortener-goni.vercel.app/0my54r",
      "visits": 0,
      "createdAt": "2026-01-07T17:05:44.646Z"
    }
  ]
}
```

#### 6. Redirect to Original URL

- **Endpoint:** `GET /api/url/redirect/:shortCode`
- **Headers:** `Authorization: <accessToken>`
- **Response:**

```json
{
  "success": true,
  "message": "Url is redirected successfully",
  "data": "https://www.cricbuzz.com/cricket-news/137172/not-at-the-cost-of-national-humiliation-bangladesh-press-for-venue-shift"
}
```

#### 7. Delete URL

- **Endpoint:** `DELETE /api/url/delete-url/:urlId`
- **Headers:** `Authorization: <accessToken>`
- **Response:**

```json
{
  "success": true,
  "message": "Url deleted successfully"
}
```

## 🔐 Authentication

This API uses **JWT (JSON Web Token)** for authentication. When users log in, they receive an access token that must be included in the `Authorization` header for all protected endpoints:

```
Authorization: <accessToken>
```

## ✅ Validation

The API uses **Zod** for schema validation. Invalid data will return: For Example

```json
{
  "success": false,
  "message": "Invalid email address",
  "errors": {
    "email": "Invalid email address",
    "password": "Password minimum 6 characters long"
  }
}
```

## 🛠️ Development

### Running the Server

```bash
yarn run dev
```

This uses `tsx` to run TypeScript directly without compilation.

### Project Patterns

- **MVC Architecture** - Clear separation of concerns with Models, Views (Controllers), and Services
- **Custom Error Handling** - Centralized error handling with `CustomError` class
- **Async/Await** - All async operations wrapped with `asyncHandler` for safety
- **Validation First** - Zod schemas validate all incoming data
- **Middleware Pipeline** - Request validation, authentication, and error handling via middleware

**Developed with ❤️ by the Osman Goni**
