import React, { Component, createRef } from 'react';
import { connect } from 'react-redux';
import './toast.scss';
import { removeLastToastNotification } from '../../actions/darkTheme';

class Toast extends Component {
    
    render() {
        const { toast_notifications, removeLastToastNotification } = this.props;
        return (
            <div className="toast-container">
                {
                    toast_notifications.map((toast, index) => {
                        const { toast_message, id } = toast;
                        return(
                            <ToastMessage
                                key={id}
                                index={index}
                                message={toast_message}
                                removeLastToastNotification={removeLastToastNotification}
                                count={toast_notifications.length}
                            />
                        );
                    })
                }
            </div>
        );
    }
}

class ToastMessage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            toastContainer: createRef(),
        }
    }
    componentDidMount() {
        const { addFadeoutStyle } = this;
        setTimeout(function() {
            addFadeoutStyle();
        }, 3000);
    }

    addFadeoutStyle = () => {
        const toastContainer = this.state.toastContainer.current;
        if(!toastContainer) return;
        const { removeLastToastNotification } = this.props;
        toastContainer.classList.add('toast-message-container-fade-out');
        setTimeout(function() {
            removeLastToastNotification();
        }, 1000);
    }

    render() {
        const { toastContainer } = this.state;
        return(
            <div ref={toastContainer} className="toast-message-container">
                <span className="toast-message">{this.props.message}</span>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        toast_notifications: state.toast_notifications,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        removeLastToastNotification: () => dispatch(removeLastToastNotification())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Toast);