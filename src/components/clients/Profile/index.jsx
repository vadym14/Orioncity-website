import React, { useEffect } from "react";
import "./index.scss";

import { useDispatch, useSelector } from "react-redux";

// actions
import { getProfileApi, resetData } from "../../../stores/reducers/userSlice";

import { CContainer } from "@coreui/react";

// components
import MyAccount from "./MyAccount";
import EditProfile from "./EditProfile";

const ProfileContent = (props) => {
  const dispatch = useDispatch();

  const userSelector = useSelector((state) => state.users);

  useEffect(() => {
    return () => {
      dispatch(resetData());
    };
  }, [dispatch]);

  useEffect(() => {
    if (!userSelector.user) {
      dispatch(getProfileApi());
    }
  }, [dispatch, userSelector.user]);

  return (
    <div className="profileContent">
      <CContainer>
        <EditProfile />
        <MyAccount />
      </CContainer>
    </div>
  );
};

export default ProfileContent;
