import React, { useEffect, useRef } from "react";
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController,
} from "chart.js";
import { Chart } from "react-chartjs-2";
import { ProdChartProps } from "../../interfaces/interfaces";
import styles from "../components.module.sass";

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController
);

interface Props {
  prodChartData: ProdChartProps;
}

const options = {
  responsive: true,
  interaction: {
    mode: "index" as const,
    intersect: false,
  },
  stacked: false,
  plugins: {
    title: {
      display: true,
      text: "Chart.js Line Chart - Multi Axis",
    },
    legend: {
      display: true,
      labels: {},
    },
  },
  scales: {
    y: {
      type: "linear" as const,
      display: true,
      position: "left" as const,
    },
    y1: {
      type: "linear" as const,
      display: true,
      position: "right" as const,
      grid: {
        drawOnChartArea: false,
      },
    },
  },
};

function triggerTooltip(chart: ChartJS | null) {
  const tooltip = chart?.tooltip;

  if (!tooltip) {
    return;
  }

  if (tooltip.getActiveElements().length > 0) {
    tooltip.setActiveElements([], { x: 0, y: 0 });
  } else {
    const { chartArea } = chart;

    tooltip.setActiveElements(
      [
        {
          datasetIndex: 0,
          index: 2,
        },
        {
          datasetIndex: 1,
          index: 2,
        },
      ],
      {
        x: (chartArea.left + chartArea.right) / 2,
        y: (chartArea.top + chartArea.bottom) / 2,
      }
    );
  }

  chart.update();
}

export const CombinedChart = ({
  prodChartData: { labels, dataset1, dataset2, dataset3 },
}: Props) => {
  const chartRef = useRef<ChartJS>(null);

  useEffect(() => {
    const chart = chartRef.current;

    triggerTooltip(chart);
  }, []);
  const data = {
    labels,
    datasets: [
      {
        type: "bar" as const,
        label: "Oil, BFPD",
        backgroundColor: "rgb(47, 99, 47)",
        borderWidth: 2,
        fill: false,
        data: dataset1,
        yAxisID: "y",
      },
      {
        type: "bar" as const,
        label: "Water, BFPD",
        backgroundColor: "rgb(53, 162, 235)",
        data: dataset2,
        borderColor: "white",
        borderWidth: 2,
        yAxisID: "y",
      },
      {
        type: "line" as const,
        label: "Gas, MCFD",
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgb(255, 99, 132)",
        data: dataset3,
        yAxisID: "y1",
      },
    ],
  };

  return (
    <div className={styles.chart}>
      <Chart ref={chartRef} type="bar" data={data} options={options} />
    </div>
  );
};
