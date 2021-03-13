import React, { Component, createRef } from 'react';

class ToastMessage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            toastContainer: createRef(),
        };
    }
    componentDidMount() {
        const { addFadeoutStyle } = this;
        setTimeout(function () {
            addFadeoutStyle();
        }, 3000);
    }

    addFadeoutStyle = () => {
        const toastContainer = this.state.toastContainer.current;
        if (!toastContainer) return;
        const { removeLastToastNotification } = this.props;
        toastContainer.classList.add('toast-message-container-fade-out');
        setTimeout(function () {
            removeLastToastNotification();
        }, 1000);
    };

    render() {
        const { toastContainer } = this.state;
        return (
            <div ref={toastContainer} className="toast-message-container">
                <span className="toast-message">{this.props.message}</span>
            </div>
        );
    }
}

export default ToastMessage;
