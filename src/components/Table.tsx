import { useState } from "react";

interface Transaction {
  id: string;
  customer: string;
  date: string;
  total: string;
  method: string;
  status: string;
}

// Mock API
const transactions: Transaction[] = Array(50)
  .fill(null)
  .map((_) => ({
    id: "#5089",
    customer: "Joseph Wheeler",
    date: "6 April, 2023",
    total: "$2,564",
    method: "CC",
    status: "Pending",
  }));

const SalesTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const totalPages = Math.ceil(transactions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentTransactions = transactions.slice(startIndex, endIndex);

  const getPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= Math.min(5, totalPages); i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className="px-3 flex flex-col  overflow-x-hidden">
      {/*for Responsive Table */}
      <div className="overflow-x-auto">
        <table className=" w-full rounded-t-xl bg-white border-collapse">
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
            {currentTransactions.map((transaction, index) => (
              <tr
                key={index}
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
                  <span className="font-medium text-amber-500">
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
      <div className=" p-3 rounded-b-xl bg-white flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
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
          <span>of {transactions.length}</span>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className="flex h-9 w-9 items-center justify-center rounded-md text-gray-600 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-transparent"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>

          {getPageNumbers().map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`h-9 w-9 rounded-md text-sm font-medium transition-colors ${
                currentPage === page
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "text-gray-600 hover:bg-gray-100"
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
            className="flex h-9 w-9 items-center justify-center rounded-md text-gray-600 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-transparent"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SalesTable;
