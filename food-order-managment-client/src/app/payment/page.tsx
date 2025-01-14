"use client";
import React, { useState, useEffect } from "react";
import TableHeader from "../table/TableHeader";
import tableInterface from "../table/TableInteface";
import TableRow from "../table/TableRow";
import Header from "../components/Header";

const tableHeader: tableInterface[] = [
  { width: "25%", text: "Payment ID", style: "" },
  { width: "25%", text: "Order ID", style: "" },
  { width: "25%", text: "Amount", style: "" },
  { width: "25%", text: "Status", style: "" },
];


const ordersAxios = async (page: number, rowsPerPage: number) => {
  return {
    content: [
      {
        id: "fd56cc8c-1389-47ec-a4c8-7e12bc61d742",
        name: "normal Order",
        status: "Pending",
        price: 1120.0,
        createdBy: "0772357299",
        createdAt: "2025-01-14T18:06:51.11",
        orderedAt: "2025-01-15T18:06:51.11",
      },
    ],
    pageable: {
      pageNumber: 1,
      pageSize: 10,
      sort: { empty: true, unsorted: true, sorted: false },
      offset: 10,
      unpaged: false,
      paged: true,
    },
    totalPages: 2,
    totalElements: 11,
    last: true,
    size: 10,
    number: 1,
    sort: { empty: true, unsorted: true, sorted: false },
    numberOfElements: 1,
    first: false,
    empty: false,
  };
};

const Page = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [tableData, setTableData]: any = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const rowsPerPage = 10;

  const fetchData = async (page: number) => {
    setLoading(true);
    try {
      const data = await ordersAxios(page, rowsPerPage);
      setTableData(data.content);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  const tableRows = tableData.map((obj: any) => ({
    style: "",
    cellData: [
      { isButton: "Complete", text: obj.id, style: "" },
      { isButton: "", text: obj.name, style: "" },
      { isButton: "", text: `$${obj.price}`, style: "py-6" },
      { isButton: obj.status, text: obj.status, style: "px-3 py-2" },
    ],
  }));

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="w-screen h-screen flex flex-col max-lg:w-2/3">
      <div className="flex py-3 justify-between px-3">
        <Header />
      </div>
      <div className="w-full flex flex-col items-center">
        <div className="p-6 w-[85%] bg-white rounded-xl shadow-md">
          <h3 className="font-sans text-3xl font-semibold px-3 py-4">My Payments</h3>
          <table className="w-full border-collapse">
            <TableHeader header={tableHeader}></TableHeader>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={4} className="text-center py-4">
                    Loading...
                  </td>
                </tr>
              ) : (
                tableRows.map((row: any, index: any) => (
                  <TableRow key={index} cellData={row.cellData} styles={row.style} />
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="flex justify-center mt-4 space-x-4">
          <button
            onClick={handlePrevious}
            disabled={currentPage === 1}
            className={`px-4 py-2 bg-gray-200 rounded-l-3xl ${
              currentPage === 1 && "opacity-50 cursor-not-allowed"
            }`}
          >
            Previous
          </button>
          <span className="mt-2">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 bg-gray-200 rounded-r-3xl ${
              currentPage === totalPages && "opacity-50 cursor-not-allowed"
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;