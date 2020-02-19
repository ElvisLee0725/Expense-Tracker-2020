// import moment from "moment"  Can't just do this, it will create stack overflow
const moment = require.requireActual('moment');

// Since the moment() of current time always changes, to test any component which has moment() will need this 
export default (timestamp = 0) => {
    return moment(timestamp);
}