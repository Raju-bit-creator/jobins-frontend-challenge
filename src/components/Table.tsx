import { useState } from "react";
import { transactions } from "../mock-data/Data";
import SearchFilterBar from "./SearchFilterBar";

interface Transaction {
  id: string;
  customer: string;
  date: string;
  total: string;
  method: string;
  status: string;
}

const SalesTable = () => {
  const [filters, setFilters] = useState({
    search: "",
    status: "All",
    dateRange: "All",
  });

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);

  // console.log("currentpage:", currentPage);
  // console.log("itemsPerPage:", itemsPerPage);

  const applyFilters = (data: Transaction[]): Transaction[] => {
    return data.filter((item) => {
      const matchesSearch =
        item.customer.toLowerCase().includes(filters.search.toLowerCase()) ||
        item.id.toLowerCase().includes(filters.search.toLowerCase());

      const matchesStatus =
        filters.status === "All" || item.status === filters.status;

      const itemDate = new Date(item.date);
      const now = new Date();
      let matchesDate = true;

      if (filters.dateRange === "Today") {
        matchesDate = itemDate.toDateString() === now.toDateString();
      } else if (filters.dateRange === "Last 7 days") {
        const sevenDaysAgo = new Date(now);
        sevenDaysAgo.setDate(now.getDate() - 7);
        matchesDate = itemDate >= sevenDaysAgo;
      } else if (filters.dateRange === "Last 30 days") {
        const thirtyDaysAgo = new Date(now);
        thirtyDaysAgo.setDate(now.getDate() - 30);
        matchesDate = itemDate >= thirtyDaysAgo;
      } else if (filters.dateRange === "Last 90 days") {
        const ninetyDaysAgo = new Date(now);
        ninetyDaysAgo.setDate(now.getDate() - 90);
        matchesDate = itemDate >= ninetyDaysAgo;
      }

      return matchesSearch && matchesStatus && matchesDate;
    });
  };

  const filteredTransactions = applyFilters(transactions);
  // console.log("filteredTransactions:", filteredTransactions);

  // Pagination
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentTransactions = filteredTransactions.slice(startIndex, endIndex);

  // console.log("totalPages:", totalPages);
  // console.log("currentTransactions:", currentTransactions);
  // console.log("filteredTransactions.length:", filteredTransactions.length);

  const getPageNumbers = (): number[] => {
    const pages: number[] = [];
    for (let i = 1; i <= Math.min(5, totalPages); i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <section>
      <SearchFilterBar
        transactionsData={transactions}
        activeFilters={filters}
        onFilterChange={(newFilters) => {
          setFilters(newFilters);
          setCurrentPage(1);
        }}
      />

      <div className="px-3 flex flex-col overflow-x-hidden">
        <div className="overflow-x-auto">
          <table className="w-full rounded-t-xl bg-white border-collapse">
            <thead>
              <tr className="border-b border-gray-200">
                {[
                  "ID",
                  "Customer",
                  "Date",
                  "Total",
                  "Method",
                  "Status",
                  "Action",
                ].map((col) => (
                  <th
                    key={col}
                    className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 whitespace-nowrap"
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {currentTransactions.map((transaction) => (
                <tr
                  key={transaction.id}
                  className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors"
                >
                  <td className="px-4 py-4 text-sm text-gray-900">
                    {transaction.id}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-900">
                    {transaction.customer}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-900">
                    {transaction.date}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-900">
                    {transaction.total}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-900">
                    {transaction.method}
                  </td>
                  <td className="px-4 py-4 text-sm">
                    <span
                      className={`font-medium ${
                        transaction.status === "Completed"
                          ? "text-green-500"
                          : transaction.status === "Pending"
                          ? "text-amber-500"
                          : transaction.status === "Inactive"
                          ? "text-gray-400"
                          : "text-blue-500"
                      }`}
                    >
                      {transaction.status}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-sm">
                    <button className="font-medium text-blue-600 hover:text-blue-700 transition-colors">
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-3 rounded-b-xl bg-white flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span>Showing</span>
            <select
              value={itemsPerPage}
              onChange={(e) => {
                setItemsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="h-9 w-[70px] rounded-md border border-gray-300 bg-white px-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
            </select>
            <span>of {filteredTransactions.length}</span>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="flex h-9 w-9 items-center justify-center rounded-md text-gray-600 font-bold bg-gray-100 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
            >
              ‹
            </button>

            {getPageNumbers().map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`h-9 w-9 rounded-md  text-sm font-medium transition-colors ${
                  currentPage === page
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "text-gray-600 bg-gray-100 hover:bg-gray-100"
                }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(totalPages, prev + 1))
              }
              disabled={currentPage === totalPages}
              className="flex h-9 w-9 font-bold items-center justify-center rounded-md text-gray-600 bg-gray-100 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
            >
              ›
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SalesTable;
