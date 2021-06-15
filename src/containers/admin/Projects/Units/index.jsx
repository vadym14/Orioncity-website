/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import "./index.scss";
// import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
// actions
import { setDataUnits } from "../../../../stores/reducers/projectSlice";

// icons
import { FaPen, FaTrash } from "react-icons/fa";
// ui
import {
  CDataTable,
  CModal,
  CModalHeader,
  CModalFooter,
  CModalBody,
  CButton,
} from "@coreui/react";
// components
import EditUnit from "../EditUnit";

const Units = (props) => {
  const dispatch = useDispatch();
  const { units } = useSelector((state) => state.projects);

  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [idDelete, setIdDelete] = useState(null);
  const [openEditUnit, setOpenEditUnit] = useState(false);
  const [editValues, setEditValues] = useState(null);

  const handleEditUser = (index, item) => {
    setEditValues({ index, item });
    setOpenEditUnit(true);
  };

  const handleConfirmDeleteUnit = (row) => {
    setIdDelete(row);
    setShowConfirmDelete(true);
  };

  const handleToggle = () => {
    setShowConfirmDelete(!showConfirmDelete);
  };

  const handleCancelDelete = () => {
    setShowConfirmDelete(false);
    setIdDelete(null);
  };

  const handleDeleteUnit = async () => {
    let newData = [];
    for (let i = 0; i < units.length; i++) {
      const el = units[i];
      if (i !== idDelete) {
        newData.push(el);
      }
    }

    await dispatch(setDataUnits(newData));
    handleToggle();
  };

  const handleToggleEdit = () => {
    setOpenEditUnit(!openEditUnit);
    setEditValues(null);
  };

  const handleSave = (values) => {
    let data = [];
    for (let i = 0; i < units.length; i++) {
      const el = units[i];
      if (i === editValues.index) {
        const obj = {
          ...el,
          ...values,
        };
        data.push(obj);
      } else {
        data.push(el);
      }
    }
    dispatch(setDataUnits(data));
    handleToggleEdit();
  };

  return (
    <div className="unitsView">
      <CModal show={showConfirmDelete} onClose={handleToggle} centered>
        <CModalHeader>Are you sure delete unit?</CModalHeader>
        <CModalFooter>
          <CButton color="default" onClick={handleCancelDelete}>
            Cancel
          </CButton>
          <CButton color="danger" onClick={handleDeleteUnit}>
            Delete
          </CButton>
        </CModalFooter>
      </CModal>

      <CModal show={openEditUnit} onClose={handleToggleEdit} centered>
        <CModalHeader>Edit Unit</CModalHeader>
        <CModalBody>
          <EditUnit
            data={editValues && editValues.item}
            onSave={handleSave}
            onClose={handleToggleEdit}
          />
        </CModalBody>
      </CModal>

      <CDataTable
        items={props.data ? props.data : units}
        fields={[
          { key: "unit", _classes: "font-weight-bold" },
          "size",
          "cost",
          "sale",
          "salePrice",
          // "updatedAt",
          { key: "_id", label: "Actions" },
        ]}
        hover
        striped
        itemsPerPage={5}
        activePage={1}
        pagination
        clickableRows
        // onRowClick={(item) => history.push(`/users/${item.id}`)}
        scopedSlots={{
          // updatedAt: (item) => (
          //   <td>{moment(item.updatedAt).format("MM/DD/YYYY H:mm")}</td>
          // ),
          _id: (item, row) => (
            <td className="tdActions">
              <a onClick={() => handleEditUser(row, item)}>
                <FaPen />
              </a>
              <a onClick={() => handleConfirmDeleteUnit(row)}>
                <FaTrash />
              </a>
            </td>
          ),
        }}
      />
    </div>
  );
};

export default Units;
