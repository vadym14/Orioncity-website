import React from "react";
import "./index.scss";
import PropTypes from "prop-types";
import { numberWithCommas } from "../../../../../common";

const Units = ({ units }) => {
  const renderRow = () => {
    const results = [];
    let totalSize = 0;
    let totalCost = 0;
    let totalSales = 0;
    let totalSalePrice = 0;
    for (let i = 0; i < units.length; i++) {
      const item = units[i];

      totalSize += item.size;
      totalCost += item.cost;
      totalSales += item.sale;
      totalSalePrice += item.salePrice;

      results.push(
        <tr key={i}>
          <td>{numberWithCommas(item.unit) || ""}</td>
          <td>{numberWithCommas(item.size) || 0}</td>
          <td>{numberWithCommas(item.cost) || 0}</td>
          <td>{numberWithCommas(item.sale) || 0}</td>
          <td>{numberWithCommas(item.salePrice) || 0}</td>
        </tr>
      );
    }

    results.push(
      <tr key={units.length} className="trTotal">
        <td>Total</td>
        <td>{numberWithCommas(totalSize)}</td>
        <td>{numberWithCommas(totalCost)}</td>
        <td>{numberWithCommas(totalSales)}</td>
        <td>{numberWithCommas(totalSalePrice)}</td>
      </tr>
    );

    return results;
  };
  return (
    <div className="units">
      <table>
        <thead>
          <tr>
            <th>#Units</th>
            <th>Size (sqf)</th>
            <th>Cost $</th>
            <th>Sales $</th>
            <th>Sale Price</th>
          </tr>
        </thead>
        <tbody>{renderRow()}</tbody>
      </table>
    </div>
  );
};

Units.propTypes = {
  units: PropTypes.array.isRequired,
};

export default Units;
