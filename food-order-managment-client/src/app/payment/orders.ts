// Mocked ordersAxios function
const ordersAxios = async (page: number, rowsPerPage: number) => {
  // Simulated API response
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
      {
        id: "fd56cc8c-1389-47ec-a4c8-7e12bc61d742",
        name: "normal Order",
        status: "Pending",
        price: 1120.0,
        createdBy: "0772357299",
        createdAt: "2025-01-14T18:06:51.11",
        orderedAt: "2025-01-15T18:06:51.11",
      },
      {
        id: "fd56cc8c-1389-47ec-a4c8-7e12bc61d742",
        name: "normal Order",
        status: "Pending",
        price: 1120.0,
        createdBy: "0772357299",
        createdAt: "2025-01-14T18:06:51.11",
        orderedAt: "2025-01-15T18:06:51.11",
      },    {
        id: "fd56cc8c-1389-47ec-a4c8-7e12bc61d742",
        name: "normal Order",
        status: "Pending",
        price: 1120.0,
        createdBy: "0772357299",
        createdAt: "2025-01-14T18:06:51.11",
        orderedAt: "2025-01-15T18:06:51.11",
      },
      {
        id: "fd56cc8c-1389-47ec-a4c8-7e12bc61d742",
        name: "normal Order",
        status: "Pending",
        price: 1120.0,
        createdBy: "0772357299",
        createdAt: "2025-01-14T18:06:51.11",
        orderedAt: "2025-01-15T18:06:51.11",
      },
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
      pageSize: 5,
      sort: {
        empty: true,
        unsorted: true,
        sorted: false,
      },
      offset: 10,
      unpaged: false,
      paged: true,
    },
    totalPages: 2,
    totalElements: 11,
    last: true,
    size: 10,
    number: 1,
    sort: {
      empty: true,
      unsorted: true,
      sorted: false,
    },
    numberOfElements: 1,
    first: false,
    empty: false,
  };
};
export default ordersAxios;