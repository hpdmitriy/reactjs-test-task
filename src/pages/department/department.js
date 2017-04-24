import React, { PropTypes } from 'react';
import { bindAll } from 'lodash';
import { connect } from 'react-redux';
import DepartmentItem from './department-item';
import { fetchDepartments } from './actions';
import Loader from '../../components/ui/loader/index';
import './department.sss';


class DepartmentPage extends React.Component {
    
    static path = '/department';
    static propTypes = {
        dispatch: PropTypes.func.isRequired,
        department: PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);

        bindAll(this, ['renderItems']);
        this.state = {
            department: ''
        };

        this.props.dispatch(fetchDepartments());
    }

    renderItems(item, idx) {
        return (
            <DepartmentItem
                key={ idx }
                id = { item.id}
                name={ item.name }
            />
        );
    }

    render() {
        const { items, error, isLoading } = this.props.department;
        return (
            <div className='col-sm-9 article'>
                    <h3>Departments</h3>
                    <table className='table table-bordered table-hover table_department'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                        { isLoading ? <tr><td colSpan='3'><Loader /></td></tr> :
                            error ? <tr><td colSpan='3'> { error }</td></tr> :
                                items.length ? items.map(this.renderItems) :
                                    <tr><td colSpan='3'>Нет данных</td></tr>
                        }
                        </tbody>
                    </table>
                </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        department: state.department
    };
}

export default connect(mapStateToProps)(DepartmentPage);
