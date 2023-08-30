import { Base64 } from "js-base64";

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
      const tokenInfo = localStorage.getItem("info");
      if (tokenInfo) {
        // var loop11 = Base64.decode(tokenInfo);
        // var loop22 = Base64.decode(loop11);
        // var loop33 = Base64.decode(loop22);
        // var loop44 = Base64.decode(loop33);
        // var loop55 = Base64.decode(loop44);
        // var loop66= Base64.decode(loop55);
        // var loop77 = Base64.decode(loop66);
        // let accessToken = loop77;
      }
      const response = await fetch(
        `${process.env.REACT_APP_DEV_API}/${endpoint}`,
        {
          ...options,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            token: `${tokenInfo}`,
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
