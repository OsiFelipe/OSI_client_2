
import { useEffect, useState } from "react";
import PaginatorContext from "./PaginatorContext";

interface Props {
  children: JSX.Element | JSX.Element[];
}

const PaginatorProvider = ({ children }: Props) => {
  const [totalPages, setTotalPages] = useState(0);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 25,
  });
  const [rowCountState, setRowCountState] = useState(totalPages);

  const paginationModelHandler = async (pagination: any) => {
    setPaginationModel(pagination)
  }

  const rowCountModelHandler = async (pagination: any) => {
    setRowCountState(pagination)
  }

  return (
    <PaginatorContext.Provider
      value={{
        paginationModel,
        rowCountState,
        fetchPaginationModel: paginationModelHandler,
        fetchRowCountState: rowCountModelHandler,

      }}
    >
      {children}
    </PaginatorContext.Provider>
  );
};

export default PaginatorProvider;
