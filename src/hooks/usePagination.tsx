import { useState } from "react";

interface DataProps {
  id: number;
  value: number;
}

export function usePagination<T>(data: DataProps[], limit: number) {
  const [splitedData, setSplitedData] = useState(data.slice(0, limit));
  const [currentPage, setCurrentPage] = useState(1);
  const handleNextPage = () => {
    setSplitedData(
      data.slice(currentPage * limit, currentPage * limit + limit)
    );
    setCurrentPage((prev) => prev + 1);
  };

  const handlePrevPage = () => {
    setSplitedData(
      data.slice(currentPage * limit - limit, currentPage * limit)
    );
    setCurrentPage((prev) => {
      return prev !== 0 ? prev - 1 : prev;
    });
  };
  return { splitedData, currentPage, handleNextPage, handlePrevPage };
}
