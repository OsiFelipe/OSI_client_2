import { useEffect, useState } from "react";

interface QueryProps {
  query: string;
  field: string;
}

export const useFilter = <T,>(
  data: T[] | undefined,
  query: QueryProps = { query: "", field: "" }
) => {
  const [filteredData, setFilteredData] = useState<T[]>(data || []);
  useEffect(() => {
    if (data) {
      filterData(data, query);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, query]);

  const filterData = (data: T[], query: QueryProps) => {
    let result = data;
    if (query.query) {
      result = data.filter((item: any) =>
        item[`${query.field}`].toLowerCase().includes(query.query.toLowerCase())
      );
    }
    setFilteredData(result);
  };

  return {
    filteredData,
  };
};
