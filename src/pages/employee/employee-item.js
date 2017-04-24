import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { openModal } from '../../components/modal/index';
import EditModal from './modals/edit-modal';
import DeleteModal from './modals/delete-modal';
import { editEmployee, deleteEmployee } from './actions';

class EmployeeItem extends React.Component {

    static propTypes = {
        id: PropTypes.number.isRequired,
        firstName: PropTypes.string.isRequired,
        lastName: PropTypes.string.isRequired,
        departmentId: PropTypes.string.isRequired,
        departmentName: PropTypes.string.isRequired
    };
    
    constructor(props) {
        super(props);
        
        this.edit = ::this.edit;
        this.remove = ::this.remove;
    }
    
    edit() {
        const { id, firstName, lastName, departmentId, departmentName } = this.props;
        this.props.dispatch(openModal({
            content: <EditModal id={ id } firstName={ firstName } lastName={ lastName } departmentId={ departmentId } departmentName={departmentName} onSave={ editEmployee } />,
            title: 'Редактировать'
        })
        );
    }

    remove() {
        const { id, firstName, lastName} = this.props;
        this.props.dispatch( openModal({
            content: <DeleteModal id={ id } firstName={ firstName } lastName={ lastName } onSuccess={ deleteEmployee } />,
            title: 'Удалить?'
        }) );
    }
    render() {
        return (
            <tr>
                <td>{ this.props.id }</td>
                <td>{ this.props.firstName }</td>
                <td>{ this.props.lastName }</td>
                <td>{ this.props.departmentName }</td>
                <td>
                    <button title='Редактировать' className='btn btn-success' onClick={ this.edit } >
                        <i className='glyphicon glyphicon-edit' />
                    </button>
                    &nbsp;
                    <button title='Удалить' className='btn btn-danger' onClick={ this.remove } >
                        <i className='glyphicon glyphicon-trash' />
                    </button>
                </td>
            </tr>
        );
    }
}

function mapStateToProps(state) {
    return {};
}

export default connect(mapStateToProps)(EmployeeItem);
