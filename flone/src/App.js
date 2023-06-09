import { Suspense, lazy } from "react";
import ScrollToTop from "./helpers/scroll-top";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Aaa from "./components/product/Aaa";
import Shop from './pages/shop/Shop'
import  AxiosInterceptor  from "./service/axios";
import onEnter from 'react-router-dom'
import PrivateRoute from './Protected'
import Protected from "./Protected";
// home pages
const HomeFashion = lazy(() => import("./pages/home/HomeFashion"));


// shop pages
const ShopGridStandard = lazy(() => import("./pages/shop/ShopGridStandard"));

// product pages

const ProductTabLeft = lazy(() =>
  import("./pages/shop-product/ProductTabLeft")
);





// other pages
const About = lazy(() => import("./pages/other/About"));
const Contact = lazy(() => import("./pages/other/Contact"));
const MyAccount = lazy(() => import("./pages/other/MyAccount"));
const LoginRegister = lazy(() => import("./pages/other/LoginRegister"));

const Cart = lazy(() => import("./pages/other/Cart"));
const Wishlist = lazy(() => import("./pages/other/Wishlist"));
const Compare = lazy(() => import("./pages/other/Compare"));
const Checkout = lazy(() => import("./pages/other/Checkout"));

const NotFound = lazy(() => import("./pages/other/NotFound"));

const App = ({component: Component, ...rest}) => {

// function requireAuth(nextState, replace, next) {
//   if (! localStorage.accessToken) {
//     console.log('bvgvhghgh')
//     replace({
//       pathname: "/login",
//       state: {nextPathname: nextState.location.pathname}
//     });
//   }
//   next();
// }
  return (
      <Router>
        <ScrollToTop>
          <Suspense
            fallback={
              <div className="flone-preloader-wrapper">
                <div className="flone-preloader">
                  <span></span>
                  <span></span>
                </div>
              </div>
            }
          >
            <Routes>
               {/* Homepages */}
              <Route
                path={process.env.PUBLIC_URL + "/"}
                element={<HomeFashion/>}
              />
              {/* Shop pages */}
              <Route
                path={process.env.PUBLIC_URL + "/shop-grid-standard"}
                element={<ShopGridStandard/>}
              />
              
              {/* Shop product pages */}
              
              <Route
                path={process.env.PUBLIC_URL + "/product-tab-left/:id"}
                element={<ProductTabLeft/>}
              />
              

             
              {/* Other pages */}
              <Route
                path={process.env.PUBLIC_URL + "/about"}
                element={<About/>}
              />
              <Route
                path={process.env.PUBLIC_URL + "/contact"}
                element={<Contact/>}
              />
              <Route
                path={process.env.PUBLIC_URL + "/my-account"}
                element={<MyAccount/>}
              />
              <Route
                path={process.env.PUBLIC_URL + "/login-register"}
                element={<LoginRegister/>}
              />

              <Route
                path={process.env.PUBLIC_URL + "/cart"}
                element={<Cart/>}
              />
              <Route
                path={process.env.PUBLIC_URL + "/wishlist"}
                element={<Wishlist/>}
              />
              <Route
                path={process.env.PUBLIC_URL + "/compare"}
                element={<Compare/>}
              />
              {/* <Route
              //  {...rest}
              //  render={(props) =>
              //    token ? (
              //      <Component {...props} />
              //    ) : (
              //      <Redirect
              //        to={{
              //          pathname: '/login',
              //          state: { from: props.location }
              //        }}
              //      />
              //    )
              //  }
                path={process.env.PUBLIC_URL + '/checkout'}
                element={<Checkout/> } 
              />  */}

       
        <Route path='/checkout'  element={<Protected Component={Checkout}/> }/>

              <Route
                path={process.env.PUBLIC_URL + '/login-register'}
                element={<HomeFashion/> } 
              /> 
               <Route
                path={process.env.PUBLIC_URL + "/shop-grid-standard/:id"}
               element={<Shop/>}
              /> 

              <Route path="*" element={<NotFound/>} />
            </Routes>
          </Suspense>
        </ScrollToTop>
      </Router>
  );
};

export default App;