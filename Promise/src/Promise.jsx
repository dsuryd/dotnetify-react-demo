import React from 'react';
import dotnetify from 'dotnetify';

export default class Promise extends React.Component {
    constructor(props) {
        super(props);
        
        dotnetify.offline = true;
        this.vm = dotnetify.react.connect(this.props.viewModel, this);
    }
    componentWillUnmount = () => this.vm.$destroy();
    render() {
        if (!this.state)
            return null;
        if (this.state.isOffline && this.props.commError)
            return this.props.commError;

        return this.props.isResolved(this.state) ?
            this.props.children(this.state) : this.props.while(this.state);
    }
}

