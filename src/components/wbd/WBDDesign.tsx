import { useContext } from "react";
import DataContext from "../../context/DataContext";
import styles from "../components.module.sass";
import { TitleComponent } from "../ui/TitleComponent";
import { ImageWbd } from "./ImageWbd";
import { Slider, useMediaQuery } from "@mui/material";
import { ProductProps } from "../../interfaces/interfaces";

const marks = [
  {
    value: 0,
    label: "0",
  },
  {
    value: 1,
    label: "1",
  },
  {
    value: 2,
    label: "2",
  },
  {
    value: 3,
    label: "3",
  },
  {
    value: 4,
    label: "4",
  },
  {
    value: 5,
    label: "5",
  },
];

export const WBDDesign = () => {
  const matches = useMediaQuery("(min-width:600px)");
  const {
    data: { wbdDesign },
    onUpdateTally,
  } = useContext(DataContext);

  const handleUpdateSize = (
    index: number,
    item: ProductProps,
    value: number | number[]
  ) => {
    onUpdateTally(index, { ...item, size: value }, true);
  };

  return (
    <>
      <TitleComponent title="Wellbore Design" />
      {wbdDesign.length > 0 && (
        <div className={styles.wbdContainer}>
          <table className={styles.tableWbd}>
            <thead>
              <tr>
                <th>Tool</th>
                <th>Detail</th>
                <th>Size Scale</th>
              </tr>
            </thead>
            <tbody>
              {wbdDesign.map((item, index) => (
                <tr key={index}>
                  <td style={{ width: "40%" }}>
                    <ImageWbd item={item} />
                  </td>
                  <td style={{ width: "30%" }}>
                    <div className={styles.toolDescription}>
                      {item.tool.name || item.tool.description}
                    </div>
                  </td>
                  <td style={{ width: "30%" }}>
                    <div>
                      <Slider
                        orientation="horizontal"
                        size={`${matches ? `medium` : `small`}`}
                        value={item.tool.size}
                        step={1}
                        marks={marks}
                        min={0}
                        max={5}
                        valueLabelDisplay="auto"
                        onChange={(_, value) =>
                          value && handleUpdateSize(index, item.tool, value)
                        }
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};
