/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import "./index.scss";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import InfiniteScroll from "react-infinite-scroll-component";
// actions
import {
  getHomeProjectsApi,
  loadMorePagination,
} from "../../../stores/reducers/projectSlice";

import { CContainer, CRow, CCol, CSpinner } from "@coreui/react";

// components
import ItemHouse from "./ItemHouse";

const HomeContent = (props) => {
  const dispatch = useDispatch();
  const { flagProjects, error, offset, limit, hasMore } = useSelector(
    (state) => state.projects
  );

  useEffect(() => {
    dispatch(getHomeProjectsApi({ offset, limit }));
  }, [dispatch, offset, limit]);

  useEffect(() => {
    if (error) {
      console.log("error: ", error);
      toast.error(error);
    }
  }, [error]);

  const getProjectsData = async () => {
    await dispatch(loadMorePagination());
  };

  return (
    <InfiniteScroll
      dataLength={flagProjects.length}
      next={getProjectsData}
      hasMore={hasMore}
      loader={
        <div style={{ textAlign: "center" }}>
          <CSpinner
            color="primary"
            style={{ width: "3rem", height: "3rem", margin: "10px auto" }}
          />
        </div>
      }
      endMessage={
        <p style={{ textAlign: "center" }}>
          <b>Yay! You have seen it all</b>
        </p>
      }
    >
      <div className="homeContent">
        {/* {loading ? (
        <LoadingContainer />
      ) : ( */}
        <CContainer>
          <div className="content">
            <CRow className="">
              {flagProjects &&
                flagProjects.length > 0 &&
                flagProjects.map((item, i) => (
                  <CCol md={12} key={i} style={{ marginBottom: 15 }}>
                    <ItemHouse project={item} />
                  </CCol>
                ))}
            </CRow>
          </div>
        </CContainer>
        {/* )} */}
      </div>
    </InfiniteScroll>
  );
};

export default HomeContent;
