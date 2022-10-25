import React, { useState } from "react";
import { MdOutlineModeEditOutline } from 'react-icons/md';
import '../CSSComponents/editGoal.css';

export default function EditGoal(props) {

    const editRow = (title) => {
        console.log("edit");
    };

    return (
        <button className="edit" onClick={() => editRow(props.title)}>
            <MdOutlineModeEditOutline size={18}/>
        </button>
    )
}