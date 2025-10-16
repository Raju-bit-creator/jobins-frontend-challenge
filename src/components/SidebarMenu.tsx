import { useState } from "react";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { IoCartOutline } from "react-icons/io5";
import { FiStar, FiPlusCircle } from "react-icons/fi";
import { BiCube } from "react-icons/bi";
import Navbar from "./Navbar";
import Ground from "./Ground";
import logoSmall from "../assets/logo.png";

const SidebarMenu = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [active, setActive] = useState("/");

  const toggleSidebar = () => setIsExpanded(!isExpanded);

  const navItems = [
    { href: "/", label: "Dashboard", icon: <MdOutlineDashboardCustomize /> },
    {
      href: "/order-management",
      label: "Order Management",
      icon: <IoCartOutline />,
    },
    { href: "/brand", label: "Brand", icon: <FiStar /> },
    { href: "/add-product", label: "Add Product", icon: <FiPlusCircle /> },
    { href: "/product-list", label: "Product List", icon: <BiCube /> },
  ];

  return (
    <section className="flex">
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-screen font-rubik bg-white transition-all duration-300 ease-in-out z-40 ${
          isExpanded ? "w-60" : "w-12"
        }`}
      >
        <div className="flex flex-col items-center py-4">
          {/* Sidebar Logo */}
          <div className="cursor-pointer py-[1px] flex items-center justify-center gap-2">
            {isExpanded ? (
              <>
                <img className="h-8 w-10" src={logoSmall} alt="logo" />
                <span className="text-xl font-bold text-[#23272E]">JoBins</span>
              </>
            ) : (
              <img className="h-6 w-8" src={logoSmall} alt="logo" />
            )}
          </div>

          {/* Navigation Items */}
          <ul className="w-full mt-[12px]">
            {navItems.map((item, index) => (
              <li key={index}>
                <a
                  href={item.href}
                  onClick={() => setActive(item.href)}
                  className={`flex items-center gap-4 p-3 group transition-colors ${
                    active === item.href ? "bg-[#F3F4F8]" : "hover:bg-[#F3F4F8]"
                  }`}
                >
                  <span className="text-2xl text-[#23272E] group-hover:text-[#23272E]">
                    {item.icon}
                  </span>
                  <span
                    className={`text-sm font-medium transition-all duration-300 ease-in-out overflow-hidden whitespace-nowrap ${
                      isExpanded
                        ? "ml-2 opacity-100 max-w-[200px]"
                        : "opacity-0 max-w-0"
                    } text-[#23272E]`}
                  >
                    {item.label}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Main Content Area */}
      <div
        className={`flex flex-col transition-all duration-300 ease-in-out ${
          isExpanded ? "ml-60" : "ml-12"
        } w-full`}
      >
        {/* Navbar (Top) */}
        <Navbar isExpanded={isExpanded} toggleSidebar={toggleSidebar} />

        {/* below Navbar */}
        <Ground isExpanded={isExpanded} toggleSidebar={toggleSidebar} />
      </div>
    </section>
  );
};

export default SidebarMenu;
