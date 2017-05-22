import React from 'react';
import dotnetify from 'dotnetify';
import $ from 'jquery';

export default class Promise extends React.Component {
    constructor(props) {
        super(props);
        
        dotnetify.offline = true;
        this.vm = dotnetify.react.connect(this.props.viewModel, this);
        $(document).on("offline", (event, value) => this.handleOfflineEvent(value));
    }

    componentWillUnmount = () => this.vm.$destroy();

    handleOfflineEvent = isOffline => {
        if (this.state) {
            this.setState({ offline: isOffline });
            if (!isOffline)
                this.vm.$dispatch({ Restore: "" });
        }
    }

    render() {
        if (!this.state)
            return null;
        if (this.state.isOffline && this.props.commError)
            return this.props.commError;

        return this.props.isResolved(this.state) ?
            this.props.children(this.state) : this.props.while(this.state);
    }
}

