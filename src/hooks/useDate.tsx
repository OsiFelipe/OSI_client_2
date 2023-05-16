export const useDate = () => {
  const getStringFromDate = (date: Date): string => {
    const aux = date.setDate(date.getDate());
    return new Date(aux).toISOString().split("T")[0]; // yyyy-mm-dd
  };
  const getDateFromString = (date: string) => {
    return new Date(date).toLocaleDateString().split("T")[0];
  };

  const getDateFromDatabaseString = (date: string) => {
    return date.split("T")[0];
  };

  const getDateTimeFromDatabaseString = (date: string) => {
    return date.split(".")[0];
  };
  return {
    getStringFromDate,
    getDateFromString,
    getDateFromDatabaseString,
    getDateTimeFromDatabaseString,
  };
};
