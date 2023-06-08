import React from "react";
import { NavBar, ShowContent, StepperComponent } from "../../components";
import styles from "../main.module.sass";

export const StepperPage = () => {
  let content: JSX.Element | JSX.Element[];
  content = (
    <>
      <NavBar title="Designer" buttons={[]} />
      <div className={styles.pageContent}>
        <StepperComponent />
      </div>
    </>
  );

  return <ShowContent error={""} isLoading={false} content={content} />;
};
