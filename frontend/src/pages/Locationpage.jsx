import React from "react";

const Locationpage = () => {
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
            <button className="px-4 py-2 font-semibold rounded-t-lg text-orange-500 border-b-4 border-orange-500 bg-orange-50">Location</button>
            <button className="px-4 py-2 font-semibold rounded-t-lg text-gray-600 hover:text-orange-500 hover:bg-orange-50">Gallery</button>
          </div>

          {/* Content and Sidebar */}
          <div className="flex flex-col md:flex-row gap-8">
            {/* Main Content */}
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Tour Plan</h2>
              <p className="text-gray-500 text-sm mb-4">
                Our tour plan starts from Main Square, New Delhi, covering iconic places like Connaught Place, Red Fort, Lotus Temple, India Gate, Qutub Minar, Humayun's Tomb, and Akshardham Temple. Enjoy the vibrant culture, delicious food, and rich history of Delhi.
              </p>
              <div className="mb-4">
                <iframe
                  title="Delhi Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d224345.8391989136!2d77.0688999684496!3d28.52728034304709!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce2b6b2a1c1b1%3A0x35b1b1b1b1b1b1b1!2sDelhi!5e0!3m2!1sen!2sin!4v1660000000000!5m2!1sen!2sin"
                  width="100%"
                  height="250"
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-lg border"
                ></iframe>
              </div>
              <p className="text-gray-500 text-sm mb-4">
                Experience the best of Delhi with our guided tours, comfortable accommodations, and personalized service. Whether you're interested in history, culture, or food, Delhi has something for everyone. Book your tour now and make unforgettable memories!
              </p>
              <p className="text-gray-500 text-sm">
                For more information, contact us or visit our office at Connaught Place, New Delhi. We look forward to welcoming you to the heart of India!
              </p>
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

export default Locationpage;
