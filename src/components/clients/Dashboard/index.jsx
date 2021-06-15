import React, { useEffect } from "react";
import "./index.scss";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { colorsData } from "../../../common";
// actions
import { getMyProjectsDashboardApi } from "../../../stores/reducers/projectSlice";
import { getProfileApi } from "../../../stores/reducers/userSlice";

// ui
import { CContainer, CRow, CCol } from "@coreui/react";

// components
import CardItem from "./CardItem";
import InfoChart from "./InfoChart";
import LoadingContainer from "../common/Loading";

const numberWithCommas = (x) => {
  x = x.toString();
  var pattern = /(-?\d+)(\d{3})/;
  while (pattern.test(x)) x = x.replace(pattern, "$1,$2");
  return x;
};

const DashboardContent = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { loading, myProjects, chartData } = useSelector(
    (state) => state.projects
  );
  const { user } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(getProfileApi());
    dispatch(getMyProjectsDashboardApi());
  }, [dispatch]);

  useEffect(() => {
    if (user && user.role && user.role === "admin") {
      history.push("/admin");
    }
  }, [user, history]);

  useEffect(() => {
    const checkLogin = localStorage.getItem("isLogin");
    if (!checkLogin) {
      history.push("/login");
    }
  }, [history]);

  const dataChart1 = {
    series: chartData && chartData.investmentDistribution,
    options: {
      chart: {
        // width: props.width,
        type: "pie",
      },
      colors: colorsData,
      labels: chartData && chartData.chartLabels,
      plotOptions: {
        pie: {
          dataLabels: {
            offset: -22,
          },
        },
      },
      dataLabels: {
        formatter(val, opts) {
          const name = opts.w.globals.labels[opts.seriesIndex];
          const value = `$${numberWithCommas(
            dataChart1.series[opts.seriesIndex]
          )}`;
          return [name, value];
        },
        style: {
          textAlign: "center",
          fontSize: "13px",
        },
      },
      legend: {
        show: false,
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            legend: {
              position: "center",
            },
          },
        },
      ],
    },
  };

  const dataChart2 = {
    series: chartData && chartData.expectedReturn,
    options: {
      chart: {
        // width: props.width,
        type: "pie",
      },
      colors: colorsData,
      labels: chartData && chartData.chartLabels,
      plotOptions: {
        pie: {
          dataLabels: {
            offset: -22,
          },
        },
      },
      dropShadow: {
        enabled: true,
        top: 0,
        left: 0,
        blur: 3,
        opacity: 0.5,
      },
      dataLabels: {
        formatter(val, opts) {
          const name = opts.w.globals.labels[opts.seriesIndex];
          const value = `$${numberWithCommas(
            dataChart2.series[opts.seriesIndex]
          )}`;
          return [name, value];
        },
        style: {
          textAlign: "center",
          fontSize: "13px",
        },
      },
      legend: {
        show: false,
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            legend: {
              position: "center",
            },
          },
        },
      ],
    },
  };

  const renderItems = () => {
    const results = [];

    for (let i = 0; i < myProjects.length; i++) {
      const item = myProjects[i];
      results.push(
        <CCol md={6} key={i}>
          <CardItem
            id={item._id}
            image={`${process.env.REACT_APP_CLOUD_FRONT_URI}${
              item.picture && item.picture.key
            }`}
            title={item.name}
            investmentDate={item.investmentDate}
            investmentAmount={item.investmentAmount}
            estimatedReturn={item.estimatedReturn}
            totalRoi={item.totalRoi}
            anualRoi={item.anualRoi}
          />
        </CCol>
      );
    }

    return results;
  };

  return (
    <div className="dashboardContent">
      {loading ? (
        <LoadingContainer />
      ) : (
        <CContainer>
          <h2>Personal Investments</h2>

          <CRow>{renderItems()}</CRow>

          <CRow>
            <CCol lg={6}>
              <InfoChart
                title="Investment Distribution"
                total={`$${
                  (chartData &&
                    numberWithCommas(chartData.investmentDistributionTotal)) ||
                  0
                }`}
                options={dataChart1.options}
                series={dataChart1.series}
              />
            </CCol>
            <CCol lg={6}>
              <InfoChart
                title="Expected Return"
                total={`$${
                  (chartData &&
                    numberWithCommas(chartData.expectedReturnTotal)) ||
                  0
                }`}
                options={dataChart2.options}
                series={dataChart2.series}
              />
            </CCol>
          </CRow>
        </CContainer>
      )}
    </div>
  );
};

export default DashboardContent;
