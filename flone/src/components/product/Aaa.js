import PropTypes from "prop-types";
import React, { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ProductGridListSingle from "./ProductGridListSingle";
import axios from "../../service/axios"
import { useParams } from "react-router-dom";
// import service from '../../service/constants'

const Aaa = ({
  products,
  spaceBottomClass
}) => {
  const currency = useSelector((state) => state.currency);
  const { cartItems } = useSelector((state) => state.cart);
  const { wishlistItems } = useSelector((state) => state.wishlist);
  const { compareItems } = useSelector((state) => state.compare);

  const [abc, setfirst] = useState([])
const {id} =useParams()
  const getAllProducs =async() =>{
    try{
      await axios.get("/v5/category/"+id).then((res) =>{
        console.log("&&&&&&&", res)
        setfirst(res?.data)
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
      {abc.map(product => {
        return (
          <div className="col-xl-4 col-sm-6" key={product.id}>
            <ProductGridListSingle
              spaceBottomClass={spaceBottomClass}
              product={product}
              currency={currency}
              cartItem={
                cartItems.find(cartItem => cartItem.id === product.id)
              }
              wishlistItem={
                wishlistItems.find(
                  wishlistItem => wishlistItem.id === product.id
                )
              }
              compareItem={
                compareItems.find(
                  compareItem => compareItem.id === product.id
                )
              }
            />
          </div>
        );
      })}
    </Fragment>
  );
};

Aaa.propTypes = {
  products: PropTypes.array,
  spaceBottomClass: PropTypes.string,
};

export default Aaa;

