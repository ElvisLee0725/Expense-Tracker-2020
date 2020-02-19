// Expenses Reducer

const expensesReducerDefaultState = [];

export default (state = expensesReducerDefaultState, action) => {
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
