import React, { useEffect } from "react";
import "./index.scss";
import { useDispatch, useSelector } from "react-redux";
// actions
import { getProductsHollywoodApi } from "../../../stores/reducers/projectSlice";
// ui
import { CContainer, CRow, CCol } from "@coreui/react";
// components
import LoadingContainer from "../common/Loading";
import CardItem from "./CardItem";

const WestHollywoodContent = (props) => {
  const dispatch = useDispatch();
  const { hollywoodProjects, loading } = useSelector((state) => state.projects);

  useEffect(() => {
    dispatch(getProductsHollywoodApi());
  }, [dispatch]);

  return (
    <div className="westHollywoodContent">
      {loading ? (
        <LoadingContainer />
      ) : (
        <CContainer>
          <h1>WEST HOLLYWOOD, CALIFORNIA</h1>

          <div className="info">
            <p>
              The City of West Hollywood is like no other city in the world.
            </p>
            <p>
              In 1984, the idea for the City of West Hollywood was proposed by a
              coalition of LGBT activists, seniors, and renters. These groups
              came together to advocate for cityhood. Through tireless
              determination, the City of West Hollywood was officially
              incorporated as an independent City on November 29, 1984.
            </p>
            <p>
              The first West Hollywood City Council in 1984 established West
              Hollywood as the first City in the nation to have a majority
              openly gay governing body.
            </p>
            <p>
              Located in the heart of metropolitan Los Angeles, at 1.9 square
              miles, West Hollywood is a robust economic and cultural center
              instilled with idealism and creativity.
            </p>
            <p>
              West Hollywood shares boundaries with the cities of Beverly Hills
              and Los Angeles.
            </p>
            <p>
              A spirit of community activism and civic pride thrives in West
              Hollywood for many of its approximately 35,000 residents. For more
              than three decades, West Hollywood has been one of the most
              influential small cities in the nation; no other city of its size
              has had a greater impact on the national progressive public policy
              agenda. More than 40 percent of West Hollywood’s residents
              identify as lesbian, gay, bisexual, or transgender.
            </p>
            <p>
              The City of West Hollywood is filled with rich history. People
              from all over the globe visit West Hollywood for its iconic
              destinations such as The Sunset Strip for its unparalleled
              historical connection to music, entertainment, architecture,
              fashion, and culture-making; for Santa Monica Boulevard’s historic
              LGBT destinations and entertainment establishments; and for the
              Design District’s shopping, galleries, and restaurants.
            </p>
          </div>

          <div className="detail">
            <CRow>
              {hollywoodProjects &&
                hollywoodProjects.length > 0 &&
                hollywoodProjects.map((item, i) => (
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
      )}
    </div>
  );
};

export default WestHollywoodContent;
