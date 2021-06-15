import React from "react";
import "react-quill/dist/quill.snow.css";
import "./index.scss";
import PropTypes from "prop-types";
// import { ImageResize } from "quill-image-resize-module";
import ReactQuill from "react-quill";

const MyEditor = ({ onChange, value }) => {
  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ font: [] }],
      [{ align: [] }],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link"],
      ["clean"],
      [{ color: [] }, { background: [] }],
    ],
  };

  const formats = [
    "header",
    "font",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "color",
    "align",
    "background",
  ];

  return (
    <div className="myEditor">
      <ReactQuill
        theme="snow"
        modules={modules}
        formats={formats}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

MyEditor.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
};

export default MyEditor;
