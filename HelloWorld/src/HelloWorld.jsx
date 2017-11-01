import React from 'react';
import dotnetify from 'dotnetify';

dotnetify.hubServerUrl = "http://localhost:5000";

class HelloWorld extends React.Component {
    constructor(props) {
        super(props);
        dotnetify.react.connect("HelloWorld", this);
        this.state = { Greetings: "", ServerTime: "" };
    }
    render() {
        return (
            <div className="App-intro">
                <p>{this.state.Greetings}</p>
                <p>Server time is: {this.state.ServerTime}</p>

                <p>
                    You can also edit <code>HelloWorld.cs</code>, save 
                    to rebuild the server, and do page reload.
                </p>
            </div>
        );
    }
}
export default HelloWorld;