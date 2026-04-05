import React from "react";

const tourPlan = [
  {
    day: 1,
    title: "Departure",
    desc: "Start your journey from Main Square, New Delhi. Enjoy comfortable travel and a warm welcome as you head towards Connaught Place, Delhi.",
    includes: ["5 Star Accommodation", "Breakfast"],
  },
  {
    day: 2,
    title: "Visiting Red Fort, Lotus Temple and India Gate",
    desc: "Explore the iconic Red Fort, Lotus Temple, and India Gate. Enjoy local cuisine and vibrant city life.",
    includes: ["5 Star Accommodation", "Breakfast", "Local Transportation"],
  },
  {
    day: 3,
    title: "Rest",
    desc: "Take a day to relax, shop at local markets, or explore Delhi at your own pace.",
    includes: ["5 Star Accommodation", "Breakfast"],
  },
  {
    day: 4,
    title: "Historical Tour",
    desc: "Visit Qutub Minar, Humayun's Tomb, and Akshardham Temple. Learn about Delhi's rich history and culture.",
    includes: ["5 Star Accommodation", "Breakfast", "Entry Tickets"],
  },
  {
    day: 5,
    title: "Return",
    desc: "Return to Main Square, New Delhi with wonderful memories and souvenirs.",
    includes: ["Breakfast"],
  },
];

const Tourplanpage = () => {
  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      {/* Hero Section */}
      <div className="relative h-[350px] bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80')" }}>
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <nav className="relative z-10 flex items-center justify-between px-16 py-6">
          <div className="text-white text-2xl font-bold tracking-widest">Travel</div>
          <ul className="flex gap-8 text-white text-lg">
            <li className="hover:text-orange-400 cursor-pointer">Home</li>
            <li className="hover:text-orange-400 cursor-pointer">About</li>
            <li className="hover:text-orange-400 cursor-pointer">Services</li>
            <li className="hover:text-orange-400 cursor-pointer">Upcoming Packages</li>
          </ul>
          <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-full font-semibold shadow">Get in Touch</button>
        </nav>
        <div className="relative z-10 flex flex-col items-center justify-center h-full pt-10">
          <h2 className="text-white text-lg tracking-widest mb-2">EXPLORE</h2>
          <h1 className="text-white text-5xl md:text-6xl font-bold mb-4 drop-shadow-lg">Landscapes</h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-8 -mt-24 pb-12">
        <div className="bg-white rounded-xl shadow-lg p-6">
          {/* Tabs */}
          <div className="flex gap-2 md:gap-6 mb-8 border-b pb-2">
            <button className="px-4 py-2 font-semibold rounded-t-lg text-gray-600 hover:text-orange-500 hover:bg-orange-50">Information</button>
            <button className="px-4 py-2 font-semibold rounded-t-lg text-orange-500 border-b-4 border-orange-500 bg-orange-50">Tour Plan</button>
            <button className="px-4 py-2 font-semibold rounded-t-lg text-gray-600 hover:text-orange-500 hover:bg-orange-50">Location</button>
            <button className="px-4 py-2 font-semibold rounded-t-lg text-gray-600 hover:text-orange-500 hover:bg-orange-50">Gallery</button>
          </div>

          {/* Content and Sidebar */}
          <div className="flex flex-col md:flex-row gap-8">
            {/* Main Content */}
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Tour Plan</h2>
              <div className="space-y-8">
                {tourPlan.map((item, idx) => (
                  <div key={idx} className="flex gap-4 items-start">
                    <div className="flex flex-col items-center">
                      <div className="bg-orange-500 text-white font-bold rounded-full w-10 h-10 flex items-center justify-center text-lg mb-2">{String(item.day).padStart(2, '0')}</div>
                      {idx !== tourPlan.length - 1 && <div className="w-1 h-24 bg-gray-300"></div>}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-800 mb-1">Day {item.day}: {item.title}</h3>
                      <p className="text-gray-500 text-sm mb-2">{item.desc}</p>
                      <ul className="list-disc ml-6 text-sm text-gray-700">
                        {item.includes.map((inc, i) => <li key={i}>{inc}</li>)}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Sidebar */}
            <aside className="w-full md:w-80 bg-gray-100 rounded-xl p-6 flex flex-col gap-4 shadow-md">
              <h2 className="text-lg font-bold text-gray-800 mb-2">Book This Tour</h2>
              <p className="text-gray-500 text-sm mb-4">Ex optio saepe ut quasi praesentium in nostrum laborum enim numquam nulla est magni necessitatibus?</p>
              <form className="flex flex-col gap-3">
                <input type="text" placeholder="Name" className="px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400" />
                <input type="email" placeholder="Email" className="px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400" />
                <input type="email" placeholder="Confirm Email" className="px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400" />
                <input type="tel" placeholder="Phone" className="px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400" />
                <input type="number" placeholder="Number of ticket" className="px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400" />
                <textarea placeholder="Message" className="px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400" rows={2}></textarea>
                <button type="button" className="bg-orange-300 hover:bg-orange-400 text-white font-semibold py-2 rounded shadow">Check Availability</button>
                <button type="submit" className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded shadow">Book Now</button>
              </form>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tourplanpage;
