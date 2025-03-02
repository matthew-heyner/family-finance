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

## Project Structure

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

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)

### Installation

1. Clone the repository
2. Navigate to the server directory
3. Install dependencies:
   ```
   npm install
   ```
4. Create a `.env` file based on the `.env.example` file
5. Start the development server:
   ```
   npm run dev
   ```

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

For detailed API documentation, refer to the API documentation (coming soon).

## Environment Variables

- `NODE_ENV` - Environment (development, production)
- `PORT` - Server port
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret for JWT signing
- `JWT_EXPIRE` - JWT expiration time
- `EMAIL_SERVICE` - Email service provider
- `EMAIL_USERNAME` - Email username
- `EMAIL_PASSWORD` - Email password
- `EMAIL_FROM` - Email sender address 