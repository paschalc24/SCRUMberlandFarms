import React, { useState, useEffect } from "react";
import '../CSSComponents/createGoal.css';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios'; 
var qs = require('qs');
var FormData = require('form-data');

function createData(goalId, title, cdate, sdate, edate, status, manager, description) {
  return {
    goalId,
    title,
    cdate,
    sdate,
    edate,
    status,
    manager,
    description
  };
}

const convertDate = (date) => {
  const [year, month, day] = date.split('-');
  return new Date([month, day, year].join('/')).toDateString();
}

let loadData = (props) => {
  console.log("hi")
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

    let data = JSON.parse(sessionStorage.getItem("employeeProfile"))["goals"];
    for(let i = 0; i < data.length; i++) {
      props.goals.push(createData(data[i].goal.goalId, data[i].goal.title, convertDate(data[i].goal.creationDate), convertDate(data[i].goal.startDate), convertDate(data[i].goal.endDate), data[i].goal.status, data[i].goal.managerId, data[i].goal.textField))
    }
    const newList = props.goals.map(i => i);
    props.setGoals(newList);
  })
  .catch(function (error) {
    console.log(error);
  });
}

export default function Test(props) {

  useEffect(() => {
    loadData(props);
  }, []);
  
  return (
      <>
      </>
  )
}