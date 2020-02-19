import { createStore, combineReducers } from 'redux';
import uuid from 'uuid';

// ADD EXPENSE action generator
const addExpense = ({
    description = '',
    note = '',
    amount = 0,
    createdAt = 0
} = {}) => ({
    type: 'ADD_EXPENSE',
    expense: {
        id: uuid(),
        description,
        note,
        amount,
        createdAt
    }
});

// EDIT EXPENSE
const editExpense = (id, updates) => ({
    type: 'EDIT_EXPENSE',
    id,
    updates
});

// REMOVE EXPENSE
const removeExpense = ({ id } = {}) => ({
    type: 'REMOVE_EXPENSE',
    id
});

const expensesReducerDefaultState = [];

const expensesReducer = (state = expensesReducerDefaultState, action) => {
    switch(action.type) {
        case 'ADD_EXPENSE':
            // .push() will change the state directly
            // Use .concat() since it will take the old array to concat new item, then return a new array without changing the old one
            // We can also use spread operator ... Ex. [...arr, 'newItem'] -> It will return a new array without changing the old one 
            return [
                ...state,
                action.expense
            ]; 
        
        case 'EDIT_EXPENSE': 
            return state.map((expense) => {
                if(expense.id === action.id) {
                    return {
                        ...expense,
                        ...action.updates
                    };
                }
                else {
                    return expense;
                }
            });
        case 'REMOVE_EXPENSE':
            return state.filter(({ id }) => id !== action.id);
        
        default:
            return state;
    }
};

const filtersReducerDefaultState = {
    text: '',
    sortBy: 'date',
    startDate: undefined,
    endDate: undefined
};

const setTextFilter = (text = '') => ({
    type: 'SET_TEXT_FILTER',
    text
});

const sortByAmount = () => ({
    type: 'SORT_BY_AMOUNT'
});

const sortByDate = () => ({
    type: 'SORT_BY_DATE'
});

// If there is no input, the default is undefined
const setStartDate = (startDate) => ({
    type: 'SET_START_DATE',
    startDate
});

const setEndDate = (endDate) => ({
    type: 'SET_END_DATE',
    endDate
});


const filtersReducer = (state = filtersReducerDefaultState, action) => {
    switch(action.type) {
        case 'SET_TEXT_FILTER':
            return {
                ...state,
                text: action.text
            };
        
        case 'SORT_BY_AMOUNT':
            return {
                ...state,
                sortBy: 'amount'
            };
        
        case 'SORT_BY_DATE':
            return {
                ...state,
                sortBy: 'date'
            };
        
        case 'SET_START_DATE':
            return {
                ...state,
                startDate: action.startDate
            };

        case 'SET_END_DATE':
            return {
                ...state,
                endDate: action.endDate
            };

        default: 
            return state;
    }
};

const store = createStore(
    combineReducers({
        expenses: expensesReducer,
        filters: filtersReducer
    })
);

const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate }) => {
    return expenses.filter((expense) => {
        const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate;
        const endDateMatch = typeof endDate !== 'number' || expense.createdAt <= endDate;
        const textMatch = expense.description.toLowerCase().includes(text.toLowerCase());

        return startDateMatch && endDateMatch && textMatch;
    }).sort((expense1, expense2) => {
        // The one created more recent comes first
        if(sortBy === 'date') {
            return expense1.createdAt < expense2.createdAt ? 1 : -1;
        }
        // The more expensive one comes first
        else if(sortBy === 'amount') {
            return expense1.amount < expense2.amount ? 1 : -1;
        }
    });
};

store.subscribe(() => {
    const state = store.getState();
    const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
    console.log(visibleExpenses);;
});


const expenseOne = store.dispatch(addExpense({ description: 'Rent', amount: 100, createdAt: -1000 }));
const expenseTwo = store.dispatch(addExpense({ description: 'Coffee', amount: 300, createdAt: 1000 }));

// store.dispatch(removeExpense({ id: expenseOne.expense.id }));

// store.dispatch(editExpense(expenseTwo.expense.id, { amount: 600 }));

// store.dispatch(setTextFilter('ffe'));

// store.dispatch(sortByAmount());
// store.dispatch(sortByDate());

// store.dispatch(setStartDate(0));
// store.dispatch(setStartDate());
// store.dispatch(setEndDate(1000));

const demoState = {
    expenses: [{
        id: 'asfdsafa',
        descriptions: 'Rent for January',
        note: 'This is the final rent',
        amount: 54500,
        createdAt: 0
    }],
    filters: {
        text: 'rent',
        sortBy: 'amount', // amount or date
        startDate: undefined,
        endDate: undefined
    }
}