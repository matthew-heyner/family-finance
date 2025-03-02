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
- Node.js 22 with TypeScript
- Express.js for API framework
- MongoDB with Mongoose
- JWT for authentication
- Zod for validation
- Tesseract.js for OCR processing
- Multer for file uploads

## Getting Started

### Prerequisites
- Node.js 22+
- npm or yarn
- MongoDB

### Installation

1. Clone the repository
   ```
   git clone https://github.com/yourusername/family-finance-app.git
   cd family-finance-app
   ```

2. Install dependencies
   ```
   npm run install:all
   ```

3. Set up environment variables
   - Create a `.env` file in the server directory based on `.env.example`

4. Start development servers
   ```
   npm run dev
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

## License

This project is licensed under the MIT License - see the LICENSE file for details. 