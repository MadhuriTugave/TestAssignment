import React from 'react'
import logo from "../images/logo_B2R.png"
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useSelector } from"react-redux";

function Navbar() {
  const navigate = useNavigate()
  const user = useSelector((state)=> state);
  console.log(user);

  function handleLogout() {
    localStorage.removeItem("access_token");
    navigate("/");
  }
  return (
    <div className="w-full bg-slate-500 top-0 flex justify-between  space-x-1  items-center px-3 py-15  ">
    <div className='flex'>
      <Link to="/home" className="">
        <img src={logo} alt="Logo" className="h-16 lg:h-12 mt-2" />
      </Link>
      <div className="flex flex-row justify-between">
    <div
          id="basic-navbar-nav"
          className="sm:mt-4 lg:mt-2 lg:flex lg:items-center lg:w-auto w-full"
        >
          <nav className="flex flex-row  text-base text-gray-300 pt-4 lg:pt-0">
            
            <NavLink
          to="/create_employee"
          className={"ml-20"}
          >
        Create Employee
        </NavLink>
          
          <NavLink to={"/list"}
          className={"ml-20"}
          >
        Employee List
          </NavLink>
      
            </nav>
            </div>
           
           
        </div>
    </div>
  
        <div className='flex flex-row  text-base text-gray-300 pt-4 lg:pt-0  justify-self-end'>
              <h6 className='ml-10'>Name</h6>
            <button
       
          className={"ml-10 mr-10"}
          onClick={handleLogout}
          >
        Logout
        </button>
            </div>
    </div>
  )
}

export default Navbar
