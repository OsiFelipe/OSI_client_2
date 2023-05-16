import { Spinner } from "../ui/Spinner";
import { ErrorPage } from "./ErrorPage";

interface Props {
  error?: string;
  isLoading: boolean;
  content: JSX.Element | JSX.Element[];
}
export const ShowContent = ({ error, isLoading, content }: Props) => {
  if (error) return <ErrorPage />;
  if (isLoading) return <Spinner />;
  return <div>{content}</div>;
};
