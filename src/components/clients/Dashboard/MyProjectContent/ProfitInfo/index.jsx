import React from "react";
import "./index.scss";

const ProfitInfo = (props) => {
  return (
    <div className="profitInfo">
      <table>
        <thead>
          <tr>
            <th colSpan={2}></th>
            <th colSpan={8} className="textCenter bgWhiteBlue">
              Profit in $m. Sensitivity
            </th>
          </tr>
          <tr>
            <th colSpan={3}></th>
            <th colSpan={7} className="textCenter">
              Con. Cost Per Sqf
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className='textBold' width={40} rowSpan={9}>
              Avg. Sale Price Per Sqf
            </td>
            <td rowSpan={2} colSpan={2}></td>
            <td className="textBold">85%</td>
            <td className="textBold">90%</td>
            <td className="textBold">95%</td>
            <td className="textBold">100%</td>
            <td className="textBold">105%</td>
            <td className="textBold">110%</td>
            <td className="textBold">115%</td>
          </tr>
          <tr>
            <td className="textBold bgDark">$230</td>
            <td className="textBold bgDark">$243</td>
            <td className="textBold bgDark">$257</td>
            <td className="textBold bgDark textRed">$270</td>
            <td className="textBold bgDark">$284</td>
            <td className="textBold bgDark">$297</td>
            <td className="textBold bgDark">$311</td>
          </tr>
          <tr>
            <td className="textBold">85%</td>
            <td className="textBold bgDark">$680</td>
            <td>$2.49</td>
            <td>$2.36</td>
            <td>$2.24</td>
            <td>$2.11</td>
            <td>$1.99</td>
            <td>$1.86</td>
            <td>$1.74</td>
          </tr>
          <tr>
            <td className="textBold">90%</td>
            <td className="textBold bgDark">$720</td>
            <td>$2.82</td>
            <td>$2.70</td>
            <td>$2.58</td>
            <td>$2.45</td>
            <td>$2.33</td>
            <td>$2.20</td>
            <td>$2.08</td>
          </tr>
          <tr>
            <td className="textBold">95%</td>
            <td className="textBold bgDark">$760</td>
            <td>$2.82</td>
            <td>$2.70</td>
            <td>$2.58</td>
            <td>$2.45</td>
            <td>$2.33</td>
            <td>$2.20</td>
            <td>$2.08</td>
          </tr>
          <tr>
            <td className="textBold">100%</td>
            <td className="textBold bgDark textRed">$760</td>
            <td>$2.82</td>
            <td>$2.70</td>
            <td>$2.58</td>
            <td>$2.45</td>
            <td>$2.33</td>
            <td>$2.20</td>
            <td>$2.08</td>
          </tr>
          <tr>
            <td className="textBold">105%</td>
            <td className="textBold bgDark">$760</td>
            <td>$2.82</td>
            <td>$2.70</td>
            <td>$2.58</td>
            <td>$2.45</td>
            <td>$2.33</td>
            <td>$2.20</td>
            <td>$2.08</td>
          </tr>
          <tr>
            <td className="textBold">110%</td>
            <td className="textBold bgDark">$760</td>
            <td>$2.82</td>
            <td>$2.70</td>
            <td>$2.58</td>
            <td>$2.45</td>
            <td>$2.33</td>
            <td>$2.20</td>
            <td>$2.08</td>
          </tr>
          <tr>
            <td className="textBold">115%</td>
            <td className="textBold bgDark">$760</td>
            <td>$2.82</td>
            <td>$2.70</td>
            <td>$2.58</td>
            <td>$2.45</td>
            <td>$2.33</td>
            <td>$2.20</td>
            <td>$2.08</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ProfitInfo;
