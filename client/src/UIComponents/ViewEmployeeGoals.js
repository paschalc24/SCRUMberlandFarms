import Button from 'react-bootstrap/Button';
import React, { useState } from "react";

import '../CSSComponents/ViewEmployeeGoals.css';

import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

import { GiBullseye } from "react-icons/gi";


function ViewEmployeeGoals() {
    return (
    <>
        <OverlayTrigger
            trigger='hover'
            key={'bottom'}
            placement={'bottom'}
            overlay = {
                <Tooltip id={'view-employee-goals-tooltip'}>
                    Display Goals
                </Tooltip>
            }
        >
            <button size="sm" className="view-goals">
                <GiBullseye size={20}/>
            </button>
        </OverlayTrigger>
    </>
    );
}


export default ViewEmployeeGoals;