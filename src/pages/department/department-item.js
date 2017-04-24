import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { openModal } from '../../components/modal/index';
import EditModal from './modals/edit-modal';
import DeleteModal from './modals/delete-modal';
import { editDepartment, deleteDepartment } from './actions';

class DepartmentItem extends React.Component {

    static propTypes = {
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired
    };
    
    constructor(props) {
        super(props);
        
        this.edit = ::this.edit;
        this.remove = ::this.remove;
    }
    
    edit() {
        const { id, name, num } = this.props;
        this.props.dispatch( openModal({
            content: <EditModal id={ id } num={ num } name={ name } onSave={ editDepartment } />,
            title: 'Редактировать'
        }) );
    }

    remove() {
        const { id, name } = this.props;
        this.props.dispatch( openModal({
            content: <DeleteModal id={ id } name={ name } onSuccess={ deleteDepartment } />,
            title: 'Удалить?'
        }) );
    }
    
    render() {
        return (
            <tr>
                <td> { this.props.id }</td>
                <td>{ this.props.name }</td>
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

export default connect(mapStateToProps)(DepartmentItem);
