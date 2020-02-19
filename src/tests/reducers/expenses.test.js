import ExpensesReducer from '../../reducers/expenses';
import expenses from '../fixtures/expenses';

test('Should set default state', () => {
    const state = ExpensesReducer(undefined, '@@INIT');
    expect(state).toEqual([]);
});

test('Should remove expense by id', () => {
    const action = {
        type: 'REMOVE_EXPENSE',
        id: expenses[1].id
    };
    const state = ExpensesReducer(expenses, action);
    expect(state).toEqual([expenses[0], expenses[2]]);
});

test('Should not remove expense without finding id', () => {
    const action = {
        type: 'REMOVE_EXPENSE',
        id: -1
    };
    const state = ExpensesReducer(expenses, action);
    expect(state).toEqual(expenses);
});

test('Should add an expense', () => {
    const newExpense = {
        id: '3',
        description: 'Car Rental',
        amount: 20000,
        note: '',
        createdAt: 5000
    };
    const action = {
        type: 'ADD_EXPENSE',
        expense: newExpense
    };
    const state = ExpensesReducer(expenses, action);
    expect(state).toEqual([...expenses, newExpense]);
});

test('Should edit an expense', () => {
    const amount = 122000;
    const action = {
        type: 'EDIT_EXPENSE',
        id: expenses[1].id,
        updates: {
            amount
        }
    };
    const state = ExpensesReducer(expenses, action);
    expect(state[1].amount).toBe(122000);
});

test('Should not edit expense without finding id', () => {
    const amount = 122000;
    const action = {
        type: 'EDIT_EXPENSE',
        id: -1,
        updates: {
            amount
        }
    };
    const state = ExpensesReducer(expenses, action);
    expect(state).toEqual(expenses);
});