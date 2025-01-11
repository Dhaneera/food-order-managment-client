import axios, { Axios } from "axios";


type Order = {
    id: string;
    name: string;
    status: string;
    price: number;
    createdBy: string;
    createdAt: string;
    orderedAt: string;
  };
  
  type Pageable = {
    pageNumber: number;
    pageSize: number;
    offset: number;
    unpaged: boolean;
    paged: boolean;
    sort: {
      empty: boolean;
      unsorted: boolean;
      sorted: boolean;
    };
  };
  
  type OrderResponse = {
    content: Order[];
    pageable: Pageable;
    totalPages: number;
    totalElements: number;
    last: boolean;
    size: number;
    number: number;
    sort: Pageable['sort'];
    numberOfElements: number;
    first: boolean;
    empty: boolean;
  };
  const ordsesAxios = async (pageNumber = 0, pageSize = 10): Promise<OrderResponse> => {
    try {
      const response = await axios.get<OrderResponse>(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/orders`,
        {
          params: { page: pageNumber, size: pageSize },
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Response Data:", response.data);
      return response.data;
    } catch (error: any) {
      console.error("Error:", error);
      throw error;
    }
  };

  export default ordsesAxios;