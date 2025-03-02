# Family Finance App - Client

This is the frontend client for the Family Finance application, built with React, TypeScript, and Tailwind CSS.

## Features

- User authentication and profile management
- Expense tracking and categorization
- Budget creation and management
- Financial reports and insights
- Family collaboration tools
- Responsive design for mobile and desktop

## Tech Stack

- **React 18+** - UI library
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Redux Toolkit** - State management
- **React Router** - Navigation
- **React Hook Form** - Form handling
- **Recharts** - Data visualization
- **Axios** - HTTP client
- **Vite** - Build tool

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Navigate to the client directory:
   ```
   cd client
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm run dev
   ```
   The application will be available at `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the project for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview the production build locally

## Environment Variables

Create a `.env` file in the client directory with the following variables:

```
VITE_API_URL=http://localhost:5000/api
```

## Folder Structure

```
client/
├── public/             # Static files
├── src/                # Source files
│   ├── assets/         # Images, fonts, etc.
│   ├── components/     # Reusable components
│   ├── hooks/          # Custom React hooks
│   ├── layouts/        # Layout components
│   ├── pages/          # Page components
│   ├── services/       # API services
│   ├── store/          # Redux store
│   ├── types/          # TypeScript types
│   ├── utils/          # Utility functions
│   ├── App.tsx         # Main App component
│   └── main.tsx        # Entry point
├── .eslintrc.js        # ESLint configuration
├── tailwind.config.js  # Tailwind CSS configuration
├── tsconfig.json       # TypeScript configuration
└── vite.config.ts      # Vite configuration
```

## Browser Support

The application supports the following browsers:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest) 