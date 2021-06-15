/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import "./index.scss";
import { useDispatch, useSelector } from "react-redux";
// actions
import { getProductsSilverLakeApi } from "../../../stores/reducers/projectSlice";
// ui
import { CContainer, CRow, CCol } from "@coreui/react";
// components
import CardItem from "../WestHollywood/CardItem";

const SilverLakeContent = (props) => {
  const dispatch = useDispatch();
  const { silverLakeProjects } = useSelector((state) => state.projects);

  useEffect(() => {
    dispatch(getProductsSilverLakeApi());
  }, [dispatch]);

  return (
    <div className="westHollywoodContent">
      <CContainer>
        <h1>SILVER LAKE, CALIFORNIA</h1>

        <div className="info">
          <p>
            Silver Lake is a neighborhood in Los Angeles that is flanked on the
            northeast by Atwater Village and Elysian Valley, on the southeast by
            Echo Park, on the southwest by Westlake, on the west by East
            Hollywood and on the northwest by Los Feliz.
          </p>
          <p>
            It was deemed one of “the city’s hippest neighborhoods” by the Los
            Angeles Times for its multitude of unique and locally owned bars,
            night clubs, cafes, restaurants and vintage/antique shops
          </p>
          <p>
            Silver Lake is also one of LA’s most walkable neighborhoods with
            everything conveniently located on Sunset Boulevard. The eclectic
            enclave boasts a booming arts scene, creative residents, and Sunset
            Junction serves as the heart of Silver Lake with its retail
            corridor.
          </p>

          <h4>AREA HIGHLIGHTS</h4>
          <ul>
            <li>
              Silver Lake is home to artists, writers, musicians, activists and
              entrepreneurs
            </li>
            <li>
              Silver Lake is extremely bikable with a bike lane that runs the
              length of Sunset Boulevard with plenty of bike raps
            </li>
            <li>
              Silver Lake is named after a reservoir and has plnety of outdoor
              space including the Silver Lake Recreation Center and multiple
              staircases that allow pedestrians up and down the neighborhood’s
              hills
            </li>
            <li>
              Silver Lake is considered the new mecca of the LGBT community
            </li>
          </ul>
        </div>

        <div className="detail">
          <CRow>
            {silverLakeProjects &&
              silverLakeProjects.length > 0 &&
              silverLakeProjects.map((item, i) => (
                <CCol key={i} md={6}>
                  <CardItem
                    id={item._id}
                    title={item.name || ""}
                    image={`${process.env.REACT_APP_CLOUD_FRONT_URI}${
                      (item.picture && item.picture.key) || ""
                    }`}
                  />
                </CCol>
              ))}
          </CRow>
        </div>
      </CContainer>
    </div>
  );
};

export default SilverLakeContent;
