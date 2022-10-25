import React, { useState } from "react";
import { CgTrash } from 'react-icons/cg';
import '../CSSComponents/deleteGoal.css';

export default function DeleteGoal(props) {
    const deleteRow = (title) => {
        const newList = props.rows.filter((item) => item.title !== title);
        props.setGoals(newList);
        console.log(newList)
    };

    return (
        <button className="delete" onClick={() => deleteRow(props.title)}>
            <CgTrash size={18}/>
        </button>
    )
}