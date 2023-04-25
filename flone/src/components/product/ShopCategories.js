import PropTypes from "prop-types";

import { setActiveSort } from "../../helpers/product";
import { useEffect, useState } from "react";
import axios from "../../service/axios";
import { Link } from "react-router-dom";

const ShopCategories = ({ categories, getSortParams }) => {
  const [abc, setfirst] = useState([]);
  const getAllCategory = async () => {
    try {
      await axios.get("/v2/getCategory").then((res) => {
        console.log("9999", res);
        setfirst(res.data);
      });
    } catch (err) {
      console.log("err", err);
    }
  };

 
  useEffect(() => {
    getAllCategory();
  }, []);


  return (
    <div className="sidebar-widget">
      <h4 className="pro-sidebar-title">Categories </h4>
      <div className="sidebar-widget-list mt-30">
        {categories ? (
          <ul>
            <li>
              <div className="sidebar-widget-list-left">
                <button
                  onClick={(e) => {
                    getSortParams("category", "");
                    setActiveSort(e);
                  }}
                >
                  <span className="checkmark" /> All Categories
                </button>
              </div>
            </li>

            <li>
              <div className="sidebar-widget-list-left">
                {abc.map((item) => {
                  return (
                    <>
                    <Link to = {`/shop-grid-standard/${item.id}`} >
                    <button    onClick={(e) => {
                    getSortParams("category", `${item.id}`);
                    setActiveSort(e);
                  }} >
                        <span className="checkmark" /> {item.category_name}{" "}
                      </button>
                    </Link>
                      
                    </>
                  );
                })}
              </div>
            </li>
          </ul>
        ) : (
          "No categories found"
        )}
      </div>
    </div>
  );
};

ShopCategories.propTypes = {
  categories: PropTypes.array,
  getSortParams: PropTypes.func,
};

export default ShopCategories;
