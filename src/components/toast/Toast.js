import React, { Component } from 'react';
import { connect } from 'react-redux';
import { removeLastToastNotification } from '../../actions/reduxActions';
import './toast.scss';
import ToastMessage from './ToastMessage';

class Toast extends Component {
    render() {
        const { toast_notifications, removeLastToastNotification } = this.props;
        return (
            <div className="toast-container">
                {toast_notifications.map((toast, index) => {
                    const { toast_message, id } = toast;
                    return (
                        <ToastMessage
                            key={id}
                            index={index}
                            message={toast_message}
                            removeLastToastNotification={
                                removeLastToastNotification
                            }
                            count={toast_notifications.length}
                        />
                    );
                })}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        toast_notifications: state.toast_notifications,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        removeLastToastNotification: () =>
            dispatch(removeLastToastNotification()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Toast);
