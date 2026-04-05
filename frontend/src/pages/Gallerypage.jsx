import React from "react";

const galleryImages = [
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1465156799763-2c087c332922?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=400&q=80",
];

const Gallerypage = () => {
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
            <button className="px-4 py-2 font-semibold rounded-t-lg text-gray-600 hover:text-orange-500 hover:bg-orange-50">Tour Plan</button>
            <button className="px-4 py-2 font-semibold rounded-t-lg text-gray-600 hover:text-orange-500 hover:bg-orange-50">Location</button>
            <button className="px-4 py-2 font-semibold rounded-t-lg text-orange-500 border-b-4 border-orange-500 bg-orange-50">Gallery</button>
          </div>

          {/* Content and Sidebar */}
          <div className="flex flex-col md:flex-row gap-8">
            {/* Gallery Grid */}
            <div className="flex-1 grid grid-cols-3 grid-rows-3 gap-2 h-[420px]">
              <img src={galleryImages[0]} alt="gallery" className="row-span-1 col-span-1 rounded-lg object-cover h-full w-full" />
              <img src={galleryImages[1]} alt="gallery" className="row-span-2 col-span-1 rounded-lg object-cover h-full w-full" />
              <img src={galleryImages[2]} alt="gallery" className="row-span-1 col-span-1 rounded-lg object-cover h-full w-full" />
              <img src={galleryImages[3]} alt="gallery" className="row-span-2 col-span-1 rounded-lg object-cover h-full w-full" />
              <img src={galleryImages[4]} alt="gallery" className="row-span-2 col-span-1 rounded-lg object-cover h-full w-full" />
              <img src={galleryImages[5]} alt="gallery" className="row-span-1 col-span-1 rounded-lg object-cover h-full w-full" />
              <img src={galleryImages[6]} alt="gallery" className="row-span-1 col-span-2 rounded-lg object-cover h-full w-full" />
              <img src={galleryImages[7]} alt="gallery" className="row-span-1 col-span-1 rounded-lg object-cover h-full w-full" />
              <img src={galleryImages[8]} alt="gallery" className="row-span-1 col-span-1 rounded-lg object-cover h-full w-full" />
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
          {/* Pagination */}
          <div className="flex justify-center items-center gap-2 mt-10">
            <span className="text-gray-400">{'<'}</span>
            <span className="w-8 h-8 flex items-center justify-center rounded-full bg-orange-500 text-white font-bold">1</span>
            <span className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-orange-100 text-gray-700 cursor-pointer">2</span>
            <span className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-orange-100 text-gray-700 cursor-pointer">3</span>
            <span className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-orange-100 text-gray-700 cursor-pointer">4</span>
            <span className="text-gray-400">{'>'}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Gallerypage;
