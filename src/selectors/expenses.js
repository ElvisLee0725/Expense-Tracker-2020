import moment from 'moment';

// getVisibleExpenses, take parameters of state.expenses and state.filters

export default (expenses, { text, sortBy, startDate, endDate }) => {
    return expenses.filter((expense) => {
        const createdAtMoment = moment(expense.createdAt);
        const startDateMatch = startDate ? startDate.isSameOrBefore(createdAtMoment, 'day') : true;
        const endDateMatch = endDate ? endDate.isSameOrAfter(createdAtMoment, 'day') : true;
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