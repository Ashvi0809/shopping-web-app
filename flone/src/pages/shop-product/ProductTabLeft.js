import { Fragment, useEffect, useState } from "react"; 
import { useSelector } from "react-redux";
import { useParams, useLocation } from "react-router-dom";
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import RelatedProductSlider from "../../wrappers/product/RelatedProductSlider";
import ProductDescriptionTab from "../../wrappers/product/ProductDescriptionTab";
import ProductImageDescription from "../../wrappers/product/ProductImageDescription";
import  axios  from "../../service/axios";

const ProductTabLeft = () => {
  let { pathname } = useLocation();
  let { id } = useParams();
  const { products } = useSelector((state) => state.product);
  const product = products.find(product => product.id === id);
const [first, setfirst] = useState([])
  const getOneProduct = async () =>{
    await axios.get('/v5/'+id).then((res) =>{
      console.log("gghghhj",res.data.id)
      setfirst(res.data)
    })
  }
  useEffect(() => {
    getOneProduct()
  }, [])
  return (
    <Fragment>
      <SEO
        titleTemplate="Product Page"
        description="Product page of flone react minimalist eCommerce template."
      />

      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb 
          pages={[
            {label: "Home", path: process.env.PUBLIC_URL + "/" },
            {label: "Shop Product", path: process.env.PUBLIC_URL + pathname }
          ]} 
        />

        {/* product description with image */}
        <ProductImageDescription
          spaceTopClass="pt-100"
          spaceBottomClass="pb-100"
          product={first}
          galleryType="leftThumb"
        />

        {/* product description tab */}
        <ProductDescriptionTab
          spaceBottomClass="pb-90"
          productFullDesc={first.long_description}
        />

        {/* related product slider
        <RelatedProductSlider
          spaceBottomClass="pb-95"
          category={first.category}
        /> */}
      </LayoutOne>
    </Fragment>
  );
};


export default ProductTabLeft;
