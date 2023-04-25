import PropTypes from "prop-types";
import React, { Fragment, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getProductCartQuantity } from "../../helpers/product";
import Rating from "./sub-components/ProductRating";
import { addToCart } from "../../store/slices/cart-slice";
import { addToWishlist } from "../../store/slices/wishlist-slice";
import { addToCompare } from "../../store/slices/compare-slice";
import axios from "../../service/axios";
// import service from "../../service/constants";

const ProductDescriptionInfo = ({
  product,
  discountedPrice,
  currency,
  finalDiscountedPrice,
  finalProductPrice,
  cartItems,
  wishlistItem,
  compareItem,
}) => {
  const dispatch = useDispatch();
  const [xyz, setXyz] = useState(
    product.variation ? product.variation[0].color : ""
  );
  const [selectedProductSize, setSelectedProductSize] = useState(
    product.variation ? product.variation[0].size[0].name : ""
  );
  const [productStock, setProductStock] = useState(
    product.variation
      ? product.variation[0].size[0].item_stock
      : product.item_stock
  );
  const [quantityCount, setQuantityCount] = useState(1);

  const productCartQty = getProductCartQuantity(
    cartItems,
    product,
    xyz,
    selectedProductSize
  );
  const { id } = useParams();
  const [first, setfirst] = useState([]);
  const getOptions = async () => {
    await axios.get("/v8/" + id).then((res) => {
      console.log("fgfgfgghf", res);
      setfirst(res.data);
    });
  };
  useEffect(() => {
    getOptions();
  }, []);
  return (
    <div className="product-details-content ml-70">
      <h2>{product.title}</h2>
      <div className="product-details-price">
        {discountedPrice !== null ? (
          <Fragment>
            <span>{currency.currencySymbol + finalDiscountedPrice}</span>{" "}
            <span className="old">
              {currency.currencySymbol + finalProductPrice}
            </span>
          </Fragment>
        ) : (
          <span>{currency.currencySymbol + finalProductPrice} </span>
        )}
      </div>
      {product.rating && product.rating > 0 ? (
        <div className="pro-details-rating-wrap">
          <div className="pro-details-rating">
            <Rating ratingValue={product.rating} />
          </div>
        </div>
      ) : (
        ""
      )}
      <div className="pro-details-list">
        <p>{product.short_description}</p>
      </div>

      {/* {first.map((item) => {
        return (
          <>
            <label>
              <input type="radio" value={item.Variation_option.value} />
              <span>{item.Variation_option.value}</span>
            </label>
          </>
        );
      })} */}
      <div className="pro-details-size-color">
        <div className="pro-details-color-wrap">
          <span>Color</span>
          {/* <div className="pro-details-color-content">
        
                  <label
                    className={`pro-details-color-content--single ${first.Variation_option.value}`}
                 
                  >
                    <input
                      type="radio"
                      value={first.color}
                      name="product-color"
                      checked={
                        first.color === xyz ? "checked" : ""
                      }
                      onChange={() => {
                        setxyz(first.Variation_option.value);
                        
                        setProductStock(first.Variation_option.value);
                        setQuantityCount(1);
                      }}
                    />
                    <span className="checkmark"></span>
                  </label>
             
            </div> */}
          {first.map((item) => {
            // console.log(item.Variation_option.value,"1234t5y")
            return (
              <>
                <div className="pro-details-size-content">
                  <label
                    className={`pro-details-size-content--single`}
                  >
                    <input
                      type="radio"
                      value={item.Variation_option.value}
                      name="product-color"
                      checked={
                        item.Variation_option.value === xyz ? "checked" : ""
                      }
                      onChange={() => {
                        setXyz(item.Variation_option.value);
                        setProductStock(item.Variation_option.value);
                        setQuantityCount(1);
                      }}
                    />
                <span className="size-name">{item.Variation_option.value}</span>
                    
                    
                  </label>
                </div>
              </>
            );
          })}
        </div>
      </div>

      {product.affiliateLink ? (
        <div className="pro-details-quality">
          <div className="pro-details-cart btn-hover ml-0">
            <a
              href={product.affiliateLink}
              rel="noopener noreferrer"
              target="_blank"
            >
              Buy Now
            </a>
          </div>
        </div>
      ) : (
        <div className="pro-details-quality">
          <div className="cart-plus-minus">
            <button
              onClick={() =>
                setQuantityCount(quantityCount > 1 ? quantityCount - 1 : 1)
              }
              className="dec qtybutton"
            >
              -
            </button>

            <input
              className="cart-plus-minus-box"
              type="text"
              value={quantityCount}
              readOnly
            />
            <button
              onClick={() =>
                setQuantityCount(
                  quantityCount < product.item_stock - productCartQty
                    ? quantityCount + 1
                    : quantityCount
                )
              }
              className="inc qtybutton"
            >
              +
            </button>
          </div>
          <div className="pro-details-cart btn-hover">
            {product.item_stock && product.item_stock > 0 ? (
              <button
                onClick={() =>
                  dispatch(
                    addToCart({
                      ...product,
                      quantity: quantityCount,
                      xyz: xyz
                        ? xyz
                        : product.selectedProductColor
                        ? product.selectedProductColor
                        : null,
                      selectedProductSize: selectedProductSize
                        ? selectedProductSize
                        : product.selectedProductSize
                        ? product.selectedProductSize
                        : null,
                    })
                  )
                }
                disabled={productCartQty >= product.item_stock}
              >
                {" "}
                Add To Cart{" "}
              </button>
            ) : (
              <button disabled>Out of Stock</button>
            )}
          </div>
          <div className="pro-details-wishlist">
            <button
              className={wishlistItem !== undefined ? "active" : ""}
              disabled={wishlistItem !== undefined}
              title={
                wishlistItem !== undefined
                  ? "Added to wishlist"
                  : "Add to wishlist"
              }
              onClick={() => dispatch(addToWishlist(product))}
            >
              <i className="pe-7s-like" />
            </button>
          </div>
          <div className="pro-details-compare">
            <button
              className={compareItem !== undefined ? "active" : ""}
              disabled={compareItem !== undefined}
              title={
                compareItem !== undefined
                  ? "Added to compare"
                  : "Add to compare"
              }
              onClick={() => dispatch(addToCompare(product))}
            >
              <i className="pe-7s-shuffle" />
            </button>
          </div>
        </div>
      )}
      {product.category ? (
        <div className="pro-details-meta">
          <span>Categories :</span>
          <ul>
            {product.category.map((single, key) => {
              return (
                <li key={key}>
                  <Link to={process.env.PUBLIC_URL + "/shop-grid-standard"}>
                    {single}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ) : (
        ""
      )}
      {product.tag ? (
        <div className="pro-details-meta">
          <span>Tags :</span>
          <ul>
            {product.tag.map((single, key) => {
              return (
                <li key={key}>
                  <Link to={process.env.PUBLIC_URL + "/shop-grid-standard"}>
                    {single}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ) : (
        ""
      )}

      <div className="pro-details-social">
        <ul>
          <li>
            <a href="//facebook.com">
              <i className="fa fa-facebook" />
            </a>
          </li>
          <li>
            <a href="//dribbble.com">
              <i className="fa fa-dribbble" />
            </a>
          </li>
          <li>
            <a href="//pinterest.com">
              <i className="fa fa-pinterest-p" />
            </a>
          </li>
          <li>
            <a href="//twitter.com">
              <i className="fa fa-twitter" />
            </a>
          </li>
          <li>
            <a href="//linkedin.com">
              <i className="fa fa-linkedin" />
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

ProductDescriptionInfo.propTypes = {
  cartItems: PropTypes.array,
  compareItem: PropTypes.shape({}),
  currency: PropTypes.shape({}),
  discountedPrice: PropTypes.number,
  finalDiscountedPrice: PropTypes.number,
  finalProductPrice: PropTypes.number,
  product: PropTypes.shape({}),
  wishlistItem: PropTypes.shape({}),
};

export default ProductDescriptionInfo;
