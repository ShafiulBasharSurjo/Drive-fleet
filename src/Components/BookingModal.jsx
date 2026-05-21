"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import { BsCalendarCheck } from "react-icons/bs";
import { IoLocationOutline } from "react-icons/io5";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { API_URL } from "@/lib/api";

export function BookingModal({ car }) {
  const { user } = useAuth();
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);
  const modalId = `booking_modal_${car._id}`;
  const price = car.dailyRentPrice ?? car.pricePerDay;
  const location = car.pickupLocation || car.location;

  const handleOpen = () => {
    if (!user) {
      toast.info("Please log in to book a car");
      router.push("/login");
      return;
    }
    document.getElementById(modalId)?.showModal();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsPending(true);
    try {
      const formData = new FormData(e.currentTarget);
      const payload = {
        carId: car._id,
        driverNeeded: formData.get("driverNeeded"),
        specialNote: formData.get("specialNote"),
        pickupDate: formData.get("pickupDate"),
        returnDate: formData.get("returnDate"),
      };
      const res = await fetch(`${API_URL}/bookings`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      toast.success("Booking confirmed!");
      document.getElementById(modalId)?.close();
      e.target.reset();
    } catch (err) {
      toast.error(err.message || "Booking failed");
    } finally {
      setIsPending(false);
    }
  };

  const minDate = new Date().toISOString().split("T")[0];

  return (
    <>
      <button
        type="button"
        className="btn btn-primary flex-1 rounded-xl font-semibold"
        onClick={handleOpen}
      >
        Book Now
      </button>
      <dialog id={modalId} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box max-w-md p-0 overflow-hidden">
          <div className="bg-primary/10 border-b border-base-200 px-6 py-5">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-bold">Confirm Your Booking</h3>
                <p className="text-xs text-base-content/50 mt-0.5">
                  Driver preference and special notes
                </p>
              </div>
              <form method="dialog">
                <button
                  type="submit"
                  className="btn btn-sm btn-circle btn-ghost"
                >
                  ✕
                </button>
              </form>
            </div>
            <div className="flex items-center gap-3 mt-4 bg-base-100 rounded-xl p-3 border border-base-200">
              {car.imageUrl && (
                <Image
                  src={car.imageUrl}
                  alt={car.carName}
                  width={64}
                  height={48}
                  className="w-16 h-12 object-cover rounded-lg shrink-0"
                />
              )}
              <div className="min-w-0">
                <p className="font-semibold text-sm truncate">{car.carName}</p>
                <span className="text-primary font-bold text-sm">
                  ৳{Number(price).toLocaleString()}/day
                </span>
                {location && (
                  <p className="text-xs text-base-content/40 flex items-center gap-0.5 mt-0.5">
                    <IoLocationOutline size={11} />
                    {location}
                  </p>
                )}
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
            <div>
              <label className="text-sm font-medium">Pickup Date</label>
              <input
                type="date"
                name="pickupDate"
                min={minDate}
                className="input input-bordered w-full rounded-xl mt-1"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Return Date</label>
              <input
                type="date"
                name="returnDate"
                min={minDate}
                className="input input-bordered w-full rounded-xl mt-1"
              />
            </div>
            <div>
              <label className="text-sm font-medium">
                Driver Needed? <span className="text-error">*</span>
              </label>
              <select
                name="driverNeeded"
                required
                defaultValue=""
                className="select select-bordered w-full rounded-xl mt-1"
              >
                <option value="" disabled>
                  Select
                </option>
                <option value="No">No — I will drive</option>
                <option value="Yes">Yes — Include driver</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium">Special Note</label>
              <textarea
                name="specialNote"
                placeholder="Pickup instructions or requests..."
                className="textarea textarea-bordered w-full rounded-xl min-h-20 mt-1"
              />
            </div>
            <div className="flex gap-2 pt-1">
              <button
                type="button"
                className="btn btn-outline flex-1 rounded-xl"
                onClick={() => document.getElementById(modalId)?.close()}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isPending}
                className="btn btn-primary flex-1 rounded-xl gap-2"
              >
                {isPending ? (
                  <span className="loading loading-spinner loading-sm" />
                ) : (
                  <BsCalendarCheck size={15} />
                )}
                {isPending ? "Booking..." : "Book Now"}
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </>
  );
}
