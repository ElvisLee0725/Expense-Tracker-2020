import filtersReducer from '../../reducers/filters';
import moment from 'moment';

test('Should set up default filter values', () => {
    const state = filtersReducer(undefined, { type: '@@init' });
    expect(state).toEqual({
        text: '',
        sortBy: 'date',
        startDate: moment().startOf('month'),
        endDate: moment().endOf('month')
    });
});

test('Should set sort by to amount', () => {
    const state = filtersReducer(undefined, { type: 'SORT_BY_AMOUNT' });
    expect(state.sortBy).toBe('amount');
});

test('Should set sort by to date', () => {
    const curState = {
        text: '',
        sortBy: 'amount',
        startDate: undefined,
        endDate: undefined
    };
    const state = filtersReducer(curState, { type: 'SORT_BY_DATE' });
    expect(state.sortBy).toBe('date');
});

test('Should set text filter', () => {
    const state = filtersReducer(undefined, { 
        type: 'SET_TEXT_FILTER',  
        text: 'Credit Card'
    });
    expect(state.text).toBe('Credit Card');
});

test('Should set start date filter', () => {
    const state = filtersReducer(undefined, { 
        type: 'SET_START_DATE',  
        startDate: moment(0)
    });
    expect(state.startDate).toEqual(moment(0)); // Moment is an object so use toEqual()
});

test('Should set end date filter', () => {
    const state = filtersReducer(undefined, { 
        type: 'SET_END_DATE',  
        endDate: moment(0)
    });
    expect(state.endDate).toEqual(moment(0)); // Moment is an object so use toEqual()
});
