/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import "./index.scss";
import moment from "moment";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

import { useDispatch, useSelector } from "react-redux";
// action
import {
  getAllCitiesApi,
  resetData,
  getDetailCityApi,
  deleteCityApi,
} from "../../../stores/reducers/citySlice";

// icons
import { FaPen, FaTrash } from "react-icons/fa";
import {
  CDataTable,
  CCard,
  CCardHeader,
  CCardBody,
  CModal,
  CModalHeader,
  CModalFooter,
  CButton,
} from "@coreui/react";
// components
import LoadingContainer from "../../../components/clients/common/Loading";

const Cities = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { citiesOfProjects, loading, error, isDeletedCity } = useSelector(
    (state) => state.cities
  );

  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [idDelete, setIdDelete] = useState(null);

  useEffect(() => {
    dispatch(getAllCitiesApi());
    return () => {
      dispatch(resetData());
    };
  }, [dispatch]);

  useEffect(() => {
    if (isDeletedCity) {
      toast.success("Deleted city successfully!");
      setIdDelete(null);
      setShowConfirmDelete(false);
      dispatch(getAllCitiesApi());
    }

    return () => {
      dispatch(resetData());
    };
  }, [isDeletedCity, dispatch]);

  useEffect(() => {
    if (error) {
      console.log("error: ", error);
      toast.error(error.message);
    }

    return () => {
      dispatch(resetData());
    };
  }, [error, dispatch]);

  const handleEditUser = async (id) => {
    await dispatch(getDetailCityApi(id));
    await history.push(`/admin/cities/${id}`);
  };

  const handleConfirmDeleteUser = (id) => {
    setIdDelete(id);
    setShowConfirmDelete(true);
  };

  const handleToggle = () => {
    setShowConfirmDelete(!showConfirmDelete);
  };

  const handleCancelDelete = () => {
    setShowConfirmDelete(false);
    setIdDelete(null);
  };

  const handleDeleteUser = async () => {
    await dispatch(resetData());
    await dispatch(deleteCityApi(idDelete));
  };

  const handleCreateCity = () => {
    history.push("/admin/cities/add");
  };

  return (
    <div className="adminUserPage">
      <CModal show={showConfirmDelete} onClose={handleToggle} centered>
        <CModalHeader closeButton>Are you sure delete user?</CModalHeader>
        <CModalFooter>
          <CButton color="default" onClick={handleCancelDelete}>
            Cancel
          </CButton>
          <CButton color="danger" onClick={handleDeleteUser}>
            Delete
          </CButton>
        </CModalFooter>
      </CModal>

      <CCard>
        <CCardHeader>All Cities</CCardHeader>
        <CCardBody>
          {loading ? (
            <LoadingContainer />
          ) : (
            <>
              <div style={{ textAlign: "right", marginBottom: 15 }}>
                <CButton color="success" onClick={handleCreateCity}>
                  Create City
                </CButton>
              </div>
              <CDataTable
                items={citiesOfProjects}
                fields={[
                  { key: "city", _classes: "font-weight-bold" },
                  "country",
                  "state",
                  "updatedAt",
                  { key: "_id", label: "Actions" },
                ]}
                hover
                striped
                itemsPerPage={5}
                activePage={1}
                pagination
                // clickableRows
                // onRowClick={(item) => history.push(`/users/${item.id}`)}
                scopedSlots={{
                  updatedAt: (item) => (
                    <td>{moment(item.updatedAt).format("MM/DD/YYYY H:mm")}</td>
                  ),
                  _id: (item) => (
                    <td className="tdActions">
                      <a onClick={() => handleEditUser(item._id)}>
                        <FaPen />
                      </a>
                      <a onClick={() => handleConfirmDeleteUser(item._id)}>
                        <FaTrash />
                      </a>
                    </td>
                  ),
                }}
              />
            </>
          )}
        </CCardBody>
      </CCard>
    </div>
  );
};

export default Cities;
