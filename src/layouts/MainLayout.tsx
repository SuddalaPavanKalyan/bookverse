import {
  BookOpen,
  Home,
  LibraryBig,
  Moon,
  Search,
  User,
  X,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import Logo from "../hooks/Logo";
import { useCustomSwipeable } from "../hooks/useCustomSwipeable";

interface NavItemProps {
  link: string;
  Icon: React.ElementType;
  name: string;
}

const NavItemIconName: React.FC<NavItemProps> = ({ link, Icon, name }) => {
  const location = useLocation();
  const isActive =
    location.pathname === link || location.pathname.startsWith(link + "/");

  return (
    <Link
      to={link}
      className={`py-2 md:py-0 flex flex-col items-center justify-center w-full transition-all duration-200 ease-in-out ${
        isActive ? "text-blue-600" : "text-gray-700 hover:text-blue-600"
      }`}
    >
      <span
        className={`rounded-full px-4 py-[2px] md:py-2 transition-all duration-200 ease-in-out ${
          isActive ? "bg-white" : "hover:bg-[#E6E6FA]"
        }`}
      >
        <Icon
          className={`w-5 h-5 transition-colors duration-200 ${
            isActive ? "text-blue-600" : "text-gray-800"
          }`}
        />
      </span>

      {name && (
        <span
          className={`text-xs text-center mt-1 transition-all duration-200 ease-in-out ${
            isActive ? "text-blue-600 font-bold" : "text-gray-700 font-semibold"
          }`}
        >
          {name}
        </span>
      )}
    </Link>
  );
};

const MainLayout: React.FC = () => {
  const navItems = [
    { label: "Home", path: "/", icon: Home },
    { label: "My Library", path: "/my-library", icon: LibraryBig },
    { label: "Explore", path: "/explore", icon: BookOpen },
    { label: "Account", path: "/settings", icon: User },
  ];

  const paths = navItems.map((n) => n.path);
  const navigate = useNavigate();
  const location = useLocation();

  const seg = "/" + location.pathname.split("/")[1];
  const startIndex = paths.findIndex((p) => p === seg);

  const swipe = useCustomSwipeable(paths);

  useEffect(() => {
    if (startIndex >= 0) swipe.setIndex(startIndex);
  }, []);

  useEffect(() => {
    navigate(swipe.item);
  }, [swipe.index]);

  const [search, setSearch] = useState("");

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <div className="fixed bottom-0 w-full md:w-24 md:h-screen flex md:flex-col flex-row justify-between items-center border-t md:border-r border-gray-200 py-2 md:py-5 px-0 bg-white z-50 shadow-lg md:shadow-none">
        <div className="flex md:flex-col flex-row w-full md:gap-5">
          {navItems.map((item) => (
            <div className="flex-1 h-full" key={item.path}>
              <NavItemIconName
                link={item.path}
                Icon={item.icon}
                name={item.label}
              />
            </div>
          ))}
        </div>

        <div className="hidden md:flex flex-col w-full items-center justify-end mt-auto mb-5">
          <NavItemIconName link="" Icon={Moon} name="" />
        </div>
      </div>

      <div {...swipe.handlers} className="flex-1 md:ml-24">
        <div className="px-4 sm:px-6 md:px-8 py-4 flex flex-row items-center justify-between gap-3">
          <Logo />
          <div className="flex items-center flex-1 w-full max-w-full relative backdrop-blur-sm border border-2 border-gray-200 py-1 rounded-full transition-all duration-300 md:max-w-lg md:px-2 px-1 gap-2">
            <button
              onClick={() => navigate(`/?query=${search}`)}
              className="bg-blue-600 text-white h-9 w-9 rounded-full flex items-center justify-center transition-colors flex-shrink-0"
            >
              <Search className="w-5 h-5" />
            </button>

            <div className="flex-1">
              <input
                type="text"
                value={search}
                placeholder="Search"
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") navigate(`/?query=${search}`);
                }}
                className="w-full bg-transparent md:px-2 text-gray-800 placeholder-gray-500 focus:outline-none"
              />
            </div>

            {search && (
              <button
                onClick={() => setSearch("")}
                className="text-gray-500 hover:text-blue-600 h-9 w-9 rounded-full flex items-center justify-center transition-colors flex-shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 sm:gap-4 md:gap-6">
            <button
              type="button"
              className="md:hidden p-2 rounded-full hover:bg-gray-100 active:bg-gray-200 transition-all duration-200"
            >
              <Moon className="w-6 h-6 text-gray-700" />
            </button>
          </div>
        </div>

        <div className="flex-1 mb-20">
          <Outlet context={{ search }} />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
