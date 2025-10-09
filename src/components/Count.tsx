import { useEffect, useRef } from "react";
import gsap from "gsap";
import Graph from "../assets/graph.png";
import Graph2 from "../assets/yengraph.png";
import Usflag from "../assets/us.png";
import Brazilflag from "../assets/br.png";
import Australiaflag from "../assets/au.png";
import { FaArrowUp, FaChevronUp, FaChevronDown } from "react-icons/fa6";

const Counts = () => {
  const cardContainerRef = useRef<HTMLDivElement>(null);

  const card1 = {
    title: "Total Sales & Costs",
    days: "Last 7 days",
    count: 350,
    rate: 8.56,
    graph: Graph,
  };

  const card2 = {
    title: "Total Profit",
    days: "Last 7 days",
    count: 50,
    rate: 12,
    graph: Graph2,
  };

  const card3 = [
    {
      country: "United States",
      count: 30,
      rate: 25.8,
      flag: Usflag,
    },
    {
      country: "Brazil",
      count: 26,
      rate: 16.2,
      flag: Brazilflag,
    },
    {
      country: "Australia",
      count: 17,
      rate: 11.9,
      flag: Australiaflag,
    },
  ];

  useEffect(() => {
    if (cardContainerRef.current) {
      gsap.fromTo(
        cardContainerRef.current.children,
        { x: 100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          stagger: 0.2,
        }
      );
    }
  }, []);

  return (
    <div className="p-3 mt-4 flex flex-col gap-6 overflow-x-hidden">
      {/* Cards Grid */}
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 overflow-x-hidden"
        ref={cardContainerRef}
      >
        {/* Card 1 */}
        <div className="flex bg-white p-4 rounded-xl items-center w-full shadow-sm">
          <div className="p-6">
            <img src={card1.graph} alt="graph" />
          </div>
          <hr className="border-l border-gray-300 h-[100px] mx-4" />
          <div>
            <h4 className="text-[#0F2C42] text-sm font-bold">{card1.title}</h4>
            <p className="text-xs text-gray-500 mb-2">{card1.days}</p>
            <h4 className="text-2xl font-bold text-[#0F2C42] mb-1">
              ${card1.count.toLocaleString()}K
            </h4>
            <p className="text-sm text-green-500 font-medium flex items-center gap-1">
              <FaArrowUp />
              {card1.rate}K{" "}
              <span className="text-gray-400">vs {card1.days}</span>
            </p>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white p-4 rounded-xl shadow-sm">
          <div className="flex items-center w-full">
            <div className="">
              <img src={card2.graph} alt="graph" />
            </div>
            <div className="px-4">
              <h4 className="text-[#2f393f] text-sm font-bold">
                {card2.title}
              </h4>
              <p className="text-xs text-gray-500 mb-2">{card2.days}</p>
            </div>
          </div>
          <div className="mt-4">
            <h4 className="text-2xl font-bold text-[#0F2C42] mb-1">
              ${card2.count.toLocaleString()}K
            </h4>
            <p className="text-sm text-green-500 font-medium flex items-center gap-1">
              <FaArrowUp />
              {card2.rate}K{" "}
              <span className="text-gray-400">vs {card2.days}</span>
            </p>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex flex-col gap-4">
            {card3.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between gap-4"
              >
                {/* Left: Flag + Country + Count */}
                <div className="flex items-center gap-3 w-[40%]">
                  <img
                    src={item.flag}
                    alt={item.country}
                    className="w-6 h-6 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-sm font-semibold text-[#0F2C42]">
                      {item.count}K
                    </p>
                    <p className="text-xs text-gray-500">{item.country}</p>
                  </div>
                </div>

                {/* Middle: Progress bar */}
                <div className="w-[40%] bg-gray-200 rounded-full h-2">
                  <div
                    className="h-2 bg-[#0F60FF] rounded-full"
                    style={{ width: `${item.rate}%` }}
                  ></div>
                </div>

                {/* Right: Rate */}
                <div
                  className={`w-[20%] flex items-center justify-end text-right ${
                    item.rate > 20 ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {item.rate > 20 ? <FaChevronUp /> : <FaChevronDown />}
                  <p className="text-sm ml-2 font-semibold text-[#0F2C42]">
                    <span>{item.rate}%</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Counts;
