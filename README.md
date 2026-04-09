# 📋 Paste App — Backend API

A lightweight, anonymous-first **paste and code snippet sharing** REST API built with Node.js, Express, and MongoDB. No account required — every visitor gets a unique identity automatically, and can create, manage, and delete their pastes instantly.

---

## ✨ Features

- **Zero-friction usage** — visitors can create and manage pastes without signing up
- **Anonymous user tracking** via auto-assigned cookies (UUID-based)
- **Full CRUD** for pastes — create, read, update, and soft-delete
- **Code & text support** — pastes can be plain text or code snippets with language tagging
- **Soft deletion** — pastes are deactivated, not permanently removed
- **Optional accounts** — supports username, email, and hashed password for registered users
- **CORS-ready** — configured for both local development and production frontend

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Runtime** | Node.js |
| **Framework** | Express.js |
| **Database** | MongoDB Atlas (via Mongoose) |
| **Auth / Identity** | Cookie-based anonymous ID (UUID) |
| **Dev Server** | Nodemon |

---

## 📁 Project Structure

```
paste-app/
├── index.js                    # Entry point — server setup
├── package.json
├── .env                        # Environment variables (never commit)
├── .gitignore
│
├── config/
│   └── db.js                   # MongoDB connection
│
├── models/
│   ├── user.model.js           # User schema (anon + registered)
│   └── paste.model.js          # Paste schema
│
├── controllers/
│   ├── user.controller.js      # User creation & lookup logic
│   └── paste.controller.js     # Paste CRUD logic
│
├── middleware/
│   └── anonUser.middleware.js  # Anonymous user ID assignment
│
└── Routers/
    ├── user.routes.js          # User API routes
    └── paste.routes.js         # Paste API routes
```

---

## 🔁 How It Works

### Anonymous User Flow
```
Incoming Request
      ↓
anonUser.middleware.js
      ↓
Does request have an anonId cookie?
      ↓                    ↓
    YES                    NO
      ↓                    ↓
Use existing         Generate new UUID
  anonId          → Set as cookie
      ↓                    ↓
      └──── req.anonId available ────┘
                    ↓
          Controller handles request
```

Every visitor — whether registered or not — gets a unique `anonId` cookie on their first visit. This ID links them to all their pastes, so they can manage content without ever creating an account.

---

## 📡 API Endpoints

### User Routes — `/user`

| Method | Endpoint | Description |
|---|---|---|
| POST | `/user` | Create a new user |
| GET | `/user/:anonId` | Get user by their anonymous ID |

### Paste Routes — `/paste`

| Method | Endpoint | Description |
|---|---|---|
| POST | `/paste` | Create a new paste |
| GET | `/paste` | Get all pastes for the current user |
| GET | `/paste/:pasteId` | Get a specific paste by ID |
| PUT | `/paste/:pasteId` | Update a paste |
| DELETE | `/paste/:pasteId` | Soft-delete a paste |

---

## 🗄️ Data Models

### User
```js
{
  anonId:    String,   // UUID — assigned to every visitor
  username:  String,   // Optional (registered users)
  email:     String,   // Optional
  password:  String,   // Hashed, optional
  verified:  Boolean,
  active:    Boolean
}
```

### Paste
```js
{
  anonId:    String,   // Links paste to a user
  title:     String,
  content:   String,
  type:      String,   // "text" or "code"
  language:  String,   // e.g. "javascript", "python"
  isActive:  Boolean   // false = soft deleted
}
```

---

## ⚙️ Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- A [MongoDB Atlas](https://www.mongodb.com/atlas) account and cluster

### 1. Clone the repository
```bash
git clone https://github.com/lubaid-01/paste-backen.git
cd paste-app
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file in the root directory:

```env
MONGO_URI=your_mongodb_atlas_connection_string
VERSEL_APP=https://your-frontend-url.vercel.app
```

> ⚠️ Never commit your `.env` file. It is already listed in `.gitignore`.

### 4. Start the development server
```bash
npm run dev
```

The server will start with **nodemon**, which auto-reloads on any file changes.

### 5. For production
```bash
npm start
```

---

## 🔐 Security Notes

- `.env` is excluded from version control via `.gitignore`
- Passwords are stored **hashed** (never in plaintext)
- CORS is restricted to URLs defined in `.env` and `localhost` — all other origins are blocked
- Anonymous IDs are generated server-side using UUID — clients cannot spoof other users' IDs

---

## 🧠 Key Concepts Explained

### Anonymous Users
Every request passes through `anonUser.middleware.js`. If the visitor has no `anonId` cookie, a new UUID is generated and set. This means anyone can start creating pastes immediately — no signup, no friction. If they later register, the same `anonId` links their history to their account.

### Soft Deletion
When a paste is "deleted", it is not removed from the database. Instead, its `isActive` field is set to `false`. This makes accidental deletions recoverable and keeps a full history for debugging or auditing.

### CORS Configuration
Only the frontend URLs defined in `VERSEL_APP` and `localhost` are whitelisted. This prevents unauthorized domains from making API requests.

---

## 📦 Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start server with nodemon (development) |
| `npm start` | Start server normally (production) |

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m "Add your feature"`
4. Push and open a Pull Request

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

> Built with Node.js, Express, and MongoDB. No login required to get started.
