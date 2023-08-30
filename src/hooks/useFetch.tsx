import { useEffect, useReducer, useState } from "react";
interface State<T> {
  data?: T;
  error?: Error;
}

interface Pagination {
  page: any;
  totalPages: any;
  totalRecords: any;
}

export function useFetch<T>(
  url?: string,
  paginationOptions?: Record<string, any>,
  options?: RequestInit,
  next?: (res: any) => void
) {
  const [isLoading, setIsLoading] = useState(false);
  const [pagination, setPagination] = useState<Pagination>({
    page: 0,
    totalPages: 0,
    totalRecords: 0,
  });
  const [data, setData] = useState<T>();
  const [error, setError] = useState<string>();
  const [, forceUpdate] = useReducer((x) => x + 1, 0);
  useEffect(() => {
    if (!url) return;
    fetchData();
  }, [url, paginationOptions]);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      let urlComplete = new URL(`${process.env.REACT_APP_DEV_API}/${url}`);
      if (paginationOptions) {
        Object.keys(paginationOptions).forEach((key) =>
          urlComplete.searchParams.append(key, paginationOptions[key])
        );
      }
      const tokenInfo = localStorage.getItem("info");

      const response = await fetch(urlComplete, {
        ...options,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          token: `${tokenInfo}`,
        },
      });
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      if (response.headers.get("X-Current-Page")) {
        // Pass to PaginatorProvider
        setPagination({
          page: response.headers.get("X-Current-Page"),
          totalPages: response.headers.get("X-Total-Pages"),
          totalRecords: response.headers.get("X-Total-Records"),
        });
      }
      const res = await response.json();
      setData(res) as T;
      next && next(res);
      forceUpdate();
      setIsLoading(false);
    } catch (error) {
      setError("error");
    }
  };

  return { isLoading, data, error, fetchData, pagination };
}
