# 🛒 Dash-Cart

**Dash-Cart** is a full‑stack e‑commerce application with user authentication, payments, admin analytics, and a modern responsive UI.
Built to demonstrate real‑world backend + frontend integration and production deployment.

---

## 🚀 Features

### User

* User authentication (JWT + cookies)
* Browse products by category
* Add/remove items from cart
* Apply discount coupons
* Secure checkout with **Stripe (test mode)**
* Order creation handled via **Stripe Webhooks**

### Admin

* Admin dashboard
* Product & category management
* Featured products
* Analytics overview:

  * Total users
  * Products
  * Sales
  * Revenue
  * Sales & revenue graph (Recharts)

---

## 🧠 Key Technical Highlights

* **Stripe Webhooks** used to prevent duplicate orders and ensure payment reliability
* **Redis caching** for featured products & analytics
* **Race-condition–safe UI** (no stale data flashes)
* **Production-safe CORS & auth handling**
* Backend‑driven analytics aggregation

---

## 🛠 Tech Stack

### Frontend

* React (Vite)
* Zustand (state management)
* Axios
* Tailwind CSS
* Framer Motion
* Recharts

### Backend

* Node.js
* Express
* MongoDB (Mongoose)
* Redis (Upstash)
* Stripe API
* Cloudinary

### Deployment

* **Railway** (Backend)
* Stripe in **test mode**
* MongoDB Atlas

---

## 📸 Screenshots

<img width="1366" height="768" alt="image" src="https://github.com/user-attachments/assets/4aa2ab2a-c34b-492b-bce2-7e63db4210ea" />
<img width="1366" height="768" alt="image" src="https://github.com/user-attachments/assets/e0697b0a-6f67-43bb-a4c9-1cd3289fc548" />
<img width="1366" height="768" alt="image" src="https://github.com/user-attachments/assets/d8737336-e61b-430a-94a1-e6352e42a2d6" />
<img width="1366" height="768" alt="image" src="https://github.com/user-attachments/assets/ccc99138-d6d2-4b1c-9feb-389a913626df" />
<img width="1366" height="768" alt="image" src="https://github.com/user-attachments/assets/df89a9e2-f955-479c-bda6-76546fc98bcd" />

---

## ⚙️ Environment Variables

Create a `.env` file in the root:

```env
PORT=5000
MONGO_URI=your_mongo_uri
UPSTASH_REDIS_URL=your_redis_url

CLOUDINARY_CLOUD_NAME=xxx
CLOUDINARY_API_KEY=xxx
CLOUDINARY_API_SECRET=xxx

STRIPE_SECRET_KEY=sk_test_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx

ACCESS_TOKEN_SECRET=xxx
REFRESH_TOKEN_SECRET=xxx

CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

---

## ▶️ Running Locally

```bash
# backend
npm install
npm run dev

# frontend
cd frontend
npm install
npm run dev
```

Frontend runs on `http://localhost:5173`
Backend runs on `http://localhost:5000`

---

## 🧪 Payments Note

All Stripe payments run in **test mode**.
No real transactions are processed.

---

## 📦 Deployment Notes

* Backend deployed on Railway
* Frontend served via production build
* Stripe webhooks configured for production environment
* CORS configured for both development and production origins

---

## 👤 Author

Built by **JATIN KUMAR**
Full‑stack project focused on production‑ready architecture.
