"use client";

import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import logo from "../../public/Assets/logo.png";

export default function Navbar() {
  const { user, loading, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <nav className="navbar bg-base-100 shadow-sm sticky top-0 z-50 px-4 lg:px-8">
      <div className="navbar-start">
        <div className="dropdown lg:hidden">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-2 shadow"
          >
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/cars">Explore Cars</Link>
            </li>
            {user && (
              <>
                <li>
                  <Link href="/add-car">Add Car</Link>
                </li>
                <li>
                  <Link href="/my-bookings">My Bookings</Link>
                </li>
                <li>
                  <Link href="/my-added-cars">My Added Cars</Link>
                </li>
              </>
            )}
          </ul>
        </div>
        <Link href="/" className="flex items-center gap-2">
          <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0">
            <Image
              alt="DriveFleet logo"
              src={logo}
              width={40}
              height={40}
              className="object-cover h-auto w-full"
            />
          </div>
          <h2 className="text-xl font-bold tracking-tight hidden sm:block">
            Drive<span className="text-primary">Fleet</span>
          </h2>
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 font-medium gap-1">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/cars">Explore Cars</Link>
          </li>
          {user && (
            <>
              <li>
                <Link href="/add-car">Add Car</Link>
              </li>
              <li>
                <Link href="/my-bookings">My Bookings</Link>
              </li>
            </>
          )}
        </ul>
      </div>

      <div className="navbar-end gap-2">
        {!loading && !user ? (
          <Link
            href="/login"
            className="btn btn-primary btn-sm px-5 rounded-md font-medium"
          >
            Log In
          </Link>
        ) : user ? (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar border border-base-300"
            >
              {user.photoURL ? (
                <div className="relative w-10 h-10 rounded-full overflow-hidden">
                  <Image
                    src={user.photoURL}
                    alt={user.name || "Profile"}
                    width={40}
                    height={40}
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="w-10 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary">
                  {user.name?.[0]?.toUpperCase() || "U"}
                </div>
              )}
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-2 shadow"
            >
              <li className="menu-title text-xs opacity-60">{user.email}</li>
              <li>
                <Link href="/add-car">Add Car</Link>
              </li>
              <li>
                <Link href="/my-bookings">My Bookings</Link>
              </li>
              <li>
                <Link href="/my-added-cars">My Added Cars</Link>
              </li>
              <li>
                <button type="button" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <span className="loading loading-spinner loading-sm" />
        )}
      </div>
    </nav>
  );
}
