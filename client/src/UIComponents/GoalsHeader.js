import '../CSSComponents/GoalsHeader.css';

import Navbar from 'react-bootstrap/Navbar';
import React, { Component } from "react";
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';


class GoalsHeader extends Component {
    render() {
        return (
            <Navbar className="goals-header">
                <ButtonGroup className="filter-buttons-group">
                    <Button size='sm' className="filter-button">Newest</Button>
                    <Button size='sm' className="filter-button">Oldest</Button>
                    <Button size='sm' className="filter-button">Completed</Button>
                    <Button size='sm' className="filter-button">Ongoing</Button>
                    <Button size='sm' className="filter-button">Dormant</Button>
                </ButtonGroup>
                <InputGroup className="search">
                    <Form.Control
                        type="search"
                        placeholder="Search"
                        className="search-field"
                    />
                    <Button size='sm' className="search-button">🔍</Button>
                </InputGroup>
            </Navbar>
        );
    }
}

export default GoalsHeader;