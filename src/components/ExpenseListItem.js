import React from 'react';
import { Link } from 'react-router-dom';

const ExpenseListItem = ({ id, description, amount, createdAt }) => ( // dispatch is destructured from props 
    <div>
        <Link to={`/edit/${id}`}>
            <h2>{description}</h2>
        </Link>
        <p>{amount} - {createdAt}</p>
    </div>
)

// If we just want to use .dispatch() in props without knowing the states, we don't need argument in connect()
export default ExpenseListItem;