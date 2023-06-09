import React, { useEffect, useState } from "react";
import { MobileBar } from "./MobileBar";
import { DesktopBar } from "./DesktopBar";

interface ButtonProps {
  title: string;
  action: () => void;
  icon: JSX.Element;
  disabled?: Boolean;
}

interface Props {
  buttons: ButtonProps[];
  title: string;
}

export const NavBar = ({ title, buttons }: Props) => {
  const [state, setState] = useState({
    mobileView: false,
  });

  const { mobileView } = state;
  useEffect(() => {
    const setResponsiveness = () => {
      return window.innerWidth < 900
        ? setState((prevState) => ({ ...prevState, mobileView: true }))
        : setState((prevState) => ({ ...prevState, mobileView: false }));
    };

    setResponsiveness();
    window.addEventListener("resize", () => setResponsiveness());

    return () => {
      window.removeEventListener("resize", () => setResponsiveness());
    };
  }, []);
  return (
    <>
      {mobileView ? (
        <MobileBar title={title} buttons={buttons} />
      ) : (
        <DesktopBar title={title} buttons={buttons} />
      )}
    </>
  );
};
