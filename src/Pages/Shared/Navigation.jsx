import React, { useContext, useState } from 'react';
import { AuthContext } from '../../provider/AuthProvider';
import { Link, NavLink } from 'react-router-dom';

const Navigation = () => {
  const [showMenu, setShowMenu] = useState(false);

  const handleToggleMenu = () => {
    setShowMenu(!showMenu);
  };
  const { user, logOut } = useContext(AuthContext);

  const handleLogOut = () => {
    logOut()
      .then()
      .catch(error => console.log(error));
  };
  return (
    <nav className="bg-gray-500 p-3">
      <div className="container mx-auto flex items-center justify-between">
       
        <a href="/" className="text-white font-bold text-xl">
          Eduminati
        </a>

        {/* Hamburger Icon for Mobile */}
        <button
          className="sm:hidden text-white"
          onClick={handleToggleMenu}
          aria-label="Toggle Menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>

        {/* Navigation Links (Visible on Larger Screens and when menu is toggled) */}
        <ul
          className={`${
            showMenu ? 'block' : 'hidden'
          } sm:flex space-x-4 sm:space-x-2 items-center`}
        >
            <li>
            <a href="/" className="text-white hover:text-blue-200">
              Home
            </a>
          </li>
          <li>
            <Link to="/colleges" className="text-white hover:text-blue-200">
              Colleges
            </Link>
          </li>
          <li>
            <Link to="/admission" className="text-white hover:text-blue-200">
              Admission
            </Link>
          </li>
          <li>
            <Link to="/myCollege" className="text-white hover:text-blue-200">
              My College
            </Link>
          </li>
        </ul>

        {/* Login Button */}
        <div className="flex items-center">
            {user && (
              <button
                className="btn btn-neutral  float-end h-12 rounded-full object-cover mr-4">
                 
           {user.displayName}
                </button>
            )}
            {user ? (
              <>
               <button className="btn btn-neutral" onClick={handleLogOut}>
                  Logout
                </button>
               
              </>
            ) : (
              <Link to="/login">
                <button className="btn btn-neutral">Login</button>
              </Link>
            )}
          </div>
      </div>
    </nav>
  );
};

export default Navigation;
