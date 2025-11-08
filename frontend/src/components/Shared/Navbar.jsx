import { Link, useNavigate, useLocation } from "react-router-dom";
import { userData } from "../../services/userUtil";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";

const navigation = [
  { name: "Home", href: "/", current: false },
  { name: "Interview", href: "/interview", current: false },
  { name: "Resume Check", href: "/SD", current: false },
  { name: "Dashboard", href: "/DF", current: true },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const isLoggedIn = userData.isLoggedIn;

  const handleLogout = () => {
    userData.isLoggedIn = false;
    navigate("/login");
  };

  return (
    <nav className="relative bg-black after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-white/10">
      <div className="mx-auto max-w-[95%] px-3">
        <div className="relative flex h-16 items-center justify-between">
          {/* Left: Logo */}
          <div className="flex items-center">
            <Link to="/">
              <img
                alt="Your Company"
                src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
                className="h-8 w-auto"
              />
            </Link>
          </div>

          {/* Center: Navigation (visible only when logged in) */}
          {isLoggedIn && (
            <div className="flex space-x-6 absolute left-1/2 transform -translate-x-1/2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={classNames(
                    location.pathname === item.href
                      ? "bg-grey-100 text-white"
                      : "text-gray-300 hover:bg-white/10 hover:text-white",
                    "rounded-md px-3 py-2 text-sm font-medium"
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          )}

          {/* Right: Login/Signup or Profile */}
          <div className="flex items-center space-x-3">
            {isLoggedIn ? (
              // Profile Dropdown
              <Menu as="div" className="relative">
                <MenuButton className="relative flex rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">
                  <span className="sr-only">Open user menu</span>
                  <img
                    alt="User"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    className="h-8 w-8 rounded-full bg-gray-800 outline -outline-offset-1 outline-white/10"
                  />
                </MenuButton>

                <MenuItems
                  transition
                  className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-black py-1 outline -outline-offset-1 outline-white/50 transition data-closed:scale-95 data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                >
                  <MenuItem>
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-gray-300 hover:bg-white/5"
                    >
                      Your Profile
                    </Link>
                  </MenuItem>

                  <MenuItem>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left block px-4 py-2 text-sm text-gray-300 hover:bg-white/5"
                    >
                      Sign Out
                    </button>
                  </MenuItem>
                </MenuItems>
              </Menu>
            ) : (
              // Login + Sign Up Buttons
              <>
                <Link
                  to="/login"
                  className={classNames(
                    location.pathname === "/login"
                      ? "bg-indigo-600 text-white"
                      : "text-gray-300 hover:text-white hover:bg-white/5",
                    "px-4 py-2 text-sm font-medium rounded-md"
                  )}
                >
                  Log In
                </Link>
                <Link
                  to="/signup"
                  className={classNames(
                    location.pathname === "/signup"
                      ? "bg-indigo-600 text-white"
                      : "text-gray-300 hover:text-white hover:bg-white/5",
                    "px-4 py-2 text-sm font-medium rounded-md"
                  )}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
