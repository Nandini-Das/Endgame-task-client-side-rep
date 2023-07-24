import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <div>
            <h3 className="text-xl font-bold mb-4">Services</h3>
            <ul className="space-y-2">
              <li>
                <a href="/services/service1" className="hover:text-blue-500">
                  Service 1
                </a>
              </li>
              <li>
                <a href="/services/service2" className="hover:text-blue-500">
                  Service 2
                </a>
              </li>
              <li>
                <a href="/services/service3" className="hover:text-blue-500">
                  Service 3
                </a>
              </li>
              {/* Add more services as needed */}
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <p>123 Main Street</p>
            <p>City, Country</p>
            <p>Email: info@example.com</p>
            <p>Phone: +1 (123) 456-7890</p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Help Center</h3>
            <ul className="space-y-2">
              <li>
                <a href="/help/faq" className="hover:text-blue-500">
                  FAQ
                </a>
              </li>
              <li>
                <a href="/help/contact" className="hover:text-blue-500">
                  Contact Support
                </a>
              </li>
              <li>
                <a href="/help/terms" className="hover:text-blue-500">
                  Terms of Service
                </a>
              </li>
              {/* Add more help center links as needed */}
            </ul>
          </div>
          {/* Add more columns as needed */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
