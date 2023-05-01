import React from 'react';
import {  Route, useNavigate } from 'react-router-dom';

function Protected(props) {
    const {Component} = props
    const navigate = useNavigate()
  const token = localStorage.getItem('token');
if(!token){
    navigate('/login-register')
}
  return (
    <div>
        <Component/>
    </div>
  );
}

export default Protected;