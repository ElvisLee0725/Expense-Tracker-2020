import { addExpense, editExpense, removeExpense } from '../../actions/expenses';

test('Should setup remove action object', () => {
    const action = removeExpense({ id: '123abc' }); 
    expect(action).toEqual({
        type: 'REMOVE_EXPENSE',
        id: '123abc'
    });
});

test('Should setup edit action object', () => {
    const action = editExpense('123abc',{ note: 'some notes'}); 
    expect(action).toEqual({
        type: 'EDIT_EXPENSE',
        id: '123abc',
        updates: {
            note: 'some notes'
        }
    });
});

test('Should setup add expense action object with provided value', () => {
    const expenseData = {
        description: 'Rent',
        amount: 220000,
        createdAt: 1000,
        note: 'This is rent last month'
    };
    const action = addExpense(expenseData);
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
            ...expenseData,
            id: expect.any(String)
        }
    });
});

test('Should setup add expense action object with default value', () => {
    const expenseData = {
        description: '',
        amount: 0,
        createdAt: 0,
        note: ''
    };
    const action = addExpense();
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
            ...expenseData,
            id: expect.any(String)
        }
    });
});