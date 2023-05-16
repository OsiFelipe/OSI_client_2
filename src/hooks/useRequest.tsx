interface Props {
  endpoint: string;
  options?: RequestInit;
  success?: () => void;
  onError?: () => void;
}

export const useRequest = () => {
  const handleRequest = async ({
    endpoint,
    options,
    success,
    onError,
  }: Props): Promise<any> => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_DEV_API}/${endpoint}`,
        {
          ...options,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
      const data = await response.json();
      success && success();
      return data;
    } catch (error) {
      onError && onError();
      throw error;
    }
  };
  return { handleRequest };
};
