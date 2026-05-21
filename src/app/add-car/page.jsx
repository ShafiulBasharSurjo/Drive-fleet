"use client";
import React, { useState } from "react";
import { toast } from "react-toastify";
import {
  FieldError,
  Input,
  TextArea,
  TextField,
  Button,
  Label,
} from "@heroui/react";

const AddCarPage = () => {
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsPending(true);

    const formData = new FormData(e.currentTarget);
    const carData = Object.fromEntries(formData.entries());

    console.log("Car Data Submitted:", carData);

    const response = await fetch("http://localhost:5000/cars", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(carData),
    });

    if (response.ok) {
      const data = await response.json();
      console.log("Server Response:", data);

      toast.success("Car listed successfully!");
      e.currentTarget.reset();
    } else {
      toast.error("Failed to list the car. Please try again.");
    }
  };

  return (
    <>
      <section className="max-w-4xl mx-auto bg-base-100 rounded-2xl shadow-xl border border-base-200 my-12 p-8">
        <div>
          <h1 className="text-2xl font-bold text-center">List a New Car</h1>
          <p>
            Provide your fleet information to make this vehicle availabe for
            premium rentals across the globe. Fill out the form below to get
            started on sharing your car with our community of travelers and earn
            extra income while your vehicle is not in use.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-10 space-y-8 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="md:col-span-2">
              <TextField name="carName" isRequired>
                <Label>Car Model</Label>
                <Input placeholder="Toyota Camry" className="rounded-xl" />
                <FieldError />
              </TextField>
            </div>

            <TextField name="brand" isRequired>
              <Label>Brand / Manufacturer</Label>
              <Input placeholder="Toyota" className="rounded-2xl" />
              <FieldError className="text-xs text-error mt-1" />
            </TextField>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">Category</label>
              <select
                name="category"
                required
                defaultValue=""
                className="select select-bordered w-full rounded-xl"
              >
                <option value="" disabled>
                  Select vehicle type
                </option>
                <option value="Sedan">Sedan</option>
                <option value="SUV">SUV / Crossover</option>
                <option value="Microbus">Microbus / MPV</option>
                <option value="Luxury">Premium Luxury</option>
                <option value="Electric">Electric / Hybrid</option>
              </select>
            </div>

            <TextField name="pricePerDay" type="number" isRequired>
              <Label>Rental Price Per Day (BDT)</Label>
              <Input
                type="number"
                placeholder="4500"
                min="500"
                max="999999"
                className="rounded-xl"
              />
              <FieldError className="text-xs text-error mt-1" />
            </TextField>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">Fuel System</label>
              <select
                name="fuelType"
                required
                defaultValue=""
                className="select select-bordered w-full rounded-xl"
              >
                <option value="" disabled>
                  Select fuel setup
                </option>
                <option value="Octane">Octane / Petrol</option>
                <option value="CNG">CNG / LPG Conversion</option>
                <option value="Hybrid">Hybrid System</option>
                <option value="Electric">Full Electric (EV)</option>
              </select>
            </div>

            <TextField name="location" isRequired>
              <Label>Pickup Location</Label>
              <Input
                placeholder="Dhaka, Chittagong,..."
                className="rounded-xl"
              />
              <FieldError className="text-xs text-error mt-1" />
            </TextField>

            <TextField
              name="year"
              type="number"
              label="Manufacture Year"
              isRequired
            >
              <Label>Manufacture Year</Label>
              <Input type="number" placeholder="2022" className="rounded-xl" />
              <FieldError className="text-xs text-error mt-1" />
            </TextField>

            <div className="md:col-span-2">
              <TextField
                name="imageUrl"
                label="Vehicle Display Image URL"
                isRequired
                className="w-full"
              >
                <Label>Vehicle Display Image URL</Label>
                <Input
                  type="url"
                  placeholder="https://example.com/vehicles/toyota-premio.jpg"
                  className="rounded-xl"
                />
                <FieldError className="text-xs text-error mt-1" />
              </TextField>
            </div>

            <div className="md:col-span-2">
              <TextField
                name="description"
                label="Features & Rental Terms"
                isRequired
                className="w-full"
              >
                <Label>Features & Rental Terms</Label>
                <TextArea
                  placeholder="List key car features (e.g., Panoramic sunroof, backup camera) and specific rental guidelines..."
                  className="rounded-xl min-h-30"
                />
                <FieldError className="text-xs text-error mt-1" />
              </TextField>
            </div>
          </div>

          <div className="pt-4">
            <Button
              type="submit"
              isLoading={isPending}
              className="w-full btn bg-amber-500 hover:bg-amber-600 text-neutral-900 text-xl rounded-xl font-semibold h-12 shadow-md hover:shadow-lg transition-all"
            >
              {isPending ? "Listing Vehicle..." : "Publish Car Listing"}
            </Button>
          </div>
        </form>
      </section>
    </>
  );
};

export default AddCarPage;
