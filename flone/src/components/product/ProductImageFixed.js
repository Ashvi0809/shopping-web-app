import PropTypes from "prop-types";
import service from "../../service/constants";


const ProductImageFixed = ({ product }) => {
  return (
    <div className="product-large-image-wrapper">

      {product.discount || product.new ? (
        <div className="product-img-badges">
          {product.discount ? (
            <span className="pink">-{product.discount}%</span>
          ) : (
            ""
          )}
          {product.new ? <span className="purple">New</span> : ""}
        </div>
      ) : (
        ""
      )}

      <div className="product-fixed-image">

        {product.image ? (
          <img
            src={ service.API_URL + '/' + product?.image}
            alt=""
            className="img-fluid"
          />
        ) : (
          ""
        )}
      </div>
    
    </div>
  );
};

ProductImageFixed.propTypes = {
  product: PropTypes.shape({})
};

export default ProductImageFixed;
