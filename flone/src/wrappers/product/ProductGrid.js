import { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { getProducts } from "../../helpers/product";
import ProductGridSingle from "../../components/product/ProductGridSingle";
import axios from "../../service/axios";
const ProductGrid = ({
  spaceBottomClass,
  category,
  type,
  limit
}) => {
  // const { products } = useSelector((state) => state.product);
  const currency = useSelector((state) => state.currency);
  const { cartItems } = useSelector((state) => state.cart);
  const { wishlistItems } = useSelector((state) => state.wishlist);
  const { compareItems } = useSelector((state) => state.compare);
  // const prods = getProducts(products, category, type, limit)
  const [first, setfirst] = useState([])
  const getAllProducs =async() =>{
    try{
      await axios.get("/v5/getProduct").then((res) =>{
        console.log("@&", res)
        setfirst(res.data)
    })
    }
    catch(err){
    console.log("err", err)
    }
    }
    useEffect(() => {
      getAllProducs()
    }, [])
  return (
    <Fragment>
      {first.map(product => {
        return (
          <div className="col-xl-3 col-md-6 col-lg-4 col-sm-6" key={product.id}>
            <ProductGridSingle
              spaceBottomClass={spaceBottomClass}
              product={product}
              currency={currency}
              cartItem={
                cartItems.find((cartItem) => cartItem.id === product.id)
              }
              wishlistItem={
                wishlistItems.find(
                  (wishlistItem) => wishlistItem.id === product.id
                )
              }
              compareItem={
                compareItems.find(
                  (compareItem) => compareItem.id === product.id
                )
              }
            />
          </div>
        );
      })}
    </Fragment>
  );
};

ProductGrid.propTypes = {
  spaceBottomClass: PropTypes.string,
  category: PropTypes.string,
  type: PropTypes.string,
  limit: PropTypes.number
};



export default ProductGrid;
