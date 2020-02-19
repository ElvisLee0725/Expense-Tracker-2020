import React from 'react';
import { connect } from 'react-redux';
import ExpenseListItem from './ExpenseListItem';
import SelectExpenses from '../selectors/expenses';

export const ExpenseList = (props) => (
    <div>
        <h1>Expense List</h1>
        {
            props.expenses.length === 0 ? (
                <p>No expenses</p>
            ) : (
                props.expenses.map((expense) => {
                    return <ExpenseListItem key={expense.id} {...expense} />;
                })
            )
        }
        
    </div>
);

// Because in the api, connect() actually returns a function, so we need to call that with ()
// Inside connect we provide what part of state we want this component to access -> Connect a component to redux store!

// Map the state to component's props
const mapStateToProps = (state) => {
    return {
        expenses: SelectExpenses(state.expenses, state.filters)
    };
}

export default connect(mapStateToProps)(ExpenseList);
