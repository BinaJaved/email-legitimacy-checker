# README.md

# Email Legitimacy Checker

## Overview

The Email Legitimacy Checker is a full-stack application that allows users to verify the legitimacy of email addresses. It features a React frontend for user interaction and a Node.js/Express backend for processing email checks.

## Features

- Input an email address to check its legitimacy.
- Displays trust score and AI analysis of the email.
- User-friendly interface with loading and error handling.

## Project Structure

```
email-legitimacy-checker
├── client
│   ├── src
│   │   ├── components
│   │   ├── services
│   │   ├── types
│   │   └── index.tsx
│   ├── package.json
│   └── tsconfig.json
├── server
│   ├── src
│   │   ├── controllers
│   │   ├── routes
│   │   ├── services
│   │   ├── types
│   │   └── app.ts
│   ├── package.json
│   └── tsconfig.json
├── package.json
└── README.md
```

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm (Node package manager)

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/email-legitimacy-checker.git
   cd email-legitimacy-checker
   ```

2. Install dependencies for the client:
   ```
   cd client
   npm install
   ```

3. Install dependencies for the server:
   ```
   cd ../server
   npm install
   ```

### Running the Application

1. Start the backend server:
   ```
   cd server
   npm start
   ```

2. In a new terminal, start the frontend application:
   ```
   cd client
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:3000` to access the application.

## Usage

- Enter an email address in the input field and click the "Check" button.
- View the results displayed in the read-only textarea.

## Contributing

Feel free to submit issues or pull requests for improvements or bug fixes.

## License

This project is licensed under the MIT License.