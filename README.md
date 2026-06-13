# 🛒 Full-Stack E-Commerce Platform

A production-ready e-commerce web application built with React, Node.js, and MongoDB — featuring real payment processing, role-based authentication, and a fully functional admin dashboard.

🔗 **Live Demo:** [e-commerce-u97s.onrender.com](https://e-commerce-u97s.onrender.com)
📂 **GitHub:** [github.com/Haneefah55/E-commerce-](https://github.com/Haneefah55/E-commerce-.git)

---

## 📸 Screenshots

> _Add screenshots of your homepage, product page, cart, and admin dashboard here_

---

## ✨ Features

### 🛍️ Customer Side
- Browse and search products with filtering and sorting
- Add to cart and checkout with **Paystack payment integration** (live Nigerian payment processing)
- Secure user registration and login with JWT authentication
- View order history and account details

### 🔐 Admin Side
- Protected admin dashboard with role-based access control (RBAC)
- Add, edit, and delete products with image uploads via **Cloudinary**
- View and manage all customer orders
- Real-time inventory management

### ⚙️ Technical Highlights
- Redis caching for fast API response times
- REST API architecture with Express.js
- JWT-based session management with secure HTTP-only cookies
- Environment-based configuration for production deployment
- Deployed on **Render** with CI/CD from GitHub

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React.js, Tailwind CSS, Zustand |
| Backend | Node.js, Express.js, REST API |
| Database | MongoDB |
| Caching | Redis |
| Auth | JWT, Role-Based Access Control |
| Payments | Paystack API |
| Media | Cloudinary |
| Deployment | Render, GitHub |

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:
- [Node.js](https://nodejs.org/) (v18 or higher)
- [MongoDB](https://www.mongodb.com/) (local or Atlas)
- [Redis](https://redis.io/) (local or Redis Cloud)

### 1. Clone the Repository

```bash
git clone https://github.com/Haneefah55/E-commerce-.git
cd E-commerce-
```

### 2. Install Dependencies

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the `/backend` directory:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
REDIS_URL=your_redis_url

JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d

PAYSTACK_SECRET_KEY=your_paystack_secret_key

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

NODE_ENV=development
```

Create a `.env` file in the `/frontend` directory:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

### 4. Run the App

```bash
# Start backend (from /backend)
npm run dev

# Start frontend (from /frontend)
npm run dev
```

The app will be running at `http://localhost:5173`

---

## 📁 Project Structure

```
E-commerce/
├── backend/
│   ├── controllers/        # Route logic
│   ├── middleware/         # Auth & error middleware
│   ├── models/             # MongoDB schemas
│   ├── routes/             # API routes
│   ├── lib/                # Redis, Cloudinary config
│   └── server.js           # Entry point
│
├── frontend/
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Route pages
│   │   ├── store/          # Zustand state management
│   │   └── main.jsx        # App entry point
│   └── index.html
│
└── README.md
```

---

## 🔑 API Endpoints

### Auth
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login user |
| POST | `/api/auth/logout` | Logout user |

### Products
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/products` | Get all products |
| GET | `/api/products/:id` | Get single product |
| POST | `/api/products` | Create product (Admin) |
| PUT | `/api/products/:id` | Update product (Admin) |
| DELETE | `/api/products/:id` | Delete product (Admin) |

### Orders
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/orders` | Create order |
| GET | `/api/orders/my-orders` | Get user orders |
| GET | `/api/orders` | Get all orders (Admin) |

### Payments
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/payments/initialize` | Initialize Paystack payment |
| GET | `/api/payments/verify/:ref` | Verify payment |

---

## 🌍 Deployment

This app is deployed on **Render**.

To deploy your own instance:
1. Push your code to GitHub
2. Create a new **Web Service** on [render.com](https://render.com)
3. Connect your GitHub repository
4. Set all environment variables in the Render dashboard
5. Deploy — Render handles the rest automatically

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m 'Add your feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a Pull Request

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 👤 Author

**Olasupo Haneefah Omotayo**

- Portfolio: [haneefah55.vercel.app](https://haneefah55.vercel.app)
- GitHub: [@Haneefah55](https://github.com/Haneefah55)
- LinkedIn: [olasupo-haneefah](https://www.linkedin.com/in/olasupo-haneefah-5259b7a3)
- Email: olasupoomotayo@gmail.com

---

⭐ **If you found this project helpful, please give it a star!**
