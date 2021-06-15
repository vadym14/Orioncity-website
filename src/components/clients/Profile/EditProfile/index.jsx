/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useRef, useState, useEffect } from "react";
import "./index.scss";

import { useSelector, useDispatch } from "react-redux";

// actions
import {
  updateProfileAvatarApi,
  updateProfileBackgroundApi,
  resetData,
} from "../../../../stores/reducers/userSlice";

import { FaCamera } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import {
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
  CButton,
} from "@coreui/react";
import { toast } from "react-toastify";

const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
};

const EditProfile = (props) => {
  const bgRef = useRef(null);
  const avtRef = useRef(null);
  const dispatch = useDispatch();
  const { user, isUploadedAvatar, isUploadedBackground } = useSelector(
    (state) => state.users
  );

  const [avatarImg, setAvatarImg] = useState(
    user && user.avatar
      ? `${process.env.REACT_APP_CLOUD_FRONT_URI}${user.avatar.key}`
      : "https://toppng.com/uploads/preview/roger-berry-avatar-placeholder-11562991561rbrfzlng6h.png"
  );
  const [backgroundImg, setBackgroundImg] = useState(
    user && user.backgroundCover
      ? `${process.env.REACT_APP_CLOUD_FRONT_URI}${user.backgroundCover.key}`
      : null
  );
  const [fileBackground, setFileBackground] = useState(null);

  useEffect(() => {
    if (isUploadedAvatar) {
      toast.success("Updated avatar successfully!");
      dispatch(resetData());
    }
  }, [isUploadedAvatar, dispatch]);

  useEffect(() => {
    if (isUploadedBackground) {
      toast.success("Updated background successfully!");
      dispatch(resetData());
    }
  }, [isUploadedBackground, dispatch]);

  const handleTriggerBg = () => {
    bgRef.current.click();
  };

  const handleTriggerAvt = () => {
    avtRef.current.click();
  };

  const handleChangeAvatar = async (e) => {
    const file = e.target.files[0];
    getBase64(file, (imageUrl) => setAvatarImg(imageUrl));

    const fd = new FormData();
    fd.append("avatar", file);

    await dispatch(updateProfileAvatarApi(fd));
  };

  const handleChangeBackground = (e) => {
    const file = e.target.files[0];
    setFileBackground(file);
    getBase64(file, (imageUrl) => setBackgroundImg(imageUrl));
  };

  const handleSaveBackground = async () => {
    const fd = new FormData();
    fd.append("background", fileBackground);
    await dispatch(updateProfileBackgroundApi(fd));
    await setFileBackground(null);
  };

  const handleCancelBackground = () => {
    setFileBackground(null);
    setBackgroundImg(null);
  };

  return (
    <div
      className="editProfile"
      style={{
        backgroundImage: `url(${backgroundImg ? backgroundImg : "none"})`,
      }}
    >
      <a className="uploadBg" onClick={handleTriggerBg}>
        <FaCamera />
        <input
          ref={bgRef}
          accept="image/x-png,image/jpeg"
          type="file"
          className="inputBg inputHide"
          name="background"
          onChange={handleChangeBackground}
        />
      </a>

      {backgroundImg && fileBackground && (
        <div className="actionBg">
          <CButton color="success" size="sm" onClick={handleSaveBackground}>
            Save
          </CButton>
          <CButton color="danger" size="sm" onClick={handleCancelBackground}>
            Cancel
          </CButton>
        </div>
      )}

      <div className="userInfo">
        <div className="avatar">
          <img src={avatarImg} alt="" />
          <a className="uploadAvatar" onClick={handleTriggerAvt}>
            <FaCamera />
            <input
              ref={avtRef}
              type="file"
              accept="image/x-png,image/jpeg"
              className="inputBg inputHide"
              name="avatar"
              onChange={handleChangeAvatar}
            />
          </a>
        </div>
        <h3>
          {user && user.firstName && user.lastName
            ? `${user.firstName} ${user.lastName}`
            : (user && user.email) || ""}
        </h3>

        <CDropdown className="moreOptions ml-auto">
          <CDropdownToggle caret={false}>
            <BsThreeDotsVertical />
          </CDropdownToggle>
          <CDropdownMenu placement="top-end">
            <CDropdownItem>Make Profile Private</CDropdownItem>
            <CDropdownItem>Edit Profile</CDropdownItem>
          </CDropdownMenu>
        </CDropdown>
      </div>
    </div>
  );
};

export default EditProfile;
