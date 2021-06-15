import React from "react";
import "./index.scss";

import ReactApexChart from "react-apexcharts";

const PieApexcharts = ({ options, series, width }) => {
  return (
    <div id="chart" style={{ margin: "15px 0" }}>
      <ReactApexChart
        options={options}
        series={series}
        type="pie"
        width={width}
      />
    </div>
  );
};

export default PieApexcharts;
