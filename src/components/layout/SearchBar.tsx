import { useState } from "react";

interface Props {
  placeHolder?: string;
  title: string;
  onSubmit: (inputValue: string) => void;
}

export const SearchBar = ({ placeHolder, title, onSubmit }: Props) => {
  const [inputValue, setInputValue] = useState("");
  const handleSubmit = (event: any) => {
    event.preventDefault();
    if (inputValue) {
      onSubmit(inputValue);
      setInputValue("");
    }
  };
  return (
    <form>
      <input
        type="text"
        placeholder={placeHolder}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button disabled={inputValue === ""} onClick={handleSubmit}>
        {title}
      </button>
    </form>
  );
};
