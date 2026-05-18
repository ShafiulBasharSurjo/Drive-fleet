import Link from "next/link";
import { BsTwitterX } from "react-icons/bs";
import { CiMail } from "react-icons/ci";
import { FaFacebook } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { IoCallOutline } from "react-icons/io5";
import { SiInstagram } from "react-icons/si";

const Footer = () => {
  return (
    <footer className="bg-neutral text-neutral-content">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div className="md:col-span-1">
          <h2 className="text-2xl font-bold tracking-tight mb-3">
            Drive<span className="text-primary">Fleet</span>
          </h2>
          <p className="text-sm text-neutral-content/60 leading-relaxed mb-4">
            Premium car rentals across Bangladesh. Affordable rates, flexible
            pickups, and a seamless booking experience.
          </p>

          <div className="flex gap-3">
            <a
              href="https://x.com"
              className="btn btn-ghost btn-sm btn-square hover:text-primary transition-colors"
            >
              <BsTwitterX />
            </a>
            <a
              href="https://facebook.com"
              className="btn btn-ghost btn-sm btn-square hover:text-primary transition-colors"
            >
              <FaFacebook />
            </a>
            <a
              href="https://instagram.com"
              className="btn btn-ghost btn-sm btn-square hover:text-primary transition-colors"
            >
              <SiInstagram />
            </a>
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-sm uppercase tracking-widest mb-4 text-neutral-content/50">
            Quick Links
          </h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link
                href="/"
                className="hover:text-primary transition-colors text-neutral-content/70"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/cars"
                className="hover:text-primary transition-colors text-neutral-content/70"
              >
                Explore Cars
              </Link>
            </li>
            <li>
              <Link
                href="/my-bookings"
                className="hover:text-primary transition-colors text-neutral-content/70"
              >
                My Bookings
              </Link>
            </li>
            <li>
              <Link
                href="/my-cars"
                className="hover:text-primary transition-colors text-neutral-content/70"
              >
                My Cars
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-sm uppercase tracking-widest mb-4 text-neutral-content/50">
            Support
          </h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link
                href="/faq"
                className="hover:text-primary transition-colors text-neutral-content/70"
              >
                FAQ
              </Link>
            </li>
            <li>
              <Link
                href="/terms"
                className="hover:text-primary transition-colors text-neutral-content/70"
              >
                Terms of Service
              </Link>
            </li>
            <li>
              <Link
                href="/privacy"
                className="hover:text-primary transition-colors text-neutral-content/70"
              >
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="hover:text-primary transition-colors text-neutral-content/70"
              >
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-sm uppercase tracking-widest mb-4 text-neutral-content/50">
            Contact
          </h3>
          <ul className="space-y-3 text-sm text-neutral-content/70">
            <li className="flex items-start gap-2">
              <FaLocationDot />
              Dhaka, Bangladesh
            </li>
            <li className="flex items-center gap-2">
              <IoCallOutline />
              +880 1700-000000
            </li>
            <li className="flex items-center gap-2">
              <CiMail />
              hello@drivefleet.com
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-neutral-content/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-neutral-content/40">
          <span>
            © {new Date().getFullYear()} DriveFleet. All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
