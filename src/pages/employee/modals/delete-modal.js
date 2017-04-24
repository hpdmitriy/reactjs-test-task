import React, { PropTypes } from 'react';
import { bindAll } from 'lodash';
import { connect } from 'react-redux';
import { closeModal } from '../../../components/modal/index';

class DeleteModal extends React.Component {

    static propTypes = {
        dispatch: PropTypes.func.isRequired,
        firstName: PropTypes.string.isRequired,
        lastName: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired,
        onSuccess: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
        bindAll(this, ['cancel', 'deleteItem']);
    }

    cancel() {
        this.props.dispatch( closeModal() );
    }

    deleteItem() {
        this.props.dispatch( this.props.onSuccess(this.props.id) );
        this.cancel();
    }

    render() {
        return (
            <div>
                <div className='modal-body'>
                    <p><b>{ this.props.id }</b> - { this.props.firstName } { this.props.lastName } </p>
                </div>
                <div className='modal-footer'>
                    <button className='btn btn-default' onClick={ this.cancel }>Отмена</button>
                    <button className='btn btn-danger' onClick={ this.deleteItem }>Удалить</button>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {};
}

export default connect(mapStateToProps)(DeleteModal);

