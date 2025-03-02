# Family Finance & Budget Application

A comprehensive full-stack web application for family finance tracking and budgeting.

## Features

- **User Management**
  - Family account creation and management
  - Role-based permissions (family admin, adult member, child/teen)
  - User profiles with customizable settings
  - Email verification and password reset

- **Expense Tracking**
  - Manual expense entry with categorization
  - Receipt upload via camera or file upload
  - OCR processing to extract vendor, date, and amount from receipts
  - Recurring expense setup
  - Expense assignment to family members
  - Expense approval workflow for shared accounts

- **Budget Management**
  - Monthly and annual budget creation
  - Category-based budget allocation
  - Budget vs. actual comparison
  - Budget notifications and alerts
  - Savings goals tracking
  - Bill payment scheduling and reminders

- **Financial Insights**
  - Customizable dashboard with spending insights
  - Expense categorization and trend analysis
  - Spending pattern visualization
  - Category breakdown charts
  - Monthly/yearly comparative reports
  - Export functionality (PDF, CSV)

- **Family Collaboration**
  - Shared expense visibility
  - Comment system on transactions
  - Task assignment for financial responsibilities
  - Achievement system for meeting budget goals
  - Notifications for budget events (over-budget, approaching limits)

## Tech Stack

### Frontend
- React 18+ with TypeScript
- Tailwind CSS for styling
- Redux Toolkit for state management
- React Router for navigation
- React Hook Form for form validation
- Recharts for data visualization
- PWA capabilities

### Backend
- Node.js with TypeScript
- Express.js for API framework
- MongoDB with Mongoose
- JWT for authentication
- Zod for validation
- Tesseract.js for OCR processing
- Multer for file uploads

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- MongoDB (local installation or Atlas account)

### Installation

1. Clone the repository
   ```
   git clone https://github.com/yourusername/family-finance-app.git
   cd family-finance-app
   ```

2. Install root dependencies
   ```
   npm install
   ```

3. Install client and server dependencies
   ```
   npm run install:all
   ```

### Setting Up Environment Variables

#### Server Environment Variables
Create a `.env` file in the server directory with the following variables:
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

#### Client Environment Variables
Create a `.env` file in the client directory with the following variables:
```
VITE_API_URL=http://localhost:5000/api
```

### Database Setup

#### Local MongoDB
1. Install MongoDB Community Edition on your machine
2. Start the MongoDB service
3. The application will connect using the connection string in your `.env` file

#### MongoDB Atlas
1. Create a MongoDB Atlas account
2. Create a new cluster
3. Get your connection string and update the `MONGODB_URI` in your server `.env` file

### Running the Application

#### Development Mode
To run both client and server in development mode:
```
npm run dev
```

This will start:
- The server at http://localhost:5000
- The client at http://localhost:5173

#### Running Client Only
```
npm run client
```

#### Running Server Only
```
npm run server
```

### Building for Production

To build both client and server for production:
```
npm run build
```

To start the production server (which will also serve the client build):
```
npm start
```

## Project Structure

```
family-finance-app/
├── client/                 # Frontend React application
│   ├── public/             # Static files
│   ├── src/                # Source files
│   │   ├── assets/         # Images, fonts, etc.
│   │   ├── components/     # Reusable components
│   │   ├── features/       # Feature-based modules
│   │   ├── hooks/          # Custom React hooks
│   │   ├── layouts/        # Layout components
│   │   ├── pages/          # Page components
│   │   ├── services/       # API services
│   │   ├── store/          # Redux store
│   │   ├── types/          # TypeScript types
│   │   ├── utils/          # Utility functions
│   │   ├── App.tsx         # Main App component
│   │   └── main.tsx        # Entry point
│   ├── .eslintrc.js        # ESLint configuration
│   ├── tailwind.config.js  # Tailwind CSS configuration
│   ├── tsconfig.json       # TypeScript configuration
│   └── vite.config.ts      # Vite configuration
│
├── server/                 # Backend Node.js application
│   ├── src/                # Source files
│   │   ├── config/         # Configuration files
│   │   ├── controllers/    # Route controllers
│   │   ├── middleware/     # Express middleware
│   │   ├── models/         # Mongoose models
│   │   ├── routes/         # API routes
│   │   ├── services/       # Business logic
│   │   ├── types/          # TypeScript types
│   │   ├── utils/          # Utility functions
│   │   └── app.ts          # Express app setup
│   ├── .env                # Environment variables
│   ├── .eslintrc.js        # ESLint configuration
│   └── tsconfig.json       # TypeScript configuration
│
├── package.json            # Root package.json
└── README.md               # Project documentation
```

## Troubleshooting

### Common Issues

1. **CORS Errors**: If you encounter CORS issues, make sure the client URL is properly configured in the server's CORS settings.

2. **MongoDB Connection Issues**: Verify your connection string and network settings. Make sure MongoDB is running if using a local installation.

3. **Node Version Conflicts**: Ensure you're using Node.js v16 or higher. You can use nvm to manage multiple Node.js versions.

4. **Port Already in Use**: If port 5000 or 5173 is already in use, you can modify the port in the respective configuration files.

5. **Missing Dependencies**: If you encounter missing dependency errors, run `npm install` in the respective directory.

### Getting Help

If you encounter any issues not covered in the troubleshooting section, please open an issue on the GitHub repository.

## License

This project is licensed under the MIT License - see the LICENSE file for details. 