import React from "react";
import "./index.scss";
import PropTypes from "prop-types";
import { numberWithCommas } from "../../../../../common";

const BasicInfo = ({ data }) => {
  return (
    <div className="basicInfo">
      <table>
        <tbody>
          <tr>
            <td className="textBold">Area</td>
            <td className="textBold bgGrey">{(data && data.area) || ""}</td>
            <td></td>
          </tr>
          <tr>
            <td className="textBold">Street</td>
            <td className="textBold bgGrey">{(data && data.street) || ""}</td>
            <td></td>
          </tr>
          <tr>
            <td>Cash Req For Lot Purchase</td>
            <td className="bgGrey">
              ${(data && numberWithCommas(data.cashReqForLotPurchase)) || 0}
            </td>
            <td className="bgGrey"></td>
          </tr>
          <tr>
            <td>Loan For Lot Purchase</td>
            <td className="bgGrey">
              ${(data && numberWithCommas(data.loanForLotPurchase)) || 0}
            </td>
            <td className="bgGrey"></td>
          </tr>
          <tr>
            <td>Total Lot/s Purchase Price</td>
            <td className="bgGrey"></td>
            <td className="bgGrey textBold">
              $
              {(data &&
                numberWithCommas(
                  data.loanForLotPurchase + data.cashReqForLotPurchase
                )) ||
                0}
            </td>
          </tr>

          <tr className="m-10">
            <td>Total Building cost</td>
            <td className="bgGrey"></td>
            <td className="bgGrey textBold">
              ${(data && numberWithCommas(data.totalBildingCost)) || 0}
            </td>
          </tr>

          <tr>
            <td>Lot Purchase Loan Fin Cost</td>
            <td className="bgGrey">
              ${(data && numberWithCommas(data.lotPurchaseLoanFinCost)) || 0}
            </td>
            <td className="bgGrey"></td>
          </tr>
          <tr>
            <td>Construction Fin Cost</td>
            <td className="bgGrey">
              ${(data && numberWithCommas(data.constructionFinCost)) || 0}
            </td>
            <td className="bgGrey"></td>
          </tr>
          <tr>
            <td>Total Fin cost</td>
            <td className="bgGrey"></td>
            <td className="bgGrey textBold">
              $
              {(data &&
                numberWithCommas(
                  data.constructionFinCost + data.lotPurchaseLoanFinCost
                )) ||
                0}
            </td>
          </tr>

          <tr className="m-10">
            <td>Soft cost</td>
            <td className="bgGrey"></td>
            <td className="bgGrey textBold">${(data && numberWithCommas(data.softCost)) || 0}</td>
          </tr>

          <tr className="m-10">
            <td className="textBold">Total cost</td>
            <td className="bgGrey"></td>
            <td className="bgGrey textRed">
              $
              {(data &&
                numberWithCommas(data.loanForLotPurchase +
                  data.cashReqForLotPurchase +
                  data.totalBildingCost +
                  data.constructionFinCost +
                  data.lotPurchaseLoanFinCost +
                  data.softCost)) ||
                0}
            </td>
          </tr>

          <tr>
            <td className="textBold">Additional required Equity</td>
            <td className="bgGrey">
              ${(data && numberWithCommas(data.additionalRequiredEquity)) || 0}
            </td>
            <td className="bgGrey textRed"></td>
          </tr>
          <tr>
            <td className="textBold">Total Cash Req For Project</td>
            <td className="bgGrey textRed">
              ${(data && numberWithCommas(data.totalCashReqForProject)) || 0}
            </td>
            <td className="bgGrey"></td>
          </tr>

          <tr className="m-10">
            <td className="textBold">Avg sale Price per sqf</td>
            <td className="bgGrey textBold">
              ${(data && numberWithCommas(data.avgSalePricePerSqf)) || 0}
            </td>
            <td className="bgGrey"></td>
          </tr>

          <tr>
            <td className="">Total expected Income</td>
            <td className="bgGrey"></td>
            <td className="bgGrey textRed">
              ${(data && numberWithCommas(data.totalExpectedIncome)) || 0}
            </td>
          </tr>
          <tr>
            <td className="">
              Sales Commission ({(data && numberWithCommas(data.salesCommissionPercent)) || 0}%)
            </td>
            <td className="bgGrey"></td>
            <td className="bgGrey ">
              $
              {data && data.salesCommissionPercent
                ? numberWithCommas(((data.totalExpectedIncome * data.salesCommissionPercent) / 100).toFixed(0))
                : 0}
            </td>
          </tr>
          <tr>
            <td className="">Net Revenue</td>
            <td className="bgGrey"></td>
            <td className="bgGrey textRed">
              $
              {data &&
                numberWithCommas((data.totalExpectedIncome -
                  (data.totalExpectedIncome * data.salesCommissionPercent) /
                    100).toFixed(0))}
            </td>
          </tr>

          <tr className="mt-10">
            <td className="">Profit per Project</td>
            <td className="bgGrey"></td>
            <td className="bgGrey textRed">
              ${(data && numberWithCommas(data.profitPerProject)) || 0}
            </td>
          </tr>
          <tr className="mb-10">
            <td className="">Profit per Project %</td>
            <td className="bgGrey"></td>
            <td className="bgGrey">
              {(data && data.profitPerProjectPercent) || 0}%
            </td>
          </tr>

          <tr className="mt-10">
            <td className="">
              Constructor Share{" "}
              <span className="percent">
                {(data && data.constructorSharePercent) || 0}%
              </span>
            </td>
            <td className="bgGrey"></td>
            <td className="bgGrey textRed">
              $
              {(data && numberWithCommas((data.profitPerProject * data.constructorSharePercent).toFixed(0))) ||
                0}
            </td>
          </tr>
          <tr className="mb-10">
            <td className="">
              Developer Share{" "}
              <span className="percent">
                {(data && data.developerSharePercent) || 0}%
              </span>
            </td>
            <td className="bgGrey"></td>
            <td className="bgGrey textRed">
              {(data && numberWithCommas((data.profitPerProject * data.developerSharePercent).toFixed(0))) ||
                0}
              %
            </td>
          </tr>

          <tr className="mt-10">
            <td className="">Total Cash on Cash</td>
            <td className="bgGrey">{data && data.totalCashOnCash}%</td>
            <td className="bgGrey textRed"></td>
          </tr>
          <tr className="">
            <td className="">Net Cash on Cash (Investors Share)</td>
            <td className="bgGrey tdBadget">{data && data.netCashOnCash}%</td>
            <td className="bgGrey textRed"></td>
          </tr>
          <tr className="">
            <td className="">Project Period (Month)</td>
            <td className="bgGrey">
              {(data && data.projectPeriodMonth) || 0}%
            </td>
            <td className="bgGrey textRed"></td>
          </tr>
          <tr className="">
            <td className="">Anual Return</td>
            <td className="bgGrey tdBadget">
              {(data && data.annualReturn) || 0}%
            </td>
            <td className="bgGrey textRed"></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

BasicInfo.propTypes = {
  data: PropTypes.object,
};

export default BasicInfo;
