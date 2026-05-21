import Link from "next/link";
import Image from "next/image";
import banner from "../../public/Assets/banner.jpg";
import { FiArrowRight } from "react-icons/fi";
import { TbShieldCheck } from "react-icons/tb";
import { BsSpeedometer2 } from "react-icons/bs";
import { IoLocationOutline } from "react-icons/io5";

const stats = [
  { value: "200+", label: "Vehicles" },
  { value: "45", label: "Locations" },
  { value: "12k+", label: "Happy Renters" },
  { value: "24/7", label: "Support" },
];

const perks = [
  { icon: <TbShieldCheck size={18} />, text: "Fully Insured" },
  { icon: <BsSpeedometer2 size={18} />, text: "Top Condition" },
  { icon: <IoLocationOutline size={18} />, text: "Flexible Pickup" },
];

const Banner = () => {
  return (
    <section className="relative bg-neutral text-neutral-content overflow-hidden min-h-130 flex items-center">
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="absolute -top-32 -left-32 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 right-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 py-16 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <div className="inline-flex items-center gap-2 border border-primary/30 bg-primary/10 text-primary text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            Premium Car Rentals
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold leading-tight tracking-tight mb-5">
            Drive Your{" "}
            <span className="text-primary relative inline-block">
              Perfect
              <svg
                className="absolute -bottom-1 left-0 w-full"
                viewBox="0 0 160 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2 6 Q80 1 158 6"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  className="text-primary"
                />
              </svg>
            </span>{" "}
            Journey
          </h1>

          <p className="text-neutral-content/60 text-base leading-relaxed max-w-md mb-8">
            Explore our curated fleet of premium vehicles. Affordable daily
            rates, flexible pickups, and a seamless booking experience designed
            to get you on the road faster. Your next adventure starts here –
            where luxury meets convenience.
          </p>

          <div className="flex flex-wrap gap-4 mb-8">
            {perks.map((p) => (
              <div
                key={p.text}
                className="flex items-center gap-1.5 text-sm text-neutral-content/70"
              >
                <span className="text-primary">{p.icon}</span>
                {p.text}
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/Cars"
              className="btn btn-primary btn-md px-7 rounded-md font-semibold gap-2"
            >
              Explore Cars <FiArrowRight size={16} />
            </Link>
            <Link
              href="/add-car"
              className="btn btn-outline btn-md px-7 rounded-md font-semibold border-neutral-content/20 text-neutral-content hover:bg-neutral-content hover:text-neutral hover:border-neutral-content"
            >
              List Your Car
            </Link>
          </div>
        </div>

        <div className="flex flex-col items-center gap-8">
          <div className="relative w-full max-w-xl rounded-2xl overflow-hidden border border-base-100/10 shadow-2xl">
            <div className="absolute inset-0 bg-linear-to-b from-neutral via-transparent to-transparent opacity-60 z-10 pointer-events-none" />
            <Image
              alt="DriveFleet Banner"
              src={banner}
              className="rounded-lg object-cover w-full h-64 shadow-lg"
            />
          </div>

          <div className="grid grid-cols-4 gap-4 w-full max-w-sm">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-xl font-bold text-primary">{s.value}</div>
                <div className="text-xs text-neutral-content/50 mt-0.5 uppercase tracking-wide">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
