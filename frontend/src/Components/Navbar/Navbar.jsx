import { Avatar, Dropdown, Navbar as FlowbiteNavbar } from "flowbite-react";
import { FaSearch, FaHeart, FaShoppingCart } from "react-icons/fa";
import DarkModeToggle from "../DarkModeToggle/DarkModeToggle";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Logout from "../logout/Logout";
import { RxCross2 } from "react-icons/rx";

function Navbar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const isAuthenticated = localStorage.getItem("token");
  const navigate = useNavigate();
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const handleSearch = () => {
    navigate(`/searched-products?query=${encodeURIComponent(searchQuery)}`);
    setIsSidebarOpen(false);
  };

  return (
    <>
      <FlowbiteNavbar fluid rounded border className="py-4">
        <FlowbiteNavbar.Brand>
          <div className="flex items-center gap-2 lg:ml-4 md:ml-2 ml-0 ">
          <img src="/TEN_LOGO.jpeg" className="h-12 w-12 rounded-full" />
          <span className="text-2xl sm:text-sm md:text-xl xl:text-3xl text-gray-900 dark:text-white">
            TEN Fashion
          </span>
          </div>
        </FlowbiteNavbar.Brand>

        <FlowbiteNavbar.Toggle aria-label="Toggle navigation" />

        <FlowbiteNavbar.Collapse className="sm:block md:block transition-all duration-300 ease-in-out">
          <div className="flex flex-col md:flex-row md:space-x-8 lg:space-x-12 xl:space-x-16 md:items-center justify-between">
            <FlowbiteNavbar.Link href="/" className="hidden md:block" active>
              Home
            </FlowbiteNavbar.Link>

            <div className="flex items-center space-x-6 md:space-x-8 lg:space-x-10">
              <FlowbiteNavbar.Link href="/about-us">
                About Us
              </FlowbiteNavbar.Link>
              <FlowbiteNavbar.Link href="/contact-us">
                Contact
              </FlowbiteNavbar.Link>
              <Dropdown
                label={
                  <span className="text-gray-800 dark:text-gray-400">Shop</span>
                }
                inline
                className="dark:text-white"
              >
                <Dropdown.Item href="/shop/mens">
                  Men's Collection
                </Dropdown.Item>
                <Dropdown.Item href="/shop/womens">
                  Women's Collection
                </Dropdown.Item>
                <Dropdown.Item href="/shop/kids">
                  Kids' Collection
                </Dropdown.Item>
              </Dropdown>
            </div>
          </div>

          {/* Icons Section */}
          <div className="flex flex-row items-center justify-around gap-4 md:gap-6 lg:gap-8 mt-4 md:mt-0 md:justify-end">
            {/* <Link
            to="/search"
            className="text-gray-800 dark:text-white cursor-pointer"
          > */}
            <button
              onClick={toggleSidebar}
              className="text-gray-800 dark:text-white cursor-pointer"
            >
              <FaSearch />
            </button>
            {/* </Link> */}
            <Link
              to="/wishlist"
              className="text-gray-800 dark:text-white cursor-pointer"
            >
              <FaHeart />
            </Link>
            <Link
              to="/cart"
              className="text-gray-800 dark:text-white cursor-pointer"
            >
              <FaShoppingCart />
            </Link>

            <div className="flex items-center gap-2 md:gap-4">
              <Dropdown
                label={
                  <Avatar
                    alt="User settings"
                    img="https://avatar.iran.liara.run/public/1"
                    rounded
                  />
                }
                inline
                className="dark:text-white"
              >
                {!isAuthenticated ? (
                  <>
                    <Dropdown.Item href="/login">Login</Dropdown.Item>
                    <Dropdown.Item href="/signup">Sign up</Dropdown.Item>
                  </>
                ) : (
                  <>
                    <Dropdown.Item>
                      <Logout />
                    </Dropdown.Item>
                    <Dropdown.Item href="/order-tracking">
                      Check order status
                    </Dropdown.Item>
                  </>
                )}
              </Dropdown>

              <DarkModeToggle />
            </div>
          </div>
        </FlowbiteNavbar.Collapse>
      </FlowbiteNavbar>
      {/* Sidebar */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex">
          {/* Sidebar on the right */}
          <div className="absolute top-0 right-0 w-[18%] bg-white dark:bg-gray-800 h-full p-4 shadow-lg">
            <button
              onClick={toggleSidebar}
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            >
              <RxCross2 />
            </button>
            <input
              type="text"
              placeholder="Search Products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)} // Update state
              className="w-full mt-4 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
            <button
              onClick={handleSearch}
              className="w-full mt-4 bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
            >
              Search
            </button>
          </div>
          {/* Click outside to close */}
          <div className="flex-grow" onClick={toggleSidebar}></div>
        </div>
      )}
    </>
  );
}

export default Navbar;
