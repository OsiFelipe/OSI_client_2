import { useEffect, useReducer, useState } from "react";
interface State<T> {
  data?: T;
  error?: Error;
}

export function useFetch<T>(
  url?: string,
  options?: RequestInit,
  next?: (res: any) => void
) {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<T>();
  const [error, setError] = useState<string>();
  const [, forceUpdate] = useReducer((x) => x + 1, 0);
  useEffect(() => {
    if (!url) return;
    fetchData();
  }, [url]);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `${process.env.REACT_APP_DEV_API}/${url}`,
        options
      );
      if (!response.ok) {
        throw new Error(response.statusText);
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

  return { isLoading, data, error, fetchData };
}
