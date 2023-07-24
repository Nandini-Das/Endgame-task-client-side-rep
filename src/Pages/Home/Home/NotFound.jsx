import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-xl mb-4">Oops! Page not found</p>
      <img
        src="https://img.freepik.com/premium-photo/3d-render-404-found-error-sign_343801-1.jpg?size=626&ext=jpg&ga=GA1.1.488912096.1690217426&semt=sph"
        alt="404 Illustration"
        className="w-96 h-72 mb-4 rounded-md"
      />
      <p className="text-lg text-gray-600 mb-4">
        The page you are looking for might have been removed or is temporarily unavailable.
      </p>
      <Link to="/" className="text-blue-500 hover:text-blue-600 font-semibold">
        Back to Home
      </Link>
    </div>
  );
};

export default NotFound;
