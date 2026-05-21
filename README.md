# DriveFleet — Premium Car Rental Platform

**Live site:** [Add your Vercel URL after deployment](https://your-drivefleet.vercel.app)

DriveFleet is a full-stack car rental platform where users can explore vehicles, book rentals, manage listings, and authenticate securely with JWT cookies.

## Features

- **Secure authentication** — Email/password registration with validation, JWT stored in HTTP-only cookies, and Google sign-in
- **Explore & search fleet** — Browse all listings, search by car name (`$regex`), and filter by vehicle type (`$in`)
- **Book with confidence** — Modal booking flow with driver option, special notes, and automatic `booking_count` increment via MongoDB `$inc`
- **Owner dashboard** — Add, update, and delete your own car listings with confirmation modals
- **My Bookings** — View rental history with total price, linked booking dates, and trip details
- **Responsive luxury UI** — Mobile, tablet, and desktop layouts with DaisyUI, consistent branding, and custom 404 page

## Tech Stack

- **Client:** Next.js 16, React 19, Tailwind CSS 4, DaisyUI, React Toastify
- **Server:** Express, MongoDB, JWT, bcrypt, Google Auth Library
- **Deploy:** Vercel (client) + Render/Railway (API)

## Local Setup

### Server (`driveFleet-server`)

```bash
cd driveFleet-server
npm install
cp .env.example .env
# Set MONGODB_URI, JWT_SECRET, CLIENT_URL, GOOGLE_CLIENT_ID
npm run dev
```

### Client (`drivefleet`)

```bash
cd drivefleet
npm install
cp .env.example .env.local
# Set NEXT_PUBLIC_API_URL and NEXT_PUBLIC_GOOGLE_CLIENT_ID
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deployment Notes

1. Set `CLIENT_URL` on the server to your Vercel domain (e.g. `https://drivefleet.vercel.app`).
2. Set `NEXT_PUBLIC_API_URL` on Vercel to your Render API URL.
3. Use the same Google OAuth client ID on both sides; add authorized origins for production URLs.
4. Enable `credentials: true` CORS — already configured on the API.

## Assignment

CAT_05 — DriveFleet Car Rental Platform (Programming Hero)
