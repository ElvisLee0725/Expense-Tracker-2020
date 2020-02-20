import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import numeral from 'numeral';

const ExpenseListItem = ({ id, description, amount, createdAt }) => ( // dispatch is destructured from props 
    <div>
        <Link to={`/edit/${id}`}>
            <h2>{description}</h2>
        </Link>
        <p>
            {numeral(amount / 100).format('$0,0.00')} 
            - 
            {moment(createdAt).format('MMMM Do, YYYY')}
        </p>
    </div>
)

// If we just want to use .dispatch() in props without knowing the states, we don't need argument in connect()
export default ExpenseListItem;