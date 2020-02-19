import React from 'react';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';
import 'react-dates/initialize';    // Solve error but still get a warning

export default class ExpenseForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            description: props.expense ? props.expense.description : '',
            note: props.expense ? props.expense.note : '',
            amount: props.expense ? (props.expense.amount / 100).toString() : '',
            createdAt: props.expense ? moment(props.expense.createdAt) : moment(),    // Use current time as default
            calendarFocused: false,
            error: ''
        };
        this.onDescriptionChange = this.onDescriptionChange.bind(this);
        this.onNoteChange = this.onNoteChange.bind(this);
        this.onAmountChange = this.onAmountChange.bind(this);
        this.onDateChange = this.onDateChange.bind(this);
        this.onFocusChange = this.onFocusChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    
    onDescriptionChange(e) {
        const description = e.target.value;
        this.setState(() => (
            { description }
        ));
    }

    onNoteChange(e) {
        const note = e.target.value;
        this.setState(() => (
            { note }
        ));
    }

    onAmountChange(e) {
        const amount = e.target.value;
        if(!amount || amount.match(/^\d*(\.\d{0,2})?$/)) {
            this.setState(() => (
                { amount }
            ));
        }
    }

    onDateChange(createdAt) {
        // This way user must choose a date
        if(createdAt) {
            this.setState(() => (
                { createdAt }
            ));
        }
    }

    onFocusChange({ focused }) {
        this.setState(() => (
            { calendarFocused: focused }
        ));
    }

    onSubmit(e) {
        e.preventDefault();
        const { description, amount, createdAt, note } = this.state;
        if(!description || !amount) {
            this.setState({
                error: 'Please enter a description and amount'
            });
        }
        else {
            this.setState({
                error: ''
            });
            this.props.onSubmit({
                description,
                amount: parseFloat(amount, 10) * 100,   // Convert string to float and times 100
                createdAt: createdAt.valueOf(),  // Convert from moment back to javascript time stamp
                note
            })
        }
    }

    render() {
        return (
            <div>
                {this.state.error && <p>{this.state.error}</p>}
                <form onSubmit={this.onSubmit}>
                    <input 
                        type="text"
                        placeholder="Description"
                        autoFocus
                        value={this.state.description}
                        onChange={this.onDescriptionChange}
                    />
                    <input 
                        type="text"
                        placeholder="Amount"
                        value={this.state.amount}
                        onChange={this.onAmountChange}
                    />
                    <SingleDatePicker 
                        date={this.state.createdAt}
                        onDateChange={this.onDateChange}
                        focused={this.state.calendarFocused}
                        onFocusChange={this.onFocusChange}
                        numberOfMonths={1}
                        isOutsideRange={() => false}
                    />

                    <textarea
                        placeholder="Add a note for your expense"
                        value={this.state.note}
                        onChange={this.onNoteChange}
                    >
                    </textarea>
                    <button>Add Expense</button>
                </form>
            </div>
        );
    }
}