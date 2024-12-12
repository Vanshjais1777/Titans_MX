import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Column 1: Brand and Address */}
          <div>
            <h4 className="text-xl font-semibold mb-4 text-white">Skill Sphere</h4>
            <p className="text-sm leading-relaxed">
              ITM Gida Gorakhpur,<br />
              Uttar pradesh, 273001
            </p>
            <div className="flex space-x-4 mt-4">
              <a
                href="#"
                className="text-gray-300 hover:text-teal-400 transition"
                aria-label="Facebook"
              >
                <i className="fab fa-facebook text-xl"></i>
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-teal-400 transition"
                aria-label="Twitter"
              >
                <i className="fab fa-twitter text-xl"></i>
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-teal-400 transition"
                aria-label="Instagram"
              >
                <i className="fab fa-instagram text-xl"></i>
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-teal-400 transition"
                aria-label="LinkedIn"
              >
                <i className="fab fa-linkedin text-xl"></i>
              </a>
            </div>
          </div>

          {/* Column 2: For Clients */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">For Clients</h4>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-teal-400 cursor-pointer">Job Marketplace</li>
              <li className="hover:text-teal-400 cursor-pointer">Direct Contracts</li>
              <li className="hover:text-teal-400 cursor-pointer">Hire Worldwide</li>
            </ul>
          </div>

          {/* Column 3: Why Choose Us */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Why Choose Us</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start space-x-2">
                <i className="fas fa-check-circle text-teal-500"></i>
                <span>Access to global opportunities</span>
              </li>
              <li className="flex items-start space-x-2">
                <i className="fas fa-check-circle text-teal-500"></i>
                <span>Verified job postings and internships</span>
              </li>
              <li className="flex items-start space-x-2">
                <i className="fas fa-check-circle text-teal-500"></i>
                <span>Personalized recommendations</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Stay Updated</h4>
            <p className="text-sm leading-relaxed mb-4">
              Get the latest job updates and internship opportunities straight to your inbox.
            </p>
            <form className="flex flex-col space-y-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
              />
              <button
                type="submit"
                className="bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-600 transition"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <p className="text-center text-sm mt-10 border-t border-gray-700 pt-6">
          © 2024 - Skill Sphere. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
