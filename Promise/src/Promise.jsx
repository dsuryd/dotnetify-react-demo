import React from 'react';
import dotnetify from 'dotnetify';

export default class Promise extends React.Component {
    constructor(props) {
        super(props);
        dotnetify.react.connect(this.props.source, this);
    }
    render() {
        return this.state === null ? null :
            this.props.isFulfilled(this.state) ?
                this.props.then(this.state) : this.props.while(this.state);
    }
}