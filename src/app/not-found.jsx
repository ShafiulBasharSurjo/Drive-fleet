import Link from "next/link";

export default function NotFound() {
  return (
    <section className="min-h-[60vh] flex flex-col items-center justify-center px-6 text-center">
      <p className="text-8xl font-bold text-primary/30">404</p>
      <h1 className="text-2xl font-bold mt-4">Page not found</h1>
      <p className="text-base-content/60 mt-2 max-w-md">
        The road you are looking for does not exist. Head back to DriveFleet
        home and continue your journey.
      </p>
      <Link href="/" className="btn btn-primary mt-8 rounded-md px-8">
        Go Back to Home
      </Link>
    </section>
  );
}
