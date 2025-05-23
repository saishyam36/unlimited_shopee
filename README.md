# Unlimited Shopee - E-commerce Platform

This project is a fully functional e-commerce platform built with a modern tech stack. It includes a customer-facing website for browsing and purchasing products, an admin dashboard for managing inventory and orders, a robust backend API, secure payment integration and seamless interaction between server and client for live notifications.

## Table of Contents

* [Overview](#overview)
* [Key Features](#key-features)
* [Technologies Used](#technologies-used)
* [Project Structure](#project-structure)
* [Deployment](#deployment)
* [Application URLs](#urls)
* [Setup Instructions](#setup-instructions)
    * [Backend Setup](#backend-setup)
    * [Frontend Setup](#frontend-setup)
    * [Admin Setup](#admin-setup)
* [Environment Variables](#environment-variables)
* [Database Setup](#database-setup)
* [Image Storage](#image-storage)
* [Payment Integration](#payment-integration)

## Overview

Unlimited Shopee offers a streamlined e-commerce experience, empowering customers to effortlessly browse products, manage their cart, and complete secure purchases. Simultaneously, a dedicated administrative interface provides store owners with robust tools for efficient product catalog management, comprehensive order tracking, and insightful oversight of the platform's operations, ensuring a seamless experience for both buyers and sellers.
Stay tuned for live notifications that will keep customers instantly informed about updates to their order status. This ensures a seamless and real-time experience for both buyers and sellers.

## Key Features

**Customer Website:**

* Product browsing with detailed descriptions and images.
* User authentication (registration and login).
* Shopping cart functionality.
* Secure checkout process via Stripe.
* Multiple navigation of pages.
* Related products of the category and sub-category
* Order history for registered users.
* Responsive design for various screen sizes.
* Live notifications and status updates of the order.

**Admin Dashboard:**

* Product management.
* Order management.
* Intuitive and user-friendly interface.

**Backend API:**

* RESTful API endpoints for all core functionalities.
* Secure authentication and authorization(JWT and bcrypt).
* Data persistence using MongoDB.
* Image handling via Cloudinary.
* Integration with Stripe for payment processing.
* The use of Server-Sent Events (SSE) ensures a persistent, one-way connection from the backend to the frontend, enabling the server to efficiently push real-time information and updates to the client.

## Technologies Used

**Frontend (Customer Website & Admin Dashboard):**

* [React](https://react.dev/) - A JavaScript library for building user interfaces.
* [React Router](https://reactrouter.com/) - For client-side routing.
* [Ant Design](https://ant.design/) - For UI components.
* [Context API](https://react.dev/learn/passing-data-deeply-with-context) - For state management
* [Axios](https://axios-http.com/) - For making HTTP requests.
* [Tailwind CSS](https://tailwindcss.com/) - For styling

**Backend API:**

* [Node.js](https://nodejs.org/en/) - JavaScript runtime environment.
* [Express.js](https://expressjs.com/) - A fast, unopinionated, minimalist web framework for Node.js.
* [MongoDB](https://www.mongodb.com/) - NoSQL database.
* [Mongoose](https://mongoosejs.com/) - MongoDB object modeling for Node.js.
* [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) - For creating and verifying JWTs for authentication.
* [bcrypt](https://www.npmjs.com/package/bcrypt) - For password hashing.
* [cors](https://www.npmjs.com/package/cors) - For enabling Cross-Origin Resource Sharing.
* [Server-Sent Events](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events) - A lightweight, standards-based approach for the backend to push real-time updates to the frontend over a persistent HTTP connection.

**Other Services:**

* [Vercel](https://vercel.com/) - For frontend and backend deployment.
* [Cloudinary](https://cloudinary.com/) - For cloud-based image management.
* [Stripe](https://stripe.com/) - For secure payment processing.

## Project Structure
```
├── backend/ 
│   ├── config/        # Configuration files (e.g., database config)
│   ├── controllers/   # Handles application logic for routes
│   ├── middleware/    # Functions that intercept requests before they reach routes
│   ├── models/        # Defines the structure of data in MongoDB
│   ├── routes/        # Defines the application's endpoints (URLs)
│   ├── .env           # Stores environment variables (e.g., database connection string, API keys)
│   ├── .gitignore     # Specifies intentionally untracked files that Git should ignore
│   ├── package-lock.json # Records the exact versions of dependencies
│   ├── package.json     # Lists project dependencies and scripts
│   ├── server.js      # Entry point for the backend application
│   └── vercel.json    # Configuration file for Vercel deployment
├── frontend/ (Customer Website)
│   ├── public/        # Static assets (e.g., HTML, images)
│   ├── src/           # React application source code
│   │   ├── assets/    # Static assets (images, fonts, etc.)
│   │   ├── components/ # Reusable UI components
│   │   ├── context/     # React Context for state management
│   │   ├── pages/       # Different pages of the application
│   │   ├── styles/      # CSS files (including global styles)
│   │   ├── utils/       # Utility functions
│   │   ├── App.jsx      # Main application file
│   │   ├── index.css    # Global CSS styles
│   │   └── main.jsx     # Entry point for the React application
│   ├── .env           # Stores environment variables
│   ├── .gitignore     # Specifies intentionally untracked files that Git should ignore
│   ├── eslint.config.js# Configuration file for ESLint
│   ├── index.html     # Main HTML file
│   ├── package-lock.json# Records the exact versions of dependencies
│   ├── package.json     # Lists project dependencies and scripts
│   ├── postcss.config.js# Configuration file for PostCSS
│   ├── README.md        # Project documentation
│   ├── tailwind.config.js# Configuration file for Tailwind CSS
│   ├── vercel.json      # Configuration file for Vercel deployment
│   └── vite.config.js   # Configuration file for Vite build tool
└── admin/ (Admin Dashboard)
├── public/        # Static assets (e.g., HTML, images)
├── src/           # React application source code
│   │   ├── assets/    # Static assets (images, fonts, etc.)
│   │   ├── components/ # Reusable UI components
│   │   ├── pages/       # Different pages of the application
│   │   ├── styles/      # CSS files (including global styles)
│   │   ├── utils/       # Utility functions
│   │   ├── App.jsx      # Main application file
│   │   ├── App.css      # Component-specific CSS styles
│   │   ├── index.css    # Global CSS styles
│   │   └── main.jsx     # Entry point for the React application.
│   ├── .env           # Stores environment variables
│   ├── .gitignore     # Specifies intentionally untracked files that Git should ignore
│   ├── eslint.config.js# Configuration file for ESLint
│   ├── index.html     # Main HTML file
│   ├── package-lock.json# Records the exact versions of dependencies
│   ├── package.json     # Lists project dependencies and scripts
│   ├── postcss.config.js# Configuration file for PostCSS
│   ├── README.md        # Project documentation
│   ├── tailwind.config.js# Configuration file for Tailwind CSS
│   ├── vercel.json      # Configuration file for Vercel deployment
│   └── vite.config.js   # Configuration file for Vite build tool
```
## Deployment

This project's frontend (both customer website and admin dashboard) and backend are deployed on [Vercel](https://vercel.com/). Vercel provides automatic deployments from Git repositories, making the deployment process seamless.

## URLs

1. Customer Website: https://unlimited-shopee-frontend.vercel.app/
2. Admin Dashboard: https://unlimited-shopee-admin.vercel.app/
3. Backend API: https://unlimited-shopee.vercel.app/ 
(While not directly accessed by users, this is the base URL for API calls from the frontends)

## Setup Instructions

To run this project locally for development, follow these steps:

### Backend Setup

1.  Navigate to the `backend` directory:

    ```bash
    cd backend
    ```
2.  Install dependencies:

    ```bash
    npm install
    ```
3.  Create a `.env` file in the `backend` directory and configure the environment variables (see [Environment Variables](#environment-variables) section).
4.  Start the backend server:

    ```bash
    npm run server
    ```

    (Assuming you have a `dev` script in your `package.json` that uses `nodemon` or a similar tool).

### Frontend Setup 
   (Customer Website)

1.  Navigate to the `frontend` directory:

    ```bash
    cd frontend
    ```
2.  Install dependencies:

    ```bash
    npm install
    ```
3.  Create a `.env.local` file in the `frontend` directory and configure any frontend-specific environment variables (e.g., API base URL).
4.  Start the frontend development server:

    ```bash
    npm run dev
    ```

    This will usually open the application in your browser at `http://localhost:3000`.

### Admin Setup

1.  Navigate to the `admin` directory:

    ```bash
    cd admin
    ```
2.  Install dependencies:

    ```bash
    npm install
    ```
3.  Create a `.env.local` file in the `admin` directory and configure any admin-specific environment variables (e.g., API base URL).
4.  Start the admin development server:

    ```bash
    npm run dev
    ```

    This will usually open the application in your browser at a different port (e.g., `http://localhost:3001`).

## Environment Variables

You will need to configure the following environment variables. Create a `.env` file in your `backend` directory and `.env.local` files in your `frontend` and `admin` directories.

**Backend (.env):**
```
MONGODB_URI=[Your MongoDB Connection String]
JWT_SECRET=[Your Secret Key for JWT]
CLOUDINARY_NAME=[Your Cloudinary Cloud Name]
CLOUDINARY_API_KEY=[Your Cloudinary API Key]
CLOUDINARY_API_SECRET=[Your Cloudinary API Secret]
STRIPE_SECRET_KEY=[Your Stripe Secret Key]
JWT_EXPIRY=[Add Expiry date]
ADMIN_EMAIL=[]
ADMIN_PASSWORD=[]
```

**Frontend (.env.local) & Admin (.env.local):**

REACT_APP_API_BASE_URL=[Your Deployed Backend URL on Vercel]/api (or your local backend URL during development)
**Note:** For security reasons, never commit your `.env` or `.env.local` files to your version control system. Add them to your `.gitignore` file.

## Database Setup

This project uses MongoDB as its database.

1.  **Install MongoDB:** If you haven't already, install MongoDB on your local machine or set up a MongoDB Atlas cluster.
2.  **Connection String:** Obtain your MongoDB connection string. This will be used in the `MONGODB_URI` environment variable in your backend `.env` file.

## Image Storage

This project utilizes Cloudinary for storing and managing product images.

1.  **Sign up for Cloudinary:** Create an account on [Cloudinary](https://cloudinary.com/).
2.  **API Credentials:** Obtain your Cloud Name, API Key, and API Secret from your Cloudinary dashboard. These will be used in the backend `.env` file.

## Payment Integration

This project integrates with Stripe for handling payments.

1.  **Sign up for Stripe:** Create an account on [Stripe](https://stripe.com/).
2.  **API Keys:** Obtain your Secret Key and Publishable Key from your Stripe dashboard. The Secret Key will be used in the backend `.env` file (`STRIPE_SECRET_KEY`), and the Publishable Key will be used in the frontend `.env.local` file (`REACT_APP_STRIPE_PUBLISHABLE_KEY`).
3.  Use Stripe test cards for payments using cards.
