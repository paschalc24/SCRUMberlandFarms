import '../CSSComponents/Login.css';
import React, { useState } from "react";
import MainPage from "./MainPage.js";
import axios from 'axios'; 
import ClipLoader from "react-spinners/ClipLoader";
import Logo from '../Images/ukg-logo-white.png'
import Row from 'react-bootstrap/Row';
export default function Login() {
    const [isShown, setIsShown] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [employeeInfo, getEmployeeInfo] = useState('');
    const [managerView, getManagerView] = useState('');
    const [employeeName, getEmployeeName] = useState('');

    const [isLoading, setLoading] = useState(false);
    const [isError, setError] = useState(false);

    function handleChangeEmail(event) {
        setEmail(event.target.value);
    };

    function handleChangePassword(event) {
        setPassword(event.target.value);
    };
    
    function handleClick() {
        setLoading(true);
        var config = {
            method: 'get',
            url: 'http://127.0.0.1:8000/employee/get/',
            headers: { 
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            params: {
              'email': email,//'Gerald_Cunningham@fluffybunnyconsulting.com',
              'password': password//'cunninghamge' 
            }
          };
            
        axios(config)
          .then(function (response) {
            console.log(response.data)
            localStorage.setItem("employeeProfile", JSON.stringify(response.data["success"][0]["employeeProfile"]));
            const empInfo = JSON.parse(localStorage.getItem("employeeProfile"))["employee"];
            getEmployeeInfo(empInfo);
            getManagerView(empInfo.isManager);
            getEmployeeName(empInfo.firstName + " " + empInfo.lastName);
        
            setLoading(false);
            setIsShown(current => !current);
            setError(false);
          })
          .catch(function (error) {
            console.log(error);
            setLoading(false);
            setError(true);
          });
    }

    const FormHeader = props => (
        <h2 id="headerTitle">{props.title}</h2>
    );

    if(!isShown) {
        return (
            <div id="loginContainer">
            <div id="logoContainer">
                <Row className="row justify-content-center"><img src={Logo} id="logo-image" alt=""/></Row>
                <Row className="row justify-content-center" id="logo-text">Goal Manager</Row>
            </div>
            <div id="loginform">
            {<FormHeader title="Login" /> &&        
                <div>
                    <div className="rowLogin">
                        <label>Email</label>
                        <input type="text" placeholder="Enter your email" autoComplete="new-password" onChange={handleChangeEmail} value={email}/>
                    </div>  
                    <div className="rowLogin">
                        <label>Password</label>
                        <input type="password" placeholder="Enter your password" autoComplete="new-password" onChange={handleChangePassword} value={password}/>
                    </div>  
                    <div id="buttonLogin" className="rowLogin">
                        <button onClick={handleClick} disabled={isLoading}>Log in</button>
                        {
                            isLoading ? <ClipLoader color="#087C79" /> : ""
                        }
                        {
                            isError ? <p style={{color: "red"}}>Invalid email or password</p> : ""
                        }
                    </div>
                </div>
            }
        </div>
        </div>
        )
    } else {
        return (<MainPage employeeInfo={employeeInfo} managerView={managerView} employeeName={employeeName}/>)
    }
}


