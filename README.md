# REEZ Wear 👕👟

**Modern Men's Fashion E-commerce Platform**

A full-stack men's fashion e-commerce platform built with Next.js and Node.js. It features a sleek, minimalist UI, secure authentication, and a robust admin dashboard for managing store operations.

---

## 🌐 Live Site

🔗 [https://reez-wear.vercel.app](https://reez-wear.vercel.app)

## 🔐 Test Credentials

| Role  | Email              | Password    |
|-------|---------------------|-------------|
| Demo  | demo@reez.com        | Demo@1234   |
| Admin | admin1@gmail.com     | 12345678    |
| User  | kaka@gmail.com        | 12345678    |

## 📁 Repositories

| Link   | Repository |
|--------|------------|
| Client | [REEZ_WEAR_CLIENT](https://github.com/JOBAYER07-dev/REEZ_WEAR_CLIENT) |
| Server | [REEZ_WEAR_SERVER](https://github.com/JOBAYER07-dev/REEZ_WEAR_SERVER) |

---

## ✨ Key Features

### 👤 User
- Register & login with Email/Password or Google OAuth
- Browse products with category filters and price range sliders
- Search products with real-time suggestions
- Add items to the cart and view order history
- Track order status from the dashboard
- Interactive UI with custom cursor and smooth scrolling

### 🛡️ Admin
- **Full Product Management:** Add, edit, and delete products
- **Order Oversight:** View all customer orders and confirm pending ones
- **User Management:** View all registered users and manage role assignments (User/Admin)
- **Analytics Dashboard:** Visual store performance insights using Recharts

### 🌟 General
- Role-based access control (RBAC)
- Secure JWT/Better Auth-protected API routes
- Fully responsive (mobile, tablet, desktop)
- Custom modals for confirmations and role changes
- Loading spinners and toast notifications
- Professional UI with Tailwind CSS

---

## 🛠️ Tech Stack

### Frontend

| Package        | Purpose                        |
|-----------------|---------------------------------|
| `next`          | React framework (App Router)   |
| `typescript`    | Type safety                    |
| `tailwindcss`   | Utility-first CSS               |
| `recharts`      | Performance analytics          |
| `lucide-react`  | Icons                          |
| `sonner`        | Toast notifications            |
| `better-auth`   | Authentication                 |

### Backend

| Package    | Purpose                  |
|-------------|----------------------------|
| `express`   | Web framework             |
| `mongodb`   | Database driver           |
| `better-auth` | Auth implementation     |
| `cors`      | Cross-origin requests     |
| `dotenv`    | Environment variables     |

---

## 🚀 Local Setup

### Client

```bash
git clone https://github.com/JOBAYER07-dev/REEZ_WEAR_CLIENT
cd REEZ_WEAR_CLIENT
npm install
```

Create `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:5000
NEXT_PUBLIC_CLIENT_URL=http://localhost:3000
```

```bash
npm run dev
```

### Server

```bash
git clone https://github.com/JOBAYER07-dev/REEZ_WEAR_SERVER
cd REEZ_WEAR_SERVER
npm install
```

Create `.env`:

```env
PORT=5000
MONGODB_URI=your_mongodb_uri
BETTER_AUTH_SECRET=your_secret_key
BETTER_AUTH_URL=http://localhost:5000
CLIENT_URL=http://localhost:3000
GOOGLE_CLIENT_ID=your_google_id
GOOGLE_CLIENT_SECRET=your_google_secret
```

```bash
npm run dev
```

---

## 🌍 Deployment

| Service   | Platform       |
|-----------|----------------|
| Frontend  | Vercel         |
| Backend   | Render         |
| Database  | MongoDB Atlas  |

---

© 2026 REEZ Wear. All rights reserved.