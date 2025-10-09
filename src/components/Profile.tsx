import React from "react";

const Profile = () => {
  const [activeTab, setActiveTab] = React.useState<
    "all" | "completed" | "canceled"
  >("all");

  return (
    <div className="px-3 flex flex-col gap-6">
      <div className="flex flex-col bg-white p-4 rounded-xl w-full shadow-sm">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex items-center gap-4 lg:w-80 flex-shrink-0">
            <div className="w-20 h-20 rounded-full bg-indigo-300 flex-shrink-0" />
            <div className="flex flex-col justify-center">
              <h2 className="text-xl font-semibold text-gray-900">
                Robert Fox
              </h2>
              <p className="text-sm text-gray-500">robert@gmail.com</p>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row flex-1 gap-8">
            <hr className="hidden lg:block border-l border-gray-300 h-[110px] ml-4" />

            <div className="flex-1">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
                Personal Information
              </h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <span className="text-sm text-gray-600 w-36">
                    Contact Number
                  </span>
                  <span className="text-sm font-medium text-gray-900">
                    (201) 555-0124
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="text-sm text-gray-600 w-36">
                    Date of Birth
                  </span>
                  <span className="text-sm font-medium text-gray-900">
                    1 Jan, 1985
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="text-sm text-gray-600 w-36">
                    Member Since
                  </span>
                  <span className="text-sm font-medium text-gray-900">
                    3 March, 2023
                  </span>
                </div>
              </div>
            </div>

            <hr className="hidden lg:block border-l border-gray-300 h-[110px]" />

            <div className="flex-1">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
                Shipping Address
              </h3>
              <p className="text-sm text-gray-900 mb-6">
                3517 W. Gray St. Utica, Pennsylvania 57867
              </p>

              <div className="flex gap-8">
                <div>
                  <div className="text-3xl font-bold text-gray-900">150</div>
                  <div className="text-sm text-gray-500 mt-1">Total Order</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-gray-900">140</div>
                  <div className="text-sm text-gray-500 mt-1">Completed</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-gray-900">10</div>
                  <div className="text-sm text-gray-500 mt-1">Canceled</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom: Tabs */}
        <div>
          <div className="flex gap-8">
            <button
              onClick={() => setActiveTab("all")}
              className={`text-sm font-medium pb-2 border-b-2 transition-colors ${
                activeTab === "all"
                  ? "text-blue-600 border-blue-600"
                  : "text-gray-500 border-transparent hover:text-gray-700"
              }`}
            >
              All Orders
            </button>
            <button
              onClick={() => setActiveTab("completed")}
              className={`text-sm font-medium pb-2 border-b-2 transition-colors ${
                activeTab === "completed"
                  ? "text-blue-600 border-blue-600"
                  : "text-gray-500 border-transparent hover:text-gray-700"
              }`}
            >
              Completed
            </button>
            <button
              onClick={() => setActiveTab("canceled")}
              className={`text-sm font-medium pb-2 border-b-2 transition-colors ${
                activeTab === "canceled"
                  ? "text-blue-600 border-blue-600"
                  : "text-gray-500 border-transparent hover:text-gray-700"
              }`}
            >
              Canceled
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
