/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import "./index.scss";
import moment from "moment";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

import { useDispatch, useSelector } from "react-redux";
// action
import {
  getAllProjectsApi,
  deleteProjectApi,
  getDetailProject,
  resetData,
} from "../../../stores/reducers/projectSlice";

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

const Projects = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { adminProjects, loading, error, isDeletedProject } = useSelector(
    (state) => state.projects
  );

  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [idDelete, setIdDelete] = useState(null);

  useEffect(() => {
    dispatch(resetData());
    dispatch(getAllProjectsApi());
    return () => {
      dispatch(resetData());
    };
  }, [dispatch]);

  useEffect(() => {
    if (isDeletedProject) {
      toast.success("Deleted project successfully!");
      setIdDelete(null);
      setShowConfirmDelete(false);
      dispatch(getAllProjectsApi());
    }

    return () => {
      dispatch(resetData());
    };
  }, [isDeletedProject, dispatch]);

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
    await dispatch(getDetailProject(id));
    await history.push(`/admin/projects/${id}`);
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
    // await dispatch(resetData());
    await dispatch(deleteProjectApi(idDelete));
  };

  const handleCreateProject = () => {
    history.push("/admin/projects/add");
  };

  return (
    <div className="adminUserPage">
      <CModal show={showConfirmDelete} onClose={handleToggle} centered>
        <CModalHeader closeButton>Are you sure delete project?</CModalHeader>
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
        <CCardHeader>All Projects</CCardHeader>
        <CCardBody>
          {loading ? (
            <LoadingContainer />
          ) : (
            <>
              <div style={{ textAlign: "right", marginBottom: 15 }}>
                <CButton color="success" onClick={handleCreateProject}>
                  Create Project
                </CButton>
              </div>
              <CDataTable
                items={adminProjects}
                fields={[
                  { key: "name", _classes: "font-weight-bold" },
                  { key: "cityProject", label: "City" },
                  "userAssigned",
                  { key: "flagDashboard", label: "Show Dashboard" },
                  { key: "flagIndex", label: "Index" },
                  "status",
                  // "updatedAt",
                  { key: "_id", label: "Actions" },
                ]}
                hover
                pagination
                striped
                itemsPerPage={5}
                activePage={1}
                clickableRows
                // onRowClick={(item) => history.push(`/users/${item.id}`)}
                scopedSlots={{
                  userAssigned: (item) => (
                    <td>
                      {(item.userAssigned && item.userAssigned.firstName) || ""}{" "}
                      {(item.userAssigned && item.userAssigned.lastName) || ""}
                    </td>
                  ),
                  cityProject: (item) => (
                    <td>{(item.cityProject && item.cityProject.city) || ""}</td>
                  ),
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
            </>
          )}
        </CCardBody>
      </CCard>
    </div>
  );
};

export default Projects;
