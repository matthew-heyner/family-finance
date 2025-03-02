# Family Finance App - Server

This is the backend server for the Family Finance application, built with Node.js, Express, TypeScript, and MongoDB.

## Features

- User authentication (register, login, logout)
- Password reset functionality
- User profile management
- Role-based access control
- Transaction management
- Budget tracking
- Category management
- Receipt scanning and processing
- Reporting and analytics

## Tech Stack

- **Node.js** - JavaScript runtime
- **Express** - Web framework
- **TypeScript** - Type-safe JavaScript
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **Bcrypt** - Password hashing
- **Zod** - Schema validation
- **Winston** - Logging
- **Tesseract.js** - OCR for receipt scanning
- **Jest** - Testing framework

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or Atlas)

### Installation

1. Navigate to the server directory:
   ```
   cd server
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the server directory with the following variables:
   ```
   NODE_ENV=development
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/family-finance
   JWT_SECRET=your_jwt_secret_key
   JWT_EXPIRE=30d
   JWT_COOKIE_EXPIRE=30
   
   # For password reset functionality (optional)
   EMAIL_SERVICE=smtp
   EMAIL_HOST=smtp.example.com
   EMAIL_PORT=587
   EMAIL_USERNAME=your_email@example.com
   EMAIL_PASSWORD=your_email_password
   EMAIL_FROM=noreply@familyfinance.com
   ```

4. Start the development server:
   ```
   npm run dev
   ```
   The server will be available at `http://localhost:5000`

### Available Scripts

- `npm run dev` - Start the development server with hot-reload
- `npm run build` - Build the project for production
- `npm start` - Start the production server
- `npm run lint` - Run ESLint
- `npm test` - Run tests

## API Documentation

The API endpoints are organized around the following resources:

- `/api/auth` - Authentication endpoints
- `/api/users` - User management (admin only)
- `/api/transactions` - Transaction management
- `/api/budgets` - Budget management
- `/api/categories` - Category management
- `/api/reports` - Reporting endpoints
- `/api/receipts` - Receipt processing

### Authentication Endpoints

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login a user
- `GET /api/auth/logout` - Logout a user
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/updatedetails` - Update user details
- `PUT /api/auth/updatepassword` - Update user password
- `POST /api/auth/forgotpassword` - Request password reset
- `PUT /api/auth/resetpassword/:resettoken` - Reset password

## Database Setup

### Local MongoDB

1. Install MongoDB Community Edition on your machine
2. Start the MongoDB service
3. Connect using the connection string: `mongodb://localhost:27017/family-finance`

### MongoDB Atlas

1. Create a MongoDB Atlas account
2. Create a new cluster
3. Get your connection string and update the `.env` file

## Folder Structure

```
server/
├── src/
│   ├── config/       # Configuration files
│   ├── controllers/  # Request handlers
│   ├── middleware/   # Express middleware
│   ├── models/       # Mongoose models
│   ├── routes/       # API routes
│   ├── services/     # Business logic
│   ├── utils/        # Utility functions
│   └── app.ts        # Express app
├── dist/             # Compiled JavaScript
├── logs/             # Application logs
├── .env              # Environment variables
├── package.json      # Dependencies
└── tsconfig.json     # TypeScript configuration
```

## Troubleshooting

- If you encounter CORS issues, make sure the client URL is properly configured in the server's CORS settings
- For MongoDB connection issues, verify your connection string and network settings
- For authentication issues, check your JWT secret and expiration settings 