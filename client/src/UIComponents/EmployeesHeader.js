import React from "react";
import Button from 'react-bootstrap/Button';
import CreateManagerGoal from "./CreateManagerGoal.js";
import '../CSSComponents/EmployeesHeader.css';
import CalendarButton from "./CalendarButton.js";
import Col from 'react-bootstrap/Col';
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