import { TbShieldCheck, TbHeadset, TbDiscount } from "react-icons/tb";
import { BsLightningCharge } from "react-icons/bs";

const features = [
  {
    icon: <TbShieldCheck className="text-primary" size={28} />,
    title: "Fully Insured Fleet",
    text: "Every vehicle in our network is verified and covered for peace of mind on every journey.",
  },
  {
    icon: <BsLightningCharge className="text-primary" size={28} />,
    title: "Instant Booking",
    text: "Reserve your car in under two minutes with real-time availability and secure checkout.",
  },
  {
    icon: <TbDiscount className="text-primary" size={28} />,
    title: "Best Daily Rates",
    text: "Competitive pricing across sedans, SUVs, and luxury models with no hidden fees.",
  },
  {
    icon: <TbHeadset className="text-primary" size={28} />,
    title: "24/7 Roadside Support",
    text: "Our team is always on call for pickup changes, extensions, or emergency assistance.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-base-200/50 border-y border-base-200">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <p className="text-primary text-xs font-semibold uppercase tracking-widest text-center mb-2">
          Why DriveFleet
        </p>
        <h2 className="text-3xl font-bold tracking-tight text-center mb-10">
          Built for Modern Renters
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f) => (
            <div
              key={f.title}
              className="card bg-base-100 shadow-md border border-base-200 h-full"
            >
              <div className="card-body items-center text-center">
                <div className="mb-2">{f.icon}</div>
                <h3 className="card-title text-base">{f.title}</h3>
                <p className="text-sm text-base-content/60">{f.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
