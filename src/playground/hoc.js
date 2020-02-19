import React from 'react';
import ReactDOM from 'react-dom';

const Info = (props) => {
    return (
        <div>
            <h2>Infomation</h2>
            <p>This is the info: {props.info}</p>
        </div>
    );
}

// This is just a function - to return higher order component
const WithAdminMsg = (WrappedComponent) => {
    // This is the higher order component below:
    return (props) => (
        <div>
            { props.isAdmin && <p>Hello this is your info...</p> }
            <WrappedComponent {...props}/>
        </div>
    );
}

const AdminMsg = WithAdminMsg(Info);


const requireAuthentication = (WrappedComponent) => {
    return (props) => (
        <div>
            { props.isAuthenticated ? (<WrappedComponent />) : (<p>'Please login first!'</p>) }
        </div>
    );
};

const AuthInfo = requireAuthentication(Info);

// ReactDOM.render(<AdminMsg info="Hello World" isAdmin={true}/>, document.getElementById('app'));
ReactDOM.render(<AuthInfo isAuthenticated={true}/>, document.getElementById('app'));