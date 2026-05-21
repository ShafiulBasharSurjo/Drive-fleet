"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-toastify";
import { API_URL } from "@/lib/api";
import { BiEdit } from "react-icons/bi";
import { FiTrash2 } from "react-icons/fi";

export default function CarCard({
  car,
  showActions = false,
  onUpdated,
  onDeleted,
}) {
  const [deleting, setDeleting] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  const price = car.dailyRentPrice ?? car.pricePerDay;
  const type = car.carType || car.category;
  const location = car.pickupLocation || car.location;
  const available = car.availability !== "unavailable";

  const handleDelete = async () => {
    if (!confirm(`Delete "${car.carName}" from your listings?`)) return;
    setDeleting(true);
    try {
      const res = await fetch(`${API_URL}/cars/${car._id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!res.ok) throw new Error("Delete failed");
      toast.success("Car removed from fleet");
      onDeleted?.(car._id);
    } catch {
      toast.error("Could not delete car");
    } finally {
      setDeleting(false);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setSaving(true);
    const form = new FormData(e.target);
    const body = Object.fromEntries(form.entries());
    try {
      const res = await fetch(`${API_URL}/cars/${car._id}`, {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const updated = await res.json();
      if (!res.ok) throw new Error(updated.message);
      toast.success("Car updated");
      setEditOpen(false);
      onUpdated?.(updated);
    } catch (err) {
      toast.error(err.message || "Update failed");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="card bg-base-100 shadow-lg border border-base-200 h-full flex flex-col">
      <figure className="relative h-48 bg-base-200 w-full shrink-0">
        {car.imageUrl ? (
          <Image
            src={car.imageUrl}
            alt={car.carName}
            fill
            sizes="(max-width: 640px) 100vw, 33vw"
            className="object-cover"
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full text-base-content/30">
            No image
          </div>
        )}
        <span
          className={`badge absolute top-3 right-3 ${
            available ? "badge-success" : "badge-error"
          }`}
        >
          {available ? "Available" : "Unavailable"}
        </span>
      </figure>

      <div className="card-body flex flex-col flex-1">
        <div className="flex items-start justify-between gap-2">
          <h2 className="card-title text-lg">{car.carName}</h2>
          {type && <span className="badge badge-outline badge-sm">{type}</span>}
        </div>
        <p className="text-sm text-base-content/60 line-clamp-2 flex-1">
          {car.description}
        </p>
        <div className="flex flex-wrap gap-3 text-xs text-base-content/50 mt-2">
          <span>৳{Number(price).toLocaleString()}/day</span>
          {car.seatCapacity && <span>{car.seatCapacity} seats</span>}
          {location && <span>{location}</span>}
        </div>

        <div className="card-actions justify-end mt-4 gap-2">
          {showActions ? (
            <>
              <button
                type="button"
                className="btn btn-sm btn-outline gap-1"
                onClick={() => setEditOpen(true)}
              >
                <BiEdit /> Update
              </button>
              <button
                type="button"
                className="btn btn-sm btn-error btn-outline gap-1"
                onClick={handleDelete}
                disabled={deleting}
              >
                {deleting ? (
                  <span className="loading loading-spinner loading-xs" />
                ) : (
                  <FiTrash2 />
                )}
                Delete
              </button>
            </>
          ) : (
            <Link
              href={`/cars/${car._id}`}
              className="btn btn-primary btn-sm rounded-lg"
            >
              View Details
            </Link>
          )}
        </div>
      </div>

      {editOpen && (
        <dialog className="modal modal-open">
          <div className="modal-box max-w-lg">
            <h3 className="font-bold text-lg mb-4">Update {car.carName}</h3>
            <form onSubmit={handleUpdate} className="space-y-3">
              <div>
                <label className="label text-sm">Daily rent (BDT)</label>
                <input
                  name="dailyRentPrice"
                  type="number"
                  defaultValue={price}
                  className="input input-bordered w-full rounded-xl text-amber-400"
                  required
                />
              </div>
              <div>
                <label className="label text-sm">Car type</label>
                <select
                  name="carType"
                  defaultValue={type}
                  className="select select-bordered w-full rounded-xl"
                >
                  <option value="Sedan">Sedan</option>
                  <option value="SUV">SUV</option>
                  <option value="Hatchback">Hatchback</option>
                  <option value="Luxury">Luxury</option>
                  <option value="Microbus">Microbus</option>
                  <option value="Electric">Electric</option>
                </select>
              </div>
              <div>
                <label className="label text-sm ">Pickup location</label>
                <input
                  name="pickupLocation"
                  defaultValue={location}
                  className="input input-bordered w-full rounded-xl text-base-content"
                />
              </div>
              <div>
                <label className="label text-sm">Image URL</label>
                <input
                  name="imageUrl"
                  defaultValue={car.imageUrl}
                  className="input input-bordered w-full rounded-xl text-base-content"
                />
              </div>
              <div>
                <label className="label text-sm">Availability</label>
                <select
                  name="availability"
                  defaultValue={car.availability || "available"}
                  className="select select-bordered w-full rounded-xl"
                >
                  <option value="available">Available</option>
                  <option value="unavailable">Unavailable</option>
                </select>
              </div>
              <div>
                <label className="label text-sm">Description</label>
                <textarea
                  name="description"
                  defaultValue={car.description}
                  className="textarea textarea-bordered w-full rounded-xl min-h-24"
                />
              </div>
              <div className="modal-action">
                <button
                  type="button"
                  className="btn btn-ghost"
                  onClick={() => setEditOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={saving}
                >
                  {saving ? "Saving..." : "Save changes"}
                </button>
              </div>
            </form>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button type="button" onClick={() => setEditOpen(false)}>
              close
            </button>
          </form>
        </dialog>
      )}
    </div>
  );
}
