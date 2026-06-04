# SEA Catering - Backend API

The backend RESTful API server for **SEA Catering**. Built on top of **Node.js** using the **Express.js** framework, this application securely handles authentication, database persistence, business rules, and order processing workflows.

## 🚀 Tech Stack & Core Libraries

* **Runtime Environment:** [Node.js](https://nodejs.org/) (Asynchronous event-driven JavaScript runtime)
* **Web Framework:** [Express.js](https://expressjs.com/) (Minimalist and flexible web framework for building APIs)
* **Database :**  [MySQL](https://www.mysql.com/) 
* **Authentication & Security:**
    * [JSON Web Tokens (JWT)](https://jwt.io/) – Secure, stateless session tokens
    * [bcryptjs](https://www.npmjs.com/package/bcryptjs) – Password hashing and encryption
    * [Helmet](https://helmetjs.github.io/) – Secures HTTP headers against common vulnerabilities
    * [CORS](https://www.npmjs.com/package/cors) – Configured to allow secure cross-origin requests from the Vite frontend
* **Utilities & Logging:**
    * [dotenv](https://www.npmjs.com/package/dotenv) – Zero-dependency module that loads environment variables
    * [Nodemon](https://nodemon.io/) – Automatically restarts the server during development on file changes

---

## 📋 Prerequisites

Before setting up the API, make sure you have:
* **Node.js** (v18.x or v20.x)
* **Database connection instance** (e.g., mysql2, MongoDB Atlas string or a local database instance running)

---

## 🛠️ Installation & Setup

1.  **Clone the Repository:**
    ```bash
    git clone [https://github.com/ahmadhilmandani/be-sea-catering.git](https://github.com/ahmadhilmandani/be-sea-catering.git)
    cd be-sea-catering
    ```

2.  **Install Dependencies:**
    ```bash
    npm install
    ```

3.  **Configure Environment Variables:**
    Duplicate the environment variable file and complete your local credentials:
    ```bash
    cp .env.example .env
    ```
    Open `.env` and fill in your local port, secret keys, and database URI.

4.  **Run the Server:**

    * **Development Mode (With auto-reload via Nodemon):**
        ```bash
        npm run dev
        ```
    * **Production Mode:**
        ```bash
        npm start
        ```
    The server will typically spin up at [http://localhost:3000](http://localhost:3000).

---

## 🔑 Environment Variables

Create a `.env` file in the root directory with the following structure:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Security & CORS Setup
# Match this to your Vite frontend URL to prevent CORS violations
CORS_ORIGIN=http://localhost:5173

# Database Configuration
# Swap out with your actual MongoDB connection URI or DB URL
DATABASE_URL=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/sea_catering?retryWrites=true&w=majority

# Authentication Secrets
JWT_SECRET=your_super_secret_jwt_sign_key_change_in_production
JWT_EXPIRES_IN=7d
