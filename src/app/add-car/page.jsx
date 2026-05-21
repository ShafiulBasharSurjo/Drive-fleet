"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import PrivateRoute from "@/Components/PrivateRoute";
import { API_URL } from "@/lib/api";

function AddCarForm() {
  const [pending, setPending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPending(true);
    const form = new FormData(e.target);
    const body = Object.fromEntries(form.entries());
    try {
      const res = await fetch(`${API_URL}/cars`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      toast.success("Car listed successfully!");
      e.target.reset();
    } catch (err) {
      toast.error(err.message || "Failed to list car");
    } finally {
      setPending(false);
    }
  };

  return (
    <section className="max-w-3xl mx-auto bg-base-100 rounded-2xl shadow-xl border border-base-200 my-12 p-8">
      <h1 className="text-2xl font-bold text-center">Add a Car Listing</h1>
      <p className="text-sm text-center text-base-content/50 mt-2 mb-8">
        Share your vehicle with renters across Bangladesh
      </p>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="label text-sm font-medium">Car Name</label>
          <input
            name="carName"
            required
            className="input input-bordered w-full rounded-xl text-base-content"
            placeholder="Toyota Premio"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="label text-sm font-medium">
              Daily Rent Price (BDT)
            </label>
            <input
              name="dailyRentPrice"
              type="number"
              min="500"
              required
              className="input input-bordered w-full rounded-xl text-base-content"
            />
          </div>
          <div>
            <label className="label text-sm font-medium">Car Type</label>
            <select
              name="carType"
              required
              defaultValue=""
              className="select select-bordered w-full rounded-xl"
            >
              <option value="" disabled>
                Select type
              </option>
              <option value="Sedan">Sedan</option>
              <option value="SUV">SUV</option>
              <option value="Hatchback">Hatchback</option>
              <option value="Luxury">Luxury</option>
              <option value="Microbus">Microbus</option>
              <option value="Electric">Electric</option>
            </select>
          </div>
          <div>
            <label className="label text-sm font-medium">Seat Capacity</label>
            <input
              name="seatCapacity"
              type="number"
              min="2"
              max="50"
              required
              className="input input-bordered w-full rounded-xl text-base-content"
            />
          </div>
          <div>
            <label className="label text-sm font-medium">Pickup Location</label>
            <input
              name="pickupLocation"
              required
              className="input input-bordered w-full rounded-xl text-base-content"
              placeholder="Dhaka, Gulshan"
            />
          </div>
        </div>
        <div>
          <label className="label text-sm font-medium">Image URL</label>
          <input
            name="imageUrl"
            type="url"
            required
            className="input input-bordered w-full rounded-xl text-base-content"
            placeholder="https://i.ibb.co/..."
          />
        </div>
        <div>
          <label className="label text-sm font-medium">Description</label>
          <textarea
            name="description"
            required
            className="text-base-contenttextarea textarea-bordered w-full rounded-xl min-h-28"
            placeholder="Features, terms, and vehicle highlights..."
          />
        </div>
        <div>
          <label className="label text-sm font-medium">
            Availability Status
          </label>
          <select
            name="availability"
            defaultValue="available"
            className="select select-bordered w-full rounded-xl"
          >
            <option value="available">Available</option>
            <option value="unavailable">Unavailable</option>
          </select>
        </div>
        <button
          type="submit"
          disabled={pending}
          className="btn btn-primary w-full rounded-xl font-semibold"
        >
          {pending ? (
            <span className="loading loading-spinner loading-sm" />
          ) : (
            "Publish Listing"
          )}
        </button>
      </form>
    </section>
  );
}

export default function AddCarPage() {
  return (
    <PrivateRoute>
      <AddCarForm />
    </PrivateRoute>
  );
}
