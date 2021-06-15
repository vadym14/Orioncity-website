/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import "./index.scss";
import moment from "moment";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

import { useDispatch, useSelector } from "react-redux";
// action
import {
  getAllUsersApi,
  getUserDetailApi,
  deleteUserApi,
  resetData,
} from "../../../stores/reducers/userSlice";

// icons
import { FaPen, FaTrash } from "react-icons/fa";
import {
  CDataTable,
  CBadge,
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

const Users = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { users, loading, isDeletedUser, error } = useSelector(
    (state) => state.users
  );

  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [idDelete, setIdDelete] = useState(null);

  useEffect(() => {
    dispatch(getAllUsersApi());
    return () => {
      dispatch(resetData());
    };
  }, [dispatch]);

  useEffect(() => {
    if (isDeletedUser) {
      toast.success("Deleted user successfully!");
      setIdDelete(null);
      setShowConfirmDelete(false);
      dispatch(getAllUsersApi());
    }

    return () => {
      dispatch(resetData());
    };
  }, [isDeletedUser, dispatch]);

  useEffect(() => {
    if (error) {
      console.log("error: ", error);
      toast.error(error.message);
    }

    return () => {
      dispatch(resetData());
    };
  }, [error, dispatch]);

  const getBadge = (status) => {
    switch (status) {
      case "active":
        return "success";
      case "inactive":
        return "secondary";
      case "blocked":
        return "danger";
      case "deleted":
        return "danger";
      default:
        return "primary";
    }
  };

  const handleEditUser = async (id) => {
    await dispatch(getUserDetailApi(id));
    await history.push(`/admin/users/${id}`);
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
    await dispatch(deleteUserApi(idDelete));
  };

  const handleCreateUser = () => {
    history.push("/admin/users/add");
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
        <CCardHeader>All Users</CCardHeader>
        <CCardBody>
          {loading ? (
            <LoadingContainer />
          ) : (
            <>
              <div style={{ textAlign: "right", marginBottom: 15 }}>
                <CButton color="success" onClick={handleCreateUser}>
                  Create User
                </CButton>
              </div>
              <CDataTable
                items={users}
                fields={[
                  { key: "firstName", _classes: "font-weight-bold" },
                  "lastName",
                  "email",
                  "phone",
                  "role",
                  "status",
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
                  firstName: (item) => <td>{item.firstName || ""}</td>,
                  lastName: (item) => <td>{item.lastName || ""}</td>,
                  phone: (item) => <td>{item.phone || ""}</td>,
                  status: (item) => (
                    <td>
                      <CBadge color={getBadge(item.status)}>
                        {item.status}
                      </CBadge>
                    </td>
                  ),
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
              {/* <CPagination
                activePage={1}
                onActivePageChange={pageChange}
                pages={5}
                doubleArrows={false}
                align="center"
              /> */}
            </>
          )}
        </CCardBody>
      </CCard>
    </div>
  );
};

export default Users;
