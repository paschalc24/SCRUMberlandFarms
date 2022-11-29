import React, { useState } from "react";
import '../CSSComponents/createGoal.css';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios'; 
var qs = require('qs');
var FormData = require('form-data');

export default function Test() {
      var config = {
        method: 'get',
        url: 'http://127.0.0.1:8000/employee/get/',
        headers: { 
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        params: {
          'email': 'Gerald_Cunningham@fluffybunnyconsulting.com',
          'password': 'cunninghamge' 
        }
      };
      
      axios(config)
      .then(function (response) {
        console.log(response.data)
        sessionStorage.setItem("employeeProfile", JSON.stringify(response.data["success"][0]["employeeProfile"]));
        // console.log(JSON.parse(sessionStorage.getItem("employee")))
      })
      .catch(function (error) {
        console.log(error);
      });
  

    return (
        <>
        </>
    )
}