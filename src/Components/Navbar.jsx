import React from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "../../public/Assets/logo.png";
const Navbar = () => {
  const isLoggedIn = false;
  return (
    <>
      <nav>
        <div className="navbar bg-base-100 shadow-sm">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <Image alt="logo" src={logo} />
            </div>
          </div>
          <div className="flex-1">
            <a className="btn btn-ghost text-xl">DriveFleet</a>
          </div>

          <div className="flex-none hidden md:flex mr-4">
            <ul className="menu menu-horizontal px-1 font-medium gap-1">
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/cars">Explore Cars</Link>
              </li>
              {isLoggedIn && (
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
          <div className="flex-none">
            {!isLoggedIn ? (
              <Link
                href="/login"
                className="btn btn-primary btn-sm px-5 rounded-md font-medium"
              >
                Log In
              </Link>
            ) : (
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar border border-base-300"
                >
                  <div className="w-10 rounded-full bg-base-200 flex items-center justify-center">
                    {/* <img
                  alt="Tailwind CSS Navbar component"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                /> */}
                  </div>
                </div>
                <ul
                  tabIndex="-1"
                  className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
                >
                  <li>
                    <a className="justify-between">Profile</a>
                  </li>
                  <li>
                    <a>Settings</a>
                  </li>
                  <li>
                    <a>Logout</a>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
