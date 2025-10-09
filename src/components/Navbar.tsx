import { useState, useEffect } from "react";
import { FaBell, FaUserCircle } from "react-icons/fa";
import { AlignLeft } from "lucide-react";

interface NavbarProps {
  isExpanded: boolean;
  toggleSidebar: () => void;
}

const Navbar = ({ isExpanded, toggleSidebar }: NavbarProps) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 right-0 ${
          isExpanded ? "h-[62px]" : "h-[54px]"
        } bg-[#f5f5f5] shadow flex items-center justify-between px-4 transition-all duration-300 ${
          isExpanded ? "w-[calc(100%-15rem)]" : "w-[calc(100%-3rem)]"
        }`}
      >
        <div className="relative w-full max-w-md">
          <div className="flex items-center">
            <AlignLeft
              onClick={toggleSidebar}
              className="mr-3 md:mr-6 text-[#8B909A] cursor-pointer"
            />
            <h4 className="text-xl text-[#23272E] font-bold">Dashboard</h4>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="bg-[#f6f7f9] rounded-full">
            <button className="text-gray-600 p-3 cursor-pointer hover:text-[#34aff4]">
              <FaBell size={20} />
            </button>
          </div>

          {isMounted && (
            <div className="flex items-center gap-2">
              <div className="bg-[#f6f7f9] rounded-full">
                <button className="text-gray-600 p-3 cursor-pointer hover:text-[#34aff4]">
                  <FaUserCircle size={20} />
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
