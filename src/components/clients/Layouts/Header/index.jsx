import React, { useState, useEffect } from "react";
import "./index.scss";
import { Link, useLocation, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// action
import { getProfileApi } from "../../../../stores/reducers/userSlice";
import { getAllCitiesApi } from "../../../../stores/reducers/citySlice";

import { FaUserCircle } from "react-icons/fa";
import {
  CNavbar,
  CToggler,
  CNavbarBrand,
  CCollapse,
  CNavbarNav,
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
  CContainer,
} from "@coreui/react";

import LogoPage from "../../../../assets/icons/logo-main.png";

const HeaderPage = (props) => {
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();

  // selectors
  const { citiesOfProjects } = useSelector((state) => state.cities);
  const profileState = useSelector((state) => state.users);
  
  const [isOpen, setIsOpen] = useState(false);

  const { pathname } = location;
  const checkLogin = localStorage.getItem("isLogin");

  useEffect(() => {
    dispatch(getProfileApi());
    dispatch(getAllCitiesApi());
  }, [dispatch]);

  const onLogout = () => {
    localStorage.removeItem("isLogin");
    localStorage.removeItem("orionToken");
    history.push("/login");
  };

  const handleViewProfile = () => {
    history.push("/profile");
  };

  const renderName = (user) => {
    if (user && user.firstName) {
      return user.firstName;
    } else if (user && user.email) {
      return user.email;
    } else {
      return "";
    }
  };

  const handleViewCity = (id) => {
    history.push(`/cities/${id}`);
  };

  return (
    <div className="headerPage">
      <CContainer>
        <CNavbar expandable="md" color="light" className=" navbar-light ">
          <CToggler
            className="navMobile"
            color="white"
            inNavbar
            onClick={() => setIsOpen(!isOpen)}
          />
          <CNavbarBrand>
            <Link to="/" className="logoPage">
              <img src={LogoPage} alt="" />
            </Link>
          </CNavbarBrand>
          <CCollapse show={isOpen} navbar>
            <CNavbarNav className="ml-auto">
              <Link to="/" className={`${pathname === "/" ? "active" : ""}`}>
                Home
              </Link>

              <CDropdown className="menuProjects">
                <CDropdownToggle color="secondary">Cities</CDropdownToggle>
                <CDropdownMenu>
                  {citiesOfProjects &&
                    citiesOfProjects.length > 0 &&
                    citiesOfProjects.map((item, i) => (
                      <CDropdownItem
                        key={i}
                        onClick={() => handleViewCity(item._id)}
                      >
                        {item.city ? item.city : item.state}
                      </CDropdownItem>
                    ))}
                </CDropdownMenu>
              </CDropdown>

              {/* <Link
                to="/west-hollywood"
                className={`${pathname === "/west-hollywood" ? "active" : ""}`}
              >
                WEST HOLLYWOOD
              </Link>
              <Link
                to="/silver-lake"
                className={`${pathname === "/silver-lake" ? "active" : ""}`}
              >
                SILVER LAKE
              </Link> */}

              <Link
                to="/dashboard"
                className={`${pathname === "/dashboard" ? "active" : ""}`}
              >
                DASHBOARD
              </Link>
            </CNavbarNav>
            <CNavbarNav className="ml-auto">
              {checkLogin && profileState ? (
                <CDropdown className="userMenu" inNav>
                  <CDropdownToggle color="primary">
                    <img
                      width={35}
                      src={
                        profileState &&
                        profileState.user &&
                        profileState.user.avatar
                          ? `${process.env.REACT_APP_CLOUD_FRONT_URI}${profileState.user.avatar.key}`
                          : "https://toppng.com/uploads/preview/roger-berry-avatar-placeholder-11562991561rbrfzlng6h.png"
                      }
                      alt=""
                    />
                    {renderName(profileState.user)}
                  </CDropdownToggle>
                  <CDropdownMenu placement="bottom-end">
                    <CDropdownItem onClick={handleViewProfile}>
                      Account
                    </CDropdownItem>
                    <CDropdownItem divider />
                    <CDropdownItem onClick={onLogout}>Log Out</CDropdownItem>
                  </CDropdownMenu>
                </CDropdown>
              ) : (
                <Link to="/login" className="btnLogin">
                  <FaUserCircle />
                  Log In
                </Link>
              )}
            </CNavbarNav>
          </CCollapse>
        </CNavbar>
      </CContainer>
    </div>
  );
};

export default HeaderPage;
