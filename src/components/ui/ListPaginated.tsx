import { usePagination } from "../../hooks";

interface DataProps {
  id: number;
  value: number;
}

interface Props {
  data: DataProps[];
}

export function ListPaginated({ data }: Props) {
  const { splitedData, currentPage, handleNextPage, handlePrevPage } =
    usePagination<DataProps[]>(data, 10);
  return (
    <>
      {splitedData.map(({ id, value }: DataProps) => (
        <div key={id}>{value}</div>
      ))}
      <p>Page: {currentPage}</p>
      <button onClick={() => handlePrevPage()} disabled={currentPage === 1}>
        Back
      </button>
      <button
        onClick={() => handleNextPage()}
        disabled={currentPage === Math.ceil(data.length / 10)}
      >
        Next
      </button>
    </>
  );
}
