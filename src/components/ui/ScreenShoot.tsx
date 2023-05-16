import { useScreenshot } from "usescreenshot-react";

import React, { useRef } from "react";

interface Props {
  children: JSX.Element | JSX.Element[];
}

export const ScreenShoot = ({ children }: Props) => {
  const { image, takeScreenshot, isError } = useScreenshot();
  const ref = useRef<HTMLDivElement>(null);

  const getImage = () => {
    if (!ref.current) {
      return;
    }
    takeScreenshot(ref.current, {
      backgroundColor: null,
      logging: false,
    }).catch(console.log);
  };

  return (
    <div>
      {isError && <p>Error</p>}
      <div ref={ref}>{children}</div>
      <h1>save</h1>
      {image && <img src={image} alt={"Screenshot"} />}
      <button onClick={getImage}>Take screenshot</button>
    </div>
  );
};
