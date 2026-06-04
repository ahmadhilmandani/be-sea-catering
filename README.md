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

## 🗄️ Database Schema Overview

The application uses a MySQL relational database consisting of several interconnected tables to manage users, meal orders, subscriptions, food menus, and delivery schedules.

### Main Entities

#### Users

Stores customer and administrator accounts.

| Column       | Description              |
| ------------ | ------------------------ |
| id_user      | Primary key              |
| name         | User full name           |
| email        | Unique email address     |
| password     | Hashed password          |
| phone_number | Contact number           |
| address      | User address             |
| alergies     | Food allergy information |
| is_admin     | Admin flag               |

---

#### Diet Types

Defines subscription meal plans available for customers.

Available plans:

* Balance Diet Plan
* Low Calorie Diet Plan
* High Protein Diet Plan
* Royal Diet Plan

Each plan contains:

* Name
* Description
* Price per meal

---

#### Food Menu

Stores available meals offered by SEA Catering.

Each menu item belongs to a diet type and contains:

* Menu name
* Price
* Description
* Recommended target customers

Relationship:

```text
Diet Type (1) ──── (N) Food Menu
```

---

#### Nutrition Information

Stores nutritional values for each menu item.

Supported nutrition categories:

* Protein
* Calories
* Fat
* Sugar
* Carbohydrates
* Fiber

Relationship:

```text
Food Menu (1) ──── (N) Nutritions
```

---

#### Meal Types

Defines meal delivery categories.

Available meal types:

| Meal Type | Delivery Time     |
| --------- | ----------------- |
| Breakfast | 05:30 - 08:00 WIB |
| Lunch     | 11:30 - 13:45 WIB |
| Dinner    | 18:00 - 21:00 WIB |

---

### Order Management

#### Order Meal

Represents one-time meal orders made by users.

Stores:

* Customer information
* Delivery address
* Selected menu
* Meal type
* Delivery date
* Delivery status

Relationship:

```text
User (1) ──── (N) Order Meal
Food Menu (1) ──── (N) Order Meal
Meal Type (1) ──── (N) Order Meal
```

---

### Subscription Management

#### Subscriptions

Stores recurring meal subscription plans purchased by users.

Subscription statuses:

* pending
* active
* canceled

Each subscription belongs to:

* One user
* One diet plan

Relationship:

```text
User (1) ──── (N) Subscriptions
Diet Type (1) ──── (N) Subscriptions
```

---

#### Subscription Details

Stores meal schedules included in a subscription.

Each record references:

* Subscription
* Food Menu
* Meal Type

Relationship:

```text
Subscription (1) ──── (N) Subscription Details
```

---

#### Delivery Days

Stores available delivery days.

Supported values:

* Monday
* Tuesday
* Wednesday
* Thursday
* Friday
* Saturday
* Sunday

---

#### Subscription Delivery Days

Bridge table used to associate subscriptions with selected delivery days.

Relationship:

```text
Subscriptions (N) ──── (N) Delivery Days
```

Implemented through:

```text
subs_delivery_days
```

---

### Testimonials

Stores customer reviews and ratings.

Contains:

* Customer name
* Address
* Testimonial message
* Star rating

Used for displaying customer feedback on the frontend.

---

### Entity Relationship Summary

```text
Users
 ├── Order Meal
 └── Subscriptions
       ├── Subscription Details
       │      ├── Food Menu
       │      └── Meal Type
       └── Subscription Delivery Days
               └── Delivery Days

Diet Type
 ├── Food Menu
 └── Subscriptions

Food Menu
 └── Nutritions

Testimonials
```

### Soft Delete Strategy

Most tables implement a soft delete mechanism using:

```sql
is_delete TINYINT(1) DEFAULT 0
```

Values:

* 0 = Active record
* 1 = Deleted record

This allows records to be hidden from application queries without permanently removing data from the database.


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
