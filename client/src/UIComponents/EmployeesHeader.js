import React from "react";
import Button from 'react-bootstrap/Button';

import '../CSSComponents/EmployeesHeader.css';

import { BiChevronsLeft } from 'react-icons/bi';


function EmployeesHeader(props) {
    return(
        <div className="employees-header">
            <Button size='sm' className="goals-button" onClick={props.transition}>
                Goals
                <BiChevronsLeft size={30}/>
            </Button>
        </div>
    );
}

export default EmployeesHeader;