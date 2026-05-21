"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { toast } from "react-toastify";
import PrivateRoute from "@/Components/PrivateRoute";
import { API_URL } from "@/lib/api";

function MyBookingsContent() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/bookings/my`, { credentials: "include" })
      .then((r) => r.json())
      .then(setBookings)
      .catch(() => toast.error("Failed to load bookings"))
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="max-w-5xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold tracking-tight">
        My <span className="text-primary">Bookings</span>
      </h1>
      <p className="text-sm text-base-content/50 mt-1 mb-8">
        Track your rental history and trip details
      </p>

      {loading && (
        <div className="flex justify-center py-24">
          <span className="loading loading-spinner loading-lg text-primary" />
        </div>
      )}

      {!loading && bookings.length === 0 && (
        <div className="text-center py-20 text-base-content/50">
          <p className="mb-3.5">No bookings yet.</p>
          <Link href="/cars" className="btn btn-primary btn-sm">
            Explore Cars
          </Link>
        </div>
      )}

      {!loading && bookings.length > 0 && (
        <div className="space-y-4">
          {bookings.map((b, i) => (
            <div
              key={b._id || i}
              className="card bg-base-100 border border-base-200 shadow-md"
            >
              <div className="card-body flex flex-col sm:flex-row gap-4">
                {b.carImage && (
                  <div className="relative w-full sm:w-32 h-24 shrink-0 rounded-lg overflow-hidden bg-base-200">
                    <Image
                      src={b.carImage}
                      alt={b.carName}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="flex-1">
                  <h2 className="card-title text-lg">{b.carName}</h2>
                  <p className="text-primary font-bold">
                    Total: ৳{Number(b.totalPrice).toLocaleString()}
                  </p>
                  <p className="text-sm text-base-content/60 mt-1">
                    Booking date:{" "}
                    <a
                      href={`https://www.google.com/search?q=${encodeURIComponent(new Date(b.bookingDate).toDateString())}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link link-primary"
                    >
                      {new Date(b.bookingDate).toDateString()}
                    </a>
                  </p>
                  <div className="flex flex-wrap gap-3 text-xs text-base-content/50 mt-2">
                    <span>Driver: {b.driverNeeded}</span>
                    {b.pickupDate && <span>Pickup: {b.pickupDate}</span>}
                    {b.returnDate && <span>Return: {b.returnDate}</span>}
                    <span className="badge badge-sm">{b.status}</span>
                  </div>
                  {b.specialNote && (
                    <p className="text-xs mt-2 italic text-base-content/40">
                      Note: {b.specialNote}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}

export default function MyBookingsPage() {
  return (
    <PrivateRoute>
      <MyBookingsContent />
    </PrivateRoute>
  );
}
