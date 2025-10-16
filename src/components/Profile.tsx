import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

// for dynamic profile
const profileData = {
  avatar: {
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
    name: "Robert Fox",
    email: "robert@gmail.com",
  },
  personalInfo: [
    {
      label: "Contact Number",
      value: "(201) 555-0124",
    },
    {
      label: "Date of Birth",
      value: "1 Jan, 1985",
    },
    {
      label: "Member Since",
      value: "3 March, 2023",
    },
  ],
  address: {
    shipping: "3517 W. Gray St. Utica, Pennsylvania 57867",
  },
  stats: [
    {
      value: "150",
      label: "Total Order",
    },
    {
      value: "140",
      label: "Completed",
    },
    {
      value: "10",
      label: "Canceled",
    },
  ],
  tabs: [
    { id: "all", label: "All Orders" },
    { id: "completed", label: "Completed" },
    { id: "canceled", label: "Canceled" },
  ],
};

const Profile = ({ data = profileData }) => {
  const [activeTab, setActiveTab] = React.useState("all");

  const containerRef = useRef(null);
  const profileCardRef = useRef(null);
  const avatarRef = useRef(null);
  const infoSectionRef = useRef(null);
  const statsSectionRef = useRef(null);
  const tabsRef = useRef(null);

  useEffect(() => {
    // Initial positions (off-screen to the right)
    gsap.set(profileCardRef.current, { x: "100%" });
    gsap.set(avatarRef.current, { x: "100%", opacity: 0 });
    gsap.set(infoSectionRef.current, { x: "100%", opacity: 0 });
    gsap.set(statsSectionRef.current, { x: "100%", opacity: 0 });
    gsap.set(tabsRef.current, { x: "100%", opacity: 0 });

    // Main container animation
    const tl = gsap.timeline();

    tl.to(profileCardRef.current, {
      x: 0,
      duration: 0.8,
      ease: "power2.out",
    })
      .to(
        [avatarRef.current, infoSectionRef.current, statsSectionRef.current],
        {
          x: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: "power2.out",
        },
        "-=0.3"
      )
      .to(
        tabsRef.current,
        {
          x: 0,
          opacity: 1,
          duration: 0.4,
          ease: "power2.out",
        },
        "-=0.4"
      );

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section ref={containerRef} className="px-3 flex flex-col gap-6">
      <div
        ref={profileCardRef}
        className="flex flex-col bg-white p-4 rounded-xl w-full shadow-sm"
      >
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Avatar Section */}
          <div
            ref={avatarRef}
            className="flex items-center gap-4 lg:w-80 flex-shrink-0"
          >
            <div
              className="w-20 h-20 rounded-full bg-indigo-300 flex-shrink-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${data.avatar.image})` }}
            />
            <div className="flex flex-col justify-center">
              <h2 className="text-xl font-semibold text-gray-900">
                {data.avatar.name}
              </h2>
              <p className="text-sm text-gray-500">{data.avatar.email}</p>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row flex-1 gap-8">
            <hr className="hidden lg:block border-l border-gray-300 h-[110px] ml-4" />

            {/* Personal Info Section */}
            <div ref={infoSectionRef} className="flex-1">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
                Personal Information
              </h3>
              <div className="space-y-3">
                {data.personalInfo.map((item, index) => (
                  <div key={index} className="flex items-center">
                    <span className="text-sm text-gray-600 w-36">
                      {item.label}
                    </span>
                    <span className="text-sm font-medium text-gray-900">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <hr className="hidden lg:block border-l border-gray-300 h-[110px]" />

            {/* Stats & Address Section */}
            <div ref={statsSectionRef} className="flex-1">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
                Shipping Address
              </h3>
              <p className="text-sm text-gray-900 mb-6">
                {data.address.shipping}
              </p>

              <div className="flex gap-8">
                {data.stats.map((stat, index) => (
                  <div key={index}>
                    <div className="text-3xl font-bold text-gray-900">
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-500 mt-1">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom: Dynamic Tabs */}
        <div ref={tabsRef}>
          <div className="flex gap-8">
            {data.tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`text-sm font-medium pb-2 border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? "text-blue-600 border-blue-600"
                    : "text-gray-500 border-transparent hover:text-gray-700"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
