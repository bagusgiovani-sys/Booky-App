# 📚 Library App

🌐 **Live Demo:** [booky-app-by-gio.vercel.app](https://booky-app-by-gio.vercel.app/)

A modern library management system built with React + TypeScript + Vite. Supports two user roles — **Member** and **Admin** — each with their own dashboard and capabilities.

---

## ✨ Features

### 👤 Member
- Browse available books
- Borrow & return books
- View personal borrowing history & due dates

### 🛠️ Admin
- View all registered members
- Monitor all borrowed books
- Track book statuses — returned, overdue, or still out

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repo
git clone <your-repo-url>
cd library-app

# Install dependencies
npm install

# Start dev server
npm run dev
```

App runs at **http://localhost:8080**

---

## 📜 Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Type-check & build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

---

## 🧱 Tech Stack

| Category | Library |
|---|---|
| Framework | React 19 + TypeScript |
| Build Tool | Vite 7 |
| Styling | Tailwind CSS v4 |
| UI Components | shadcn/ui + Radix UI |
| State Management | Redux Toolkit |
| Server State | TanStack React Query |
| Routing | React Router v7 |
| Forms | React Hook Form + Zod |
| HTTP | Axios |
| Animations | Framer Motion |
| Date Handling | Day.js |
| Notifications | Sonner |

---

## 🗂️ Project Structure

```
src/
├── components/       # Reusable UI components
├── features/         # Feature modules (auth, books, admin, member)
├── pages/            # Route-level pages
├── store/            # Redux store & slices
├── hooks/            # Custom React hooks
├── lib/              # Utilities & helpers
└── types/            # Global TypeScript types
```

---

## 🔐 Demo Accounts

| Role | Email | Password |
|---|---|---|
| Member | user@library.com | password |
| Admin | admin@library.com | password |

> Update these once you wire up your backend.