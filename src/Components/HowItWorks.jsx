import Link from "next/link";
import { FiSearch, FiCalendar, FiKey } from "react-icons/fi";

const steps = [
  {
    step: "01",
    icon: <FiSearch size={22} />,
    title: "Browse the Fleet",
    text: "Search by name or filter by type to find the perfect car for your trip.",
  },
  {
    step: "02",
    icon: <FiCalendar size={22} />,
    title: "Book Your Dates",
    text: "Choose pickup details, driver options, and confirm with one click.",
  },
  {
    step: "03",
    icon: <FiKey size={22} />,
    title: "Hit the Road",
    text: "Pick up at your chosen location and enjoy a premium rental experience.",
  },
];

export default function HowItWorks() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <p className="text-primary text-xs font-semibold uppercase tracking-widest text-center mb-2">
        Simple Process
      </p>
      <h2 className="text-3xl font-bold tracking-tight text-center mb-12">
        How It Works
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {steps.map((s) => (
          <div
            key={s.step}
            className="relative flex flex-col items-center text-center p-8 rounded-2xl border border-base-200 bg-base-100 shadow-sm h-full"
          >
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 badge badge-primary font-bold">
              {s.step}
            </span>
            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4 mt-4">
              {s.icon}
            </div>
            <h3 className="font-bold text-lg mb-2">{s.title}</h3>
            <p className="text-sm text-base-content/60">{s.text}</p>
          </div>
        ))}
      </div>
      <div className="text-center mt-10">
        <Link href="/cars" className="btn btn-primary rounded-md px-8">
          Start Exploring
        </Link>
      </div>
    </section>
  );
}
