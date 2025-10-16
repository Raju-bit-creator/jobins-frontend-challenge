import { useState } from "react";
import { Search, ChevronDown } from "lucide-react";

interface Transaction {
  id: string;
  customer: string;
  date: string;
  total: string;
  method: string;
  status: string;
}

interface SearchFilterBarProps {
  transactionsData: Transaction[];
  onFilterChange: (filters: {
    search: string;
    status: string;
    dateRange: string;
  }) => void;
  activeFilters: {
    search: string;
    status: string;
    dateRange: string;
  };
}

const SearchFilterBar = ({ onFilterChange }: SearchFilterBarProps) => {
  const [statusOpen, setStatusOpen] = useState(false);
  const [dateOpen, setDateOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [searchText, setSearchText] = useState("");
  const [selectedDateRange, setSelectedDateRange] = useState("All");

  const updateFilters = (
    updates: Partial<{ search: string; status: string; dateRange: string }>
  ) => {
    const filters = {
      search: updates.search ?? searchText,
      status: updates.status ?? selectedStatus,
      dateRange: updates.dateRange ?? selectedDateRange,
    };
    onFilterChange(filters);
  };

  const statusOptions = ["All", "Active", "Inactive", "Pending", "Completed"];
  const dateRanges = [
    "All",
    "Today",
    "Last 7 days",
    "Last 30 days",
    "Last 90 days",
  ];

  return (
    <section className="px-3 flex flex-col gap-6">
      <div className="flex items-center gap-4 py-3">
        {/* Status Dropdown */}
        <div className="relative bg-white p-2 rounded-md shadow-sm">
          <button
            onClick={() => setStatusOpen(!statusOpen)}
            className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 transition-colors"
          >
            Status: {selectedStatus}
            <ChevronDown className="h-4 w-4" />
          </button>
          {statusOpen && (
            <div className="absolute left-0 top-full mt-2 w-40 rounded-md border border-gray-200 bg-white shadow-lg z-10">
              {statusOptions.map((status) => (
                <button
                  key={status}
                  onClick={() => {
                    setSelectedStatus(status);
                    setStatusOpen(false);
                    updateFilters({ status });
                  }}
                  className={`block w-full px-4 py-2 text-left text-sm transition-colors
                    ${
                      selectedStatus === status
                        ? "bg-blue-600 text-white"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                >
                  {status}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Search Input */}
        <div className="relative bg-white rounded-md shadow-sm w-[200px]">
          <input
            type="text"
            placeholder="Search..."
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
              updateFilters({ search: e.target.value });
            }}
            className="w-full h-9 pl-3 pr-8 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none"
          />
          <Search className="absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        </div>

        {/* Date Range Dropdown */}
        <div className="relative p-2 rounded-sm bg-white ml-auto">
          <button
            onClick={() => setDateOpen(!dateOpen)}
            className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 transition-colors"
          >
            {selectedDateRange === "All"
              ? "Filter by date range"
              : selectedDateRange}
            <ChevronDown className="h-4 w-4" />
          </button>
          {dateOpen && (
            <div className="absolute right-0 top-full mt-2 w-48 rounded-md border border-gray-200 bg-white shadow-lg z-10">
              {dateRanges.map((range) => (
                <button
                  key={range}
                  onClick={() => {
                    setSelectedDateRange(range);
                    setDateOpen(false);
                    updateFilters({ dateRange: range });
                  }}
                  className={`block w-full px-4 py-2 text-left text-sm transition-colors
                    ${
                      selectedDateRange === range
                        ? "bg-blue-600 text-white"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                >
                  {range}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default SearchFilterBar;
