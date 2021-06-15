import React from "react";
import "./index.scss";

const ProductDetailContent = React.lazy(() =>
  import("../../../components/clients/ProductDetail")
);

const ProductDetail = (props) => {
  return <ProductDetailContent />;
};

export default ProductDetail;
