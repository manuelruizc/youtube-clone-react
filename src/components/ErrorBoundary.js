import React from 'react';
import { reportBug } from '../helpers/helpers';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, info: null };
    }

    async componentDidCatch(error, info) {
        const { href } = window.location;
        this.setState({ hasError: true, error, info });
        await reportBug(info.componentStack, error.toString(), href);
    }
    render() {
        const { hasError, error, info } = this.state;
        if (hasError) {
            return (
                <div>
                    <h2>The app crashed</h2>
                    <span>{error}</span>
                    <span>{info}</span>
                </div>
            );
        }
        return this.props.children;
    }
}

export default ErrorBoundary;
