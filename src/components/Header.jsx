import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LOGO_URL } from '../utilities/constant';
import { CiLogout } from 'react-icons/ci';
import { FaSearch } from 'react-icons/fa';
import { UserContext } from '../App';

const Header = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext); // Assuming UserContext provides user state

  const handleLogout = () => {
    // Add logout logic here
    setUser(null); // Clear user state upon logout
    navigate('/login'); // Redirect to login page after logout
  };

  return (
    <div className="h-24 border border-gray-950 rounded flex items-center px-4 md:px-6 lg:px-8">
      <Link to='/'>
        <img className="w-12" src={LOGO_URL} alt="Logo" />
      </Link>
      
      <div className="hidden md:flex ml-6 h-14 w-1/6 border border-gray-500 rounded items-center justify-center">
        <span className="text-gray-400 italic text-center">Live Location</span>
      </div>
      <div className='flex w-3/6 ml-4 md:ml-8 border h-14 border-gray-950 items-center'>
        <FaSearch className="h-6 w-6 mr-2 text-gray-400" />
        <input
          type="text"
          className="flex-grow h-full px-2 md:px-4 border-none focus:outline-none text-sm md:text-base"
          placeholder="Search..."
        />
      </div>
      {user ? ( // Render logout button if user is logged in
        <>
          <button className="font-bold ml-4 text-sm md:text-base">
            English
          </button>
          <Link to="/productSell" className="ml-4 md:ml-8">
            <button className="font-bold text-sm md:text-base">+ SELL</button>
          </Link>
          <button className="font-bold ml-auto text-sm md:text-base" onClick={handleLogout}>
            Logout
            <CiLogout className="ml-1" />
          </button>
        </>
      ) : ( // Render login button if user is not logged in
        <Link to="/login" className="ml-auto">
          <button className="font-bold text-sm md:text-base">Login</button>
        </Link>
      )}
    </div>
  );
}

export default Header;
