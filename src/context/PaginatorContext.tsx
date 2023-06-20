import React from "react";

interface IPaginationModel {
  pageSize: number,
  page: number,
}

interface Props {
  totalPages?: number;
  paginationModel: IPaginationModel;
  rowCountState?: number;
  fetchPaginationModel: (pagination: any) => void;
  fetchRowCountState: (pagination: any) => void;

}

const PaginatorContext = React.createContext<Props>({
  totalPages: 0,
  paginationModel: {
    pageSize: 25,
    page: 0,
  },
  rowCountState: 1,
  fetchPaginationModel: () => {},
  fetchRowCountState: () => {},
});

export default PaginatorContext;
