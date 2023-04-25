import React, { Fragment } from "react";
import { Link, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";

const LoginRegister = () => {
  let { pathname } = useLocation();
  const {
    register,
    handleSubmit,

  } = useForm();
  const submit = async (data) => {
    await axios
      .post("http://localhost:5005/api/v1/registerUser", data)
      .then((res) => {
        console.log(res.data);
      });
  };
  const login = async (data1) => {
    await axios
      .post("http://localhost:5005/api/v1/login",data1)
      .then((res) => {
       console.log(res)
       console.log(data1)
       const token = res.data.accessToken;
       console.log("token ---", res.data.accessToken)
            localStorage.setItem("token", token);
            return console.log({ message: "Token Seccessfull" });
      });
  };


  return (
    <Fragment>
      <SEO
        titleTemplate="Login"
        description="Login page of flone react minimalist eCommerce template."
      />
      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb
          pages={[
            { label: "Home", path: process.env.PUBLIC_URL + "/" },
            {
              label: "Login Register",
              path: process.env.PUBLIC_URL + pathname,
            },
          ]}
        />
        <div className="login-register-area pt-100 pb-100">
          <div className="container">
            <div className="row">
              <div className="col-lg-7 col-md-12 ms-auto me-auto">
                <div className="login-register-wrapper">
                  <Tab.Container defaultActiveKey="login">
                    <Nav variant="pills" className="login-register-tab-list">
                      <Nav.Item>
                        <Nav.Link eventKey="login">
                          <h4>Login</h4>
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="register">
                          <h4>Register</h4>
                        </Nav.Link>
                      </Nav.Item>
                    </Nav>
                    <Tab.Content>
                      <Tab.Pane eventKey="login">
                        <div className="login-form-container">
                          <div className="login-register-form">
                            <form onSubmit={handleSubmit(login)}>
                              <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                {...register("email")}
                              />
                              <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                {...register("password")}
                              />
                              <div className="button-box">
                                <div className="login-toggle-btn">
                                  <input type="checkbox" />
                                  <label className="ml-10">Remember me</label>
                                  <Link to={process.env.PUBLIC_URL + "/"}>
                                    Forgot Password?
                                  </Link>
                                </div>
                                <button type="submit">
                                  <span>Login</span>
                                </button>
                              </div>
                            </form>
                          </div>
                        </div>
                      </Tab.Pane>
                      <Tab.Pane eventKey="register">
                        <div className="login-form-container">
                          <div className="login-register-form">
                            <form onSubmit={handleSubmit(submit)}>
                              <input
                                type="text"
                                name="userName"
                                placeholder="Username"
                                {...register("userName")}
                              />
                              <input
                                name="email"
                                placeholder="Email"
                                type="email"
                                {...register("email")}
                              />
                              <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                {...register("password")}
                              />
                              <div className="button-box">
                                <button type="submit">
                                  <span>Register</span>
                                </button>
                              </div>
                            </form>
                          </div>
                        </div>
                      </Tab.Pane>
                    </Tab.Content>
                  </Tab.Container>
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

export default LoginRegister;
