DriveFleet is a production-grade, full-stack car rental application offering seamless vehicle discovery, modern scheduling systems, and interactive fleet management dashboards. Architected with an elegant UI, it secures user data using industry-standard JWT authentication lifecycle patterns.

## ✨ Features Blueprint

### 🔐 Ironclad Security & Authentication
* **HTTP-Only Cookies:** Hybrid authorization using stateless JSON Web Tokens (JWT) mapped securely inside HTTP-only cookies to eliminate XSS vulnerability vectors.
* **Social Integration:** Single-tap Google Sign-In pipeline powered by official `google-auth-library` handshakes.
* **Data Privacy:** Local profile records are encrypted natively on creation via `bcrypt` hashing rounds.

### 🔍 Fleet Intelligence Engine
* **Contextual Search:** Instant matching engines filtering listings natively via text parameters utilizing database-side MongoDB `$regex` tokens.
* **Multi-Criteria Queries:** Dynamic categorization matrices filtering options down to custom type arrays leveraging optimized `$in` logical expressions.
* **Live Counters:** High-concurrency booking metrics using sequential transactional updates via MongoDB atomic `$inc` operators.

### 👔 Executive Portfolios & Dashboards
* **Vehicle Studio:** Dedicated client workspace designed to register, modify, or eliminate listings safely via secondary confirmation modal guards.
* **Reservation Ledgers:** Historical logging tables detailing aggregated rental metrics, linked transactional calendars, and localized trip breakdowns.
* **Modern Luxury UI:** High-fidelity presentation layers crafted using Tailwind CSS 4 and DaisyUI semantic token themes featuring responsive layouts and a custom 404 router fall-through.

---

## 🛠️ Architecture & Tech Stack

```mermaid
graph LR
    A[Next.js Client via Vercel] <-->|HTTPS / Credentials HTTP-Only| B[Express.js Server via Render]
    B <-->|Mongoose Driver Driver| C[MongoDB Atlas Cloud]
    A <-->|OAuth Handshake| D[Google Auth API]