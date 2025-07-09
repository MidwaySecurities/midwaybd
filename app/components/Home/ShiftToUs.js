import Image from "next/image";

export default function ShiftToUs() {
  return (
    <section className="bg-gray-50 py-16 px-4 card-shadow">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          Transfer to QuickTrade Pro?
        </h2>
        <p className="text-gray-600 text-lg mb-8">
          Unlock advanced trading tools, faster execution, and deeper insights. Upgrade now and elevate your trading experience.
        </p>
        <div className="flex justify-center mb-8">
          <Image
            src="https://images.unsplash.com/photo-1611971261261-c6b3aabe0f66?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80"
            alt="Professional trading platform"
            width={600}
            height={400}
            className="rounded-lg shadow-md"
          />
        </div>
        <a
          href="/upgrade"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-md transition-colors"
        >
          Upgrade to Pro
        </a>
      </div>
    </section>
  );
}
