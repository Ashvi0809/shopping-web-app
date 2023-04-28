import PropTypes from "prop-types";
import clsx from "clsx";
// import ProductgridList from "./ProductgridList";
import Aaa from "../../components/product/Aaa";

const ShopProducts = ({ products, layout }) => {
  return (
    <div className="shop-bottom-area mt-35">
      <div className={clsx("row", layout)}>
        <Aaa products={products} spaceBottomClass="mb-25" />
      </div>
    </div>
  );
};

ShopProducts.propTypes = {
  layout: PropTypes.string,
  products: PropTypes.array
};

export default ShopProducts;