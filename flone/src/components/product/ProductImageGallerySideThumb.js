import { Fragment, useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { EffectFade, Thumbs } from 'swiper';
import AnotherLightbox from "yet-another-react-lightbox";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Swiper, { SwiperSlide } from "../../components/swiper";
import service from "../../service/constants";
// import  axios from "../../service/axios";

const ProductImageGalleryLeftThumb = ({ product, thumbPosition }) => {
 
  return (
    <Fragment>
      <div className="row row-5 test">
  
      
            
                    <div className="single-image">
                      <img
                        src={service.API_URL + '/' + product.image}
                        className="img-fluid"
                        alt=""
                      />
                    </div>
                  

          </div>
   
    </Fragment>
  );
};

ProductImageGalleryLeftThumb.propTypes = {
  product: PropTypes.shape({}),
  thumbPosition: PropTypes.string
};

export default ProductImageGalleryLeftThumb;
