import DesignerContext from "./DesignerContext";

interface Props {
  children: JSX.Element | JSX.Element[];
}

const DesignerProvider = ({ children }: Props) => {
  return (
    <DesignerContext.Provider value={{}}>{children}</DesignerContext.Provider>
  );
};

export default DesignerProvider;
