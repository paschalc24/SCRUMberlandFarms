import React, { useState } from "react";
import '../CSSComponents/createGoal.css';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios'; 
var qs = require('qs');
var FormData = require('form-data');

export default function Test() {

    var data = qs.stringify({
        'email': 'Gerald_Cunningham@fluffybunnyconsulting.com',
        'password': 'cunninghamge' 
      });
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
        // console.log(response.data)
        sessionStorage.setItem("employee", JSON.stringify(response.data[0]["employeeProfile"]["employee"]));
        // console.log(JSON.parse(sessionStorage.getItem("employee")))
        // console.log("employee", JSON.stringify(response.data[0]["employeeProfile"]["employee"]));
      })
      .catch(function (error) {
        console.log(error);
      });
  

    return (
        <>
        </>
    )
}