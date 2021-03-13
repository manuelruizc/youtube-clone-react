import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateVisitorModal } from '../actions/reduxActions';
import { login } from '../helpers/helpers';
import locales from '../locales/visitorsmodal';

class VisitorsModal extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        document.body.style = 'overflow:hidden';
    }

    closeModal = () => {
        document.body.style = 'overflow:auto';
        this.props.updateVisitorModal();
    };

    render() {
        const msg = this.props.download_limit
            ? "You've reached the limits of download tests!"
            : locales.title;
        return (
            <div className={'visitors-modal'}>
                <div
                    onClick={this.closeModal}
                    className={'visitors-modal-backdrop'}
                />
                <div className={'modal-box'}>
                    <span style={{ color: 'black' }}>{msg}</span>
                    <div>
                        <a
                            onClick={(e) => {
                                e.preventDefault();
                                this.closeModal();
                            }}
                            style={{ color: '#666', cursor: 'pointer' }}
                            href="/"
                        >
                            {locales.buttons.cancel}
                        </a>
                        <a
                            href="/"
                            onClick={(e) => {
                                e.preventDefault();
                                login();
                            }}
                            style={{ color: 'blue', cursor: 'pointer' }}
                        >
                            {locales.buttons.confirm}
                        </a>
                    </div>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateVisitorModal: () => dispatch(updateVisitorModal()),
    };
};

const mapStateToProps = (state) => {
    return {
        download_limit: state.download_limit,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(VisitorsModal);
