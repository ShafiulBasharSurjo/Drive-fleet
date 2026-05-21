"use client";

import Image from "next/image";
import Link from "next/link";
import { BookingModal } from "@/Components/BookingModal";
import { IoCalendarOutline, IoLocationOutline } from "react-icons/io5";
import { MdOutlineVerified } from "react-icons/md";
import { TbManualGearbox } from "react-icons/tb";

export default function CarDetailsClient({ car }) {
  const price = car.dailyRentPrice ?? car.pricePerDay;
  const type = car.carType || car.category;
  const location = car.pickupLocation || car.location;
  const available = car.availability !== "unavailable";

  return (
    <main className="max-w-4xl mx-auto px-6 py-11">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-9 items-start">
        <div className="rounded-2xl overflow-hidden border border-base-200 shadow-sm">
          <div className="relative w-full h-72 bg-base-200">
            {car.imageUrl && (
              <Image
                src={car.imageUrl}
                alt={car.carName}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            )}
          </div>
          <div className="grid grid-cols-3 divide-x divide-base-200 border-t border-base-200 bg-base-100">
            <div className="flex flex-col items-center py-4 gap-1">
              <TbManualGearbox size={20} className="text-primary" />
              <span className="text-xs font-medium">{type || "—"}</span>
              <span className="text-xs text-base-content/40">Type</span>
            </div>
            <div className="flex flex-col items-center py-4 gap-1">
              <IoCalendarOutline size={20} className="text-primary" />
              <span className="text-xs font-medium">
                {car.seatCapacity || "—"}
              </span>
              <span className="text-xs text-base-content/40">Seats</span>
            </div>
            <div className="flex flex-col items-center py-4 gap-1">
              <IoLocationOutline size={20} className="text-primary" />
              <span className="text-xs font-medium text-center px-1">
                {location || "—"}
              </span>
              <span className="text-xs text-base-content/40">Pickup</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-2 flex-wrap">
            {type && (
              <span className="badge badge-outline text-xs font-semibold">
                {type}
              </span>
            )}
            <span
              className={`badge badge-sm font-semibold ${
                available ? "badge-success" : "badge-error"
              }`}
            >
              {available ? "Available" : "Unavailable"}
            </span>
            {car.booking_count > 0 && (
              <span className="badge badge-ghost text-xs">
                {car.booking_count} bookings
              </span>
            )}
          </div>

          <h1 className="text-4xl font-bold tracking-tight">{car.carName}</h1>

          <div className="flex items-end gap-2">
            <span className="text-3xl font-bold text-primary">
              ৳{Number(price).toLocaleString()}
            </span>
            <span className="text-base-content/40 text-sm mb-1">/ day</span>
          </div>

          {car.description && (
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-widest text-base-content/40 mb-2">
                Description
              </h3>
              <p className="text-sm text-base-content/70 leading-relaxed">
                {car.description}
              </p>
            </div>
          )}

          <div className="flex items-center gap-2 text-xs text-base-content/40">
            <MdOutlineVerified size={14} className="text-primary" />
            Verified listing · Listed by {car.ownerName || "owner"}
          </div>

          <div className="divider my-0" />

          <div className="flex flex-col sm:flex-row gap-3">
            {available ? (
              <BookingModal car={car} />
            ) : (
              <button
                type="button"
                className="btn btn-disabled flex-1"
                disabled
              >
                Currently Unavailable
              </button>
            )}
            <Link
              href="/cars"
              className="btn btn-outline flex-1 rounded-xl font-semibold"
            >
              Browse Other Cars
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
